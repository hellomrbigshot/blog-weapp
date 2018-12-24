// pages/articles/articles.js
const app = getApp();
const marked = require('../../utils/marked.js');
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search_str: '',
    articles: [],
    total: 0,
    active: 0,
    search_obj: {
      pageSize: 5,
      page: 1,
      status: 'normal',
      type: '',
      secret: false,
      sort: 'update_date'
    }
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
    console.log('haha')
    this.setData({
      'search_obj.page': 1
    });
    this.getList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.search_obj.page * this.data.search_obj.pageSize >= this.data.total) return false;
    this.setData({
      'search_obj.page': this.data.search_obj.page + 1
    });
    this.getList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  onChange: function () {
    
  },
  getList: function () {
    const self = this;
    wx.request({
      url: 'https://m.hellomrbigbigshot.xyz/api/page/pagelist',
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
          if (this.data.search_obj.page === 1) {
            this.setData({
              'articles': []
            })
          }
          this.setData({
            'articles': this.data.articles.concat(res.data.data.result.map(item => {
                item.create_date = util.formatTime(item.create_date, '3');
                item.update_date = util.formatTime(item.update_date, '3');
                item.content = marked(item.content).replace(/<[^>]+>/g, '');
                return item;
              })
            )
          })
          wx.stopPullDownRefresh();
        }
      }
    })
  }
})