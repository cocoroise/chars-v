<template>
  <a-select
    v-model="selectVal"
    :placeholder="placeholder"
    :allowClear="true"
    :dropdownMatchSelectWidth="false"
    @change="val => $emit('change', val)"
  >
    <a-select-option v-for="{ value, label } in opts" :key="value" :value="value">{{
      label
    }}</a-select-option>
  </a-select>
</template>
<script>
export default {
  name: "SearchSelect",
  data() {
    return {
      opts: [],
      selectVal: this.value,
    };
  },
  props: {
    options: [Function, Array],
    placeholder: String,
    value: {
      required: true,
    },
  },
  watch: {
    value(val) {
      this.selectVal = val;
    },
    selectVal(val) {
      this.$emit("input", val);
    },
  },
  created() {
    if (typeof this.options === "function") {
      this.options().then(res => {
        this.opts = res;
      });
    } else {
      this.opts = this.formatCondition(this.options);
    }
  },
  methods: {
    formatCondition(arr) {
      return (
        arr &&
        arr.map(v => {
          return {
            label: v,
            value: v,
          };
        })
      );
    },
  },
};
</script>
