import Vue from 'vue'
import Vuex from 'vuex'
import { deepCopy, swap } from '@/utils/utils'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    editMode: false,//页面编辑模式
    pageList: [],//页面列表
    editorStyleData: {//编辑区全局数据
      width: 500,
      height: 500
    },
    currPageIndex: 0,//当前页面下标
    currComponentList: [],//当前画布上组件
    currComponent: null,
    currComponentIndex: 0,//当前组件下表
    copyData: null,//复制粘贴剪切数据
    menuShow: false,
    preventDeactivation: true//false:当点其他位置时，组件会失去焦点,true：点击其他位置，组件不会失去焦点
  },
  mutations: {
    setPreventDeactivation (state, payload) {
      state.preventDeactivation = payload;
    },
    copyPage (state) {
      state.copyData = {
        data: deepCopy(state.pageList[state.currPageIndex]),
        index: state.currPageIndex
      }
    },

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
      store.commit("addComponentToPage", { pageIndex: state.currPageIndex, component })
    },

    addComponentToPage (state, payload) {
      var { pageIndex, component } = payload;

      //添加组件后，焦点给新增的组件
      state.currComponentIndex = state.pageList[pageIndex].componentsData.length;
      Vue.set(state, "currComponent", component)
      store.commit("setComponentsData", { component, currComponentIndex: state.currComponentIndex })
    },
    setComponentsData (state, payload) {
      let { component, currComponentIndex } = payload;
      Vue.set(state.pageList[state.currPageIndex].componentsData, currComponentIndex, component)
    },
    setCurrComponent (state, { component, index }) {
      Vue.set(state, "currComponent", component)
      store.commit("changeCurrComponentIndex", index)
      store.commit("setComponentsData", { component, currComponentIndex: index })

    },

    setPageList (state, page) {
      Vue.set(state.pageList, state.currPageIndex, page)
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
    /**contextMenu begin*/
    showContextMenu (state) {
      if (state.currComponentIndex != -1) {
        state.menuShow = true
      }
    },

    hideContextMenu (state) {
      state.menuShow = false
    },

    deleteComponent (state) {
      state.pageList[state.currPageIndex].componentsData.splice(state.currComponentIndex, 1);
      Vue.set(state, "currComponent", null);
      state.currComponentIndex = -1;
      state.menuShow = false;
    },

    upComponentIndex (state) {
      let componentsData = state.pageList[state.currPageIndex].componentsData;
      if (state.currComponentIndex < componentsData.length - 1) {
        componentsData.splice(state.currComponentIndex, 1)//删除
        componentsData.splice(state.currComponentIndex + 1, 0, state.currComponent)//插入
        state.currComponentIndex = state.currComponentIndex + 1;
      } else {
        // toast('已经到顶了')
        console.log("已经到顶了")
      }
    },

    downComponentIndex (state) {
      let componentsData = state.pageList[state.currPageIndex].componentsData;
      if (state.currComponentIndex > 0) {
        componentsData.splice(state.currComponentIndex, 1)//删除
        componentsData.splice(state.currComponentIndex - 1, 0, state.currComponent)//插入
        state.currComponentIndex = state.currComponentIndex - 1;
      } else {
        // toast('已经到底了')
        console.log("已经到底了")
      }
    },
    bottomComponentIndex (state) {
      let componentsData = state.pageList[state.currPageIndex].componentsData;
      if (componentsData.length > 1) {
        console.log("toBottom")
        componentsData.splice(state.currComponentIndex, 1)//删除
        componentsData.unshift(state.currComponent)
        state.currComponentIndex = 0;
      }
    },
    //index越大越上
    topComponentIndex (state) {
      let componentsData = state.pageList[state.currPageIndex].componentsData;
      if (componentsData.length > 1) {
        componentsData.splice(state.currComponentIndex, 1)//删除
        componentsData.push(state.currComponent)//
        state.currComponentIndex = componentsData.length - 1;
      }
    },
    lockComponent (state) {
      // Vue.set(state.currComponent, "locked", true)
      state.currComponent.locked = true;
      console.log(state.currComponent)
      store.commit("setCurrComponent", { component: state.currComponent, index: state.currComponentIndex });

    },
    unlockComponent (state) {
      state.currComponent.locked = false;
      store.commit("setCurrComponent", { component: state.currComponent, index: state.currComponentIndex });
    }

    /**contextMenu end*/
  },
  getters: {
    // currComponent (state) {
    //   var currCom = (state.pageList.length > 0 && state.pageList[state.currPageIndex] != null) ? state.pageList[state.currPageIndex].componentsData[state.currComponentIndex] : null;
    //   return currCom;
    // }
    componentsData (state) {
      return state.pageList[state.currPageIndex].componentsData;
    }
  }
});

export default store

