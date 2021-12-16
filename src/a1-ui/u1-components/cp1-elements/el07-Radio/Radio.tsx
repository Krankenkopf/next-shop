import React, { ChangeEvent, InputHTMLAttributes, DetailedHTMLProps } from 'react'
import { TSortValue } from '../../../../a0-common/c1-types/t2-request'
import css from './Radio.module.scss'

type TDefaultRadioProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type TRadioProps<T> = TDefaultRadioProps & {
    options?: Array<T>
    titles?: Array<string>
    onChangeOption?: (option: T) => void
}
export const Radio: React.FC<TRadioProps<TSortValue>> = (
    { type, name, titles, options, value, onChange, onChangeOption, children, ...restProps }) => {

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        onChangeOption && onChangeOption(e.currentTarget.value as TSortValue)
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
        <ul className={css.radio__container}>{mappedOptions}</ul>
    )
}