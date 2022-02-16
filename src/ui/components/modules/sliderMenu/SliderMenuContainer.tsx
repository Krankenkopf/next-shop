import React, { FC } from 'react';

import css from './SliderMenu.module.scss';

type TSliderMenuContainerProps = {
  className?: string;
};

export const SliderMenuContainer: FC<TSliderMenuContainerProps> = ({
  className,
  children,
}) => {
  const mergedClassName = className
    ? `${css.sliderMenuContainer} ${className}`
    : css.sliderMenuContainer;
  return <div className={mergedClassName}>{children}</div>;
};
