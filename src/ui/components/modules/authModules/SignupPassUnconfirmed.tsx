import React from 'react';

import { setIsSignupPassConfirmed, signup } from '../../../../bll/reducers';
import { useAppDispatch } from '../../../../common/hooks';
import { Button } from '../../elements';
import { TModal } from '../modal/Modals';

type TSignupPassUnconfirmedProps = {
  revealModal: (modalType: TModal) => void;
  closeModal: (modalType: TModal) => void;
};

export const SignupPassUnconfirmed = ({ revealModal, closeModal }: TSignupPassUnconfirmedProps) => {
  const dispatch = useAppDispatch();
  const returnToSignup = () => {
    closeModal('signupPassUnconfirmed');
  };
  const proceedSignup = () => {
    closeModal('signupPassUnconfirmed');
    dispatch(setIsSignupPassConfirmed(null));
    dispatch(signup());
  };
  return (
    <div className="info">
      <header>
        <h3 className="title center">Password unconfirmed!</h3>
        <p className="text center">
          Password confirmation is preferable to avoid mistakes when typing
        </p>
        <p className="text center">Are you sure you don&apos;t want to confirm your password?</p>
      </header>
      <div className="info__signup">
        <div className="info__signup__container">
          <Button onClick={returnToSignup} variant="ok">
            Back to Confirm
          </Button>
        </div>
        <div className="info__signup__container">
          <Button onClick={proceedSignup} variant="ok__alt">
            Proceed anyway
          </Button>
        </div>
      </div>
    </div>
  );
};
