import React, { ChangeEvent, InputHTMLAttributes, DetailedHTMLProps, PropsWithChildren } from 'react'
import css from './Radio.module.scss'

type TDefaultRadioProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type TRadioProps<T> = TDefaultRadioProps & {
    options?: Array<T>
    titles?: Array<string>
    onChangeOption?: (option: T) => void
}
export const Radio = <TValue extends string>(
    { type, name, titles, options, value, className, onChange, onChangeOption, children, ...restProps }: PropsWithChildren<TRadioProps<TValue>>) => {

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        onChangeOption && onChangeOption(e.currentTarget.value as TValue)
    }

    const mappedOptions = options
        ? options.map((option, i) => (
            <li key={option}>
                <input
                    id={option}
                    type={'radio'}
                    onChange={onChangeCallback}
                    value={option}
                    name={name}
                    checked={option === value}
                    className={css.radio__input}
                    {...restProps}
                />
                <label  htmlFor={option}>
                    <div className={css.radio}>
                        {children}
                    </div>
                    {titles ? titles[i] : option}
                </label>
            </li>
        )) : []

    return (
        <ul className={className ? `${css.radio__container} ${className}` : css.radio__container}>{mappedOptions}</ul>
    )
}