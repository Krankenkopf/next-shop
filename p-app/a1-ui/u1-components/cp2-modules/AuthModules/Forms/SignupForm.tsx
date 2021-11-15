import React, { useCallback, useEffect, useState } from "react"
import { useForm, Controller, SubmitHandler, Resolver } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Input } from "../../../cp1-elements/el01-Input/Input";
import Button from "../../../cp1-elements/el02-Button/Button";
import { Icon } from "../../../cp1-elements/el10-Icons/Icon";
import { TModal } from "../../Modal/Modals";

export type SignupFormData = {
    email: string
    password: string
    passConfirmed: string
}

type TSignupFormProps = {
    revealModal: (modalType: TModal) => void
    freezeCurrent: () => void
}

const ok = "#00bb00"
const error = "#ff0000"
const initial = "#292825"
const optional = "#5555ff"


const signupSchema = yup.object().shape({
    email: yup
        .string()
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Invalid email address')
        .required("Email is required"),
    password: yup
        .string()
        .required("Password is required")
        .min(4, `Password must be at least 4 symbols`),
        //.matches(RegExp('(.*[a-z].*)'), 'lowercase')
        //.matches(RegExp('(.*[A-Z].*)'), 'uppercase')
        //.matches(RegExp('(.*\\d.*)'), 'number')
        //.matches(/[ !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/, 'special'),
    passConfirmed: yup
        .string()
        .notRequired()  
})

