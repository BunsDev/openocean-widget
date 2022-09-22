<template>
  <div class="search-input">
    <input class="search-input__input" type="text" :value="value" @input="inputHandler" v-bind="$attrs" @focus="setFocus(true)"
          @blur="setFocus(false)">
  </div>
</template>

<script>

export default {
  name: 'SearchInput',
  props: {
    value: {
      type: String,
      require: true
    },
    focus: {
      type: Boolean,
      require: false
    }
  },
  data() {
    return {
      isFocus: true,
    };
  },
  methods: {
    setFocus(val){
      this.isFocus = val;
    },
    inputHandler(e) {
      this.$emit('input', e.target.value)
    }
  }
};
</script>

<style lang="scss" scoped>
.search-input {
  position: relative;
}

.search-input__input {
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  line-height: 20px;
  padding: 8px 16px;
  background: var(--background-input);
  border-radius: 8px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: var(--color);
  outline: none;
  -webkit-appearance: none;
  border: 1px solid var(--background-classic-input);
  transition: border-color .3s;

  &::placeholder {
    color: var(--background-input-placeholder);
  }

  &:hover, &:focus {
    border-color: var(--background-classic-input-hover);
  }
}

.search-input__icon {
  position: absolute;
  top: 12px;
  left: 20px;
  font-size: 16px;
  line-height: 18px;
  color: var(--color-des);
}
</style>
