<template>
  <div
    class="product-item"
    @keypress.enter="addToCart"
  >
    <div v-if="product.isFreeShipping" class="free-shipping">Free shipping</div>
    <div class="image">
      <img :src="imgUrl1" :alt="product.title" class="img1"/>
      <img :src="imgUrl2" :alt="product.title" class="img2"/>
    </div>
    <p class="title">{{ product.title }}</p>
    <div class="price">
      <small class="currency">$</small>
      <b>{{ normalizedPrice.integer }}</b>
      <span>.{{ normalizedPrice.decimal }}</span>
    </div>
    <div class="size">
      <span>Size:</span>
      <select v-model="selectedSize" ref="select" class="select" :class="{
        select_invalid: !isSelectedSize
      }">
        <option disabled value="">Please select</option>
        <option
          v-for="size in product.availableSizes"
          :key="size"
          :value="size"
        >
          {{ size }}
        </option>
      </select>
    </div>
    <button
      class="button"
      @click="addToCart"
    >
      Add to cart
    </button>
  </div>
</template>

<script>
export default {
  name: 'ProductItem',
  emits: {
    addToCart: (v) => typeof v === 'object',
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selectedSize: '',
      isSelectedSize: true,
    };
  },

  methods: {
    addToCart() {
      if (!this.selectedSize) {
        this.$refs.select.focus();
        this.isSelectedSize = false;

        return;
      }

      this.$emit('addToCart', {product: this.product, size: this.selectedSize});
    },
  },

  computed: {
    imgUrl1() {
      return new URL(`/src/assets/products/${this.product.sku}-1-product.webp`, import.meta.url).href;
    },
    imgUrl2() {
      return new URL(`/src/assets/products/${this.product.sku}-2-product.webp`, import.meta.url).href;
    },

    normalizedPrice() {
      const integer = this.product.price.toFixed(0);
      const preDecimal = this.product.price.toFixed(2);
      const decimal = preDecimal.substring(preDecimal.length - 2);

      return {
        integer,
        decimal,
      };
    },
  },

  watch: {
    selectedSize() {
      this.isSelectedSize = true;
    }
  }
};
</script>

<style scoped lang="scss">
@keyframes wiggle {
    0% { transform: rotate(0deg); }
   80% { transform: rotate(0deg); }
   85% { transform: rotate(5deg); }
   95% { transform: rotate(-5deg); }
  100% { transform: rotate(0deg); }
}

.select {
  font-size: 16px;
  border: 1px solid rgba(27, 26, 32, 0.7);
  padding: 5px;

  &:focus {
    border: 1px solid rgb(234, 191, 0);
  }

  &_invalid {
    border: 1px solid rgba(235, 0, 0, 0.6)  !important;
    animation: wiggle 0.3s;
  }
}
.size {
  margin: 16px 0;
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
}
.product-item {
  position: relative;

  &:hover {
    .button {
      background: rgb(234, 191, 0);
    }

    .img2 {
      display: inline-block;
    }
  }
}
.free-shipping {
  position: absolute;
  color: rgb(236, 236, 236);
  top: 10px;
  right: 10px;
  padding: 5px;
  font-size: 0.6em;
  background-color: rgb(27, 26, 32);
  cursor: default;
  z-index: 1;
}
.image {
  height: 320px;
  position: relative;

  img {
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  .img2 {
    display: none;
  }
}
.title {
  margin: 16px 0;
  height: 45px;
  padding: 0 20px;
  text-align: center;
  position: relative;

  @include forMobile {
    font-size: 0.8rem;
  }

  &::before {
    content: '';
    display: block;
    width: 20px;
    height: 2px;
    background-color: rgb(234, 191, 0);
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
}

.price {
  text-align: center;
  margin: 0 0 10px 0;

  b {
    font-size: 1.5rem;
  }
}

.currency {
  margin: 0 5px 0 0;
}
.button {
  text-align: center;
  width: 100%;
  padding: 15px 0;
  background-color: rgb(27, 26, 32);
  transition: background-color 0.2s ease 0s;
  cursor: pointer;
  color: white;
}
</style>
