import { reqGetCode, reqGetUserInfo, reqLogout, reqUserLogin, reqUserRegister } from '../../api'
import { getToken, removeToken, setToken } from '@/utils/token'
const state = {
    code: '',
    userInfo: {},
    token: getToken()
}
const actions = {
    async getCode ({ commit }, phone) {
        let result = await reqGetCode(phone)
        if (result.code === 200) {
            commit("GETCODE", result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    async userRegister ({ commit }, user) {
        let result = await reqUserRegister(user)
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error(result.message))
        }
    },
    async userLogin ({ commit }, user) {
        let result = await reqUserLogin(user)
        console.log(result)
        if (result.code === 200) {
            commit("USERLOGIN", result.data.token)
            setToken(result.data.token)
            return "ok"
        } else {
            return Promise.reject(new Error(result.message))
        }
    },
    async getUserInfo ({ commit }) {
        let result = await reqGetUserInfo()
        if (result.code === 200) {
            commit("GETUSERINFO", result.data)
            return "ok"
        } else {
            return Promise.reject(new Error(result.message))
        }
    },
    async userLogout ({ commit }) {
        let result = await reqLogout()
        if (result.code === 200) {
            commit("USERLOGOUT")
            return 'ok'
        } else {
            return Promise.reject(new Error(result.message))
        }
    }
}
const mutations = {
    GETCODE (state, code) {
        state.code = code
    },
    USERLOGIN (state, token) {
        state.token = token
    },
    GETUSERINFO (state, userInfo) {
        state.userInfo = userInfo
    },
    USERLOGOUT (state) {
        removeToken()
        state.token = ''
        state.userInfo = {}
    }
}
const getters = {
}
export default {
    state,
    actions,
    mutations,
    getters,
}
