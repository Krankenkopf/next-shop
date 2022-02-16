import React, { FC } from 'react';

import { Button } from '../../elements';

import css from './Ads.module.scss';

import Image from 'next/image';
import Link from 'next/link';

type TCampaignProps = {
  link?: string;
  preTitle?: string;
  title: string;
  text: string;
  buttonTitle?: string;
  // eslint-disable-next-line no-undef
  img: StaticImageData;
  imgAltText: string;
};

export const Campaign: FC<TCampaignProps> = React.memo(
  ({ link = '/', preTitle, title, text, buttonTitle = 'SHOP NOW!', img, imgAltText }) => (
    <section className={css.campaign}>
      <Link href={link}>
        <a>
          <div className={css.imgBlankcover} />
          <figure>
            <Image src={img} alt="campaign01" width={1170} height={780} />
          </figure>
          <div className={css.imgFog} />
          <figcaption className={css.campaign__block}>
            {preTitle && <h4>{preTitle}</h4>}
            <h2>{title}</h2>
            <p>{text}</p>
            <Button>{buttonTitle}</Button>
          </figcaption>
        </a>
      </Link>
    </section>
  ),
);
