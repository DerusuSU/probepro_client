<script setup>

import HeroSlider from "@/components/sections/HeroSlider.vue";
</script>

<template>
  <section class="hero-sec">
    <div class="hero-sec__heading">
      <h1>ПРОБЕПРО</h1>
      <span>Проект безовпасного пространства</span>
    </div>
    <div class="hero-sec__bottom">
      <div class="hero-sec__info">
        <span>Профессиональные решения для монтажа и аудита безопасности</span>
        <p>Проект безопасного пространства — компания, специализирующаяся на разработке, установке и обслуживании систем пожарной безопасности для промышленных и коммерческих объектов</p>
      </div>
<!--      <HeroSlider></HeroSlider>-->
      <button class="hero-sec__button">
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.29289 23.7071C7.68342 24.0976 8.31658 24.0976 8.70711 23.7071L15.0711 17.3431C15.4616 16.9526 15.4616 16.3195 15.0711 15.9289C14.6805 15.5384 14.0474 15.5384 13.6569 15.9289L8 21.5858L2.34315 15.9289C1.95262 15.5384 1.31946 15.5384 0.928933 15.9289C0.538409 16.3195 0.538409 16.9526 0.928933 17.3431L7.29289 23.7071ZM8 0L7 4.37114e-08L7 23L8 23L9 23L9 -4.37114e-08L8 0Z" fill="white"/>
        </svg>
      </button>
    </div>
    <img class="hero-sec__background" src="../../assets/images/hero.webp" alt="Изображение обложки" />
  </section>
</template>

<style scoped lang="scss">
.hero-sec {
  width: 100%;
  height: 86dvh;
  min-height: 720px;
  display: flex;
  border-radius: $radius;
  margin-top: 104px;
  position: relative;
  flex-direction: column;


  &__background {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
    border-radius: $radius;
    z-index: -1;
  }

  &__heading {
    align-self: center;
    height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    h1 {
      padding-top: 128px;
      font-size: 128px;
      line-height: 100%;
      font-weight: 800;
      color: $color-white;
      letter-spacing: 0.03em;
    }
    span {
      font-size: 44px;
      line-height: 100%;
      font-weight: 600;
      letter-spacing: -0.03em;
      color: $color-white;
    }
  }

  &__bottom {
    display: flex;
    flex-direction: row;
    height: 40%;
    padding: 24px 32px;
    gap: 24px;
  }

  &__info {
    padding: 40px 32px 16px;
    border-radius: $radius-inside;
    border: 1px solid #A7A7A7;
    background-color: rgba(217, 217, 217, 0.2);
    backdrop-filter: blur(5px);
    width: 50%;
    height: max-content;
    align-self: flex-end;

    span {
      font-size: 24px;
      line-height: 100%;
      font-weight: 600;
      letter-spacing: -0.03em;
      color: $color-white;
    }

    p {
      color: $color-white;
      margin-top: 40px;
    }
  }

  &__button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: 1px solid $color-white;
    background: none;
    align-self: flex-end;
    margin-left: auto;
    cursor: pointer;
  }
}

@media (max-width: 1200px) {
  .hero-sec {
    &__info {
      padding: 24px 24px 16px;

      p {
        margin-top: 24px;
      }
    }
  }
}

@media (max-width: 1024px) {
  .hero-sec {
    &__heading {
      h1 {
        font-size: 12vw;
        text-align: center;
      }
      span {
        font-size: 4vw;
        text-align: center;
      }
    }
    &__info {
      width: 80%;
    }
  }
}

@media (max-width: 768px) {
  .hero-sec {
    min-height: 600px;
    height: 600px;
    &__background {
      border-radius: 0;
    }
    &__heading {
      height: 50%;
    }
    &__bottom {
      height: 50%;
    }
    &__info {
      width: 100%;
    }
    &__button {
      display: none;
    }
  }
}

@media (max-width: 500px) {
  .hero-sec {
    &__heading {
      height: 30%;
    }
    &__bottom {
      padding: 16px;
      height: 70%;
      flex-direction: column;
      justify-content: flex-end;
    }
    &__info {
      height: max-content;
      padding: 8px;
      span {
        font-size: 20px;
      }
    }
  }
}
</style>