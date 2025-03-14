import React from 'react';
import style from './Delivery.module.css'
import Text from 'src/common/components/Text';
import Input from 'src/common/components/Input/Input';
import GeoIcon from '../icons/GeoIcon';
import Button from 'src/common/components/Button';

const Delivery = () => {
  return (
    <div className={style.delivery}>
    <Text
      weight="bold"
      color="primary"
      view="p-18"
      className={style.delivery_title}
    >
      Where should the order be delivered?
    </Text>
    <div className={style.address}>
      <div className={style.address_input}>
        <Input
          afterSlot={
            <div className={style.address_icon}>
              <GeoIcon />
            </div>
          }
          value="Your address"
          onChange={() => console.log(1)}
        />
      </div>
      <Button>Come Here</Button>
    </div>
  </div>
  )
}

export default Delivery