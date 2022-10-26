import { reqGetUserAddressList, reqUserTradeInfoList } from '../../api'
const state = {
    userAddressList: [],
    userTradeInfoList: {}
}
const actions = {
    async getUserAddressList ({ commit }) {
        let result = await reqGetUserAddressList()
        if (result.code === 200) {
            commit("GETUSERADDRESSLIST", result.data)
        }
    },
    async getUserTradeInfoList ({ commit }) {
        let result = await reqUserTradeInfoList()
        console.log(result)
        if (result.code === 200) {
            commit('GETUSERTRADEINFOLIST', result.data)
        }
    }
}
const mutations = {
    GETUSERADDRESSLIST (state, userAddressList) {
        state.userAddressList = userAddressList
    },
    GETUSERTRADEINFOLIST (state, userTradeInfoList) {
        state.userTradeInfoList = userTradeInfoList
    }
}
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters,
}
