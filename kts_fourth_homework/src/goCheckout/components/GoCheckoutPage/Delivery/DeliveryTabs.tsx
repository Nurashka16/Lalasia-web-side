import React, { useState } from 'react';
import classNames from 'classnames';
import style from './Delivery.module.css';

export type DeliveryType = 'delivery' | 'pickup';

interface DeliveryTabsProps {
  selected?: DeliveryType;
  onChange?: (type: DeliveryType) => void;
}

const DeliveryTabs: React.FC<DeliveryTabsProps> = ({ selected, onChange }) => {
  const [localType, setLocalType] = useState<DeliveryType>(selected || 'delivery');

  const handleTabClick = (type: DeliveryType) => {
    if (onChange) {
      onChange(type);
    }
    setLocalType(type);
  };

  const activeType = onChange ? selected : localType;

  return (
    <div className={style.tabs}>
              <button
        className={classNames(style.tab, {
          [style.active]: activeType === 'pickup',
        })}
        onClick={() => handleTabClick('pickup')}
      >
        Самовывоз
      </button>
      <button
        className={classNames(style.tab, {
          [style.active]: activeType === 'delivery',
        })}
        onClick={() => handleTabClick('delivery')}
      >
        Доставка
      </button>
    </div>
  );
};

export default DeliveryTabs;