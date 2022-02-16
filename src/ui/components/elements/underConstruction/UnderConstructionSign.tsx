import React from 'react';

import img from '../../../../../public/images/underconstruction/underconstruction-sign.png';

import css from './UnderConstruction.module.scss';

import Image from 'next/image';

export const UnderConstructionSign = () => (
  <figure className={css.sign}>
    <Image src={img} alt="page under construction" />
  </figure>
);
