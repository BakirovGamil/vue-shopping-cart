<template>
  <main>
    <div class="wrapper">
      <dual-ring-loader :loading="isLoading" class="loader"/>
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
        <product-list :products="filteredProducts"/>
      </div>
    </div>
  </main>
</template>

<script>
import ProductApi from '@/api/ProductApi';
import ProductList from '@/components/ProductList/ProductList.vue';
import ProductFilter from '@/components/ProductFilter/ProductFilter.vue';
import DualRingLoader from '@/components/DualRingLoader/DualRingLoader.vue';

export default {
  name: 'ProductsView',
  components: {
    ProductList,
    ProductFilter,
    DualRingLoader
  },
  FILTER_PROPERTY: 'availableSizes',
  data() {
    return {
      products: [],
      filteredProducts: [],
      isLoadingProducts: false
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    async getProducts() {
      this.isLoading = true;
      const response = await ProductApi.getProducts();

      this.products = response.data.products;
      this.isLoading = false;
      console.log(response.data.products);
    },
    setFilteredProducts(filteredProducts) {
      this.filteredProducts = filteredProducts;
    }
  },
};
</script>

<style scoped lang="scss">
.loader {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

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
