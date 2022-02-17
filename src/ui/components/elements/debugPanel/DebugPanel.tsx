/* eslint-disable @typescript-eslint/no-magic-numbers */
import React, { FC, useState } from 'react';

import { Icon } from '../icons/Icon';

import css from './DebugPanel.module.scss';

type TDebugPanelProps = {
  keys: Array<string | number>;
  values: Array<any>;
};

export const DebugPanel: FC<TDebugPanelProps> = ({ keys, values }) => {
  const [isRevealed, setIsRevealed] = useState(true);
  const mappedCells = keys.map((key, i) => (
    <div key={key} className={css.cell}>
      <div>{key}</div>
      <div>:&nbsp;{values[i] ? values[i].toString() : 'null'}</div>
    </div>
  ));
  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div className={css.button} onClick={() => setIsRevealed(!isRevealed)}>
        {/* <Icon
          name="chevron-right"
          rotate={isRevealed ? 4 : 2}
          primaryColor={isRevealed ? '#ff0' : '#292825'}
          secondaryColor={isRevealed ? '#ff0' : '#292825'}
        /> */}
      </div>
      {isRevealed && (
        <div className={css.panel}>
          <h4>DEBUG PANEL</h4>
          {mappedCells}
        </div>
      )}
    </>
  );
};
