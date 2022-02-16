import React from 'react';

import css from './Ads.module.scss';

import Link from 'next/link';

type TUspProps = {};

export const Usp = () => (
  <section className="section-container">
    <ul className={css.unique_propositions}>
      <li>
        <Link href="/">
          <a>
            Free shipping over $40: Select Expedited, Standard Ship to Store or UPS Access
            Point™ at checkout.
          </a>
        </Link>
      </li>
      <li>
        <Link href="/">
          <a>Become a Loyalty Member. Join for Free!</a>
        </Link>
      </li>
      <li>
        <Link href="/">
          <a>Gift Card</a>
        </Link>
      </li>
    </ul>
  </section>
);
