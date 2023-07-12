<script setup lang="ts">
import type { FormInstance } from 'element-plus'

const queryFormRef = ref<FormInstance>()
const formRef = ref<FormInstance>()
const { dynamicHeight } = useDynamicHeight()

const state = reactive({
  loading: false,
  queryParams: {
    pageNum: 1,
    pageSize: 20,
  },
  total: 0,
  tableData: [],
  dialog: { title: '', visible: false, type: '' },
  formData: {},
})

const {
  loading,
  queryParams,
  total,
  tableData,
  dialog,
  formData,
} = toRefs(state)

function handleQuery() {
  state.loading = true
  // listUserPages(state.queryParams)
  //   .then(({ data }) => {
  //     state.total = data.total
  //     state.tableData = data.list
  //   })
  //   .finally(() => {
  //     state.loading = false
  //   })
}

function resetQuery() {
  queryFormRef.value?.resetFields()
  handleQuery()
}

function handleOperate(action: string, row: any = {}) {
  state.dialog.visible = true
  state.dialog.type = action

  switch (action) {
    case 'add':
      state.dialog.title = 'xxx'
      state.formData = { ...row }
      break
    case 'update':
      state.dialog.title = 'xxx'
      state.formData = { ...row }
      break
  }
}

function handleSubmit() {
  formRef.value?.validate((valid: any) => {
    if (!valid)
      return false

    // crudUser(state.dialog.type, state.formData).then(({ status, msg }) => {
    //   ElMessage.success('操作成功')
    //   state.dialog.visible = false
    //   handleQuery()
    // })
  })
}

onMounted(() => {
  handleQuery()
})
</script>

<template>
  <div class="app-container">
    <div class="app-container-header">
      <el-form ref="queryFormRef" :model="queryParams" inline>
        <el-form-item label="" prop="" />

        <el-form-item>
          <div flex gap-4>
            <div i-carbon:search icon-btn @click="handleQuery" />
            <div i-carbon:trash-can icon-btn @click="resetQuery" />
          </div>
        </el-form-item>

        <el-row justify="end">
          <el-button type="primary" plain @click="handleOperate('')" />
        </el-row>
      </el-form>
    </div>
    <el-table v-loading="loading" :data="tableData" :max-height="dynamicHeight">
      <el-table-column prop="" label="" align="center" />

      <el-table-column prop="operate" label="操作" align="center">
        <template #default="{ row }">
          <el-button link type="primary" @click="handleOperate('', row)" />
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页工具条 -->
    <pagination
      v-if="total > 0"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      :total="total"
      @pagination="handleQuery"
    />

    <el-dialog v-model="dialog.visible" :title="dialog.title" width="350" destroy-on-close>
      <el-form ref="formRef" :model="formData" label-width="80px">
        <el-form-item label="" prop="" />
      </el-form>

      <template #footer>
        <el-button type="primary" @click="handleSubmit">
          确认
        </el-button>
        <el-button @click="dialog.visible = false">
          取消
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>
