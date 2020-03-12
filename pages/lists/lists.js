// pages/lists/lists.js
import {
  listdata,
  cartList
} from '../../js/food.js'

import {
  floatAdd,
  floatSub,
  floatMul,
  addNum,
  decNum,
  mulNum
} from '../../utils/util.js'

// console.log(floatAdd(1.09, 2.02))
// console.log(floatSub(2.02, 1.09))
// console.log(floatMul(1.09, 2.02)) 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: 0, // 左菜单 当前选中的index
    lastActive: 0,
    toView: 'a0', // 右列表滚动
    listdata: listdata, // 菜单
    cartList: [], // 购物车数据
    carShow: false,
    heightArr: [],
    sumMoney: 0,
    windowHeight: wx.getSystemInfoSync().windowHeight,
  },

  /**
   * 左边导航点击
   */
  navTap(e) {
    var index = e.currentTarget.dataset.index
    this.setData({
      activeIndex: index,
      toView: 'a' + index,
      // scrollTop: 1186
    })
  },

  /**
   * 点击购物车
   */
  carTap() {
    if (this.data.sumMoney == 0 || this.data.cartList.length == 0) {
      wx.showToast({
        title: '请选择菜品',
        icon: 'none',
        duration: 2000,
      });
      return;
    }
    let carShow = !this.data.carShow;
    this.setData({
      carShow: carShow
    })
  },

  /**
   * 添加菜品购物车
   */

  addcarTap(e) {
    let indexParent = e.currentTarget.dataset.indexParent;
    let indexChild = e.currentTarget.dataset.indexChild;
    var obj = this.data.listdata[indexParent].foods[indexChild];
    let sumMoney = (Number(this.data.sumMoney) + Number(obj.price)).toFixed(2);
    var addItem = {
      "foodid": obj.foodid,
      "name": obj.name,
      "price": obj.price,
      "detail": obj.description,
      "number": 1,
      "sum": obj.price, // 此处添加是单个添加，直接放入单价即可
      "curNum": 1
    }
    var index = -1;

    this.data.cartList.forEach((item, i) => { // 判断购物车中是否已经有当前选择菜品
      if (item.foodid == obj.foodid) {
        index = i;
      }
    })

    let currentList = this.data.cartList;

    if (index != -1) {
      currentList[index].number = this.data.cartList[index].number + 1;
      currentList[index].sum = mulNum(addItem.price, currentList[index].number);
    } else {
      currentList.push(addItem);
    }

    let curNum = 'listdata[' + indexParent + '].foods[' + indexChild + '].curNum';
    obj.curNum++;
    this.setData({
      cartList: currentList,
      sumMoney: sumMoney,
      [curNum]: obj.curNum
    });

  },

  /**
   * 菜品增加
   */
  addNumber(e) {
    var index = e.currentTarget.dataset.index;
    var currentList = this.data.cartList;
    let sumMoney = addNum(this.data.sumMoney, currentList[index].price); // 购物车总价 
    let sum = addNum(currentList[index].sum, currentList[index].price); // 单条菜品的总价
    currentList[index].sum = sum;
    currentList[index].number++;
    this.setData({
      cartList: currentList,
      sumMoney: sumMoney,
    });
  },

  /**
   * 菜品减少
   */
  decNumber(e) {
    var index = e.currentTarget.dataset.index;
    var currentList = this.data.cartList;
    let sumMoney = decNum(this.data.sumMoney, currentList[index].price);
    let sum = decNum(currentList[index].sum, currentList[index].price);
    currentList[index].sum = sum;
    currentList[index].number == 1 ? currentList.splice(index, 1) : currentList[index].number--;
    this.setData({
      cartList: currentList,
      sumMoney: sumMoney,
      carShow: currentList.length == 0 ? false : true
    });

  },

  /**
   * 清空购物车
   */
  clearCarTap() {
    this.setData({
      cartList: [],
      sumMoney: 0,
      carShow: false
    })
  },

  /**
   * 去下单
   */
  orderinfoGo() {
    if (this.data.sumMoney == 0 || this.data.cartList.length == 0) {
      wx.showToast({
        title: '请选择菜品',
        icon: 'none',
        duration: 2000,
      });
      return;
    }
    wx.setStorageSync('cartList', this.data.cartList);
    wx.setStorageSync('sumMoney', this.data.sumMoney);
    wx.navigateTo({
      url: '../orderinfo/orderinfo',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getHeightArr();
  },

  /**
   * 获取右边列表子项高度，赋值数组
   */
  getHeightArr() {
    var _this = this;
    let heightArr = [];
    let h = 0;
    //创建节点选择器
    const query = wx.createSelectorQuery();
    //选择id
    query.selectAll('.itemr').boundingClientRect()
    query.exec(function(res) {
      //res就是 所有标签为contlist的元素的信息 的数组
      res[0].forEach((item) => {
        h += item.height;
        heightArr.push(h);
      })
      _this.setData({
        heightArr: heightArr
      })
    })
  },


  /**
   * 右边列表滚动 实现左边的联动
   */
  scroll(e) {
    const scrollTop = e.detail.scrollTop;
    const scorllArr = this.data.heightArr;
    const _this = this;
    if (scrollTop >= scorllArr[scorllArr.length - 1] - ((_this.data.windowHeight) / 2)) {
      return;
    } else {
      for (let i = 0; i < scorllArr.length; i++) {
        if (scrollTop >= 0 && scrollTop < scorllArr[0]) {
          if (0 != _this.data.lastActive) {
            _this.setData({
              activeIndex: 0,
              lastActive: 0,
            })
          }
        } else if (scrollTop >= scorllArr[i - 1] && scrollTop < scorllArr[i]) {
          if (i != _this.data.lastActive) {
            _this.setData({
              activeIndex: i,
              lastActive: i,
            })
          }

        }
      }
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})