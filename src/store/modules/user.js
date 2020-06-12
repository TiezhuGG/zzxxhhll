import { register, login, logout, getInfo } from '@/api/user'

import { getToken, setToken, removeToken } from '@/utils/auth'

import { resetRouter } from '@/router'

const getDefaultState = () => {
    return {
        token: getToken(),
        info: {
            mobile: '',
            code: '',
            password: '',
            username: '',
            enterpriseName: '',
            avatar: '',
        }
    }
}

const state = getDefaultState()

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    setUsername: (state, username) => {
        state.info.username = username
    },
    setCode: (state, code) => {
        state.info.code = code
    },
    setPassword: (state, password) => {
        state.info.password = password
    },
    setEnterpriseName: (state, enterpriseName) => {
        state.info.enterpriseName = enterpriseName
    },
    setAvatar: (state, avatar) => {
        state.info.avatar = avatar
    },
    setMobile: (state, mobile) => {
        state.info.mobile = mobile
    },
    setInfo: (state, info) => {
        state.info = info
    }
}

const actions = {
    // user register
    register({ commit }, userInfo) {
        const { mobile, password, username, enterpriseName } = userInfo
        console.log('userInfo', userInfo)
        return new Promise((resolve, reject) => {
            register({ mobile, password, username, enterpriseName }).then(response => {
                const { data } = response
                commit('SET_TOKEN', data.token)
                setToken(data.token)
                console.log('注册', data)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user login
    login({ commit }, userInfo) {
        const { username, password } = userInfo
        return new Promise((resolve, reject) => {
            login({ username: username.trim(), password: password }).then(response => {
                const {
                    data
                } = response
                commit('SET_TOKEN', data.token)
                setToken(data.token)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // get user info
    // getInfo({commit,state}) {
    //     return new Promise((resolve, reject) => {
    //         getInfo(state.token).then(response => {
    //             const { data } = response
    //             if (!data) { reject('Verification failed, please Login again.') }
    //             const { name, avatar } = data
    //             commit('SET_NAME', name)
    //             commit('SET_AVATAR', avatar)
    //             resolve(data)
    //         }).catch(error => {
    //             reject(error)
    //         })
    //     })
    // },

    // user logout
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                removeToken() // must remove  token  first
                resetRouter()
                commit('RESET_STATE')
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            removeToken() // must remove  token  first
            commit('RESET_STATE')
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}