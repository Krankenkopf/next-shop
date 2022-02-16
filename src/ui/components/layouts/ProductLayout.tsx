import React, { FC, useCallback, useEffect, useState } from 'react';

import { TCategory } from '../../../common/types/instance';
import { Sidebar } from '../modules/sidebar/Sidebar';

import { useRouter } from 'next/dist/client/router';

type TProductLayoutProps = {
  category?: TCategory;
  rootCategoryName?: string;
};

export const ProductLayout: FC<TProductLayoutProps> = ({
  children,
  category,
  rootCategoryName,
}) => {
  const router = useRouter();
  return (
    <div className="wrapper__products">
      <Sidebar rootCategoryName={rootCategoryName} category={category} />
      {children}
    </div>
  );
};
