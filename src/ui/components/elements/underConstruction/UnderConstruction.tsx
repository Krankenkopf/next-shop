/* eslint-disable @typescript-eslint/no-magic-numbers */
import React, { useCallback } from 'react';

import img from '../../../../../public/images/underconstruction/underconstruction.png';
import { useWindowSize } from '../../../../common/hooks';

import css from './UnderConstruction.module.scss';

import Image from 'next/image';

export const UnderConstruction = React.memo(() => {
  const windowSize = useWindowSize();
  const getStrokes = useCallback(() => {
    const quantity =
      windowSize.width > 767.98
        ? +(windowSize.width / 50).toFixed(0)
        : +(windowSize.width / 35).toFixed(0);
    const arr = [];
    for (let i = 0; i < quantity; i++) {
      arr.push(<li key={i} />);
    }
    return arr;
  }, [windowSize]);
  if (typeof window !== 'object') {
    return null;
  }
  return (
    <div className={css.underconstruction}>
      <header>
        <div className={css.line}>
          <ul>{getStrokes()}</ul>
        </div>
        <h2>
          <strong>UNDER CONSTRUCTION</strong>
        </h2>
      </header>
      <figure>
        <Image src={img} alt="page under construction" />
      </figure>
      <footer>
        <div className={css.line}>
          <ul>{getStrokes()}</ul>
        </div>
      </footer>
    </div>
  );
});
