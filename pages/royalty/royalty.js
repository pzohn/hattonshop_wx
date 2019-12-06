var app = getApp()
Page({
  data: {
    currentTab: 0,
    myroyalty:0,
    orderShopList: [],
    tradeShopList: []
  },

  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },

  onLoad: function () {
    var page = this;
    wx.request({
      url: 'https://www.hattonstar.com/getShareForPerson',
      data: {
        wx_id: app.globalData.wx_id
      },
      method: 'POST',
      success: function (res) {
        var orderShopList = [];
        var tradeShopList = [];
        for (var index in res.data.data) {
          var object = new Object();
          object.BillDate = res.data.data[index].time;
          object.BillNo = res.data.data[index].body;
          object.EmpFullName = res.data.data[index].nikename;
          object.TotalTaxAmount = res.data.data[index].charge;
          object.royalty = res.data.data[index].royalty;
          orderShopList[index] = object;
        }
        for (var i in res.data.dataTrade) {
          var object = new Object();
          object.BillDate = res.data.dataTrade[i].time;
          object.BillNo = res.data.dataTrade[i].body;
          object.EmpFullName = res.data.dataTrade[i].tradeid;
          object.TotalTaxAmount = res.data.dataTrade[i].charge;
          object.royalty = res.data.dataTrade[i].use_royalty;
          tradeShopList[i] = object;
        }
        page.setData({
          orderShopList: orderShopList,
          tradeShopList: tradeShopList,
          myroyalty: res.data.royalty
        });
      },
      fail: function (res) {
      }
    })
  }
})