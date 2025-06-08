<script setup>
defineProps({
  variant: {
    type: String,
    default: 'default'
  }
})

const emit = defineEmits(['click']);
</script>

<template>
<button :class="['button', {'alt': variant === 'alt'}]" @click="$emit('click')">
  <span class="icon">
    <slot name="icon"></slot>
  </span>
  <slot name="text"></slot>
</button>
</template>

<style scoped lang="scss">
button {
  border: none;
  outline: none;
  cursor: pointer;
  background: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 16px;
  font-size: 20px;
  font-weight: 500;
  color: $color-white;
  letter-spacing: -0.02em;
  transition: 0.3s all;

  &:hover {
    column-gap: 24px;
  }

  .icon {
    display: flex;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: $color-white;
    justify-content: center;
    align-items: center;
    transition: 0.3s all;

    img {
      width: 20px;
      height: 20px;
    }
  }

  &.alt {
    flex-direction: row-reverse;
  }


}
</style>