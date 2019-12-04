var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'未登录',
    nickName:'未授权',
    avatarUrl:'',
    wx_id:0,
    iconArray: [
      {
        "iconUrl": 'https://www.hattonstar.com/gfcamp/info.png',
        "iconText": '个人信息',
        "id":1
      },
      {
        "iconUrl": '../../images/myaddress.png',
        "iconText": '收货地址',
        "id": 2
      },
    ],

    tradeArray: [
      {
        "iconUrl": '../../images/qbdd.png',
        "iconText": '全部订单',
        "id": 10
      },
      {
        "iconUrl": '../../images/dfk.png',
        "iconText": '待付款',
        "id": 11
      },
      {
        "iconUrl": '../../images/dfh.png',
        "iconText": '待发货',
        "id": 21
      },
      {
        "iconUrl": '../../images/dsh.png',
        "iconText": '待收货',
        "id": 31
      },
      {
        "iconUrl": '../../images/ywc.png',
        "iconText": '已完成',
        "id": 41
      }
    ]
  },

/*
      {
        "iconUrl": 'https://www.hattonstar.com/gfcamp/card.png',
        "iconText": '优惠卷',
        "id": 2
      },
      ,
      {
        "iconUrl": 'https://www.hattonstar.com/gfcamp/suggest.png',
        "iconText": '意见反馈',
        "id": 3
      }
*/
  /**
   * 生命周期函数--监听页面加载
   */

  listNew: function (id) {
    wx.navigateTo({
      url: '../list/list?type=' + id
    });
  },

  collect () {
    wx.request({
      url: 'https://www.hattonstar.com/getCollect',
      data: {
        wx_id: app.globalData.wx_id
      },
      method: 'POST',
      success: function (res) {
        if (res.data != 0) {
          wx.navigateTo({
            url: '../collect/collect?ids=' + res.data
          });
        } else {
          wx.showModal({
            title: '收藏夹为空',
            content: '收藏夹为空!',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
              }
            }
          });
          return;
        }
      },
      fail: function (res) {
        wx.showModal({
          title: '错误提示',
          content: '服务器无响应，请联系工作人员!',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
            }
          }
        })
      }
    })
  },

  authorize: function () {
    if (app.globalData.authorizeFlag == false){
      wx.navigateTo({
        url: '../getuser/getuser'
      });
    }
  },

  onItemClick: function (e) {
    var index = e.currentTarget.id;
    var that = this;
    if (index == 1){
      wx.navigateTo({
        url: '../userinfo/userinfo'
      })
    } else if (index == 2){
      that.onAddress();
    } else if (index == 10) {
      this.listNew(0)
    } else if (index == 11) {
      this.listNew(1)
    } else if (index == 21) {
      this.listNew(2)
    } else if (index == 31) {
      this.listNew(3)
    } else if (index == 41) {
      this.listNew(4)
    }
  },

  onAddress: function () {
    wx.request({
      url: 'https://www.hattonstar.com/getAddressByLoginId',
      data: {
        login_id: app.globalData.wx_id
      },
      method: 'POST',
      success: function (res) {
        if (res.data == 0) {
          wx.navigateTo({
            url: '../newaddress/newaddress?detail_id=' + 0 + '&type=' + 100 + '&count=' + 0
          })
        } else {
          wx.navigateTo({
            url: '../editaddress/editaddress?id=' + res.data.id + '&detail_id=' + 0 + '&type=' + 100 + '&count=' + 0
          })
        }
      },
      fail: function (res) {
        wx.showModal({
          title: '错误提示',
          content: '服务器无响应，请联系工作人员!',
          success: function (res) {
            if (res.confirm) {
            } else if (res.cancel) {
            }
          }
        })
      }
    })
  },

  onLoad: function (options) {
    this.setData({ wx_id: app.globalData.wx_id})
    var wxUserInfo = wx.getStorageSync('wxUserInfo');
    if (wxUserInfo.nickName == undefined){
      app.globalData.authorizeFlag = false;
    }else{
      this.setData({
        nickName: wxUserInfo.nickName,
        avatarUrl: wxUserInfo.avatarUrl
      });
      app.globalData.authorizeFlag = true;
    }
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
    var wxUserInfo = wx.getStorageSync('wxUserInfo');
    if (wxUserInfo.nickName == undefined) {
      app.globalData.authorizeFlag = false;
    } else {
      this.setData({
        nickName: wxUserInfo.nickName,
        avatarUrl: wxUserInfo.avatarUrl
      });
      app.globalData.authorizeFlag = true;
    }
    this.initCert();
  },

  initCert: function () {
    var that = this;
    wx.request({
      url: 'https://www.hattonstar.com/getCertsNum',
      data: {
        wx_id: app.globalData.wx_id
      },
      method: 'POST',
      success: function (res) {
        var num = res.data;
        if (num) {
          var numString = num + ""
          wx.setTabBarBadge({
            index: 1,
            text: numString
          })
        } else {
          wx.removeTabBarBadge({
            index: 1,
          })
        }
      },
      fail: function (res) {
      }
    })
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