// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    current:0,
  },
//商品详情

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    let goods_id=options.goods_id;
    let access_token = wx.getStorageSync('token')
 //获取商品信息
 wx.request({
  url: 'http://shop.2004.com/detail',
  data: {
    goods_id:goods_id,
    access_token: access_token
  },
  header: {
    'content-type': 'application/json'
  },
  success: function(res){
    // console.log(res)
    _this.setData({
      data: res.data.data,
      imgs:res.data.imgs
      
    })
    // console.log(data)
  }
})
},
swipperChange:function(e)
{
  let current = e.detail.current;
  this.setData({
    current:e.detail.current
  })
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