import React from 'react'
import { IconColor } from '../../../../a0-common/c2-constants';
import { Icon } from '../el10-Icons/Icon';
import css from "./Preloader.module.scss"

type TPreloaderProps = {
    isVisible?: boolean
    background?: string
}

export const Preloader = ({ isVisible = true, background = "#c8c8c81a"}: TPreloaderProps) => {
    return <div style={{ visibility: isVisible ? "visible" : "hidden", backgroundColor: background }}
        className={css.preloader__container}>
        <div>
             <Icon name={'arrows-rotate'}
            containerClassName={isVisible ? css.preloader__icon__container : ""}
            primaryColor={IconColor.OK}
            secondaryColor={IconColor.INFO}
            primaryOpacity="0.5"
            secondaryOpacity="0.5" />
        </div>
    </div>
}