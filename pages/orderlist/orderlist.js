// pages/orderlist/orderlist.js
import {
  immediateList,
  orderList
} from '../../js/order.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 0,
    immediateList: immediateList,
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
    let orderid = e.currentTarget.dataset.orderid;
    let status = e.currentTarget.dataset.status;
    wx.navigateTo({
      url: '../orderinfo/orderinfo?orderid=' + orderid + '&status=' + status + '&pagefrom=orderlist',
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
      url: '../../list/list'
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