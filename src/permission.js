import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/user/login', '/user/register', '/user/verify-code', '/user/set-password', '/user/enterprise', '/user/has-enterprise', '/user/forget-password', '/user/forget-password-email', '/invite/member', '/user/unreviewed', ] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
    console.log(to)
    // start progress bar
    NProgress.start()

    // set page title
    document.title = getPageTitle(to.meta.title)

    // determine whether the user has logged in
    const hasToken = getToken()
    // console.log('token', hasToken)

    if (hasToken) {
        if (to.path === '/user/login') {
            // if is logged in, redirect to the home page
            next()
            NProgress.done()
        } else {
            // console.log('用户名', store.state.username)
            // console.log('store', store.state.user)
            const hasGetUserInfo = store.getters.username
            if (hasGetUserInfo) {
                next()
            } else {
                try {
                    // get user info
                    // await store.dispatch('user/getInfo')
                    next()
                } catch (error) {
                    // remove token and go to login page to re-login
                    await store.dispatch('user/resetToken')
                    Message.error(error || 'Has Error')
                    next(`/user/login?redirect=${to.path}`)
                    NProgress.done()
                }
            }
        }
    } else {
        /* has no token*/
        if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly
            next()
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            next(`/user/login?redirect=${to.path}`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})