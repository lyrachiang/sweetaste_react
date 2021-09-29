const prodList = {
  totalRows: 15,
  rows: [
    {
      id: 'P01',
      typeId: 'T01',
      name: '藍莓奶酪',
      price: 100,
      pic: 'imgs/prod/img_prod_9.jpg'
    },
    {
      id: 'P02',
      typeId: 'T01',
      name: '甜甜圈',
      price: 20,
      pic: 'imgs/prod/img_prod_6.jpg'
    },
    {
      id: 'P03',
      typeId: 'T01',
      name: '草莓派',
      price: 150,
      pic: 'imgs/prod/img_prod_10.jpg'
    },
    {
      id: 'P04',
      typeId: 'T01',
      name: '蘋果派',
      price: 150,
      pic: 'imgs/prod/img_prod_11.jpg'
    },
    {
      id: 'P05',
      typeId: 'T01',
      name: '紅莓蛋糕',
      price: 200,
      pic: 'imgs/prod/img_prod_7.jpg'
    },
    {
      id: 'P06',
      typeId: 'T01',
      name: '草莓奶酪',
      price: 50,
      pic: 'imgs/prod/img_prod_12.jpg'
    },
    {
      id: 'P07',
      typeId: 'T02',
      name: '馬卡龍',
      price: 90,
      pic: 'imgs/prod/img_prod_14.jpg'
    },
    {
      id: 'P08',
      typeId: 'T02',
      name: '甜甜圈',
      price: 30,
      pic: 'imgs/prod/img_prod_15.jpg'
    },
    {
      id: 'P09',
      typeId: 'T02',
      name: '鬆餅',
      price: 60,
      pic: 'imgs/prod/img_prod_16.jpg'
    },
    {
      id: 'P10',
      typeId: 'T02',
      name: '草莓杯子蛋糕',
      price: 40,
      pic: 'imgs/prod/img_prod_17.jpg'
    },
    {
      id: 'P11',
      typeId: 'T03',
      name: '馬卡龍',
      price: 90,
      pic: 'imgs/prod/img_prod_18.jpg'
    },
    {
      id: 'P12',
      typeId: 'T03',
      name: '野莓奶酪',
      price: 50,
      pic: 'imgs/prod/img_prod_19.jpg'
    },
    {
      id: 'P13',
      typeId: 'T03',
      name: '水果塔',
      price: 55,
      pic: 'imgs/prod/img_prod_20.jpg'
    },
    {
      id: 'P14',
      typeId: 'T03',
      name: '杯子蛋糕',
      price: 40,
      pic: 'imgs/prod/img_prod_21.jpg'
    },
    {
      id: 'P15',
      typeId: 'T03',
      name: '杯子蛋糕',
      price: 45,
      pic: 'imgs/prod/img_prod_22.jpg'
    }
  ]
};

const prodData = () => {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: prodList }), 500)
  );
};

export default prodData;