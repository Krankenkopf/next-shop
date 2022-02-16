/* eslint-disable @typescript-eslint/no-magic-numbers */
import React, { FC } from 'react';

import { Button } from '../button/Button'; // TODO: resolve external component dependency

import css from './Paginator.module.css';

type TPaginatorProps = {
  currentPage: number;
  itemsPerPage: number;
  itemsTotalCount: number;
  setCurrentPage: (page: number) => void;
};
export const Paginator: FC<TPaginatorProps> = ({
  currentPage,
  itemsPerPage,
  itemsTotalCount,
  setCurrentPage,
}) => {
  const pagesCount = Math.ceil(itemsTotalCount / itemsPerPage);
  const pagesVisibleSet = [];
  for (let i = 1; i <= pagesCount; i++) {
    if (pagesCount <= 7) {
      // in case of less or equal 7 pages
      pagesVisibleSet.push(i); // it's not necessary, but will be useful in future
    } else if (
      (i <= 6 && currentPage <= 3) || // while one of the first three pages is active
      i === pagesCount || // pagination will be: 1 2 3 4 5 6 last
      i === 1
    ) {
      pagesVisibleSet.push(i);
    } else if (
      (i > pagesCount - 6 && currentPage >= pagesCount - 3) || // while one of the last three pages is active
      i === pagesCount || //  pagination will be LIKE: 1 95 96 97 98 99 100
      i === 1
    ) {
      pagesVisibleSet.push(i);
    } else if (
      (i < currentPage + 3 && i > currentPage - 3) || // in other cases
      i === pagesCount || //  pagination will be LIKE: 1 5 6 7 8 9 last
      i === 1
    ) {
      pagesVisibleSet.push(i);
    }
  }
  const pages = pagesVisibleSet.map((p: number) =>
    currentPage === p ? (
      <Button key={p} variant="active" style={{ minWidth: '45px', fontSize: '13px' }}>
        <b>{p} </b>
      </Button>
    ) : (
      <Button
        key={p}
        variant="inactive"
        style={{ minWidth: '45px', fontSize: '13px' }}
        onClick={() => setCurrentPage(p)}
      >
        {p}{' '}
      </Button>
    ),
  );
  return (
    <div className={css.paginator__container}>
      <div className={css.paginator}>
        <Button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          variant="active"
          style={{ minWidth: '45px', fontSize: '13px' }}
        >
          <b>◄</b>
        </Button>
        {pages}
        <Button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === pagesCount || pagesCount === 0}
          variant="active"
          style={{ minWidth: '45px', fontSize: '13px' }}
        >
          <b>►</b>
        </Button>
      </div>
    </div>
  );
};
