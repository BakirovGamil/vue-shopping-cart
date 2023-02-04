<template>
  <main>
    <div class="wrapper">
      <div class="sidebar">
        <product-filter
          :filter="['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL']"
          :products="products"
          :property="$options.FILTER_PROPERTY"
          @done="setFilteredProducts"
        />
      </div>
      <div class="content">
        <p class="founded">{{ filteredProducts.length }} Product(s) found</p>
        <product-list :products="filteredProducts" />
      </div>
    </div>
  </main>
</template>

<script>
import ProductApi from '@/api/ProductApi';
import ProductList from '@/components/ProductList/ProductList.vue';
import ProductFilter from '@/components/ProductFilter/ProductFilter.vue';

export default {
  name: 'ProductsView',
  components: {
    ProductList,
    ProductFilter,
  },
  FILTER_PROPERTY: 'availableSizes',
  data() {
    return {
      products: [],
      filteredProducts: [],
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    async getProducts() {
      const response = await ProductApi.getProducts();

      this.products = response.data.products;
      console.log(response.data.products);
    },
    setFilteredProducts(filteredProducts) {
      this.filteredProducts = filteredProducts;
    }
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  max-width: 1200px;
  display: grid;
  grid-template-columns: 1fr 4fr;

  @include forMobile {
    grid-template-columns: 1fr;
  }
}
.sidebar {
  padding: 15px;

  @include forMobile {
    display: grid;
    justify-content: center;
  }
}
.founded {
  margin: 10px 0 ;
}
</style>
