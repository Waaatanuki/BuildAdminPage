export const formItemType = [
  {
    label: '输入框',
    value: '<el-input v-model="queryParams.foobar" />',
  },
  {
    label: '下拉框',
    value: `<el-select v-model="queryParams.foobar" >
              <el-option v-for="foo in fooList" :key="foo.value" :label="foo.label" :value="foo.value" />
            </el-select>`,
  },
  {
    label: '日期',
    value: '<el-date-picker v-model="queryParams.foobar" start-placeholder="开始时间" end-placeholder="结束时间" type="daterange" />',
  },
]
