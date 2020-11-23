// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
login: function(u){
  console.log(u)
  //获取用户信息
  let info = u.detail.userInfo;
  let token = wx.getStorageSync('token')
  // console.log(token)
  wx.login({
    success (res) {
      if (res.code) {
        //发起网络请求
        wx.request({
          url: 'http://shop.2004.com/code?code=' + res.code,
          method: 'post',
          header:{'content-type':'application/json'},
          data: {
            u: info
          },
          success: function(res){
            console.log(res)
              //保存token
              wx.setStorageSync('toekn',res.data.data.token)
          }
        })
      } else {
        console.log('登录失败！' + res.errMsg)
      }
    }
  })

},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})