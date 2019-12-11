Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndexNav: 0,
    navList: [], // 导航
    swiperList: [], // 轮播图
    videosList: [], // 视频列表
  },

  // 点击首页导航按钮
  activeNav(e) {
    this.setData({
      currentIndexNav: e.target.dataset.index
    })
  },
  // 首页导航
  getNavList() {
    let that = this
    wx.request({
      url: "https://www.easy-mock.com/mock/5cf25f327bfa3e44efc47d0f/bili/navList",
      success(res) {
        // console.log(res)
        if (res.data.code === 0) {
          that.setData({
            navList: res.data.data.navList
          })
        }
      }
    })
  },
  // 轮播图
  getSwiperList() {
    let that = this
    wx.request({
      url: "https://www.easy-mock.com/mock/5cf25f327bfa3e44efc47d0f/bili/swiperList",
      success(res) {

        if (res.data.code === 0) {
          // console.log(res.data.data.swiperList)
          that.setData({
            swiperList: res.data.data.swiperList
          })
        }
      }
    })
  },
  // 视频列表
  getVideosList() {
    let that = this
    wx.request({
      url: "https://www.easy-mock.com/mock/5cf25f327bfa3e44efc47d0f/bili/videosList",
      success(res) {
        if (res.data.code === 0) {
          that.setData({
            videosList: res.data.data.videosList
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取首页导航
    this.getNavList()
    // 获取轮播图
    this.getSwiperList()
    // 获取视频列表
    this.getVideosList()
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
