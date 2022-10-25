import { reqGoodsInfo, reqAddOrUpdateShopCart } from '@/api'
import { getUUID } from '@/utils/uuid_token'
const state = {
    goodsInfo: {},
    uuid_token: getUUID()
}
const actions = {
    async getGoodsInfo ({ commit }, skuId) {
        const result = await reqGoodsInfo(skuId)
        if (result.code === 200) {
            commit('GETGOODSINFO', result.data)
        }
    },
    async addOrUpdateShopCart ({ _commit }, { skuId, skuNum }) {
        const result = await reqAddOrUpdateShopCart(skuId, skuNum)
        if (result.code === 200) {
            return "ok"
        } else {
            new Promise.reject(new Error("fail"))
        }
    }
}
const mutations = {
    GETGOODSINFO (state, goodsInfo) {
        state.goodsInfo = goodsInfo
    },
}
const getters = {
    categoryView (state) {
        return state.goodsInfo.categoryView || {}
    },
    skuInfo (state) {
        return state.goodsInfo.skuInfo || {}
    },
    spuSaleAttrList (state) {
        return state.goodsInfo.spuSaleAttrList || []
    },
}
export default {
    state,
    actions,
    mutations,
    getters,
}
