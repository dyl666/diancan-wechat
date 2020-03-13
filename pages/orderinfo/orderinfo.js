// pages/orderinfo.js
import {
  addNum,
  decNum,
  mulNum
} from '../../utils/util.js'

import {
  foodsList,
} from '../../js/food.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    sumMoney: 0,
    cutMonney: 0,
    texts: "至少5个字",
    min: 5, //最少字数
    max: 200, //最多字数 (根据自己需求改变)
    params: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      cartList: wx.getStorageSync('cartList'),
      sumMoney: wx.getStorageSync('sumMoney'),
      foodsList: wx.getStorageSync('foodsList'),
      params: options
    })

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

    let sumMoney = addNum(this.data.sumMoney, currentList[index].price); // 购物车总价 
    let sum = addNum(currentList[index].sum, currentList[index].price); // 单条菜品的总价
    currentList[index].sum = sum;
    currentList[index].number++;
    this.setData({
      cartList: currentList,
      sumMoney: sumMoney,
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

    let sumMoney = decNum(this.data.sumMoney, currentList[index].price);
    let sum = decNum(currentList[index].sum, currentList[index].price);
    currentList[index].sum = sum;

    if (currentList[index].number == 1) { // 临界值判断
      currentList.splice(index, 1);
      this.setData({
        cartList: currentList,
        sumMoney: sumMoney,
        [curNum]: 0,
      });
    } else {
      currentList[index].number--;
      this.setData({
        cartList: currentList,
        sumMoney: sumMoney,
        [curNum]: currentList[index].number
      });
    }

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
      currentWordNumber: len //当前字数  
    });
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
    let cartList = this.data.cartList;
    let sumMoney = this.data.sumMoney;
    let foodsList = this.data.foodsList;
    wx.setStorageSync('cartList', cartList);
    wx.setStorageSync('sumMoney', sumMoney);
    wx.setStorageSync('foodsList', foodsList);
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