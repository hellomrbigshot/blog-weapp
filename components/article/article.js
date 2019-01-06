// components/articleList.js
const marked = require('../../utils/marked.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    article: {
      type: Object,
      default: {
        tags: []
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },
  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
    },
    detached() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handleTap: function () {
      
    }
  }
})
