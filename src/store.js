import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    grid: {
      width: 5,
      height: 3
    },
    ships: [
      {
        startLocation: '1 1 E',
        instructions: 'RFRFRFRF'
      },
      {
        startLocation: '3 2 N',
        instructions: 'FRRFLLFFRRFLL'
      },
      {
        startLocation: '0 3 W',
        instructions: 'LLFFFLFLFL'
      }
    ]
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
    mutateGrid (state, surveyShips) {
      state.grid = surveyShips.grid
      state.ships = surveyShips.ships
    }
  },
  actions: {
    updateSurveyShips ({ commit }, { surveyShips }) {
      commit('mutateGrid', surveyShips)
    }
  }
})
