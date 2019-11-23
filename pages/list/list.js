var app = getApp()
Page({
  data: {
    activity: [],
    page_id:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page = this;
    var id = options.type;
    page.initData(id);
  },

  initData: function (id) {
    var page = this;
    var url = '';
    if (id == 1){
      url = 'https://www.hattonstar.com/getOrderAllForPerson'
    } else if (id == 2){
      url = 'https://www.hattonstar.com/getOrderUnPay'
    } else if (id == 3) {
      url = 'https://www.hattonstar.com/getOrderUnUse'
    } else if (id == 4) {
      url = 'https://www.hattonstar.com/getOrderUse'
    } 
    wx.request({
      url: url,
      data: {
        phone: app.globalData.phone
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
        var activity = [];
        for (var index in res.data.data) {
          var object = new Object();
          object.count = res.data.data[index].count;
          if (res.data.data[index].count == 1){
            object.img = 'https://www.gfcamps.cn/images/' + res.data[index].detail[0].title_pic;
            object.name = res.data.data[index].detail[0].name;
            object.activity_id = res.data.data[index].detail[0].activity_id;
            object.wx_id = res.data.data[index].detail[0].wx_id;
            object.num = res.data.data[index].detail[0].num;
            object.charge = res.data.data[index].detail[0].charge;
          }else{
            var detail = [];
            for (var i in res.data[index].detail){
              var objectDetail = new Object();
              objectDetail.img = 'https://www.gfcamps.cn/images/' + res.data[index].detail[i].title_pic;
              objectDetail.activity_id = res.data[index].detail[i].activity_id;
              objectDetail.wx_id = res.data[index].detail[i].wx_id;
              objectDetail.num = res.data[index].detail[i].num;
              objectDetail.name = res.data[index].detail[i].name;
              objectDetail.charge = res.data[index].detail[i].charge;
              detail[i] = objectDetail;
            }
            object.detail = detail;
          }
          object.out_trade_no = res.data[index].out_trade_no;
          object.status = res.data[index].status;
          object.date = res.data[index].date;
          object.color = res.data[index].color;
          object.trade_id = res.data[index].trade_id;
          object.address = res.data[index].address;
          object.total_charge = res.data[index].charge;
          if (object.status == '待付款'){
            object.payhide = false;
            object.deletehide = false;
          }else{
            object.payhide = true;
            object.deletehide = true;
          }
          object.index = index;
          activity[index] = object;
        }
        page.setData({
          activity: activity,
          page_id:id
        });
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
  
  gotoDetail(e){
    var index = e.currentTarget.dataset.index;
    app.globalData.listdetail = this.data.activity[index];
    wx.navigateTo({
      url: '../listdetail/listdetail'
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  delete: function (e) {
    var id = e.currentTarget.dataset.id;
    var page = this
    wx.showModal({
      title: '关闭订单',
      content: '确认关闭订单吗?',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'https://www.gfcamps.cn/hideOrder',
            data: {
              id: id
            },
            method: 'POST',
            success: function (res) {
              wx.showToast({
                title: '关闭成功',
                icon: 'success',
                duration: 3000,
                success: function () {
                  setTimeout(function () {
                    //要延时执行的代码
                    wx.redirectTo({
                      url: '../list/list?type=' + page.data.page_id
                    })
                  }, 2000)
                }
              });
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
        }
      }
    })
  },

  pay: function (e) {
    var id = e.currentTarget.dataset.id;
    var page = this
    wx.showModal({
      title: '支付订单',
      content: '确认支付订单吗?',
      success: function (res) {
        if (res.confirm) {
          wx.login({
            success: res => {
              var code = res.code;
              if (code) {
                wx.request({
                  url: 'https://www.gfcamps.cn/onRePay',
                  data: {
                    js_code: code,
                    trade_id: id
                  },
                  method: 'POST',
                  success: function (res) {
                    wx.requestPayment(
                      {
                        'timeStamp': res.data.timeStamp,
                        'nonceStr': res.data.nonceStr,
                        'package': res.data.package,
                        'signType': 'MD5',
                        'paySign': res.data.paySign,
                        'success': function (res) {
                          wx.showToast({
                            title: '支付成功',
                            icon: 'success',
                            duration: 3000,
                            success: function () {
                              setTimeout(function () {
                                //要延时执行的代码
                                wx.redirectTo({
                                  url: '../list/list?type=3'
                                })
                              }, 2000)
                            }
                          });
                        },
                        'fail': function (res) {
                        },
                        'complete': function (res) {
                        }
                      })
                  },
                  fail: function (res) {
                  }
                })
              }
            }
          })
        }
      }
    })
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