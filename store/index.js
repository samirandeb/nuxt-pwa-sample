//store/index.js
export const state = () => ({
    newSource: null
})

export const mutations = {
    setNewsSource(state, newSource) {
        //console.log("inside setNewsSource:",newSource)
        state.newSource = newSource
    }
}

export const getters = {
    getNewsSource(state) {
        return state.newSource
    }
}