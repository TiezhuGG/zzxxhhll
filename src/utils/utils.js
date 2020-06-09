import Router from '@/router'

const utils = {
  topage: (path) => {
    Router.push({ path: path })
  }
}

module.exports = utils
