import Router from '@/router'

const utils = {
  topage: (path) => {
    Router.push({ path: path })
  },
  pick: function(obj, arr) {
    return arr.reduce((iter, val) => {
      val in obj && (iter[val] = obj[val])
      return iter
    }, {})
  },
  msg: function(options) {
    let e = { title: '成功', message: '默认消息', type: 'success', position: 'bottom-right' }
    if (typeof options === 'string') {
      e.message = options
    } else {
      e = Object.assign(e, options)
    }
    Notification(e)
  },
  resteObj: function(obj) {
    for (const key in obj) {
      obj[key] = ''
    }
    return obj
  }
}

// module.exports = utils
export default utils
