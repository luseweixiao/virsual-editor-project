import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    editMode: false,//页面编辑模式
    pageList: [],//页面列表
    editorStyleData: {//编辑区全局数据
      width: 500,
      height: 200
    },
    currPageIndex: 0,//焦点页面下标
    currComponent: null,
    currComponentIndex: 0,//焦点组件下表
    copyData: null,//复制粘贴剪切数据
  },
  mutations: {
    addPage (state, page) {
      state.pageList.push(page);
    },
    changeCurrPageIndex (state, index) {
      state.currPageIndex = index;
    },
    changePageInfo (state, payload) {
      var { name, index } = payload;
      state.pageList[index].name = name;
    },
    changeCurrComponentIndex (state, index) {
      state.currComponentIndex = index;
    },
    addComponentToCurrPage (state, component) {
      // this.addComponentToPage(state, { pageIndex: state.currPageIndex, component })
      store.commit("addComponentToPage", { pageIndex: state.currPageIndex, component })
    },
    addComponentToPage (state, payload) {
      var { pageIndex, component } = payload;
      state.pageList[pageIndex].componentsData.push(component);

      //添加组件后，焦点给新增的组件
      state.currComponentIndex = state.pageList[state.currPageIndex].componentsData.length - 1;
    },
    changeEditMode (state, editmode) {
      state.editMode = editmode;
    },
    setShapeStyle (state, { top, left, width, height, rotate }) {
      var curComponent = (state.pageList.length > 0 && state.pageList[state.currPageIndex] != null) ? state.pageList[state.currPageIndex].componentsData[state.currComponentIndex] : null;
      // var curComponent = store.getters.currComponent;
      if (top) curComponent.style.top = top
      if (left) curComponent.style.left = left
      if (width) curComponent.style.width = width
      if (height) curComponent.style.height = height
      if (rotate) curComponent.style.rotate = rotate
    },
  },
  getters: {
    currComponent (state) {
      var currCom = (state.pageList.length > 0 && state.pageList[state.currPageIndex] != null) ? state.pageList[state.currPageIndex].componentsData[state.currComponentIndex] : null;
      return currCom;
    }
  }
});

export default store

