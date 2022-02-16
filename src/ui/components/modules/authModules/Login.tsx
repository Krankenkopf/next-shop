import React, { FC, useCallback, useEffect } from 'react';

import { TRequestStatus } from '../../../../bll/reducers/app';
import { selectAppStatus } from '../../../../bll/selectors';
import { useAppSelector } from '../../../../common/hooks';
import { Button, Preloader } from '../../elements';
import { TModal } from '../modal/Modals';

import { ErrorMessage } from './ErrorMessage';
import { LoginForm } from './forms/LoginForm';

type TLoginProps = {
  revealModal: (modalType: TModal) => void;
};

export const Login: FC<TLoginProps> = ({ revealModal }) => {
  const status = useAppSelector<TRequestStatus>(selectAppStatus);
  const onButtonSignupClick = useCallback(() => {
    revealModal('signup');
  }, []);
  return (
    <div className="login">
      <header>
        <h3 className="title center">SIGN IN</h3>
        <p className="text center">
          Become a Member — you&apos;ll enjoy exclusive deals, offers, invites and
          rewards.
        </p>
      </header>
      <div className="login__form">
        <LoginForm revealModal={revealModal} />
      </div>
      <div className="login__signup">
        <Button onClick={onButtonSignupClick} variant="ok__alt">
          Become a Member
        </Button>
      </div>
      {status === 'auth loading' && <Preloader background="#ffccfc" />}
      {status === 'auth failed' && <ErrorMessage />}
    </div>
  );
};
