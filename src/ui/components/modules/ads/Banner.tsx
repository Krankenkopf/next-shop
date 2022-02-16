import React, { FC } from 'react';

import { Icon } from '../../elements';

import css from './Ads.module.scss';

import Link from 'next/link';

type TBannerProps = {
  link?: string;
  title: string;
  red?: boolean;
};

export const Banner: FC<TBannerProps> = React.memo(
  ({ link = '/', title, red = false, children }) => (
    <section className="section-container">
      <Link href={link}>
        <a>
          <div className={`${css.banner} ${red ? css.red : ''}`}>
            <h3 className={css.banner__title}>{title}</h3>
            {children}
            <div className={css.icon}>
              <Icon name="circle" size="full" />
            </div>
          </div>
        </a>
      </Link>
    </section>
  ),
);
