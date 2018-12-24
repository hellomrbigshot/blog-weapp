// pages/articleContent/articleContent.js
const app = getApp();
const util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    article: {},
    content: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    console.log(this.data.id);
    wx.request({
      url: 'https://m.hellomrbigbigshot.xyz/api/page/detail',
      method: 'POST',
      data: {
        id: this.data.id,
        content: '',
        comments: []
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        if (res.data.code === 'OK') {
          this.setData({
            article: res.data.data
          })
          let data = app.towxml.toJson(this.data.article.content, 'markdown');

          //设置文档显示主题，默认'light'
          // data.theme = 'dark';

          //设置数据
          this.setData({
            content: data,
            'article.create_date': util.formatTime(this.data.article.create_date, '3')
          });
        }
      }
    })
    wx.request({
      url: 'https://m.hellomrbigbigshot.xyz/api/comment/getpagecommentlist',
      method: 'POST',
      data: {
        page_id: this.data.id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        if (res.data.code === 'OK') {
          this.setData({
            comments: res.data.data.map(item => {
              item.create_time = util.formatTime(item.create_time);
              return item;
            })
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
  
  },
  
})