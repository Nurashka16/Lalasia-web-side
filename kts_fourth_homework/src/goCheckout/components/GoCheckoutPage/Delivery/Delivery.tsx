import React, { useState } from 'react';
import style from './Delivery.module.css';
import Text from 'src/common/components/Text';
import Button from 'src/common/components/Button';
import DeliveryTabs, { DeliveryType } from './DeliveryTabs';
import PickupPointsList, { DeliveryPoint } from './PickupPointsList';
import paymentStore from 'src/goCheckout/stores/payment-store';

// Пример данных ПВЗ
import { pickupPoints } from 'src/utils/pickupPoints';

const Delivery: React.FC = () => {
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('delivery');
  const [selectedPointId, setSelectedPointId] = useState<number | null>(null);

  return (
    <section className={style.wrapper}>
      <Text tag="h2" weight="bold" color="primary" view="p-18">
        Выберите способ получения
      </Text>

      <DeliveryTabs
        selected={deliveryType}
        onChange={(type) => {
          setDeliveryType(type);
          if (type === 'delivery') {
            setSelectedPointId(null); // Очищаем при переключении на доставку
          }
        }}
      />

      {deliveryType === 'delivery' && (
        <div className={style.delivery_form}>
          {/* Здесь будет форма доставки */}
          <p>Введите адрес для доставки</p>
          {/* <DeliveryForm /> */}
        </div>
      )}

      {deliveryType === 'pickup' && (
        <PickupPointsList
          points={pickupPoints}
          selectedPointId={selectedPointId}
          onSelect={setSelectedPointId}
        />
      )}

      <Button
        disabled={!selectedPointId && deliveryType === 'pickup'}
        onClick={() => {
          if (deliveryType === 'pickup' && selectedPointId) {
            // paymentStore.setSelectedDeliveryPointId(selectedPointId);
            console.log(1)
          }
          // Логика продолжения заказа
        }}
      >
        Продолжить
      </Button>
    </section>
  );
};

export default Delivery;