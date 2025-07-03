export type PickupPoint = {
  id: number;
  address: string;
  description?: string;
};

export const pickupPoints: PickupPoint[] = [
  { id: 1, address: 'Москва, ул. Пушкина, д. 1', description: 'м. Тверская' },
  { id: 2, address: 'Москва, ул. Ленина, д. 3', description: 'м. Китай-город' },
  { id: 3, address: 'Москва, ул. Арбат, д. 5', description: 'м. Арбатская' },
  // ...ещё 10-20 штук
];