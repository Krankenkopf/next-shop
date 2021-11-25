import React, { FC, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Input } from "../../../cp1-elements/el01-Input/Input";
import Button from "../../../cp1-elements/el02-Button/Button";
import { Icon } from "../../../cp1-elements/el10-Icons/Icon";
import { TModal } from "../../Modal/Modals";
import { useDispatch } from "react-redux";
import { login, setLoginUserData } from "../../../../../a2-bll/auth-reducer";
import { TLoginData } from "../../../../../a3-dal/krank/auth-api";

export type EmailFormData = {
    email: string
}

type TPassRecoveryFormProps = {
    revealModal: (modalType: TModal) => void
    closeModal: (modalType: TModal) => void
}

const ok = "#00bb00"
const error = "#ff0000"
const initial = "#292825"


const passRecoverySchema = yup.object().shape({
    email: yup
        .string()
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Invalid email address')
        .required("Email is required"),
})

export const PassRecoveryForm: FC<TPassRecoveryFormProps> = ({revealModal, closeModal}) => {
    const dispatch = useDispatch()
    
    const {
        register, handleSubmit, getValues,
        formState: { errors, dirtyFields, },
        reset, clearErrors,
    } = useForm<EmailFormData>({
        mode: "onChange", // important for dynamical tips
        resolver: yupResolver(passRecoverySchema, { abortEarly: false }),
        criteriaMode: "all", // important for dynamical tips
    });
    const initialHelperState = {
        email: true,
    }
    const [helperState, setHelperState] = useState(initialHelperState) // errors blocked in
    const [dashed, setDashed] = useState<keyof EmailFormData | null>(null)

    const onSubmit: SubmitHandler<EmailFormData> = data => {
        console.log(data)
    }
    const changeFocusHandler = (name: keyof EmailFormData, focus: boolean) => {
        // for first field changing errors won't show
        !dirtyFields[name] && setHelperState((prev) => ({ ...prev, [name]: !focus }))
        // since field touched after first blur, all errors will calculated onChange and always show
        dirtyFields[name] && setHelperState(initialHelperState)
        // thick/thin ...might be color customized
        setDashed(focus ? name : null)
    }
    const returnToLogin = () => {
        closeModal("passRecovery")
    }
    const proceedSignup = () => {
        closeModal("passRecovery")
        //dispatch(send())
    }
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
                        : <Icon name="envelope" primaryOpacity="1" secondaryOpacity="1" primaryColor={initial} secondaryColor={initial} />
                    : null}
                {errors.email && helperState.email && <Icon name="envelope" primaryOpacity="0.5" secondaryOpacity="0.5" />}
                {errors.email && helperState.email && <Icon name="circle" size="full" primaryColor={error} secondaryColor={error} />}
                {errors.email && helperState.email && <Icon name="exclamation" primaryColor={error} secondaryColor={error} />}
                {(!errors.email && dirtyFields.email) && <Icon name="check" side="right" size="full" primaryColor={ok} secondaryColor={ok} />}
                <div className="field__input">
                    <Input {...register("email", { value: "test@test.com" })}
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
            <div className="info__signup">
                <div className="info__signup__container">
                    <Button onClick={returnToLogin}
                        variant={'ok__alt'}>
                        Back to Sign in
                    </Button>
                </div>
                <div className="info__signup__container">
                    <Button onClick={proceedSignup}
                        variant={'ok'}>
                        Send
                    </Button>
                </div>
            </div>
        </form>
    )
}