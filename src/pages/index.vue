<script setup lang="ts">
import { formItemType } from '~/constants'

const formData = reactive({
  headerFormItemList: [{
    label: '',
    prop: '',
    type: '',
    formatType: '',
  }],
  headerButtonList: [{
    label: '',
    action: '',
  }],
  tableColumnList: [{
    label: '',
    prop: '',
  }],
  tableButtonList: [{
    label: '',
    action: '',
  }],
  dialogFormItemList: [{
    label: '',
    prop: '',
    type: '',
    formatType: '',
  }],
})

function handlePlus(index: any, target: any[]) {
  target.splice(index + 1, 0, { })
}

function handleRemove(index: any, target: any[]) {
  target.splice(index, 1)
  if (target.length === 0)
    target.push ({ })
}

const headerFormItemStr = computed(() =>
  formData.headerFormItemList.reduce((pre, cur) =>
    `${pre} 
        <el-form-item label="${cur.label}" prop="${cur.prop}">
            ${cur.formatType}
        </el-form-item>`, ''),
)

const headerButtonStr = computed(() =>
  formData.headerButtonList.reduce((pre, cur) =>
    `${pre} 
          <el-button type="primary" plain @click="handleOperate('${cur.action}')">
            ${cur.label}
          </el-button>`, ''),
)

const tableColumnStr = computed(() =>
  formData.tableColumnList.reduce((pre, cur) =>
    `${pre}
    <el-table-column prop="${cur.prop}" label="${cur.label}" align="center" />`, ''),
)

const tableButtonStr = computed(() =>
  formData.tableButtonList.reduce((pre, cur) =>
    `${pre} 
          <el-button link type="primary" @click="handleOperate('${cur.action}', row)">
            ${cur.label}
          </el-button>`, ''),
)
const dialogFormItemStr = computed(() =>
  formData.dialogFormItemList.reduce((pre, cur) =>
    `${pre} 
        <el-form-item label="${cur.label}" prop="${cur.prop}">
            ${cur.formatType}
        </el-form-item>`, ''),
)

const templateStr = computed(() =>
  ` 
<template>
  <div class="app-container">
    <div class="app-container-header">
      <el-form ref="queryFormRef" :model="queryParams" inline>
        ${headerFormItemStr.value}

        <el-form-item>
          <el-button @click="handleQuery" circle :icon="Search" />
          <el-button @click="resetQuery" circle :icon="Delete" />
        </el-form-item>

        <el-row justify="end">
          ${headerButtonStr.value}
        </el-row>
      </el-form>
    </div>
    <el-table v-loading="loading" :data="tableData" :max-height="dynamicHeight">
      ${tableColumnStr.value}
      <el-table-column prop="operate" label="操作" align="center">
        <template #default="{ row }">
          ${tableButtonStr.value}
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
      <el-form ref="formRef" :model="formData" label-width="80px" >
        ${dialogFormItemStr.value}
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
      `)

const scriptStr = computed(() =>
  `script setup lang="ts">
import { Search, Delete } from '@element-plus/icons-vue'
import type { FormInstance } from 'element-plus'

const queryFormRef = ref<FormInstance>()
const formRef = ref<FormInstance>()
const { dynamicHeight } = useDynamicHeight()

const state = reactive({
  loading: false,
  queryParams: {
    foo: '',
    pageNum: 1,
    pageSize: 20,
  },
  total: 0,
  tableData: [],
  fooList: [{ value: 123, label: 'hello' }],
  dialog: { title: '', visible: false, type: '' },
  formData: {},
})

const {
  loading,
  queryParams,
  total,
  tableData,
  fooList,
  dialog,
  formData,
} = toRefs(state)

function handleQuery() {
  // state.loading = true
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
<
`)
async function copyForm() {
  const { copy } = useClipboard()
  await copy(`<${scriptStr.value}/script>${templateStr.value}`)
  ElMessage.success('已复制到剪贴板')
}

function formatType(item: any) {
  item.formatType = item.type.replace('foobar', item.prop)
}
</script>

