<template>
  <main>
    <div class="wrapper">
      <shopping-cart
        :cart="cart"
        @incrementQuantity="incrementQuantity"
        @decrementQuantity="decrementQuantity"
        @remove="remove"
      />
      <dual-ring-loader :loading="isLoadingProducts" class="loader" />
      <div class="sidebar">
        <product-filter
          :availableFilters="['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL']"
          v-model="filter"
        />
        <product-sort
          :availableSorts="[...Object.keys($options.AVAILABLE_SORTS)]"
          v-model="sort"
        />
      </div>
      <div class="content">
        <p class="founded">{{ sortedProducts.length }} Product(s) found</p>
        <product-list :products="sortedProducts" @addToCart="addToCart" />
      </div>
    </div>
    <div class="error" v-if="error">
      An error occurred while downloading products
    </div>
  </main>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';

import ProductApi from '@/api/ProductApi';
import ProductList from '@/components/ProductList/ProductList.vue';
import ProductFilter from '@/components/ProductFilter/ProductFilter.vue';
import DualRingLoader from '@/components/DualRingLoader/DualRingLoader.vue';
import ShoppingCart from '@/components/ShoppingCart/ShoppingCart.vue';
import ProductSort from '@/components/ProductSort/ProductSort.vue';

export default {
  name: 'ProductsView',
  AVAILABLE_SORTS: {
    Recomended: null,
    'Price high to low': (a, b) => b.price - a.price,
    'Price low to high': (a, b) => a.price - b.price,
  },
  components: {
    ProductList,
    ProductFilter,
    DualRingLoader,
    ShoppingCart,
    ProductSort,
  },
  data() {
    return {
      products: [],
      isLoadingProducts: false,
      error: '',

      filter: [],
      sort: Object.keys(this.$options.AVAILABLE_SORTS)[0],

      cart: [],
    };
  },
  created() {
    this.getProducts();
    this.loadCart();

    window.addEventListener('beforeunload', this.saveCart);
  },
  unmounted() {
    window.removeEventListener('beforeunload', this.saveCart);
  },
  methods: {
    saveCart() {
      localStorage.setItem('vueShoppingCart', JSON.stringify(this.cart));
    },
    loadCart() {
      const rawCart = localStorage.getItem('vueShoppingCart');

      if (rawCart) {
        const cart = JSON.parse(rawCart);
        this.cart = cart;
      }
    },
    async getProducts() {
      try {
        this.isLoadingProducts = true;
        const response = await ProductApi.getProducts();
        this.products = response.data.products;
      } catch (e) {
        this.error = e.message;
      } finally {
        this.isLoadingProducts = false;
      }
    },
    addToCart({ product, size }) {
      const newProduct = {
        _uid: uuidv4(),
        ...product,
        quantity: 1,
        size,
      };

      const isInCart = Boolean(
        this.cart.find((p) => p.id === product.id && p.size === size)
      );
      if (isInCart) {
        this.cart = this.cart.map((p) => {
          if (p.id === product.id && p.size === size) {
            return { ...p, quantity: p.quantity + 1 };
          }

          return p;
        });

        return;
      }

      this.cart.push(newProduct);
    },
    remove(product) {
      this.cart = this.cart.filter((p) => p._uid !== product._uid);
    },
    setQuantity(product, newQuantity) {
      this.cart = this.cart.map((p) => {
        if (p._uid === product._uid) {
          return { ...p, quantity: newQuantity };
        }

        return p;
      });
    },
    incrementQuantity(product) {
      this.setQuantity(product, product.quantity + 1);
    },
    decrementQuantity(product) {
      this.setQuantity(product, product.quantity - 1);
    },
  },
  computed: {
    filteredProducts() {
      if (!this.filter.length) {
        return this.products;
      }

      return this.products.filter((p) =>
        p.availableSizes.some((s) => this.filter.includes(s))
      );
    },
    sortedProducts() {
      let compareFn = this.$options.AVAILABLE_SORTS[this.sort];

      if (compareFn === null) {
        return this.filteredProducts;
      }

      return [...this.filteredProducts].sort(compareFn);
    },
  },
};
</script>

<style scoped lang="scss">
.error {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 400px;
  background-color: #fae7ec;
  padding: 10px;
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  margin-top: 20px;
}
.loader {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
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
}
.founded {
  margin: 10px 0;
  padding: 0 0 0 10px;
}
</style>
