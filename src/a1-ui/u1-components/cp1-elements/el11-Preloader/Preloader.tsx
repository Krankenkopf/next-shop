import React from 'react'
import { IconColor } from '../../../../a0-common/c1-types/t1-instance';
import { Icon } from '../el10-Icons/Icon';
import css from "./Preloader.module.scss"

type TPreloaderProps = {
    isVisible?: boolean
}

export const Preloader = ({isVisible = true}: TPreloaderProps) => {
    return <div style={{visibility: isVisible ? "visible" : "hidden"}} className={css.preloader__container}>
        <div>
             <Icon name={'arrows-rotate'}
            containerClassName={css.preloader__icon__container}
            primaryColor={IconColor.OK}
            secondaryColor={IconColor.INFO}
            primaryOpacity="0.5"
            secondaryOpacity="0.5" />
        </div>
    </div>
}