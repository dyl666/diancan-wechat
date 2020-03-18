//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    let store = {
      store_id: 1,
      name: '上党王婆大虾',
      address: '长治市上党区xx路',
      addressInfo: '长治市上党区xx路xx号xx',
      store_cover: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584074646138&di=3b36d7cea6762c9fb437fa35e0d0d277&imgtype=0&src=http%3A%2F%2Fimg.yzcdn.cn%2Fupload_files%2F2015%2F04%2F15%2FFosc4sP0wRWATUqrSRVoYi5Ogyt9.jpg'
    }
    wx.setStorageSync('store', store); // 保存店铺信息 
    // wx.removeStorageSync('foodsList');
    // wx.removeStorageSync('currentOrder'); // 清除下单信息

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})