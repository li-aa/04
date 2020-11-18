//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // motto: 'Hello World',
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
    'message':'message-string',
    'userData':[{id:"123",name:"123"},{id:"456",name:"456"}]
  },
  butlogin:function(e){
    wx.login({
      success (res) {
        // console.log(res);
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://shop.2004.com/code',
            data: {
              code: res.code
            },
            success:function(d)
            {
              //获取登录token
              // console.log(33333333)
              wx.setStorage({
                key:"token",
                data:d.data.data.token,
                
              })
            }
          });
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })  
  },
  loginInfo:function(e)
  {
    let s = wx.getStorage({
      key: 'token',
      success(res){
        console.log(wx.getStorageSync('token'))  
      }
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;//把this对象复制到临时变量that
    const wxreq = wx.request({
      url: 'http://shop.2004.com/xuan',
      data:{
        //id:"1",
        //name:'Leanne Graham'
      },
      success: function (res){
        // console.log(res.data);
        this.userData = res.data; //无效不能实时的渲染到页面
        that.setData({ userData: res.data });//和页面进行绑定可以动态的渲染到页面
    
      },
      fail: function (res){
        console.log(res.data);
        this.userData = "数据获取失败";
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
