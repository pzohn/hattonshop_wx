
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hide:true
  },
  onLoad: function () {
    var that = this;
    var wxUserInfo = wx.getStorageSync('wxUserInfo');
    if (wxUserInfo == "") {
      that.setData({ hide: false})
    } else {
      that.setData({
        nickName: wxUserInfo.nickName,
        avatarUrl: wxUserInfo.avatarUrl
      });
      wx.switchTab({
        url: '../index/index'
      })
    }
  },

  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var wxUserInfo = new Object();
      wxUserInfo.nickName = e.detail.userInfo.nickName;
      wxUserInfo.avatarUrl = e.detail.userInfo.avatarUrl;
      wx.setStorageSync('wxUserInfo', wxUserInfo);
      //授权成功后，跳转进入小程序首页
      wx.switchTab({
        url: '../index/index'
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  }
})