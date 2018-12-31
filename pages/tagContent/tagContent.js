// pages/tagContent/tagContent.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    total: 0,
    query_obj: {
      type: 'tag',
      status: 'normal',
      content: '',
      secret: false,
      sort: 'update_date'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name: options.id
    })
    this.setData({
      'query_obj.content': this.data.name
    })
    this.getTagDetail();
    this.getPageNum();
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

  },
  getTagDetail: function () {
    wx.request({
      url: 'https://m.hellomrbigbigshot.xyz/api/tag/tagdetail',
      method: 'POST',
      data: { name: this.data.name },
      header: {
        'content-type': 'application/x-www-form-urlencoded' 
      },
      success: (res) => {
        if (res.data.code === 'OK') {
        }
      }
    })
  },
  getPageNum: function () {
    wx.request({
      url: 'https://m.hellomrbigbigshot.xyz/api/page/pagelist',
      method: 'POST',
      data: {
        type: 'tag',
        status: 'normal',
        content: this.data.name,
        secret: false
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        this.setData({
          total: res.data.data.total
        })
      }
    })
  }
})