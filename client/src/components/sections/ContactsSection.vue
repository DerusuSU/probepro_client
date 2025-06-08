<script setup>
import {ref} from 'vue';
import SectionLabel from "@/components/elements/SectionLabel.vue";
import Button from "@/components/elements/Button.vue";

const name = ref('');
const phone = ref('');
const company = ref('');
const email = ref('');
const task = ref('');
const agreed = ref(false);

const submitForm = () => {
  if (agreed.value) {
    console.log({
      name: name.value,
      phone: phone.value,
      company: company.value,
      email: email.value,
      task: task.value
    });
  } else {
    alert('Пожалуйста, согласитесь с политикой конфиденциальности');
  }
};
</script>

<template>
  <section class="contacts-sec">
    <div class="contacts-sec__wrapper">
      <SectionLabel>Обратная связь</SectionLabel>
      <div class="contacts-sec__heading">
        <h2 class="contacts-sec__title">Оставьте заявку — и получите консультацию от специалиста. Мы всегда на связи и
          готовы к диалогу.</h2>
        <p class="contacts-sec__description">Оставьте заявку и мы свяжемся с вами в ближайшее время для обсуждения
          деталей</p>
      </div>
      <div class="contacts-sec__content">
        <div class="contacts-sec__contacts">
          <img src="@/assets/images/contacts.png" alt="">
        </div>
        <div class="contacts-sec__feedback">
          <form @submit.prevent="submitForm" class="form">
            <div class="form__row">
              <input type="text" placeholder="Имя*" required v-model="name"/>
              <input type="tel" placeholder="Телефон*" required v-model="phone"/>
            </div>
            <div class="form__row">
              <input type="text" placeholder="Компания" v-model="company"/>
              <input type="email" placeholder="E-mail" v-model="email"/>
            </div>
            <div class="form__row">
              <textarea placeholder="Задача" v-model="task"></textarea>
            </div>
            <div class="form__footer">
              <label class="custom-checkbox">
                <input type="checkbox" required v-model="agreed"/>
                <span class="checkbox-box"></span>
                <span class="checkbox-label">Согласен с политикой конфиденциальности</span>
              </label>
            </div>
            <Button variant="alt" type="submit" class="form__button">Отправить заявку</Button>
          </form>
          <div class="contacts-sec__feedback-background">
            <img src="../../assets/background/guar-bg-el_3.svg" alt="">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.contacts-sec {
  margin-top: 120px;

  .contacts-sec__wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
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
  }

  &__heading {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  &__title {
    width: 60%;
  }

  &__description {
    width: 35%;
    padding-top: 8px;
  }

  &__content {
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-top: 96px;
    justify-content: space-between;
  }

  &__contacts {
    width: calc(50% - 12px);
    height: auto;
    overflow: hidden;
    border-radius: $radius;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__feedback {
    width: calc(50% - 12px);
    height: auto;
    border-radius: $radius;
    background: $color-primary;
    padding: 40px 32px 32px;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  &__feedback-background {
    position: absolute;
    top: -20px;
    right: -160px;
    width: 100%;
    height: 100%;
    z-index: 0;
    opacity: 20%;

    img {
      position: absolute;
    }
  }
}

.form {
  z-index: 4;

  &__row {
    display: flex;
    gap: 24px;
    margin-bottom: 24px;
    z-index: 5;

    &:nth-child(2) {
      margin-bottom: 40px;
    }

    input, textarea {
      background: transparent;
      border: none;
      border-radius: 0;
      border-bottom: 1px solid #fff;
      color: white;
      width: 100%;
      font-size: 20px;
      line-height: 110%;
      font-weight: 500;
      padding: 8px 16px;
      outline: none;
    }

    textarea {
      height: 160px;
      border: 1px solid #fff;
      border-radius: $radius;
      resize: none;
      padding: 10px;
    }

    input::placeholder, textarea::placeholder {
      color: $color-text-2;
    }
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    margin-top: 20px;
    flex-wrap: wrap;

    label.custom-checkbox {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      user-select: none;
      color: $color-white;

      input[type="checkbox"] {
        display: none;
      }

      .checkbox-box {
        width: 18px;
        height: 18px;
        border: 1px solid white;
        border-radius: $radius-inside;
        position: relative;
        transition: all 0.2s ease;
      }

      input[type="checkbox"]:checked + .checkbox-box {
        background-color: white;
      }

      input[type="checkbox"]:checked + .checkbox-box::after {
        content: "";
        position: absolute;
        top: 1px;
        left: 5px;
        width: 5px;
        height: 10px;
        border: solid #1e6c81;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }

      .checkbox-label {
        font-size: 14px;
        line-height: 1.2;
      }
    }
  }

  &__button {
    margin-top: 32px;
    width: 100%;
  }
}

@media (max-width: 1440px) {
  .contacts-sec {
    &__contacts {
      width: calc(30% - 12px);
    }

    &__feedback {
      width: calc(70% - 12px);
    }
  }
}

@media (max-width: 1200px) {
  .contacts-sec {
    &__heading {
      width: 100%;
      flex-direction: column;
    }

    &__title {
      width: 100%;
    }

    &__description {
      width: 100%;
      padding-top: 16px;
    }

    &__content {
      margin-top: 56px;
    }
  }
}

@media (max-width: 1024px) {
  .contacts-sec {
    &__contacts {
      display: none;
    }

    &__feedback {
      width: 100%;
    }
  }
}

@media (max-width: 768px) {
  .contacts-sec {
    &__feedback {
      padding: 24px 16px;
    }
  }
}

@media (max-width: 500px) {
  .form {
    &__row {
      flex-direction: column;
      gap: 24px;
      margin-bottom: 24px;
      &:nth-child(2) {
        margin-bottom: 56px;
      }
    }
  }
}
</style>