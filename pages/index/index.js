//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    banners: ['/img/goods.jpg', '/img/car1.jpg', '/img/car2.jpg'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 5000,
    duration: 200,
    list: [],
    page:1,
    pagesize:5
  },
  
// onShareAppMessage: function () {
//   return {
//       title: '测试转发',
//       path: 'http://shop.2004.com/detail',
//       success: function (res) {
// 　　         console.log(res)
//       }
//   }
// },
  onReachBottom : function() {
    this.data.page++
    this.getGoodsList();
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
  getGoodsList: function()
{
  let _this = this;
  wx.request({
    url: 'http://shop.2004.com/xuan',
    data:{
      page:_this.data.page,   //分页 页号
      size:_this.data.pagesize
    },
    header:{'content-type': 'application/json'},
    success(res){
      let new_list = _this.data.list.concat(res.data.data.list)
      _this.setData({
        //list: res.data.data.list
        list: new_list
      })
    }
  })
},

onLoad: function () {
  
  // console.log(opt)
  // let that = this;
  // let pin;
  // let item = JSON.parse(opt.item);
  // console.log(item)
  // that.setData({
  //     item: item
  // })
  // let slider = item.slider.split(",");
  // let detail = item.detail.split(",");
  // if (opt.ping) {
  //     pin = true;
  // } else {
  //     pin = false;
  // }

  // that.setData({
  //     mess: item,
  //     pin: pin,
  
  //     debanners: slider,
  //     piclsit: detail
  // });
  this.getGoodsList();

},
  getUserInfo: function(e) {
    // console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  goodsDetail:function(e)
{
  //获取被点击的 商品id
  let goodsid = e.currentTarget.dataset.goodsid;
  //切换至 详情页
  wx.redirectTo({
    url: '/pages/detail/detail?goods_id='+goodsid
  });
}
})
