<template>
  <div class="product-item" @mouseover="mouseOver" @mouseleave="mouseLeave">
    <div class="image" :style="imgStyleObject"></div>
    <p class="title">Black T-shirt with white stripes</p>
    <div class="price">
      <small class="currency">$</small>
      <b>14</b>
      <span>.90</span>
    </div>
    <button
      class="button"
      :class="{
        button_hovered: hovered,
      }"
    >
      Add to cart
    </button>
  </div>
</template>

<script>
export default {
  name: 'ProductItem',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      hovered: false,
    };
  },

  methods: {
    mouseOver() {
      this.hovered = true;
    },

    mouseLeave() {
      this.hovered = false;
    },
  },

  computed: {
    imgUrl() {
      let imgPath = `/src/assets/products/${this.product.sku}-1-product.webp`;
      if (this.hovered) {
        imgPath = `/src/assets/products/${this.product.sku}-2-product.webp`;
      }

      return new URL(imgPath, window.location.origin).href;
    },

    imgStyleObject() {
      return {
        background: `url(${this.imgUrl}) center/cover no-repeat`,
      };
    },
  },
};
</script>

<style scoped lang="scss">
.image {
  height: 320px;
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

  &_hovered {
    background-color: rgb(234, 191, 0);
  }
}
</style>
