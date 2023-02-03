<template>
  <div class="product-list">
    <product-item />
    <product-item />
    <product-item />
    <product-item />
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
</style>
