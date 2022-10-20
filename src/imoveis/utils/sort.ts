export const SortBy = (data: any[], key: string, order: 1 | -1 = 1): any[] => {
  return data.sort(function (a, b) {
    if (a[key] > b[key]) {
      return order;
    }
    if (a[key] < b[key]) {
      return -order;
    }
    return 0;
  });
};
