import React, { CSSProperties } from 'react';

import { UnderConstructionSign } from '../../elements';

const style: CSSProperties = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  top: '50px',
  left: '50px',
  bottom: '50px',
  right: '50px',
  zIndex: 20,
  padding: '50px 0',
  backgroundColor: '#ffccfc',
};

export const ErrorMessage = () => (
  <div style={style}>
    <p>Authorization failed!</p>
    <p>Try later</p>
    <p>lol kek</p>
    <UnderConstructionSign />
  </div>
);
