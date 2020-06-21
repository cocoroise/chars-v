<template>
  <div class="search-form">
    <!-- 搜索框 -->
    <a-form-model ref="searchForm" :model="searchForm">
      <a-row :gutter="24" v-for="(item, index) in searchComponent" :key="index">
        <a-col
          v-for="{ span, key, type, placeholder, label, options, format, ...others } in item"
          :span="span"
          :key="key"
          :offset="type == 'a-range-picker' ? offset : 0"
        >
          <a-form-model-item :prop="key">
            <a-input
              v-if="type === 'a-input'"
              v-model="searchForm[key]"
              :placeholder="placeholder"
              :allowClear="true"
              v-bind="others"
            ></a-input>
            <search-select
              v-if="type === 'a-select'"
              v-model="searchForm[key]"
              :placeholder="placeholder"
              :allowClear="true"
              v-bind="others"
              :options="options"
              @change="selectChange"
            ></search-select>
            <a-range-picker
              v-if="type === 'a-range-picker'"
              :value="searchForm[key]"
              :style="{ width: '100%' }"
              :format="format"
              v-bind="others"
              @change="(date, dateStr) => dataPickerChange(date, dateStr, key)"
            />
            <div v-if="type === 'button'">
              <a-button class="search_btn" @click="search">
                搜索
              </a-button>
              <img
                class="refresh_btn"
                src="@/assets/img/refresh.svg"
                @click="clear"
                alt="refresh"
              />
            </div>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
    <!-- 表格前slot -->
    <slot name="beforeTable"></slot>
    <!-- 表格主体 -->
    <a-spin class="table_content" :spinning="tableSpinning">
      <div class="title">
        {{ title }}
        <a-tooltip v-if="isTitleModal" class="tooltip" @click="isModalShow = true">
          <template slot="title">
            数据指标说明
          </template>
          <a-icon type="info-circle" />
        </a-tooltip>
      </div>
      <div class="export" @click="handleExport" v-if="isExport">
        <a-icon class="icon" type="download" />
      </div>
      <a-table
        bordered
        size="small"
        :columns="columns"
        :dataSource="data"
        :rowKey="record => record[keyName]"
        :pagination="pagination"
        @change="handleTableChange"
        :rowClassName="setRowClassName"
      >
        <template
          v-for="{ key, scopedSlots } in scopedSlotsArr"
          :slot="key"
          slot-scope="text, record, index"
        >
          <slot :name="key" v-bind:record="record" v-bind:index="index"></slot>
        </template>
      </a-table>
    </a-spin>
    <!-- 模态框 -->
    <a-modal
      v-model="isModalShow"
      width="45%"
      :centered="true"
      :title="title"
      @ok="isModalShow = false"
      :closable="false"
    >
      <slot name="infoModal"></slot>
      <div slot="footer">
        <a-button @click="isModalShow = false" type="primary">确定</a-button>
      </div>
    </a-modal>
  </div>
