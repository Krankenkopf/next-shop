import React from "react"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import Input from "../../../cp1-elements/el01-Input/Input";

type LoginFormData = {
  firstName: string;
  lastName: string;
  iceCreamType: {label: string; value: string }
}

export const LoginForm = () => {
  const { control, handleSubmit } = useForm<LoginFormData>();

  const onSubmit: SubmitHandler<LoginFormData> = data => {
    console.log(data)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="firstName"
        control={control}
        defaultValue=""
        render={({ field }) => <Input {...field} />}
      />
      <Controller
        name="iceCreamType"
        control={control}
        render={() => <select>
            <option value="chocolate" label="Chocolate"></option>
            <option value="strawberry" label="Strawberry"></option>
            <option value="vanilla" label="Vanilla"></option>
          </select> }
      />
      <input type="submit" />
    </form>
  )
}