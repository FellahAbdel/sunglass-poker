// TableItem.js ou TableItem.jsx
import React from 'react';
import Button from '../../../button/Button.tsx';
import locked from '../../../assets/images/icons/white/password.png';
import unlocked from '../../../assets/images/icons/white/unlock.png';

const ListTableItem = ({ nom, rang, nombreDeJoueurs, ouvert, onJoinClick }) => {
  return (
    <div className="tableRow">
      <div className="rowItem">{nom}</div>
      <div className="rowItem">{rang}</div>
      <div className="rowItem">{nombreDeJoueurs}</div>
      <div className="rowItem">
        {ouvert ? (
          <img src={unlocked} alt="Open" />
        ) : (
          <img src={locked} alt="Closed" />
        )}
      </div>
      <div className="rowItem">
        {nombreDeJoueurs < 10 ? (
          <Button
            label="Join"
            styleClass="btn-list_table btn-list_table_join"
            onClick={onJoinClick}
          />
        ) : (
          <Button
            label="Full"
            styleClass="btn-list_table btn-list_table_full"
            disabled
          />
        )}
      </div>
    </div>
  );
};

export default ListTableItem;
