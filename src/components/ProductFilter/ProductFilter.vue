<template>
  <div class="product-filter">
    <p class="title"><b>Sizes:</b></p>
    <div class="checkbox-container" v-for="size in availableFilters" :key="size">
      <input
        class="checkbox"
        type="checkbox"
        :id="size"
        :value="size"
        v-model="this.filter"
      />
      <label :for="size" class="label">
        <span class="size">{{ size }}</span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductFilter',
  emits: {
    'update:modelValue': (v) => Array.isArray(v),
  },
  props: {
    modelValue: {
      type: Array,
      required: true,
    },
    availableFilters: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      filter: this.modelValue
    }
  },
  watch: {
    filter() {
      this.$emit('update:modelValue', this.filter);
    },
    modelValue() {
      this.filter = this.modelValue;
    }
  }
};
</script>

<style scoped lang="scss">
.title {
  margin: 0 0 20px 0;
}
.checkbox-container {
  position: relative;
  display: inline-block;
  margin: 0 0 10px 0;

  .checkbox {
    opacity: 0;
    position: absolute;

    &:checked + label {
      background-color: rgb(27, 26, 32);
      color: rgb(236, 236, 236);
    }
  }
  .label {
    margin: 0 8px 8px 0;
    display: block;
    font-size: 0.6rem;
    width: 35px;
    height: 35px;
    border-radius: 50px;
    text-align: center;
    position: relative;
    background-color: rgb(236, 236, 236);
    color: rgb(0, 0, 0);
    cursor: pointer;

    &:hover {
      border: 1px solid rgb(27, 26, 32);
    }

    .size {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
