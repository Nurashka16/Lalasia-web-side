type PaginationResult = {
  startPages: number[];
  endPages: number[];
};

const getPagination = (
  currentPage: number,
  totalPages: number,
  countViewPage: number
): PaginationResult => {
  if (totalPages <= 1) {
    return {
      startPages: [],
      endPages: [],
    };
  }
  if (totalPages <= countViewPage) {
    return {
      startPages: createRange(1, totalPages),
      endPages: [],
    };
  }

  if (totalPages - currentPage < countViewPage) {
    return {
      startPages: createRange(totalPages - countViewPage + 1, totalPages),
      endPages: [],
    };
  }
  if (totalPages > countViewPage) {
    return {
      startPages: createRange(currentPage, currentPage + 2),
      endPages: [totalPages],
    };
  }
  return {
    startPages: [],
    endPages: [],
  };
};

const createRange = (start: number, end: number) => {
  return [...Array(end - start + 1).keys()].map((index) => index + start);
};

export default getPagination;
