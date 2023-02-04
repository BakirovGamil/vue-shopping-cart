<template>
  <main>
    <div class="wrapper">
      <shopping-cart
        :cart="cart"
        @incrementQuantity="incrementQuantity"
        @decrementQuantity="decrementQuantity"
        @remove="remove"
      />
      <dual-ring-loader :loading="isLoading" class="loader" />
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
        <product-list :products="filteredProducts" @addToCart="addToCart" />
      </div>
    </div>
  </main>
</template>

<script>
import ProductApi from '@/api/ProductApi';
import ProductList from '@/components/ProductList/ProductList.vue';
import ProductFilter from '@/components/ProductFilter/ProductFilter.vue';
import DualRingLoader from '@/components/DualRingLoader/DualRingLoader.vue';
import ShoppingCart from '@/components/ShoppingCart/ShoppingCart.vue';

export default {
  name: 'ProductsView',
  FILTER_PROPERTY: 'availableSizes',
  components: {
    ProductList,
    ProductFilter,
    DualRingLoader,
    ShoppingCart,
  },
  data() {
    return {
      products: [],
      filteredProducts: [],
      isLoadingProducts: false,
      cart: [],
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
    },
    addToCart(product) {
      const newProduct = {
        ...product,
        quantity: 1,
      };

      const isInCart = Boolean(this.cart.find((p) => p.id === product.id));
      if (isInCart) {
        this.cart = this.cart.map((p) => {
          if (p.id === product.id) {
            return { ...p, quantity: p.quantity + 1 };
          }

          return p;
        });

        return;
      }

      this.cart.push(newProduct);
    },
    remove(product) {
      this.cart = this.cart.filter(p => p.id !== product.id);
    },
    incrementQuantity(product) {
      this.cart = this.cart.map(p => {
        if(p.id === product.id) {
          return {...p, quantity: p.quantity + 1};
        }

        return p;
      });
    },
    decrementQuantity(product) {
      this.cart = this.cart.map(p => {
        if(p.id === product.id) {
          return {...p, quantity: p.quantity - 1};
        }

        return p;
      });
    },
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
  margin: 10px 0;
  padding: 0 0 0 10px;
}
</style>
