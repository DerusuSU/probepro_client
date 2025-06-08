<script setup>
defineProps({
  variant: {
    type: String,
    default: 'default'
  }
})
</script>

<template>
<button :class="['button', {'alt': variant === 'alt'}]"><slot></slot></button>
</template>

<style scoped lang="scss">
button {
  height: 48px;
  width: auto;
  background: none;
  color: $color-primary;
  border: 1px solid $color-primary;
  line-height: 48px;
  font-size: 16px;
  font-weight: 700;
  border-radius: 24px;
  padding: 0 24px;
  cursor: pointer;
  transition: 0.3s all;
  outline: none;
  &:hover {
    background: $color-primary;
    color: $color-white;
  }

  &.alt {
    background: none;
    color: $color-white;
    border: 1px solid $color-white;
    &:hover {
      background: $color-white;
      color: $color-primary;
    }
  }
}
</style>