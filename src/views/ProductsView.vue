<template>
  <main>
    <product-list/>
  </main>
</template>

<script>
import ProductList from '@/components/ProductList/ProductList.vue';

export default {
  name: 'ProductsView',
  components: {
    ProductList
  }
};
</script>