import React, { useEffect, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Input } from "../../../cp1-elements/el01-Input/Input";
import Button from "../../../cp1-elements/el02-Button/Button";
import { Icon } from "../../../cp1-elements/el10-Icons/Icon";
import { TModal } from "../../Modal/Modals";
import { useDispatch } from "react-redux";
import { setIsSignupPassConfirmed, setSignupUserData, signup } from "../../../../../a2-bll/auth-reducer";
import { TSignupData } from "../../../../../a3-dal/krank/auth-api";
import { IconColor } from "../../../../../a0-common/c2-constants";

export type SignupFormData = {
    email: string
    password: string
    passConfirmed: string
}

type TSignupFormProps = {
    revealModal: (modalType: TModal) => void
}

const signupSchema = yup.object().shape({
    email: yup
        .string()
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Invalid email address')
        .required("Email is required"),
    password: yup
        .string()
        .required("Password is required")
        .min(8, `Password must be at least 8 symbols`),
    passConfirmed: yup
        .string()
        .notRequired()  
})

export const SignupForm = ({ revealModal}: TSignupFormProps) => {
    const dispatch = useDispatch()
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
          
    const [passwordShown, setPasswordShown] = useState(false)
    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown)
    }

    const onSubmit: SubmitHandler<SignupFormData> = data => {
        const signupData: TSignupData = {
            email: data.email,
            password: data.password,
        }
        const isPassConfirmed = data.password === data.passConfirmed //BUG not nullified when exit                                                                   // Order is important!
        dispatch(setIsSignupPassConfirmed(data.password === data.passConfirmed)) // 1
        dispatch(setSignupUserData(signupData))                                  // 2
        if (isPassConfirmed) {                                              // FIXME !!!
            dispatch(signup())
        }
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
                        ? <Icon name="envelope" primaryOpacity="1" secondaryOpacity="1" primaryColor={IconColor.OK} secondaryColor={IconColor.OK} />
                        : <Icon name="envelope" primaryOpacity="1" secondaryOpacity="1" primaryColor={IconColor.INITIAL} secondaryColor={IconColor.INITIAL}/>
                    : null}
                {errors.email && helperState.email && <Icon name="envelope" primaryOpacity="0.5" secondaryOpacity="0.5" />}
                {errors.email && helperState.email && <Icon name="circle" size="max" primaryColor={IconColor.ERROR} secondaryColor={IconColor.ERROR} />}
                {errors.email && helperState.email && <Icon name="exclamation" primaryColor={IconColor.ERROR} secondaryColor={IconColor.ERROR} />}
                {(!errors.email && dirtyFields.email) && <Icon name="check" side="right" size="max" primaryColor={IconColor.OK} secondaryColor={IconColor.OK}/>}
                <div className="field__input">
                    <Input {...register("email", {value: "@test.com"})}
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
                    ? (!errors.password && dirtyFields.password)
                        ? (errors.password || passOptionals)
                            ? <Icon name="key" primaryOpacity="1" secondaryOpacity="1" primaryColor={IconColor.OPTIONAL} secondaryColor={IconColor.OPTIONAL} />
                            : <Icon name="key" primaryOpacity="1" secondaryOpacity="1" primaryColor={IconColor.OK} secondaryColor={IconColor.OK} />
                        : <Icon name="key" primaryOpacity="1" secondaryOpacity="1" primaryColor={IconColor.INITIAL} secondaryColor={IconColor.INITIAL}/>
                    : (errors.password)
                        ? null
                        : <Icon name="key" primaryOpacity="1" secondaryOpacity="1" primaryColor={IconColor.OPTIONAL} secondaryColor={IconColor.OPTIONAL} />}
                
                
                {errors.password && helperState.password && <Icon name="key" primaryOpacity="0.5" secondaryOpacity="0.5" />}
                {errors.password && helperState.password && <Icon name="circle" size="max" primaryColor={IconColor.ERROR} secondaryColor={IconColor.ERROR} />}
                {errors.password && helperState.password && <Icon name="exclamation" primaryColor={IconColor.ERROR} secondaryColor={IconColor.ERROR} />}
                
                {passwordShown
                    ? <Icon name="eye" onClick={togglePasswordVisibility} side="right" size="full" primaryColor={IconColor.INITIAL} secondaryColor={IconColor.INITIAL} primaryOpacity="1" secondaryOpacity="1"/>
                    : <Icon name="eye-slash" onClick={togglePasswordVisibility} side="right" size="full" primaryColor={IconColor.INITIAL} secondaryColor={IconColor.INITIAL} primaryOpacity="0.5" secondaryOpacity="0.5"/>}
                
                <div className="field__input">
                    <Input {...register("password", { value: "test" })}
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
                        ? <Icon name="xmark" size="max" primaryColor={IconColor.ERROR} secondaryColor={IconColor.ERROR} />
                        : <Icon name="check" size="max" primaryColor={IconColor.OK} secondaryColor={IconColor.OK}/>}
                    Minimum 8 characters
                </li>
                <li>
                    {passOptionals || !dirtyFields.password
                        ? <Icon name="xmark" size="max" primaryColor={IconColor.OPTIONAL} secondaryColor={IconColor.OPTIONAL} />
                        : <Icon name="check" size="max" primaryColor={IconColor.OK} secondaryColor={IconColor.OK} />}
                    <em>Optional (if you want a really strong pass)</em>
                </li>
                <li>
                    {checkPassComplexity("number")
                        ? <Icon name="xmark" size="max" primaryColor={IconColor.OPTIONAL} secondaryColor={IconColor.OPTIONAL} />
                        : <Icon name="check" size="max" primaryColor={IconColor.OK} secondaryColor={IconColor.OK} />}
                    <em>At least one number</em>
                </li>
                <li>
                    {checkPassComplexity("uppercase")
                        ? <Icon name="xmark" size="max" primaryColor={IconColor.OPTIONAL} secondaryColor={IconColor.OPTIONAL} />
                        : <Icon name="check" size="max" primaryColor={IconColor.OK} secondaryColor={IconColor.OK} />}
                    <em>At least one uppercase</em>
                </li>
                <li>
                    {checkPassComplexity("lowercase")
                        ? <Icon name="xmark" size="max" primaryColor={IconColor.OPTIONAL} secondaryColor={IconColor.OPTIONAL} />
                        : <Icon name="check" size="max" primaryColor={IconColor.OK} secondaryColor={IconColor.OK} />}
                    <em>At least one lowercase</em>
                </li>
                <li>
                    {checkPassComplexity("special")
                        ? <Icon name="xmark" size="max" primaryColor={IconColor.OPTIONAL} secondaryColor={IconColor.OPTIONAL} />
                        : <Icon name="check" size="max" primaryColor={IconColor.OK} secondaryColor={IconColor.OK} />}
                    <em>{`Contains one of`}&nbsp;&nbsp;</em>
                    {`!"#$%&'()*+,-.:`}&nbsp;{`;<=>?@[]^_~{|}`}`/\
                    <em>&nbsp;{`symbols`}</em>
                </li>
            </ul>
            <section className="field iconized__LR">
                <label className="field__label">Confirm password</label>
                {(!passConfirmationMessage || !helperState.passConfirmed || !dirtyFields.passConfirmed)
                    ? (!passConfirmationMessage && dirtyFields.passConfirmed)
                        ? <Icon name="key" primaryOpacity="1" secondaryOpacity="1" primaryColor={IconColor.OK} secondaryColor={IconColor.OK} />
                        : <Icon name="key" primaryOpacity="1" secondaryOpacity="1" primaryColor={IconColor.INITIAL} secondaryColor={IconColor.INITIAL} />
                    : null}
                {passConfirmationMessage && helperState.passConfirmed && <Icon name="key" primaryOpacity="0.5" secondaryOpacity="0.5" />}
                {passConfirmationMessage && helperState.passConfirmed && <Icon name="circle" size="max" primaryColor={IconColor.ERROR} secondaryColor={IconColor.ERROR} />}
                {passConfirmationMessage && helperState.passConfirmed && <Icon name="exclamation" primaryColor={IconColor.ERROR} secondaryColor={IconColor.ERROR} />}
                {(!passConfirmationMessage && dirtyFields.passConfirmed) && <Icon name="check" side="right" size="max" primaryColor={IconColor.OK} secondaryColor={IconColor.OK} />}
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
                    <Button type={'submit'} variant={'ok'}>Sign up</Button>
            </div>
        </form>
    )
}