<template>
  <el-card>
    <el-form :model="formData" label-width="80px">
      <div my-2 text-start text-3xl>
        HEADER
      </div>
      <el-divider />
      <div my-2 text-start text-xl>
        搜索项
      </div>
      <el-row v-for="item, index in formData.headerFormItemList" :key="index">
        <el-col :span="6">
          <el-form-item label="标签">
            <el-input v-model="item.label" />
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="prop">
            <el-input v-model="item.prop" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="类型">
            <el-select v-model="item.type" placeholder=" " @change="formatType(item)">
              <el-option v-for="formItem in formItemType" :key="formItem.value" :label="formItem.label" :value="formItem.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <div fc gap-4>
            <div i-carbon:add-alt text-2xl icon-btn @click="handlePlus(index, formData.headerFormItemList)" />
            <div i-carbon:trash-can text-2xl icon-btn @click="handleRemove(index, formData.headerFormItemList)" />
          </div>
        </el-col>
      </el-row>
      <div my-2 text-start text-xl>
        按钮
      </div>
      <el-row v-for="item, index in formData.headerButtonList" :key="index">
        <el-col :span="6">
          <el-form-item label="标签">
            <el-input v-model="item.label" />
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="行为">
            <el-input v-model="item.action" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <div fc gap-4>
            <div i-carbon:add-alt text-2xl icon-btn @click="handlePlus(index, formData.headerButtonList)" />
            <div i-carbon:trash-can text-2xl icon-btn @click="handleRemove(index, formData.headerButtonList)" />
          </div>
        </el-col>
      </el-row>
      <div my-2 text-start text-3xl>
        Table
      </div>
      <el-divider />
      <div my-2 text-start text-xl>
        表格行
      </div>
      <el-row v-for="item, index in formData.tableColumnList" :key="index">
        <el-col :span="6">
          <el-form-item label="字段key">
            <el-input v-model="item.label" />
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="字段value">
            <el-input v-model="item.prop" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <div fc gap-4>
            <div i-carbon:add-alt text-2xl icon-btn @click="handlePlus(index, formData.tableColumnList)" />
            <div i-carbon:trash-can text-2xl icon-btn @click="handleRemove(index, formData.tableColumnList)" />
          </div>
        </el-col>
      </el-row>
      <div my-2 text-start text-xl>
        操作
      </div>
      <el-row v-for="item, index in formData.tableButtonList" :key="index">
        <el-col :span="6">
          <el-form-item label="标签">
            <el-input v-model="item.label" />
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="行为">
            <el-input v-model="item.action" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <div fc gap-4>
            <div i-carbon:add-alt text-2xl icon-btn @click="handlePlus(index, formData.tableButtonList)" />
            <div i-carbon:trash-can text-2xl icon-btn @click="handleRemove(index, formData.tableButtonList)" />
          </div>
        </el-col>
      </el-row>
      <div my-2 text-start text-3xl>
        DIALOG
      </div>
      <el-divider />
      <div my-2 text-start text-xl>
        表单项
      </div>
      <el-row v-for="item, index in formData.dialogFormItemList" :key="index">
        <el-col :span="6">
          <el-form-item label="标签">
            <el-input v-model="item.label" />
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="prop">
            <el-input v-model="item.prop" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="类型">
            <el-select v-model="item.type" placeholder=" " @change="formatType(item)">
              <el-option v-for="formItem in formItemType" :key="formItem.value" :label="formItem.label" :value="formItem.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <div fc gap-4>
            <div i-carbon:add-alt text-2xl icon-btn @click="handlePlus(index, formData.dialogFormItemList)" />
            <div i-carbon:trash-can text-2xl icon-btn @click="handleRemove(index, formData.dialogFormItemList)" />
          </div>
        </el-col>
      </el-row>
    </el-form>
    <div class="footer">
      <el-button type="primary" @click="copyForm">
        生成
      </el-button>
    </div>
  </el-card>
</template>
