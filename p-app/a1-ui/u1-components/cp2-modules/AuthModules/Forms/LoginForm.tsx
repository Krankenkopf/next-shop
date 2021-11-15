import React from "react"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { Input } from "../../../cp1-elements/el01-Input/Input";
import Button from "../../../cp1-elements/el02-Button/Button";
import { Checkbox } from "../../../cp1-elements/el03-Checkbox/Checkbox";

type LoginFormData = {
  email: string;
  password: string;
  iceCreamType: {label: string; value: string }
}

export const LoginForm = () => {
  //const { control, handleSubmit } = useForm<LoginFormData>();
  const { register, control, handleSubmit } = useForm<LoginFormData>({
    mode: "onBlur"
  });

  const onSubmit: SubmitHandler<LoginFormData> = data => {
    console.log(data)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
     {/*  <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <div className="field iconized__LR">
            <Input {...field} />
          </div>
        )}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <div className="field iconized__LR">
            <Input {...field} />
          </div>
        )}
      /> */}
      <div className="auth__checkbox">
        <Checkbox>Remember Me</Checkbox>
      </div>
      <div className="login__submit">
        <Button type={'submit'} variant={'ok'}>Login</Button>
      </div>
    </form>
  )
}