<template>
  <div class="cart-item">
    <button title="remove product from cart" class="cart-item__remove"></button>
    <img
      src="@/assets/products/9197907543445676-1-cart.webp"
      alt="Skater Black Sweatshirt"
      class="cart-item__img"
    />
    <div class="cart-item__info">
      <p class="cart-item__name">Skater Black Sweatshirt</p>
      <p class="cart-item__style-quantity">
        XL | Tony Hawk <br />Quantity: 1
      </p>
    </div>
    <div class="cart-item__price">
      <p :style="{ margin: '1rem 0' }">$ 25.90</p>
      <div>
        <button class="cart-item__decrement cart-item__btn" disabled>-</button>
        <button class="cart-item__increment cart-item__btn">+</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartItem',
};
</script>

<style scoped lang="scss">
.cart-item {
  position: relative;
  box-sizing: border-box;
  padding: 5%;
  transition: background-color 0.2s ease 0s, opacity 0.2s ease 0s;

  &::before {
    content: '';
    width: 90%;
    height: 2px;
    background-color: rgba(0, 0, 0, 0.2);
    position: absolute;
    top: 0px;
    left: 5%;
  }

  &__btn {
    color: rgb(183, 183, 183);
    border: 0px;
    background-color: rgb(0, 0, 0);
    width: 25px;
    height: 25px;

    &:disabled {
      opacity: 0.2;
      cursor: default;
      z-index: 100;
    }
  }

  &__price {
    display: inline-block;
    vertical-align: middle;
    color: rgb(234, 191, 0);
    text-align: right;
    width: 25%;
  }

  &__style-quantity {
    color: rgb(91, 90, 94);
    margin: 0px;
  }

  &__name {
    color: rgb(236, 236, 236);
    margin: 0px;
  }

  &__info {
    width: 57%;
    display: inline-block;
    vertical-align: middle;
  }

  &__img {
    display: inline-block;
    vertical-align: middle;
    width: 15%;
    height: auto;
    margin-right: 3%;
  }

  &__remove {
    width: 16px;
    height: 16px;
    top: 15px;
    right: 5%;
    border-radius: 50%;
    position: absolute;
    background-size: auto 100%;
    background-image: url('@/assets/delete-icon.png');
    background-repeat: no-repeat;
    z-index: 2;
    cursor: pointer;
    border: 0px;
    background-color: transparent;
  }
}
</style>
