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
  data() {
    return {
      imageUrl: new URL(
        '/src/assets/products/876661122392077-1-product.webp',
        import.meta.url
      ).href,
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
    imgStyleObject() {
      return {
        background: `url(${this.imageUrl}) center/cover no-repeat`,
      };
    },
  },
  watch: {
    hovered() {
      let imgPath = '/src/assets/products/876661122392077-1-product.webp';
      if (this.hovered) {
        imgPath = '/src/assets/products/876661122392077-2-product.webp';
      }

      this.imageUrl = new URL(imgPath, import.meta.url).href;
    },
  },
};
</script>

<style scoped lang="scss">
.product-item {
  max-width: 220px;
}
.image {
  height: 320px;
}
.title {
  margin: 16px 0;
  height: 45px;
  padding: 0 20px;
  text-align: center;
  position: relative;

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
