import React, { FC, useCallback, useEffect, useState } from 'react';

import ReactDOM from 'react-dom';

import { TAuthState, setModal, closeModal } from '../../../../bll/reducers';
import { selectModal } from '../../../../bll/selectors';
import { useAppDispatch, useAppSelector } from '../../../../common/hooks';
import { Login } from '../authModules/Login';
import { PassRecovery } from '../authModules/PassRecovery';
import { Signup } from '../authModules/Signup';
import { SignupPassUnconfirmed } from '../authModules/SignupPassUnconfirmed';
import { FiltersMenu } from '../filters/FiltersMenu';
import { MainMenu } from '../header/menu/MainMenu';

import css from './Modal.module.scss';
import { Popup } from './Popup';
import { SideMenu } from './SideMenu';

export type TModal =
  | 'signup'
  | 'signupPassUnconfirmed'
  | 'login'
  | 'passRecovery'
  | 'cart'
  | 'mainMenu'
  | 'filtersMenu'
  | null;

type TModalsProps = {};
export const TRANSITION_TIME = 600;

export const Modals: FC<TModalsProps> = () => {
  // ==========================================================
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, []);
  // ==========================================================
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector<TAuthState>(state => state.auth);
  const modal = useAppSelector<TModal>(selectModal);

  const [modalsState, setModalsState] = useState({
    // pop-ups
    signup: false,
    signupPassUnconfirmed: false,
    login: false,
    passRecovery: false,
    cart: false,
    // sideMenus
    mainMenu: false,
    filtersMenu: false,
  });
  // TODO: maybe rename props to isFullyOpened isFullyClosed?
  const [closingModal, setClosingModal] = useState(false);
  const [current, setCurrent] = useState<TModal>(null);
  const [freezed, setFreezed] = useState<TModal>(null);

  const [scrollLock, setScrollLock] = useState(false);
  useEffect(() => {
    if (modal && !current) {
      // no opened modals
      const lockPadding = window.innerWidth - document.body.offsetWidth;
      document.body.style.overflowY = 'hidden';
      document.body.style.paddingRight = `${lockPadding}px`;
      setModalsState(prev => ({ ...prev, [modal]: true }));
      setCurrent(modal);
      setScrollLock(true);
      setTimeout(() => {
        setScrollLock(false);
      }, TRANSITION_TIME);
    }
    if (modal && current && modal !== current && !freezed) {
      // need to close previous and open current
      setModalsState(prev => ({ ...prev, [modal]: true, [current]: false }));
      setScrollLock(true);
      setTimeout(() => {
        setCurrent(modal);
        setScrollLock(false);
      }, TRANSITION_TIME);
    }
    if (modal && current && modal !== current && freezed) {
      // no need to close previous and open current
      setModalsState(prev => ({ ...prev, [modal]: true }));
      setScrollLock(true);
      setTimeout(() => {
        setCurrent(modal);
        // setScrollLock(false) // it's considered that upper modal will be not scrollable
      }, TRANSITION_TIME);
    }
  }, [modal]);

  const revealModal = useCallback(
    modalToReveal => {
      dispatch(setModal(modalToReveal));
      if (modalToReveal !== current) {
        setFreezed(current);
        setCurrent(modalToReveal);
      }
    },
    [current],
  );

  const handleCloseModal = useCallback(
    (modalToClose: TModal) => {
      if (modal && modalToClose) {
        // setScrollLock(true)
        if (freezed && modalToClose !== freezed) {
          // now is two modals in view
          setModalsState(prev => ({ ...prev, [modalToClose]: false }));
          revealModal(freezed); // set global toggler to lower modal
          // setScrollLock(false)
          setTimeout(() => {
            setFreezed(null); // lower modal unfreezed...
            setCurrent(freezed);
            setScrollLock(false); // not tested if it neccesary
          }, TRANSITION_TIME);
        }
        if (!freezed || modalToClose === freezed) {
          // setScrollLock(true)
          if (modalToClose === freezed) {
            // setFreezed(null)
            // setCurrent(freezed)
            setTimeout(() => {
              setModalsState(prev => ({ ...prev, [modalToClose]: false }));
              setScrollLock(true);
              setClosingModal(true); // closing modals component
              setTimeout(() => {
                document.body.style.overflowY = 'inherit';
                document.body.style.paddingRight = `${0}px`;
                setCurrent(null);
                setClosingModal(false);
                setScrollLock(false);
              }, TRANSITION_TIME);
              dispatch(closeModal());
            }, TRANSITION_TIME);
          }
          if (!freezed) {
            setScrollLock(true);
            setModalsState(prev => ({ ...prev, [modalToClose]: false }));
            setClosingModal(true); // closing modals component
            setTimeout(() => {
              document.body.style.overflowY = 'inherit';
              document.body.style.paddingRight = `${0}px`;
              setCurrent(null);
              setClosingModal(false);
              setScrollLock(false);
            }, TRANSITION_TIME);
            dispatch(closeModal());
          }
        }
      }
    },
    [modal, freezed],
  );

  const className = `${css.modal} ${
    current ? (closingModal ? css.modal__closing : css.modal__revealed) : ''
  }`;

  if (isBrowser) {
    const modals = (
      <div className={className}>
        <Popup
          modalType="signup"
          scrollLock={scrollLock}
          current={current}
          isOpen={modalsState.signup}
          isFreezed={freezed === 'signup'}
          onClose={handleCloseModal}>
          <Signup
            revealModal={revealModal}
            freezePrevious={modalToFreeze => setFreezed(modalToFreeze)}
            closeModal={handleCloseModal}
          />
        </Popup>
        <Popup
          modalType="login"
          scrollLock={scrollLock}
          current={current}
          isOpen={modalsState.login}
          onClose={handleCloseModal}>
          <Login revealModal={revealModal} />
        </Popup>
        <Popup
          modalType="signupPassUnconfirmed"
          scrollLock={scrollLock}
          current={current}
          layout={2}
          isOpen={modalsState.signupPassUnconfirmed}
          onClose={handleCloseModal}>
          <SignupPassUnconfirmed revealModal={revealModal} closeModal={handleCloseModal} />
        </Popup>
        <Popup
          modalType="passRecovery"
          scrollLock={scrollLock}
          current={current}
          layout={2}
          isOpen={modalsState.passRecovery}
          onClose={handleCloseModal}>
          <PassRecovery revealModal={revealModal} closeModal={handleCloseModal} />
        </Popup>

        <SideMenu
          modalType="filtersMenu"
          side="right"
          scrollLock={scrollLock}
          current={current}
          isOpen={modalsState.filtersMenu}
          onClose={handleCloseModal}>
          <FiltersMenu />
        </SideMenu>
        <SideMenu
          modalType="mainMenu"
          side="left"
          scrollLock={scrollLock}
          current={current}
          isOpen={modalsState.mainMenu}
          onClose={handleCloseModal}>
          <MainMenu closeModal={handleCloseModal} />
        </SideMenu>
      </div>
    );
    const container = document.getElementById('modal-root');
    return container && ReactDOM.createPortal(modals, container);
  }
  return null;
};
