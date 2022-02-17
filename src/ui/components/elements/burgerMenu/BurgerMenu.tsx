import React, { FC, useState } from 'react';

import css from './BurgerMenu.module.scss';

type TBurgerMenuProps = {
  toggleMenu: (status: boolean) => void;
  menuStatus: boolean;
};

export const BurgerMenu: FC<TBurgerMenuProps> = ({ toggleMenu, menuStatus }) => {
  const [status, setStatus] = useState(false);
  const toggleActive = () => {
    setStatus(!status);
    toggleMenu(!status);
    // project modification
    setTimeout(() => {
      setStatus(false);
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    }, 700);
    //
  };
  // const burgerStyle = `${css.burger} ${status ? css.active : null}`
  // project modification
  const burgerStyle = `${css.burger} ${status ? css.freezed : null}`;

  return (
    <button
      type="button"
      className={burgerStyle}
      onClick={toggleActive}
      style={menuStatus ? { right: '28px' } : {}}>
      <div className={css.burgerInner} />
    </button>
  );
};
