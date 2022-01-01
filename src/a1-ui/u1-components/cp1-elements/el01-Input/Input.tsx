import React, { ChangeEvent, FocusEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent, forwardRef } from 'react'
import css from './Input.module.scss'

type TDefaultInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
/*type TDefaultLabelProps = DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>*/

type TInputTextProps = TDefaultInputProps & {
    onChangeText?: (value: string) => void
    onChangeFocus?: (value: boolean) => void
    onEnter?: () => void
    name?: string
    error?: string
    spanClassName?: string
    placeholder?: string
}


export const Input = forwardRef<HTMLInputElement, TInputTextProps>((
    {
        type = "text",
        onChange, onChangeFocus,
        onFocus, onBlur,
        onChangeText,
        onKeyPress, onEnter,
        name,
        error,
        className,
        placeholder,
        ...restProps
    }, ref
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        onChangeText && onChangeText(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);
        onEnter && e.key === 'Enter' && onEnter()
    }

    const onFocusCallback = (e: FocusEvent<HTMLInputElement>, state: boolean) => {
        onFocus && onFocus(e)
        onChangeFocus && onChangeFocus(state)
    }
    const onBlurCallback = (e: FocusEvent<HTMLInputElement>, state: boolean) => {
        onBlur && onBlur(e)
        onChangeFocus && onChangeFocus(state)
    }

    const finalInputClassName = `${css.input} ${error ? css.error : ''}`

    return <input
        ref={ref}
        placeholder={placeholder}
        type={type}
        name={name}
        onFocus={(e) => onFocusCallback(e, true)}
        onBlur={(e) => onBlurCallback(e, false)}
        onChange={onChangeCallback}
        onKeyPress={onKeyPressCallback}
        className={`${className} ${finalInputClassName} `}
        {...restProps}
    />
})
