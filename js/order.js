export var immediateList = [{
    orderid: 1,
    name: '王婆大虾',
    time: '2020-03-08 14:00', // 列表按照时间排序
    address: '长治市上党区xx路',
    addressInfo: '长治市上党区xx路xx号xx',
    money: 200,
    status: 0, // 0订单未付款  1订单完成 
    store_cover: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584074646138&di=3b36d7cea6762c9fb437fa35e0d0d277&imgtype=0&src=http%3A%2F%2Fimg.yzcdn.cn%2Fupload_files%2F2015%2F04%2F15%2FFosc4sP0wRWATUqrSRVoYi5Ogyt9.jpg',
  },
  {
    orderid: 2,
    name: '老北京炸酱面',
    time: '2020-03-07 14:00',
    address: '长治市上党区xx路',
    addressInfo: '长治市上党区xx路xx号xx',
    money: 200,
    status: 0, // 0订单未付款  1订单完成 
    store_cover: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584074806199&di=a7e8b129b8e00671b31bc1545af9ed85&imgtype=0&src=http%3A%2F%2Fimg12.360buyimg.com%2Fn1%2Fjfs%2Ft18031%2F285%2F1403997604%2F28429%2F6c202ff4%2F5ac8a6a6N2907dd7c.jpg',
  },
  {
    orderid: 3,
    name: '好大鸡排',
    time: '2020-03-08 14:00',
    address: '长治市上党区xx路',
    addressInfo: '长治市上党区xx路xx号xx',
    money: 200,
    status: 1, // 0订单未付款  1订单完成 
    store_cover: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584074778386&di=652cf50d06f25e4bae8ad67a101b1da6&imgtype=0&src=http%3A%2F%2Fimgqn.koudaitong.com%2Fupload_files%2F2015%2F03%2F19%2FFgGuemyz9vGjlRqZmeql_cPR4XlC.jpg',
  },
  {
    orderid: 4,
    name: '王婆大虾',
    time: '2020-03-08 14:00',
    address: '长治市上党区xx路',
    addressInfo: '长治市上党区xx路xx号xx',
    money: 200,
    status: 1, // 0订单未付款  1订单完成 
    store_cover: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584074844251&di=55c5ace3c56ff35ac5a77d664c9c568f&imgtype=0&src=http%3A%2F%2Fimgqn.koudaitong.com%2Fupload_files%2F2015%2F04%2F29%2FFkQKlnkEXleBboCe9vgIx_pgYi8I.jpg',
  },
  {
    orderid: 5,
    name: '王婆大虾',
    time: '2020-03-08 14:00',
    address: '长治市上党区xx路',
    addressInfo: '长治市上党区xx路xx号xx',
    money: 200,
    status: 1, // 0订单未付款  1订单完成 
    store_cover: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2540516246,3972388758&fm=26&gp=0.jpg',
  },
  {
    orderid: 6,
    name: '麦向乐',
    time: '2020-03-08 14:00',
    address: '长治市上党区xx路',
    addressInfo: '长治市上党区xx路xx号xx',
    money: 200,
    status: 1, // 0订单未付款  1订单完成 
    store_cover: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584074986879&di=1e2e5d4095d79f26f48414b189db241c&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F4973c4a2f34afe5904c08fe18f072cb814dbf135d153-W0iUcz_fw658',
  },
  {
    orderid: 7,
    name: '吉祥混沌',
    time: '2020-03-08 14:00',
    address: '长治市上党区xx路',
    addressInfo: '长治市上党区xx路xx号xx',
    money: 200,
    status: 1, // 0订单未付款  1订单完成 
    store_cover: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2936952627,3356029602&fm=26&gp=0.jpg',
  },
]


export var orderList = [{
    orderid: 10,
    name: '吉祥混沌',
    time: '2020-03-08 14:00',
    person: 2,
    address: '长治市上党区xx路',
    status: 0, // 0等待到店铺  1订单完成 
    store_cover: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2936952627,3356029602&fm=26&gp=0.jpg',
  place: '大厅', // 0 随机 1 包间 2 大厅
  },
  {
    orderid: 11,
    name: 'xxx烧烤',
    time: '2020-03-08 14:00',
    person: 2,
    address: '长治市上党区xx路',
    status: 1, // 0等待到店铺  1订单完成 
    store_cover: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2540516246,3972388758&fm=26&gp=0.jpg',
    place: '包间', // 0 随机 1 包间 2 大厅
  },
]

export default {
  immediateList,
  orderList
}