<template>
  <div class="home">
    <!-- 左侧页面管理与组件管理 -->
    <section class="left">
      <el-tabs v-model="activeManagePageName"
               @tab-click="handleClick"
               class="el-tabs">
        <el-tab-pane label="页面管理"
                     name="pagesListPlane">
          <pageTags />
        </el-tab-pane>
        <el-tab-pane label="组件列表"
                     name="componentsListPlane">
          <ComponentList />
        </el-tab-pane>
      </el-tabs>
    </section>
    <!--中间编辑区、预览、文本  -->
    <section class="center">
      <div class="editor-header"> <span>编辑区</span><span v-show="editMode"
              style="margin-left:5px;color:rgb(22, 155, 213);">页面{{currPageIndex+1}}</span></div>
      <div class="editor-plane"
           @drop="handleDrop"
           @dragover="handleDragOver"
           @click="deselectCurComponent">
        <Editor />
      </div>

      <button @click="showPreview"
              class="btn-preview"> 预览</button><br />
      <div class="previewPlane">预览区</div>
      <textarea />
    </section>
    <!-- 右侧属性面板 -->
    <section class="right">
      <el-tabs v-model="activeToolboxName">
        <el-tab-pane label="属性"
                     name="propertiesPlane">
          <AttributeList />
        </el-tab-pane>
      </el-tabs>
    </section>
  </div>
</template>

<script>
import Editor from '@/components/Editor/index'
import PageTags from '@/components/PageTags'
import ComponentList from '@/components/ComponentList'
import AttributeList from "@/components/AttributeList"
import { mapState } from 'vuex'
import componentslist from '@/components/UseableComponents/components-list'
import generateID from '@/utils/generateID'
import { deepCopy } from '@/utils/utils'

export default {
  name: 'Home',
  components: {
    Editor,
    PageTags,
    ComponentList,
    AttributeList
  },
  data () {
    return {
      activeManagePageName: 'pagesListPlane',
      activeToolboxName: 'propertiesPlane',
    }
  },
  methods: {
    handleClick () {
      console.log('management-change')
    },
    showPreview () {
      console.log('prevew')
    },
    handleDrop (e) {
      e.preventDefault()
      e.stopPropagation()
      const component = deepCopy(componentslist[e.dataTransfer.getData('index')])
      //e.target为editor
      component.style.top = e.offsetY
      component.style.left = e.offsetX
      component.id = generateID()
      this.$store.commit('addComponentToCurrPage',
        component
      )
      // this.$store.commit('recordSnapshot')
    },
    handleDragOver (e) {
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
    },
    deselectCurComponent () {
      // this.$store.commit('changeCurrComponentIndex', -1)
      // this.$store.commit('hideContexeMenu')
    },
  },
  computed: {
    ...mapState(["currPageIndex", "editMode"])
  }
}
</script>

<style scoped>
/* 整体Layout */
.home {
  position: relative;
  background: #fff;
  height: 100vh;
}
.left,
.center,
.right {
  height: 100%;
  border: 1px solid rgba(121, 121, 121, 1);
  background-color: rgba(215, 215, 215, 1);
  box-sizing: content-box;
  top: 0;
}
.left {
  width: 162px;
  position: absolute;
  left: 0;
}
.center {
  margin: 0px 162px;
  border-left: none;
  border-right: none;
  padding: 0 5px;
}
.right {
  width: 162px;
  position: absolute;
  right: 0;
}
/* center样式 */
.center span {
  font-size: 14px;
  font-weight: 400;
}
.editor-header {
  margin-bottom: 2px;
}
.btn-preview {
  color: #fff;
  background-color: rgb(22, 155, 213);
  border: none;
  padding: 0 5px;
}
/*editor-plane  */
.editor-plane {
  width: 100%;
  height: 500px;
  /* overflow: auto; */
  background-color: #000;
}
</style>

<style>
/* el-tabs样式修改 */
.el-tabs {
  height: 100%;
}
.left .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
  padding: 0 12px;
}
.left .el-tabs__item,
.right .el-tabs__item {
  height: 24px;
  line-height: 24px;
  font-weight: 400;
}
.left .el-tabs__header {
  margin: 0 0 5px;
}
.el-tabs__content {
  height: 100%;
}
/* button样式 */
</style>
