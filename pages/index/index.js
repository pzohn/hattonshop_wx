const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    navData: [
      {
        text: '首页'
      },
      {
        text: '蘑法食育'
      },
      {
        text: '探索课堂'
      },
      {
        text: '星创意'
      },
      {
        text: '田园营期'
      },
      {
        text: '亲子Culb'
      },
      {
        text: '未来营会'
      }
    ],
    currentTab: 0,
    navScrollLeft: 0,
    activity_1: [],
    activity_2: [],
    activity_3: [],
    activity_4: [],
    activity_5: [],
    activity_6: [],
    flag_1: true,
    flag_2: true,
    flag_3: true,
    flag_4: true,
    flag_5: true,
    flag_6: true,
    flag_7: true,
    name: '',
    imgUrls: [],
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //  滑动动画时长1s
    recommend: [],
    hotrec: []
  },

  onShow: function () {
    this.initCert();
  },

  //事件处理函数
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
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

    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          pixelRatio: res.pixelRatio,
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    })

    var loginCode = wx.getStorageSync('phone');
    var loginId = wx.getStorageSync('login_id');
    if (loginCode == "" || loginId == "") {
      app.globalData.loginFlag = false;
    } else {
      app.globalData.loginFlag = true;
      app.globalData.phone = loginCode;
      app.globalData.login_id = loginId;
    }
    var page = this;
    page.initData(1);
    page.initData(2);
    page.initData(3);
    page.initData(4);
    page.initData(5);
    page.initData(6);
    page.setData({
      flag_1: false
    });

    this.initData1();
  },

  initData1: function () {
    var page = this;
    wx.request({
      url: 'https://www.hattonstar.com/getIndexset',
      data: {
      },
      method: 'POST',
      success: function (res) {
        var imgUrls = [];
        for (var i in res.data.lunbo) {
          var object = new Object();
          object.url = 'https://www.hattonstar.com/storage/' + res.data.lunbo[i].title_pic;
          object.link = '../detail/detail?id=' + res.data.lunbo[i].id;
          imgUrls[i] = object;
        }
        var recommend = [];
        for (var i in res.data.good) {
          var object = new Object();
          object.url = 'https://www.hattonstar.com/storage/' + res.data.good[i].title_pic;
          object.title = res.data.good[i].name;
          object.price = res.data.good[i].price + '元';
          object.id = res.data.good[i].id;
          recommend[i] = object;
        }
        var hotrec = [];
        for (var i in res.data.week) {
          var object = new Object();
          object.url = 'https://www.hattonstar.com/storage/' + res.data.week[i].title_pic;
          object.title = res.data.week[i].name;
          object.price = res.data.week[i].price + '元';
          object.id = res.data.week[i].id;
          hotrec[i] = object;
        }
        page.setData({
          imgUrls: imgUrls,
          recommend: recommend,
          hotrec: hotrec
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

  initData: function (id) {
    var page = this;
    wx.request({
      url: 'https://www.hattonstar.com/shoppingGetByType',
      data: {
        type_id: id
      },
      method: 'POST',
      success: function (res) {
        if (res.data.code == 0){
          var activity = [];
          for (var index in res.data.data.shoppings) {
            var object = new Object();
            object.img = 'https://www.hattonstar.com/storage/' + res.data.data.shoppings[index].url;
            object.name = res.data.data.shoppings[index].name;
            object.id = res.data.data.shoppings[index].id;
            activity[index] = object;
          }
          if (id == 1) {
            page.setData({
              activity_1: activity
            });
          }
          else if (id == 2) {
            page.setData({
              activity_2: activity
            });
          }
          else if (id == 3) {
            page.setData({
              activity_3: activity
            });
          }
          else if (id == 4) {
            page.setData({
              activity_4: activity
            });
          }
          else if (id == 5) {
            page.setData({
              activity_5: activity
            });
          }
          else if (id == 6) {
            page.setData({
              activity_6: activity
            });
          }
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

  typeHandler: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/detail?id=' + id
    });
  },

  recommendGood: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '../detail/detail?id=' + id
    });
  },

  hotrecGood: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '../detail/detail?id=' + id
    });
  },

  switchNav(event) {
    var cur = event.currentTarget.dataset.current;
    //每个tab选项宽度占1/5
    var singleNavWidth = this.data.windowWidth / 5;
    //tab选项居中                            
    this.setData({
      navScrollLeft: (cur - 2) * singleNavWidth
    })
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },

  accountInput: function (e) {
    var content = e.detail.value;
    this.setData({ name: content });
  },

  resetSearch: function () {
    var name = this.data.name;
    if (this.data.name == '') {
      wx.showModal({
        title: '搜索条件为空',
        content: '请输入关键字!',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
          }
        }
      });
      return;
    }
    wx.navigateTo({
      url: '../search/search?name=' + name
    });
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

  switchTab(event) {
    var cur = event.detail.current;
    var singleNavWidth = this.data.windowWidth / 5;
    this.setData({
      currentTab: cur,
      navScrollLeft: (cur - 2) * singleNavWidth
    });

    var page = this;
    var id = cur + 1;
    if (id == 1) {
      page.setData({
        flag_1: false, flag_2: true, flag_3: true, flag_4: true, flag_5: true, currentTab: id - 1
      });
    }
    else if (id == 2) {
      page.setData({
        flag_1: true, flag_2: false, flag_3: true, flag_4: true, flag_5: true, currentTab: id - 1
      });
    }
    else if (id == 3) {
      page.setData({
        flag_1: true, flag_2: true, flag_3: false, flag_4: true, flag_5: true, currentTab: id - 1
      });
    }
    else if (id == 4) {
      page.setData({
        flag_1: true, flag_2: true, flag_3: true, flag_4: false, flag_5: true, currentTab: id - 1
      });
    }
    else if (id == 5) {
      page.setData({
        flag_1: true, flag_2: true, flag_3: true, flag_4: true, flag_5: false, currentTab: id - 1
      });
    }
  }
})