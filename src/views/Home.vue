<template>
  <div class="home">

    <section class="left">
      <el-tabs v-model="activeManagePageName"
               @tab-click="handleClick"
               class="el-tabs">
        <el-tab-pane label="页面管理"
                     name="pagesListPlane">
          <pageTags />
        </el-tab-pane>
        <el-tab-pane label="组件列表"
                     name="componentsListPlane">组件列表</el-tab-pane>
      </el-tabs>
    </section>

    <section class="center">
      <div class="editor-header"> <span>编辑区</span><span isshow="curPage"
              style="margin-left:5px;color:rgb(22, 155, 213);">页面{{curPageIndex}}</span></div>
      <div class="editor-plane">
        <Editor />
      </div>

      <button @click="showPreview"
              class="btn-preview"> 预览</button><br />
      <div class="previewPlane">预览区</div>
      <textarea />
    </section>

    <section class="right">
      <el-tabs v-model="activeToolboxName">
        <el-tab-pane label="属性"
                     name="propertiesPlane">属性</el-tab-pane>
      </el-tabs>
    </section>
  </div>
</template>

<script>
import Editor from '@/components/Editor/index'
import PageTags from '@/components/PageTags'

export default {
  name: 'Home',
  components: {
    Editor,
    PageTags
  },
  data () {
    return {
      activeManagePageName: 'pagesListPlane',
      curPageIndex: 1,
      activeToolboxName: 'propertiesPlane',
    }
  },
  methods: {
    handleClick () {
      console.log('management-change')
    },
    showPreview () {
      console.log('prevew')
    }
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
</style>
<style>
/* el-tabs样式修改 */
.left .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
  padding: 0 12px;
}
.left .el-tabs__item {
  height: 24px;
  line-height: 24px;
  font-weight: 400;
}
.left .el-tabs__header {
  margin: 0 0 5px;
}
/* button样式 */
</style>
