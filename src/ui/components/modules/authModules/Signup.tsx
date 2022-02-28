import React, { useEffect } from 'react';

import { setSignupUserData, TAuthState, TRequestStatus } from '../../../../bll/reducers';
import { selectAppStatus } from '../../../../bll/selectors';
import { useAppDispatch, useAppSelector } from '../../../../common/hooks';
import { Preloader } from '../../elements';
import { TModal, TRANSITION_TIME } from '../modal/Modals';

import { ErrorMessage } from './ErrorMessage';
import { SignupForm } from './forms/SignupForm';

type TSignupProps = {
  revealModal: (modalType: TModal) => void;
  freezePrevious: (modalType: TModal) => void;
  closeModal: (modalType: TModal) => void;
};

export const Signup = ({ revealModal, freezePrevious, closeModal }: TSignupProps) => {
  const dispatch = useAppDispatch();
  const { signupUserData, isSignupPassConfirmed, isLoggedIn } = useAppSelector<TAuthState>(
    state => state.auth,
  );
  const modal = useAppSelector<TModal>(state => state.app.modal);
  const status = useAppSelector<TRequestStatus>(selectAppStatus);

  /* useEffect(() => {
    if (!modal && signupUserData) {
      dispatch(setSignupUserData(null));
    }
    if (modal && !isSignupPassConfirmed && signupUserData && !isLoggedIn) {
      // when user setted signupData to state
      freezePrevious('signup');
      revealModal('signupPassUnconfirmed');
    }
    if (isLoggedIn) {
      closeModal('signup');
    }
  }, [signupUserData, isSignupPassConfirmed, isLoggedIn, modal]); */
  return (
    <div className="signup">
      <header>
        <h3 className="title center">BECOME A MEMBER</h3>
        <p className="text center">
          Become a Member — you&apos;ll enjoy exclusive deals, offers, invites and rewards.
        </p>
      </header>
      <div className="signup__form">
        <SignupForm revealModal={revealModal} />
      </div>
      <div className="signup__login">
        <span>Already have an account? </span>
        {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
        <a role="button" onClick={() => revealModal('login')}>
          <strong>Sign In</strong>
        </a>
      </div>
      {status === 'auth loading' && <Preloader background="#ffccfc" />}
      {status === 'auth failed' && <ErrorMessage />}
    </div>
  );
};
