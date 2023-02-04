<template>
  <div class="product-filter">
    <p class="title"><b>Sizes:</b></p>
    <div class="checkbox-container" v-for="size in filter" :key="size">
      <input type="checkbox" :id="size" class="checkbox" v-model="filterValue" :value="size"/>
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
    'done': (v) => Array.isArray(v)
  },
  props: {
    filter: {
      type: Array,
      required: true
    },
    products: {
      type: Array,
      required: false,
      default: () => []
    },
    property: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      filterValue: []
    };
  },
  computed: {
    filteredProducts() {
      if(!this.filterValue.length) {
        return this.products;
      }

      return this.products.filter(p => {
        return this.filterValue.some(f => {
          if(Array.isArray(p[this.property])) {
            return p[this.property].some((v) => f === v);
          }
            
          return p[this.property] === f;
        })
      });
    }
  },
  watch: {
    filteredProducts() {
      this.$emit('done', this.filteredProducts);
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
