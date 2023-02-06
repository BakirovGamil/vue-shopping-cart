<template>
  <div
    class="shopping-cart"
    :class="{
      'shopping-cart_open': isOpen,
    }"
  >
    <button class="shopping-cart__btn" @click="handleToogleCart">
      <span v-if="isOpen">X</span>
      <cart-icon v-else :quantity="quantity" />
    </button>
    <div class="shopping-cart__body">
      <div class="shopping-cart__header">
        <cart-icon class="shopping-cart__icon" :quantity="quantity" />
        <span class="shopping-cart__title">Cart</span>
      </div>
      <div class="shopping-cart__list">
        <p class="shopping-cart__empty" v-if="!cart.length">
          Add some products in the cart <br />:)
        </p>
        <cart-item
          v-for="product in cart"
          :key="product._uid"
          :product="product"
          @incrementQuantity="incrementQuantity"
          @decrementQuantity="decrementQuantity"
          @remove="remove"
        />
      </div>
      <div class="shopping-cart__footer">
        <p class="shopping-cart__total">TOTAL</p>
        <div class="shopping-cart__total-value">$ {{ total.toFixed(2) }}</div>
        <button class="shopping-cart__checkout">CHECKOUT</button>
      </div>
    </div>
  </div>
</template>

<script>
import CartIcon from '@/components/ShoppingCart/CartIcon/CartIcon.vue';
import CartItem from '@/components/ShoppingCart/CartItem/CartItem.vue';

export default {
  name: 'ShoppingCart',
  components: {
    CartIcon,
    CartItem,
  },
  emits: {
    remove: (v) => typeof v === 'object',
    incrementQuantity: (v) => typeof v === 'object',
    decrementQuantity: (v) => typeof v === 'object',
  },
  props: {
    cart: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    handleToogleCart() {
      this.isOpen = !this.isOpen;
    },
    remove(product) {
      this.$emit('remove', product);
    },
    incrementQuantity(product) {
      this.$emit('incrementQuantity', product);
    },
    decrementQuantity(product) {
      this.$emit('decrementQuantity', product);
    },
  },
  computed: {
    total() {
      return this.cart.reduce(
        (prev, product) => prev + product.price * product.quantity,
        0
      );
    },
    quantity() {
      return this.cart.reduce((prev, product) => prev + product.quantity, 0);
    },
  },
  watch: {
    cart: {
      deep: true,
      
      handler() {
        if(!this.isOpen) {
          this.isOpen = true;
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
.shopping-cart {
  position: fixed;
  background-color: rgb(27, 26, 32);
  height: 100%;
  width: 450px;
  top: 0;
  right: 0;
  transform: translate(100%, 0);
  z-index: 99;
  transition: transform 0.2s ease 0s;

  &__empty {
    color: rgb(236, 236, 236);
    text-align: center;
    line-height: 40px;
    margin: 10px 0;
  }

  &__btn {
    border: 0px;
    padding: 0px;
    width: 50px;
    height: 50px;
    color: rgb(236, 236, 236);
    background-color: rgb(27, 26, 32);
    text-align: center;
    line-height: 50px;
    position: absolute;
    top: 0px;
    left: -50px;
    cursor: pointer;
    z-index: 2;

    span {
      color: white;
    }
  }

  @include forMobile {
    width: 100%;

    &_open &__btn {
      left: 0;
    }
  }

  &__body {
    overflow-y: scroll;
    height: 100%;

    &::-webkit-scrollbar {
      appearance: none;
      width: 10px;
      background-color: rgba(0, 0, 0, 0.2);
      padding: 10px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background-color: rgb(12, 11, 16);
    }
  }

  &_open {
    transform: translate(0, 0);
  }

  &__icon {
    margin: 0 15px 0 0;
    vertical-align: middle;
  }

  &__header {
    padding: 45px 0px;
    color: white;
    text-align: center;
  }

  &__title {
    font-weight: bold;
    font-size: 1.2em;
    vertical-align: middle;
  }

  &__list {
    position: relative;
    min-height: 280px;
    padding-bottom: 200px;
  }

  &__footer {
    padding: 5%;
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 200px;
    z-index: 2;
    background-color: rgb(27, 26, 32);

    &::before {
      content: '';
      width: 100%;
      height: 20px;
      display: block;
      position: absolute;
      top: -20px;
      left: 0px;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.2), transparent);
    }
  }

  &__total {
    width: 20%;
    color: rgb(91, 90, 94);
    vertical-align: middle;
    display: inline-block;
    margin: 1rem 0;

    &-value {
      width: 80%;
      text-align: right;
      vertical-align: middle;
      display: inline-block;
      color: rgb(234, 191, 0);
      font-size: 22px;
    }
  }

  &__checkout {
    width: 100%;
    border: 0px;
    color: rgb(236, 236, 236);
    text-transform: uppercase;
    background-color: rgb(12, 11, 16);
    text-align: center;
    padding: 15px 0px;
    margin-top: 40px;
    cursor: pointer;
    outline: none;
    transition: background-color 0.2s ease 0s;
  }
}
</style>
