import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    pageTagList: [],
    pageList: [],
    currPageIndex: 0,
    pageNum: 0,
    currComponentIndex: 0
  },
  mutations: {
    addPage (state, playload) {
      state.pageList.push(playload.pagetag);
      addPageTag(playload.page);
      state.pageNum++;
      function addPageTag (page) {
        state.pageTagList.push(page);
      }
    },
    changeCurrPageIndex (state, index) {
      state.currPageIndex = index
    },

  }
});

export default store

