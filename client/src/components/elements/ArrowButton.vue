<script setup>
defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  direction: {
    type: String,
    default: 'right',
    validator: (value) => ['left', 'right'].includes(value),
  },
  isHovered: Boolean
})
const rotationDegrees = {
  right: '0deg',
  left: '180deg',
}
</script>

<template>
<button :class="{ hovered: isHovered }">
  <svg :style="{ transform: `translate(-50%, -50%) rotate(${rotationDegrees[direction]})` }" width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 9C0.447715 9 0 8.55228 0 8C0 7.44772 0.447715 7 1 7L1 9ZM18.9571 7.29289C19.3476 7.68342 19.3476 8.31658 18.9571 8.70711L12.5931 15.0711C12.2026 15.4616 11.5695 15.4616 11.1789 15.0711C10.7884 14.6805 10.7884 14.0474 11.1789 13.6569L16.8358 8L11.1789 2.34315C10.7884 1.95262 10.7884 1.31946 11.1789 0.928932C11.5695 0.538408 12.2026 0.538408 12.5931 0.928932L18.9571 7.29289ZM1 8L1 7L18.25 7V8V9L1 9L1 8Z" fill="#fff"/>
  </svg>
</button>
</template>

<style scoped lang="scss">
button {
  width: 48px;
  height: 48px;
  background: none;
  border-radius: 50%;
  position: relative;
  cursor: pointer;
  transition: 0.4s all;
  border: 1px solid $color-white;
  &:hover {
    background: $color-white;
    path {
      fill: $color-primary;
    }
  }

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    path {
      transition: 0.4s all;
    }
  }

  &.hovered {
    background: $color-white;
    path {
      fill: $color-primary;
    }
  }
}
</style>