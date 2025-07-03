import React from 'react';
import style from './Delivery.module.css';

export type DeliveryPoint = {
  id: number;
  address: string;
  description?: string;
};

interface PickupPointsListProps {
  points: DeliveryPoint[];
  selectedPointId: number | null;
  onSelect: (id: number | null) => void;
}

const PickupPointsList: React.FC<PickupPointsListProps> = ({
  points,
  selectedPointId,
  onSelect,
}) => {
  return (
    <div className={style.pickup_list}>
      {points.map((point) => (
        <label key={point.id} className={style.pickup_item}>
          <input
            type="radio"
            name="pickup-point"
            checked={selectedPointId === point.id}
            onChange={() => onSelect(point.id)}
          />
          <div className={style.pickup_content}>
            <strong>{point.address}</strong>
            {point.description && <small>{point.description}</small>}
          </div>
        </label>
      ))}
    </div>
  );
};

export default PickupPointsList;