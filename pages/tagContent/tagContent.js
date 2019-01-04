// pages/tagContent/tagContent.js
const marked = require('../../utils/marked.js');
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    total: 0,
    articles: [],
    search_obj: {
      pageSize: 5,
      page: 1,
      type: 'tag',
      status: 'normal',
      content: '',
      secret: false,
      sort: 'update_time'
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
      'search_obj.content': this.data.name
    })
    this.getTagDetail();
    this.getList();
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
  getList: function () {
    wx.request({
      url: 'https://m.hellomrbigbigshot.xyz/api/page/pagelist',
      method: 'POST',
      data: this.data.search_obj,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        if (this.data.search_obj.page === 1) {
          this.setData({
            'articles': []
          })
        }
        this.setData({
          'total': res.data.data.total,
          'articles': this.data.articles.concat(res.data.data.result.map(item => {
              item.create_time = util.formatTime(item.create_time, '3');
              item.update_time = util.formatTime(item.update_time, '3');
              item.content = marked(item.content).replace(/<[^>]+>/g, '');
              return item;
            })
          )
        })
      }
    })
  }
})