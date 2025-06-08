<script setup>

</script>

<template>
<section class="hero">
  <div class="hero__top">
    <div class="hero__top-left">
      <h1>ПРОЕКТ БЕЗОПАСНОГО ПРОСТРАНСТВА</h1>
      <span class="hero__caption">Проект безопасного пространства — компания, специализирующаяся на разработке, установке и обслуживании систем пожарной безопасности для промышленных и коммерческих объектов</span>
    </div>
    <div class="hero__top-right">
      <img src="../../assets/logo.svg" class="hero__logo" alt="logo" />
    </div>
  </div>
  <div class="hero__bottom">
    <img class="hero__background" src="../../assets/images/hero.png" alt="Изображение обложки" />
  </div>
</section>
</template>

<style scoped lang="scss">
.hero {
  margin-top: 160px;
  padding: 0 88px;

  @media (max-width: 1440px) {
    padding: 0 72px;
  }

  @media (max-width: 1024px) {
    padding: 0 56px;
  }

  @media (max-width: 768px) {
    padding: 0 16px;
  }

  &__top {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-between;
  }

  &__top-right {
    width: 30%;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    img {
      height: 200px;
      width: auto;
    }
  }

  &__top-left {
    width: 70%;
    display: flex;
    flex-direction: column;
    h1 {
      font-size: 64px;
      font-weight: 600;
      line-height: 110%;
      text-transform: uppercase;
      color: $color-black;
    }

    span {
      font-size: 20px;
      font-weight: 500;
      letter-spacing: -0.04em;
      color: $color-text;
      line-height: 145%;
      margin-top: 24px;
    }
  }

  &__bottom {
    width: 100%;
    height: 50vh;
    border-radius: $radius;
    overflow: hidden;
    margin-top: 40px;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
</style>