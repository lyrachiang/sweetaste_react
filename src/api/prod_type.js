const prodType = {
  totalRows: 3,
  rows: [
    {
      id: 'T01',
      name: '本日精選',
      enName: 'daily',
      total: 6,
    },
    {
      id: 'T02',
      name: '人氣推薦',
      enName: 'recommend',
      total: 4,
    },
    {
      id: 'T03',
      name: '新品上市',
      enName: 'new',
      total: 5,
    }
  ]
};

const prodTypeData = () => {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: prodType }), 500)
  );
};

export default prodTypeData;