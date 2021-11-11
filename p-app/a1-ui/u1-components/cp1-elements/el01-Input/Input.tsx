import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent} from 'react'
import css from './Input.module.scss'


type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
/*type DefaultLabelPropsType = DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>*/

type SuperInputTextPropsType = DefaultInputPropsType  & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
    placeholder?: string
}

/*type SuperLabelPropsType = DefaultLabelPropsType & {
    alt?: string
    someCustomProp?: string
}*/


const Input: React.FC<SuperInputTextPropsType/* & SuperLabelPropsType*/> = (
    {
        type,
        onChange, onChangeText,
        onKeyPress, onEnter,
        error,
        className, spanClassName,
        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        onChangeText && onChangeText(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);
        onEnter && e.key === 'Enter' && onEnter()
    }

    const finalSpanClassName = `${css.error} ${spanClassName ? spanClassName : ''}`
    const finalInputClassName = `${css.input} ${error ? css.errorInput : ''}`

    return (
        <>
            <input
                placeholder={'Search products'}
                type={'text'}
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                className={`${className} ${finalInputClassName} `} 
                {...restProps}
            />
            {error && <div className={finalSpanClassName}>{error}</div>}
        </>
    )
}

export default Input
