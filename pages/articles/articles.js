// pages/articles/articles.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    seach_str: '',
    articles: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const self = this;
    wx.request({
      url: 'http://hellomrbigbigshot.xyz/api/page/pagelist',
      method: 'POST',
      data: {
        status: 'normal',
        secret: false
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' 
      },
      success: (res) => {
        if (res.data.code === 'OK') {
          this.setData({
            articles: res.data.data.result
          })
        }
      }
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