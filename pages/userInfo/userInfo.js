// pages/userInfo/userInfo.js
const marked = require('../../utils/marked.js');
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    active: 0,
    userInfo: {},
    num_obj: {
      activity_num: 0,
      page_num: 0,
      comment_num: 0
    },
    mapping_obj: {
      0: 'activity',
      1: 'page',
      2: 'comment'
    },
    activity_list: {
      activity_list: [],
      page_list: [],
      comment_list: []
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name: options.name
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getUserInfo();
    this.getActivityNum('activity');
    this.getActivityNum('page');
    this.getActivityNum('comment');
    this.getActivityList();
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
  onChange (event) {
    this.setData({
      active: event.detail.index
    });
    this.getActivityList();
  },
  getUserInfo: function () {
    wx.request({
      url: 'https://m.hellomrbigbigshot.xyz/api/user/detail',
      method: 'POST',
      data: {
        username: this.data.name
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' 
      },
      success: (res) => {
        if (res.data.code === 'OK') {
          this.setData({
            userInfo: res.data.data
          })
        }
      }
    })
  },
  getActivityNum: function (type) {
    let send_data = {
      create_user: this.data.name,
      type: type
    };
    if (send_data.type === 'activity') delete send_data.type;
    wx.request({
      url: 'https://m.hellomrbigbigshot.xyz/api/activity/getnum',
      method: 'POST',
      data: send_data,
      header: {
        'content-type': 'application/x-www-form-urlencoded' 
      },
      success: (res) => {
        if (res.data.code === 'OK') {
          this.setData({
            [`num_obj.${type}_num`]: res.data.data
          })
        }
      }
    })
  },
  getActivityList: function () {
    const key = `${this.data.mapping_obj[this.data.active]}_list`
    let send_data = {
      create_user: this.data.name,
      page: 1,
      pageSize: 999,
      type: this.data.mapping_obj[this.data.active]
    };
    if (send_data.type === 'activity') delete send_data.type;
    // 不分页，防止数据重复请求
    if (this.data.activity_list[key].length) return;
    wx.request({
      url: 'https://m.hellomrbigbigshot.xyz/api/activity/getlist',
      method: 'POST',
      data: send_data,
      header: {
        'content-type': 'application/x-www-form-urlencoded' 
      },
      success: (res) => {
        if (res.data.code === 'OK') {
          this.setData({
            [`activity_list.${key}`]: res.data.data.result.map(activity => {
              activity.update_time = util.formatTime(activity.create_time, '3');
              if (activity.type === 'page') {
                activity.content.content = marked(activity.content.content).replace(/<[^>]+>/g, '');
              }
              return activity;
            })
          })
        }
      }
    })
  }
})