export const SignupForm = ({ revealModal, freezeCurrent }: TSignupFormProps) => {
    const { register, handleSubmit, getValues, formState: { errors, dirtyFields,  }, reset, clearErrors,  } = useForm<SignupFormData>({
        mode: "onChange", // important for dynamical tips
        resolver: yupResolver(signupSchema, {abortEarly: false}),
        criteriaMode: "all", // important for dynamical tips
    });
    const initialHelperState = {
        email: true,
        password: true,
        passConfirmed: true,
    }
    const [helperState, setHelperState] = useState(initialHelperState) // errors blocked in
    const [dashed, setDashed] = useState<keyof SignupFormData | null>(null)
    const [password, setPassword] = useState("")
    const [passConfirmed, setPassConfirmed] = useState("");
    const [passOptionals, setPassOptionals] = useState<Array<string> | null>(null)
    const [passConfirmationMessage, setPassConfirmationMessage] = useState("");
    
    const showPassConfirmationAlert = () => {
        freezeCurrent()
        revealModal("signupPassUnconfirmed")
    }
    
    
    const [passwordShown, setPasswordShown] = useState(false)
    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown)
    }

    const onSubmit: SubmitHandler<SignupFormData> = data => {
        console.log(data)
    }
    const changeFocusHandler = (name: keyof SignupFormData, focus: boolean) => {
        // for first field changing errors won't show
        !dirtyFields[name] && setHelperState((prev) => ({ ...prev, [name]: !focus }))
        // since field touched after first blur, all errors will calculated onChange and always show
        dirtyFields[name] && setHelperState(initialHelperState)
        // thick/thin ...might be color customized
        setDashed(focus ? name : null)
    }
    const checkPassComplexity = (condition: string) => {
        if (!errors.password && dirtyFields.password && passOptionals) {
            return passOptionals.some((c) => c === condition)
        }
        if (!passOptionals) {
            return false
        }
        return true
    }

    useEffect(() => {
        console.log(errors);
    }, [errors])

    useEffect(() => {
        const optionals: Array<string> = [];
        !/[a-z]/.test(password) && optionals.push("lowercase");
        !/[A-Z]/.test(password) && optionals.push("uppercase");
        !/[0-9]/.test(password) && optionals.push("number");
        !/[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/.test(password) && optionals.push("special");
        setPassOptionals(optionals.length > 0 ? optionals : null)
    }, [password])
    useEffect(() => {
        const password = getValues("password")
        if (password) {
            const passConfirmed = getValues("passConfirmed")
            if (passConfirmed) {
                setPassConfirmationMessage(password === passConfirmed ? "" : "You entered two different passwords")
            }
            if (!passConfirmed && dirtyFields.passConfirmed) {
                setPassConfirmationMessage("Password not confirmed")
            }
        }
    }, [password, passConfirmed])

    console.log(passOptionals);
    console.log(passConfirmationMessage && passConfirmationMessage);
    
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <section className="field iconized__LR">
                <label className="field__label">Email</label>
                {/* true || false || true - mounted */} 
                {/* true || true || true - focused */}
                {/* false || true || false -errors changed */}
                {/* false || false || false - errors blurred */}
                {/* true || false || false - changed no errors */}
                {(!errors.email || !helperState.email || !dirtyFields.email)
                    ? (!errors.email && dirtyFields.email)
                        ? <Icon name="envelope" primaryOpacity="1" secondaryOpacity="1" primaryColor={ok} secondaryColor={ok} />
                        : <Icon name="envelope" primaryOpacity="1" secondaryOpacity="1" primaryColor={initial} secondaryColor={initial}/>
                    : null}
                {errors.email && helperState.email && <Icon name="envelope" primaryOpacity="0.5" secondaryOpacity="0.5" />}
                {errors.email && helperState.email && <Icon name="circle" size="full" primaryColor={error} secondaryColor={error} />}
                {errors.email && helperState.email && <Icon name="exclamation" primaryColor={error} secondaryColor={error} />}
                {(!errors.email && dirtyFields.email) && <Icon name="check" side="right" size="full" primaryColor={ok} secondaryColor={ok}/>}
                <div className="field__input">
                    <Input {...register("email", {value: "aaa@ff."})}
                        onChangeFocus={(state) => { changeFocusHandler("email", state) }}
                        name="email"
                       />
                </div>
                <div className={`field__dash ${dashed === "email" && "thick"}`}></div>
                <div className="field__error">
                    {helperState.email
                        && dirtyFields.email
                        && errors.email
                        && errors.email.message}
                </div>
            </section>
            <section className="field iconized__LR">
                <label className="field__label">Password</label>
                {/* true || false || true - mounted */}
                {/* true || true || true - focused */}
                {/* false || true || false -errors changed */}
                {/* false || false || false - errors blurred */}
                {/* true || false || false - changed no errors */}
                {(!errors.password || !helperState.password || !dirtyFields.password)
                    ? (!(errors.password?.types?.required || errors.password?.types?.min) && dirtyFields.password)
                        ? (errors.password || passOptionals)
                            ? <Icon name="key" primaryOpacity="1" secondaryOpacity="1" primaryColor={optional} secondaryColor={optional} />
                            : <Icon name="key" primaryOpacity="1" secondaryOpacity="1" primaryColor={ok} secondaryColor={ok} />
                        : <Icon name="key" primaryOpacity="1" secondaryOpacity="1" primaryColor={initial} secondaryColor={initial}/>
                    : (errors.password?.types?.required || errors.password?.types?.min)
                        ? null
                        : <Icon name="key" primaryOpacity="1" secondaryOpacity="1" primaryColor={optional} secondaryColor={optional} />}
                
                
                {errors.password && helperState.password && <Icon name="key" primaryOpacity="0.5" secondaryOpacity="0.5" />}
                {errors.password && helperState.password && <Icon name="circle" size="full" primaryColor={error} secondaryColor={error} />}
                {errors.password && helperState.password && <Icon name="exclamation" primaryColor={error} secondaryColor={error} />}
                
                {passwordShown
                    ? <Icon name="eye" onClick={togglePasswordVisibility} side="right" size="full" primaryColor={initial} secondaryColor={initial} primaryOpacity="1" secondaryOpacity="1"/>
                    : <Icon name="eye-slash" onClick={togglePasswordVisibility} side="right" size="full" primaryColor={initial} secondaryColor={initial} primaryOpacity="0.5" secondaryOpacity="0.5"/>}
                
                <div className="field__input">
                    <Input {...register("password", { required: false })}
                        type={passwordShown ? "text" : "password"}
                        name="password"
                        onChangeText={(value) => setPassword(value)}
                        onChangeFocus={(state) => { changeFocusHandler("password", state) }} />
                </div>
                <div className={`field__dash ${dashed === "password" && "thick"}`}></div>
                <div className="field__error">
                    {helperState.password
                        && dirtyFields.password
                        && errors.password
                        // order of OR statement is important! other errors used for dynamic tips
                        && (errors.password?.types?.required || errors.password?.types?.min)}
                </div>
            </section>
            <ul className="password-tips">
                <li>
                    {errors.password || !dirtyFields.password
                        ? <Icon name="xmark" size="full" primaryColor={error} secondaryColor={error} />
                        : <Icon name="check" size="full" primaryColor={ok} secondaryColor={ok}/>}
                    Minimum 8 characters
                </li>
                <li>
                    {passOptionals || !dirtyFields.password
                        ? <Icon name="xmark" size="full" primaryColor={optional} secondaryColor={optional} />
                        : <Icon name="check" size="full" primaryColor={ok} secondaryColor={ok} />}
                    <em>Optional (if you want a really strong pass)</em>
                </li>
                <li>
                    {checkPassComplexity("number")
                        ? <Icon name="xmark" size="full" primaryColor={optional} secondaryColor={optional} />
                        : <Icon name="check" size="full" primaryColor={ok} secondaryColor={ok} />}
                    <em>At least one number</em>
                </li>
                <li>
                    {checkPassComplexity("uppercase")
                        ? <Icon name="xmark" size="full" primaryColor={optional} secondaryColor={optional} />
                        : <Icon name="check" size="full" primaryColor={ok} secondaryColor={ok} />}
                    <em>At least one uppercase</em>
                </li>
                <li>
                    {checkPassComplexity("lowercase")
                        ? <Icon name="xmark" size="full" primaryColor={optional} secondaryColor={optional} />
                        : <Icon name="check" size="full" primaryColor={ok} secondaryColor={ok} />}
                    <em>At least one lowercase</em>
                </li>
                <li>
                    {checkPassComplexity("special")
                        ? <Icon name="xmark" size="full" primaryColor={optional} secondaryColor={optional} />
                        : <Icon name="check" size="full" primaryColor={ok} secondaryColor={ok} />}
                    <em>{`Contains one of`}&nbsp;&nbsp;</em>
                    {`!"#$%&'()*+,-.:`}&nbsp;{`;<=>?@[]^_~{|}`}`/\
                    <em>&nbsp;{`symbols`}</em>
                </li>
            </ul>
            <section className="field iconized__LR">
                <label className="field__label">Confirm password</label>
                {(!passConfirmationMessage || !helperState.passConfirmed || !dirtyFields.passConfirmed)
                    ? (!passConfirmationMessage && dirtyFields.passConfirmed)
                        ? <Icon name="key" primaryOpacity="1" secondaryOpacity="1" primaryColor={ok} secondaryColor={ok} />
                        : <Icon name="key" primaryOpacity="1" secondaryOpacity="1" primaryColor={initial} secondaryColor={initial} />
                    : null}
                {passConfirmationMessage && helperState.passConfirmed && <Icon name="key" primaryOpacity="0.5" secondaryOpacity="0.5" />}
                {passConfirmationMessage && helperState.passConfirmed && <Icon name="circle" size="full" primaryColor={error} secondaryColor={error} />}
                {passConfirmationMessage && helperState.passConfirmed && <Icon name="exclamation" primaryColor={error} secondaryColor={error} />}
                {(!passConfirmationMessage && dirtyFields.passConfirmed) && <Icon name="check" side="right" size="full" primaryColor={ok} secondaryColor={ok} />}
                <div className="field__input">
                    <Input {...register("passConfirmed", { required: false })}
                        type="password"
                        name="passConfirmed"
                        onChangeText={(value) => setPassConfirmed(value)}
                        onChangeFocus={(state) => { changeFocusHandler("passConfirmed", state) }} />
                </div>
                <div className={`field__dash ${dashed === "passConfirmed" && "thick"}`}></div>
                <div className="field__error">
                    {helperState.passConfirmed
                        && dirtyFields.passConfirmed
                        && passConfirmationMessage
                        && passConfirmationMessage}
                </div>
            </section>
            <div className="signup__submit">
                {!passConfirmationMessage && dirtyFields.passConfirmed
                    ? <Button type={'submit'} variant={'ok'}>Sign up</Button>
                    : <Button onClick={showPassConfirmationAlert} variant={'active'}>Sign up</Button>}
            </div>
        </form>
    )
}
