<template>
  <div class="cart-icon">
    <div title="Products in cart quantity" class="cart-icon__quantity">1</div>
  </div>
</template>

<script>
export default {
  name: 'CartIcon'
};
</script>

<style lang="scss" scoped>
.cart-icon {
  background: url('@/assets/cart-icon.png') center/50% no-repeat;
  width: 50px;
  height: 50px;
  display: inline-block;
  position: relative;

  &__quantity {
    display: inline-block;
    width: 15px;
    height: 15px;
    color: rgb(12, 11, 16);
    font-weight: bold;
    font-size: 0.6em;
    text-align: center;
    line-height: 15px;
    border-radius: 50%;
    background-color: rgb(234, 191, 0);
    position: absolute;
    bottom: 4px;
    right: 4px;
  }
}
</style>
>
