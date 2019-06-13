import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    grid: {},
    ships: []
  },
  getters: {
    grid (state) {
      return state.grid
    },
    ships (state) {
      return state.ships
    }
  },
  mutations: {
    mutateShips (state, surveyShips) {
      state.grid = surveyShips.grid
      state.ships = surveyShips.ships
    }
  },
  actions: {
    updateSurveyShips ({ commit }, { surveyShips }) {
      commit('mutateShips', surveyShips)
    }
  }
})
