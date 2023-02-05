<template>
  <div class="sort" :class="{ sort_open: isOpenDropDown }" @click.stop>
    <button class="sort__btn" @click="toggleDropDown">
      <div class="sort__title" :class="{ sort__title_open: isOpenDropDown }">
        Sort
      </div>
    </button>
    <div class="dropdown" v-show="isOpenDropDown">
      <ul class="dropdown__list">
        <li
          v-for="sort in availableSorts"
          :key="sort"
          @click="select(sort)"
          class="dropdown__item"
          :class="{
            dropdown__item_current: sort === selectedSort,
          }"
        >
          {{ sort }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductSort',
  emits: {
    'update:modelValue': (v) => ['string', 'number'].includes(typeof v),
  },
  props: {
    modelValue: {
      type: [String, Number],
      required: false,
      default: 'Recomended',
    },
    availableSorts: {
      type: Array,
      required: false,
      default: () => ['Recomended', 'Price high to low', 'Price low to high'],
    },
  },
  data() {
    return {
      isOpenDropDown: false,
      selectedSort: this.modelValue,
    };
  },
  mounted() {
    document.addEventListener('click', this.closeDropDown);
  },
  unmounted() {
    document.removeEventListener('click', this.closeDropDown);
  },
  methods: {
    select(selectedSort) {
      this.selectedSort = selectedSort;
      this.$emit('update:modelValue', selectedSort);
      this.closeDropDown();
    },
    toggleDropDown() {
      this.isOpenDropDown = !this.isOpenDropDown;
    },
    closeDropDown() {
      if (this.isOpenDropDown) {
        this.isOpenDropDown = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.sort {
  position: relative;
  cursor: pointer;

  &_open {
    box-shadow: 0 5px 13px -2px rgba(45, 45, 45, 80%);
    position: relative;

    &::before {
      content: '';
      z-index: 1;
      display: block;
      height: 1px;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-color: #0770cf;
    }
  }

  &__title {
    &::after {
      --image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='10' height='7' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.057 3.566 7.974.649l1.414 1.414-4.243 4.243-.088-.089-.084.085L.73 2.06 2.141.65l2.916 2.916Z' fill-rule='evenodd'/%3E%3C/svg%3E");
      background-color: #666;
      color: #666;
      content: '';
      height: 8px;
      -webkit-mask: var(--image) 50%;
      mask: var(--image) 50%;
      position: absolute;
      right: 10px;
      top: 16px;
      width: 8px;
    }

    &_open::after {
      background-color: #0770cf;
      transform: rotate(180deg);
    }
  }

  &__btn {
    display: block;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #ddd;
    border-radius: 0;
    border-top: 1px solid #ddd;
    color: #666;
    height: 42px;
    letter-spacing: 0.3px;
    line-height: 1.12;
    padding: 3px 20px 3px 6px;
    position: relative;
    text-align: left;
    width: 100%;

    &::before {
      border-top: 1px solid var(--na3s62);
      bottom: -1px;
      content: '';
      height: 0;
      left: 9px;
      position: absolute;
      right: 9px;
      width: calc(100% - 18px);
    }
  }
}
.dropdown {
  background-color: #eee;
  box-shadow: 0 5px 13px -2px rgba(45, 45, 45, 80%);
  box-sizing: border-box;
  display: block;
  padding: 0;
  position: absolute;
  top: 42px;
  width: 356px;
  z-index: 9000;
  cursor: default;

  &__list {
    padding: 10px;
  }

  &__item {
    background-color: #fff;
    border-radius: 5px;
    box-sizing: border-box;
    color: #2d2d2d;
    cursor: pointer;
    display: block;
    font-family: futura-pt, sans-serif;
    font-size: 16px;
    font-weight: 400;
    height: 100%;
    height: 44px;
    line-height: 1.12;
    list-style-type: none;
    margin: 0 0 8px;
    padding: 14px;
    position: relative;
    text-align: left;
    text-decoration: none;
    width: 100%;

    &:hover {
      box-shadow: -2px 2px 2px 0 rgba(45, 45, 45, 9%);
    }

    &_current {
      background-color: #0770cf;
      color: #fff;
      font-weight: 700;
    }
  }
}
</style>