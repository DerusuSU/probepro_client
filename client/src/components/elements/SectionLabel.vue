<script setup>
defineProps({
  variant: {
    type: String,
    default: 'default'
  }
})
</script>

<template>
<span :class="['sec-label', {'alt': variant === 'alt'}]">
  <slot />
</span>
</template>

<style scoped lang="scss">
.sec-label {
  display: inline-block;
  width: max-content;
  line-height: 100%;
  font-size: 20px;
  font-weight: 500;
  color: $color-text;
  margin-bottom: 24px;

  &.alt {
    color: $color-text-2;
  }
}

@media (max-width: 1024px) {
  .sec-label {
    font-size: 16px;
  }
}

@media (max-width: 768px) {
  .sec-label {
    margin-bottom: 16px;
  }
}
</style>