</template>
<script>
import SearchSelect from "@/components/common/select-form";
import { formatTime } from "@/utils/momentTime";
import moment from "moment";
export default {
  name: "SearchTable",
  data() {
    return {
      tableSpinning: false,
      data: [],
      isModalShow: false,
      pagination: {
        pageSize: this.pageSize,
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: ["15", "20", "30", "40"],
      }, // 分页
      searchForm: {},
    };
  },
  props: {
    title: {
      // 表格名称
      type: String,
    },
    keyName: {
      // 表单key
      type: String,
      default: "key",
    },
    columns: Array,
    pageSize: {
      type: Number,
      default: 15,
    },
    getList: Function, // 获取表格数据接口
    searchComponent: {
      // 搜索配置项
      type: Array,
      default: () => {
        return [];
      },
    },
    fixedData: {
      // 表格搜索接口额外传参
      type: Object,
      default() {
        return {};
      },
    },
    scroll: {
      type: Object,
      default() {
        return { x: 1200 };
      },
    },
    isExport: {
      // 导出接口
      type: [Function, Boolean],
      default: false,
    },
    isTitleModal: {
      // 表格标题上介绍的模态框
      type: Boolean,
      default: false,
    },
  },
  computed: {
    scopedSlotsArr() {
      return this.columns && this.columns.filter(item => !!item.scopedSlots);
    },
    offset() {
      let leftNum = 0;
      let rightNum = 0;
      this.searchComponent[0].map(v => {
        if (v.type === "a-range-picker" || v.type === "button") {
          rightNum += v.span;
        } else {
          leftNum += v.span;
        }
      });
      return 24 - leftNum - rightNum;
    },
  },
  components: {
    SearchSelect,
  },
  mounted() {
    this.setSearchForm(this.searchComponent);
    this.$nextTick(() => {
      this.getData();
    });
  },
  methods: {
    setSearchForm(arr) {
      arr.forEach(item => {
        if (Array.isArray(item)) {
          this.setSearchForm(item);
        } else {
          const { key, initVal } = item;
          if (key !== "button") {
            this.$set(this.searchForm, key, initVal);
          }
        }
      });
    },
    getData() {
      this.getPages({ page: 1 });
    },
    /**
     * 表格操作
     */
    handleTableChange(pagination, filters, sorter) {
      this.pagination = {
        ...this.pagination,
        ...pagination,
      };
      const { current } = pagination;
      this.getPages({
        page: current,
      });
    },
    /**
     * 获取分页数据
     */
    async getPages({ page }) {
      let search = this.beforeSearch();
      if (this.tableSpinning) {
        return;
      }
      this.tableSpinning = true;
      try {
        const { pageSize } = this.pagination;
        if (search && search.timeRange) {
          const [beginTime, endTime] = search.timeRange;
          search.start = formatTime(beginTime);
          search.end = formatTime(endTime);
        }
        if (search && "timeRange" in search) {
          delete search.timeRange;
        }
        const params = {
          pageNo: page,
          pageSize,
          ...this.fixedData,
          ...search,
        };
        const res = await this.getList(params);
        if (!res) {
          // 请求出错
          return;
        }
        const { list, total, current } = res;
        // 实在没有唯一值，就用 index 当 key;
        this.data = list.map((item, index) => {
          return { ...item, key: index };
        });
        this.pagination = {
          ...this.pagination,
          total,
          current,
        };
      } catch (e) {
        console.log(e);
      } finally {
        this.tableSpinning = false;
      }
    },
    selectChange() {
      this.$nextTick(() => {
        this.search();
      });
    },
    dataPickerChange(date, dateStr, key) {
      this.searchForm[key] = date;
      this.search();
    },
    beforeSearch() {
      const { searchForm } = this;
      let res = {};
      if (searchForm) {
        Object.keys(searchForm).forEach(key => {
          const cur = searchForm[key];
          // 过滤空格
          res[key] = typeof cur === "string" ? cur.trim() : cur;
        });
      }
      return res;
    },
    // 搜索
    search() {
      this.getPages({
        page: 1,
      });
    },
    // 清除
    clear() {
      this.$refs.searchForm.resetFields();
      this.searchForm.timeRange = [moment(this.fixedData.start), moment(this.fixedData.end)];
      // 默认日期
      this.searchForm.start = this.fixedData.start;
      this.searchForm.end = this.fixedData.end;
      this.search();
    },
    // 导出excel
    async handleExport() {
      if (this.data.length === 0) {
        this.$message.error("当前表格为空，无法导出数据");
      } else {
        const { search } = this;
        if (search && search.timeRange) {
          const [beginTime, endTime] = search.timeRange;
          search.start = formatTime(beginTime);
          search.end = formatTime(endTime);
        }
        const params = {
          ...this.fixedData,
          ...search,
        };
        const { data: url } = await this.isExport(params);
        if (url) {
          window.open(url, "_blank");
        }
      }
    },
    setRowClassName(record, index) {
      return index % 2 == 1 ? "crm-table-row" : "";
    },
  },
};
</script>
<style lang="less" scoped>
.search-form {
  .tooltip {
    &:hover {
      cursor: pointer;
    }
  }
  .table_content {
    min-height: 65vh;
    // background-color: @main-color;
    // .card-style();
    position: relative;
    margin-top: 20px;
    padding: 20px;
    .export {
      .icon {
        color: white;
        font-size: 24px;
        position: absolute;
        right: 12px;
        top: 6px;
        &:hover {
          cursor: pointer;
        }
      }
    }
    .title {
      color: white;
      font-size: 18px;
      width: fit-content;
      margin-bottom: 12px;
    }
  }
  .search_btn {
    width: 70px;
    color: white;
    margin-right: 12px;
    border: 0;
    background: linear-gradient(135deg, rgba(93, 242, 203, 1) 0%, rgba(48, 147, 218, 1) 100%);
    &:hover {
      filter: hue-rotate(10deg) brightness(0.7);
      cursor: pointer;
    }
  }
  .refresh_btn {
    margin-bottom: 4px;
    &:hover {
      cursor: pointer;
      filter: hue-rotate(10deg) brightness(0.7);
    }
  }
  .ant-form-item {
    margin-bottom: 0;
  }
  > .ant-row {
    margin-bottom: 32px;
  }
}
</style>
