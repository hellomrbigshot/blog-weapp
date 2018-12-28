// pages/tags/tags.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 1,
    tags: [],
    search_obj: {
      page: 1,
      pageSize: 999
    },
    total: 0
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
    this.getList();
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

  },
  onChange: function (active) {
    if (active.detail === 0) {
      wx.navigateTo({
        url: '../articles/articles'
      })
    }
  },
  getList: function () {
    const self = this;
    wx.request({
      url: 'https://m.hellomrbigbigshot.xyz/api/tag/taglist',
      method: 'POST',
      data: this.data.search_obj,
      header: {
        'content-type': 'application/x-www-form-urlencoded' 
      },
      success: (res) => {
        if (res.data.code === 'OK') {
          this.setData({
            'total': res.data.data.total
          });
          this.setData({
            'tags': res.data.data.result
          })
        }
      }
    })
  }
})