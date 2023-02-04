<template>
  <div class="product-list">
    <product-item
      v-for="product in products"
      :key="product.id"
      :product="product"
      class="product-list__item"
      @addToCart="addToCart"
    />
  </div>
</template>

<script>
import ProductItem from '@/components/ProductList/ProductItem/ProductItem.vue';

export default {
  name: 'ProductList',
  emits: {
    addToCart: (v) => typeof v === 'object',
  },
  components: {
    ProductItem,
  },
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
  methods: {
    addToCart(product) {
      this.$emit('addToCart', product);
    },
  },
};
</script>

<style scoped lang="scss">
.product-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  @include forTablet {
    grid-template-columns: repeat(3, 1fr);
  }
  @include forMobile {
    grid-template-columns: repeat(2, 1fr);
  }
}
.product-list__item {
  padding: 10px;
  margin: 0 0 30px 0;
}
</style>
