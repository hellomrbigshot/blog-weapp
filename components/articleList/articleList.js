// components/articleList.js
const marked = require('../../utils/marked.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    queryObj: {
      type: Object,
      value: {
        status: 'normal',
        type: '', 
        content: '', 
        secret: false,
        sort: 'update_date'
      }
    },
    api: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    total: 0,
    articles: []
  },
  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
      this.getPageList();
    },
    detached() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getPageList() {
      wx.request({
        url: `https://m.hellomrbigbigshot.xyz/${this.data.api}`,
        method: 'POST',
        data: this.data.queryObj,
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
  }
})
