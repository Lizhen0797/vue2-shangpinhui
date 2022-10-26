import { reqGetShopCartList, reqDeleteShopCartById, reqUpdateShopCartCheckedById } from '../../api'
const state = {
    cartList: []
}
const actions = {
    async getShopCartList ({ commit }) {
        let result = await reqGetShopCartList()
        if (result.code === 200) {
            commit("GETSHOPCARTLIST", result.data)
        }
    },
    async deleteShopCartListById ({ commit }, skuId) {
        let result = await reqDeleteShopCartById(skuId)
        if (result.code === 200) {
            return "ok"
        } else {
            Promise.reject(new Error('fail'))
        }
    },
    async updateShopCartCheckedById ({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateShopCartCheckedById(skuId, isChecked)
        if (result.code === 200) {
            return "ok"
        } else {
            Promise.reject(new Error('fail'))
        }
    },
    deleteAllCheckedShopCart ({ dispatch, getters }) {
        let promiseAll = [];
        getters.cartList.cartInfoList.forEach((item) => {
            if (item.isChecked === 1) {
                let promise = dispatch("deleteShopCartListById", item.skuId)
                promiseAll.push(promise)
            }
        });
        return Promise.all(promiseAll);
    },
    updateAllShopCartChecked ({ dispatch, getters }, isChecked) {
        let promiseAll = [];
        getters.cartList.cartInfoList.forEach((item) => {
            let promise = dispatch("updateShopCartCheckedById", { skuId: item.skuId, isChecked: isChecked })
            promiseAll.push(promise)
        });
        return Promise.all(promiseAll);
    }
}
const mutations = {
    GETSHOPCARTLIST (state, cartList) {
        state.cartList = cartList
    }
}
const getters = {
    cartList () {
        return state.cartList[0] || {}
    }
}
export default {
    state,
    actions,
    mutations,
    getters,
}
