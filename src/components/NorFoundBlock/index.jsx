import React from 'react';
import s from './NotFoundBlock.module.scss';

function NorFoundBlock() {
  return (
    <div className={s.root}>
      <h1>
        <span>🧐</span>
        <br />
        Нечего не найденно
      </h1>
      <h3 className={s.description}>К сожелени данная страница отсутствует</h3>
    </div>
    
  );
}

export default NorFoundBlock;
