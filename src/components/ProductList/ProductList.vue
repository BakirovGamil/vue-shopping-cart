<template>
  <div class="product-list">
    <product-item />
    <product-item />
  </div>
</template>

<script>
import ProductItem from '@/components/ProductList/ProductItem/ProductItem.vue';

export default {
  name: 'ProductList',
  components: {
    ProductItem,
  },
};
</script>

<style scoped>
.product-list {
  display: grid;
}
</style>
