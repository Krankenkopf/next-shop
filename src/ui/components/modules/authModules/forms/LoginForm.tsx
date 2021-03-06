import React, { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';

import { login, setLoginUserData } from '../../../../../bll/reducers/auth';
import { IconColor } from '../../../../../common/constants';
import { useAppDispatch } from '../../../../../common/hooks';
import { TLoginData } from '../../../../../dal/krank/auth-api';
import { Icon, Input, Checkbox, Button } from '../../../elements';
import { TModal } from '../../modal/Modals';

export type LoginFormData = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

type TLoginFormProps = {
  revealModal: (modalType: TModal) => void;
};

const MIN_SYMBOLS = 8;

const signupSchema = yup.object().shape({
  email: yup
    .string()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(MIN_SYMBOLS, `Password must be at least ${MIN_SYMBOLS} symbols`),
});

export const LoginForm = ({ revealModal }: TLoginFormProps) => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, dirtyFields },
    reset,
    clearErrors,
  } = useForm<LoginFormData>({
    mode: 'onChange', // important for dynamical tips
    resolver: yupResolver(signupSchema, { abortEarly: false }),
    criteriaMode: 'all', // important for dynamical tips
  });
  const initialHelperState = {
    email: true,
    password: true,
  };
  const [helperState, setHelperState] = useState(initialHelperState); // errors blocked in
  const [dashed, setDashed] = useState<keyof LoginFormData | null>(null);

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const onSubmit: SubmitHandler<LoginFormData> = data => {
    const loginData: TLoginData = {
      email: data.email,
      password: data.password,
    };
    dispatch(setLoginUserData(loginData));
    dispatch(login());
  };
  const changeFocusHandler = (name: keyof LoginFormData, focus: boolean) => {
    // for first field changing errors won't show
    !dirtyFields[name] && setHelperState(prev => ({ ...prev, [name]: !focus }));
    // since field touched after first blur, all errors will calculated onChange and always show
    dirtyFields[name] && setHelperState(initialHelperState);
    // thick/thin ...might be color customized
    setDashed(focus ? name : null);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <section className="field iconized__LR">
        <label className="field__label">Email</label>
        {/* true || false || true - mounted */}
        {/* true || true || true - focused */}
        {/* false || true || false -errors changed */}
        {/* false || false || false - errors blurred */}
        {/* true || false || false - changed no errors */}
        {!errors.email || !helperState.email || !dirtyFields.email ? (
          !errors.email && dirtyFields.email ? (
            <Icon
              name="envelope"
              width="wide"
              primaryOpacity="1"
              secondaryOpacity="1"
              primaryColor={IconColor.OK}
              secondaryColor={IconColor.OK}
            />
          ) : (
            <Icon
              name="envelope"
              width="wide"
              primaryOpacity="1"
              secondaryOpacity="1"
              primaryColor={IconColor.INITIAL}
              secondaryColor={IconColor.INITIAL}
            />
          )
        ) : null}
        {errors.email && helperState.email && (
          <Icon name="envelope" width="wide" primaryOpacity="0.5" secondaryOpacity="0.5" />
        )}
        {errors.email && helperState.email && (
          <Icon
            name="circle"
            size="max"
            width="wide"
            primaryColor={IconColor.ERROR}
            secondaryColor={IconColor.ERROR}
          />
        )}
        {errors.email && helperState.email && (
          <Icon
            name="exclamation"
            width="wide"
            primaryColor={IconColor.ERROR}
            secondaryColor={IconColor.ERROR}
          />
        )}
        {!errors.email && dirtyFields.email && (
          <Icon
            name="check"
            side="right"
            size="max"
            width="wide"
            primaryColor={IconColor.OK}
            secondaryColor={IconColor.OK}
          />
        )}
        <div className="field__input">
          <Input
            {...register('email', { value: '' })}
            onChangeFocus={state => {
              changeFocusHandler('email', state);
            }}
            name="email"
          />
        </div>
        <div className={`field__dash ${dashed === 'email' && 'thick'}`} />
        <div className="field__error">
          {helperState.email && dirtyFields.email && errors.email && errors.email.message}
        </div>
      </section>
      <section className="field iconized__LR">
        <label className="field__label">Password</label>
        {/* true || false || true - mounted */}
        {/* true || true || true - focused */}
        {/* false || true || false -errors changed */}
        {/* false || false || false - errors blurred */}
        {/* true || false || false - changed no errors */}
        {!errors.password || !helperState.password || !dirtyFields.password ? (
          !errors.password && dirtyFields.password ? (
            <Icon
              width="wide"
              name="key"
              primaryOpacity="1"
              secondaryOpacity="1"
              primaryColor={IconColor.OK}
              secondaryColor={IconColor.OK}
            />
          ) : (
            <Icon
              width="wide"
              name="key"
              primaryOpacity="1"
              secondaryOpacity="1"
              primaryColor={IconColor.INITIAL}
              secondaryColor={IconColor.INITIAL}
            />
          )
        ) : null}

        {errors.password && helperState.password && (
          <Icon name="key" width="wide" primaryOpacity="0.5" secondaryOpacity="0.5" />
        )}
        {errors.password && helperState.password && (
          <Icon
            name="circle"
            size="max"
            width="wide"
            primaryColor={IconColor.ERROR}
            secondaryColor={IconColor.ERROR}
          />
        )}
        {errors.password && helperState.password && (
          <Icon
            name="exclamation"
            width="wide"
            primaryColor={IconColor.ERROR}
            secondaryColor={IconColor.ERROR}
          />
        )}

        {passwordShown ? (
          <Icon
            name="eye"
            onClick={togglePasswordVisibility}
            side="right"
            size="full"
            primaryColor={IconColor.INITIAL}
            secondaryColor={IconColor.INITIAL}
            primaryOpacity="1"
            secondaryOpacity="1"
          />
        ) : (
          <Icon
            name="eye-slash"
            onClick={togglePasswordVisibility}
            side="right"
            size="full"
            primaryColor={IconColor.INITIAL}
            secondaryColor={IconColor.INITIAL}
            primaryOpacity="0.5"
            secondaryOpacity="0.5"
          />
        )}

        <div className="field__input">
          <Input
            {...register('password', { value: '' })}
            type={passwordShown ? 'text' : 'password'}
            name="password"
            onChangeFocus={state => {
              changeFocusHandler('password', state);
            }}
          />
        </div>
        <div className={`field__dash ${dashed === 'password' && 'thick'}`} />
        <div className="field__error">
          {helperState.password &&
            dirtyFields.password &&
            errors.password &&
            // order of OR statement is important! other errors used for dynamic tips
            (errors.password?.types?.required || errors.password?.types?.min)}
        </div>
      </section>
      <div className="login__forgot">
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <a onClick={() => revealModal('passRecovery')}>
          <em>Forgot Password?</em>
        </a>
      </div>
      <div className="auth__checkbox">
        <Checkbox>Remember Me</Checkbox>
      </div>
      <div className="login__submit">
        <Button type="submit" variant="ok">
          Login
        </Button>
      </div>
    </form>
  );
};
