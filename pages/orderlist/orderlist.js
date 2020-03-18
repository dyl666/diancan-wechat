// pages/orderlist/orderlist.js
import {
  orderList
} from '../../js/order.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 0,
    immediateList: [],
    orderList: orderList
  },

  /**
   * 删除订单
   */
  deleTap(e) {
    let index = e.currentTarget.dataset.index;
    if (this.data.tabIndex == 0) { //即时单
      let immediateList = this.data.immediateList;
      immediateList.splice(index, 1);
      this.setData({
        immediateList: immediateList
      })
      wx.setStorageSync('immediateList', immediateList); // 更新数据库
    } else { // 预约单
      let orderList = this.data.orderList;
      orderList.splice(index, 1);
      this.setData({
        orderList: orderList
      })
    }
  },

  /**
   * 付款 -- 参数 orderid
   */
  payTap(e) {
    let index = e.currentTarget.dataset.index;
    let order_id = e.currentTarget.dataset.orderId;  
    wx.navigateTo({
      url: '../orderinfo/orderinfo?index=' + Number(index) + '&order_id=' + order_id,
    })
  },


  changeTab: function(e) {
    var index = e.currentTarget.dataset.index
    this.setData({
      tabIndex: index,
    })
  },


  golist: function() {
    wx.navigateTo({
      url: '../car/car'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {


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
    this.setData({
      immediateList: wx.getStorageSync('immediateList')
    })
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