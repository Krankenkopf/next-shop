import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import Input from "../../cp1-elements/el01-Input/Input";
import Button from "../../cp1-elements/el02-Button/Button";
import { Checkbox } from "../../cp1-elements/el03-Checkbox/Checkbox";
import { TModal } from "../Modal/Modals";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

type TLoginProps = {
    revealModal: (modalType: TModal) => void
}

export const Login = (props: TLoginProps) => {
    return (
            <>
                <h2 className="title">SIGN UP</h2>
                <h3 className="title">Become a Member — you'll enjoy exclusive deals, offers, invites and rewards.</h3>
                <form className="auth__signin__form" autoComplete='off'>
                    <div className="auth__signin__fields">
                        <Input
                        />
                        <Input
                            type="password"
                        />
                        <div className="auth__forgot">
                            <p>Forgot Password</p>
                        </div>

                    </div>
                    <div className="auth__checkbox">
                        <Checkbox>Remember Me</Checkbox>
                    </div>
                    <div className="auth__button">
                            <Button type={'submit'} variant={'ok'}>Login</Button>
                        
                    </div>
                </form>
                <div className="auth__altBlock">
                <div>Don't have an account?</div>
                <a onClick={() => props.revealModal("signup")}>Sign Up</a>
                </div>
            </>
    )
}