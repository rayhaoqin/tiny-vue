<template>
  <div>
    <tiny-button @click="resetResizable">重置列宽拖动操作</tiny-button>
    <tiny-button @click="resetCustoms">重置列的隐藏操作</tiny-button>
    <tiny-button @click="resetAll" style="margin-bottom: 20px">重置列的所有操作</tiny-button>
    <tiny-grid ref="resizeGrid" :data="tableData" :resizable="true">
      <template #toolbar>
        <tiny-grid-toolbar id="custom-width" :resizable="{ storage: true }" setting></tiny-grid-toolbar>
      </template>
      <tiny-grid-column field="name" title="名称"></tiny-grid-column>
      <tiny-grid-column field="employees" title="员工数"></tiny-grid-column>
      <tiny-grid-column field="address" title="地址"></tiny-grid-column>
      <tiny-grid-column field="introduction" title="公司简介" show-overflow></tiny-grid-column>
    </tiny-grid>
  </div>
</template>

<script lang="jsx">
import { Grid, GridColumn, GridToolbar, Button } from '@opentiny/vue'

export default {
  components: {
    TinyGrid: Grid,
    TinyGridColumn: GridColumn,
    TinyGridToolbar: GridToolbar,
    TinyButton: Button
  },
  data() {
    return {
      tableData: [
        {
          id: '1',
          name: 'GFD科技YX公司',
          address: '福州',
          introduction: '公司技术和研发实力雄厚，是国家863项目的参与者，并被政府认定为“高新技术企业”。',
          employees: 800
        },
        {
          id: '2',
          name: 'WWW科技YX公司',
          address: '深圳福田区',
          introduction: '公司技术和研发实力雄厚，是国家863项目的参与者，并被政府认定为“高新技术企业”。',
          employees: 300
        },
        {
          id: '3',
          name: 'RFV有限责任公司',
          address: '中山市',
          introduction: '公司技术和研发实力雄厚，是国家863项目的参与者，并被政府认定为“高新技术企业”。',
          employees: 1300
        },
        {
          id: '4',
          name: 'TGB科技YX公司',
          address: '龙岩',
          introduction: '公司技术和研发实力雄厚，是国家863项目的参与者，并被政府认定为“高新技术企业”。',
          employees: 360
        },
        {
          id: '5',
          name: 'YHN科技YX公司',
          address: '韶关',
          introduction: '公司技术和研发实力雄厚，是国家863项目的参与者，并被政府认定为“高新技术企业”。',
          employees: 810
        },
        {
          id: '6',
          name: 'WSX科技YX公司',
          address: '黄冈',
          introduction: '公司技术和研发实力雄厚，是国家863项目的参与者，并被政府认定为“高新技术企业”。',
          employees: 800
        }
      ]
    }
  },
  methods: {
    resetResizable() {
      this.$refs.resizeGrid.resetResizable()
    },
    resetCustoms() {
      this.$refs.resizeGrid.resetCustoms()
    },
    resetAll() {
      this.$refs.resizeGrid.resetAll()
    }
  }
}
</script>
