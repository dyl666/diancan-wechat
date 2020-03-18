// pages/orderinfo.js
import {
  addNum,
  decNum,
  mulNum,
  formatTime
} from '../../utils/util.js'

import {
  foodsList,
} from '../../js/food.js'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodsListOld: foodsList, // 菜单
    cartList: [],
    orderData: {},
    store: {},
    texts: "至少5个字",
    min: 5, //最少字数
    max: 200, //最多字数 (根据自己需求改变)
    params: {},
    payGo: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    var currentOrder = {};
    if (options.pagefrom == 'car') {
      currentOrder = wx.getStorageSync('currentOrder') ? wx.getStorageSync('currentOrder') : {};
    } else {
      currentOrder = wx.getStorageSync('immediateList')[options.index];
    }
    this.setData({
      cartList: currentOrder.cartList,
      orderData: currentOrder.order,
      foodsList: wx.getStorageSync('foodsList'),
      store: wx.getStorageSync('store'),
      params: options
    })


  },


  /**
   * 去结算
   */
  payGo() {
    var that = this;
    let currentOrder = {
      cartList: this.data.cartList,
      order: this.data.orderData,
      store: this.data.store,
    }

    let immediateList = !wx.getStorageSync('immediateList') ? [] : wx.getStorageSync('immediateList');
    let immediateListStorage = wx.getStorageSync('immediateList');

    if ((wx.getStorageSync('immediateList').length > 0 && (this.data.params.order_id == this.data.orderData.order_id)) || immediateListStorage.length > 0 && (immediateListStorage[immediateListStorage.length - 1].order.order_status == 0)) { // 修改订单 
      immediateListStorage.forEach((item, index) => {
        if (item.order.order_id == this.data.orderData.order_id) {
          item.order = this.data.orderData;
          item.order.pay_time = formatTime(new Date);
          item.order.order_status = 1;
        }
      })
      wx.setStorageSync('immediateList', immediateListStorage);
    } else { // 增加订单 
      currentOrder.order.pay_time = formatTime(new Date);
      currentOrder.order.order_status = 1; // 支付成功后修改状态
      immediateList.push(currentOrder);
      wx.setStorageSync('immediateList', immediateList);
    }

    wx.removeStorageSync('currentOrder'); // 付款成功后移除当前订单缓存

    let foodsList = this.data.foodsListOld;
    wx.setStorageSync('foodsList', foodsList); // 付款成功后还原菜单缓存

    this.setData({
      'orderData.order_note': '',
      'orderData.sumMoney': 0,
      'orderData.order_id': -1,
      payGo: true, //  标识支付状态
    })
    wx.showToast({
      title: '支付成功',
    })
    setTimeout(function() {
      wx.navigateBack({
        delta: 1
      })
    }, 500)

  },

  /**
   * 加菜
   */
  addfoodTap() {
    wx.navigateTo({
      url: '../car/car',
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

    if (wx.getStorageSync('immediateList').length > 0 && (this.data.params.order_id == this.data.orderData.order_id)) { // 订单已存在缓存
      let immediateListStorage = wx.getStorageSync('immediateList');
      immediateListStorage.forEach((item, index) => {
        if (item.order.order_id == this.data.orderData.order_id) {
          item.cartList = this.data.cartList;
          item.order = this.data.orderData;
          item.store = this.data.store;
        }
      })
      wx.setStorageSync('immediateList', immediateListStorage);
      return;
    }


    if (!this.data.payGo) { // 订单没有支付 点击返回
      this.back();
    }

  },


  /**下单成功没有付款（付款失败） -- 修改订单状态 */
  back() {
    var that = this;
    let currentOrder = {
      cartList: this.data.cartList,
      order: this.data.orderData,
      store: this.data.store,
    }
    let immediateListStorage = !wx.getStorageSync('immediateList') ? [] : wx.getStorageSync('immediateList');
    if (immediateListStorage.length > 0 && (this.data.orderData.order_id == immediateListStorage[immediateListStorage.length - 1].order.order_id)) {
      immediateListStorage.splice(immediateListStorage.length - 1, 1);
    }
    currentOrder.order.pay_time = '';

    immediateListStorage.push(currentOrder);
    wx.setStorageSync('immediateList', immediateListStorage);
    wx.setStorageSync('currentOrder', currentOrder);
    let foodsList = this.data.foodsList;
    wx.setStorageSync('foodsList', foodsList);

  },

  cardGo() {
    wx.navigateTo({
      url: '../card/card',
    })
  },


  /**
   * 长按复制图书编码
   */
  copy: function(e) {
    var code = e.currentTarget.dataset.copy;
    wx.setClipboardData({
      data: code,
      success: function(res) {
        wx.showToast({
          title: '复制成功',
        });
      },
      fail: function(res) {
        wx.showToast({
          title: '复制失败',
        });
      }
    })
  },



  //字数限制  
  inputs: function(e) {
    // 获取输入框的内容
    var value = e.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length);

    //最少字数限制
    if (len <= this.data.min)
      this.setData({
        texts: "加油，够5个字可以得20积分哦"
      })
    else if (len > this.data.min)
      this.setData({
        texts: " "
      })

    //最多字数限制
    if (len > this.data.max) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    this.setData({
      currentWordNumber: len, //当前字数  
      'orderData.order_note': value
    });
  },

  /**
   * 菜品增加
   */
  addNumber(e) {
    var index = e.currentTarget.dataset.index;
    var currentList = this.data.cartList;

    // 实现菜单和购物车数量联动
    var curNum = '';
    this.data.foodsList.forEach((item1, i1) => {
      item1.foods.forEach((item2, i2) => {
        if (item2.foodid == currentList[index].foodid) {
          curNum = 'foodsList[' + i1 + '].foods[' + i2 + '].curNum';
        }
      })
    })
    let sumMoney = addNum(this.data.orderData.sumMoney, currentList[index].price); // 购物车总价 
    let sum = addNum(currentList[index].sum, currentList[index].price); // 单条菜品的总价
    currentList[index].sum = sum;
    currentList[index].number++;
    this.setData({
      cartList: currentList,
      'orderData.sumMoney': sumMoney,
      [curNum]: currentList[index].number
    });
  },

  /**
   * 菜品减少
   */
  decNumber(e) {
    var index = e.currentTarget.dataset.index;
    var currentList = this.data.cartList;

    // 实现菜单和购物车数量联动
    var curNum = '';
    this.data.foodsList.forEach((item1, i1) => {
      item1.foods.forEach((item2, i2) => {
        if (item2.foodid == currentList[index].foodid) {
          curNum = 'foodsList[' + i1 + '].foods[' + i2 + '].curNum';
        }
      })
    })

    let sumMoney = decNum(this.data.orderData.sumMoney, currentList[index].price);
    let sum = decNum(currentList[index].sum, currentList[index].price);
    currentList[index].sum = sum;

    if (currentList[index].number == 1) { // 临界值判断
      currentList.splice(index, 1);
      this.setData({
        cartList: currentList,
        'orderData.sumMoney': sumMoney,
        [curNum]: 0,
      });
    } else {
      currentList[index].number--;
      this.setData({
        cartList: currentList,
        'orderData.sumMoney': sumMoney,
        [curNum]: currentList[index].number
      });
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