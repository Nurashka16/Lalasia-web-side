export const getCalculateValues = (
    products: { count: number; price: number }[]
  ) => {
    return products.reduce(
      (accumulator, product) => {
        accumulator.totalCount += product.count; // Увеличиваем общее количество
        accumulator.totalSum += product.count * product.price; // Увеличиваем общую сумму
        return accumulator; // Возвращаем аккумулятор для следующей итерации
      },
      { totalCount: 0, totalSum: 0 } // Начальное значение аккумулятора
    );
  };
  