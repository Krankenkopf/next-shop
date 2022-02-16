import React from 'react';

import { useDispatch } from 'react-redux';

import { TModal } from '../modal/Modals';

import { PassRecoveryForm } from './forms/PassRecoveryForm';

type TPassRecoveryProps = {
  revealModal: (modalType: TModal) => void;
  closeModal: (modalType: TModal) => void;
};

export const PassRecovery = ({ revealModal, closeModal }: TPassRecoveryProps) => (
  <div className="info">
    <header>
      <h3 className="title center">Forgot password?</h3>
      <p className="text center">
        Please enter the email address you used to create your account, and we&apos;ll
        send you a link to reset your password
      </p>
    </header>
    <PassRecoveryForm revealModal={revealModal} closeModal={closeModal} />
  </div>
);
