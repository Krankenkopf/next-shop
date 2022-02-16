import React from 'react';

import { Input, Icon } from '../../elements';

type TSearchProps = {};

export const Search = () => (
  <div className="header-search">
    <div className="field iconized">
      <Input placeholder="Search products" onChangeText={() => {}} />
      <div className="input__dash" />
      <Icon name="magnifying-glass" size="full" />
    </div>
  </div>
);
