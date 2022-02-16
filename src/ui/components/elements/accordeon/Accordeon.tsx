import React, { FC, ReactElement, useCallback, useState } from 'react';

import { Icon } from '../icons/Icon';

import css from './Accordeon.module.scss';

type TAccordeonProps = {
  toggle: ReactElement;
};

export const Accordeon: FC<TAccordeonProps> = ({ toggle, children }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const onToggleClick = useCallback(() => {
    setIsCollapsed(!isCollapsed);
  }, [isCollapsed]);
  return (
    <div className={css.accordeon}>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div className={`iconized right ${css.toggle}`} onClick={onToggleClick}>
        <Icon
          name="chevron-right"
          size="full"
          side="right"
          // eslint-disable-next-line @typescript-eslint/no-magic-numbers
          rotate={isCollapsed ? 2 : 4}
        />
        {toggle}
      </div>
      <ul className={isCollapsed ? css.collapsed : ''}>{children}</ul>
    </div>
  );
};
