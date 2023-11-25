<script setup>
import { BaseText } from "src/components/ui/base";
import { computed, ref } from "vue";

const props = defineProps({
  formVariation: {
    type: String,
    default: "is-small",
  },
  backButton: Boolean,
  backButtonLink: String,
  title: String,
  hasImage: Boolean,
});

const sizes = computed(() => {
  const defaultFormSizes = props.formVariation;

  return ["auth-section", defaultFormSizes];
});
</script>

<template>
  <section :class="sizes">
    <img
      v-if="hasImage"
      src="../assets/Logo.png"
      alt="Logo da Bitzen Pet"
      class="auth-section-image"
    />

    <router-link :to="backButtonLink" v-if="backButton">
      <q-btn type="submit" class="btn is-back">
        <svg
          fill="none"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.5 19.5L3 12M3 12L10.5 4.5M3 12H21"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        Voltar
      </q-btn>
    </router-link>

    <slot name="main-title"></slot>

    <slot name="title"></slot>

    <slot name="description"></slot>

    <!-- TODO remove this -->
    <!-- <q-form class="q-gutter-md auth-form">
      <slot name="fields"></slot>

      <div class="auth-check-pass" v-if="hasCheckbox">
        <div class="auth-checkbox">
          <q-checkbox class="auth-checkbox-icon" v-model="checkbox" />

          <slot name="checkboxLabel"></slot>
        </div>

        <div v-if="resetPassword" class="auth-forgot-password">
          <router-link to="/esqueceu-sua-senha">
            <BaseText class="is-blue"> Esqueceu sua senha? </BaseText>
          </router-link>
        </div>
      </div>
    </q-form>

    <router-link class="auth-submit" :to="hrefSubmit">
      <q-btn type="submit" class="btn is-blue is-full" :label="submitLabel" />
    </router-link>

    <slot name="send-code"></slot> -->
    <!-- TODO remove this -->

    <slot></slot>
  </section>
</template>

<style lang="scss">
.auth-section {
  padding: 50px 10px;

  @media (min-width: $sm) {
    padding: 50px 20px;
  }

  @media (min-width: $lg) {
    padding: 0;
  }

  &.is-small,
  &.is-email-code {
    max-width: 576px;
    width: 100%;
  }

  &.is-large {
    max-width: 949px;
    width: 100%;
  }

  & > .auth-section-image {
    margin-bottom: 50px;
    max-width: 185px;
    width: 100%;
  }

  & > .auth-title {
    color: $neutral900;
    margin-bottom: 18px;
  }

  & > .description {
    color: $neutral800;
    font-size: 16px;
    font-weight: 400;
    line-height: 19.36px;
    margin: 8px 0 30px;

    & > a {
      color: $blue;
      font-weight: 600;
      line-height: 24px;
    }

    &.is-sign-up {
      color: $neutral500;
    }
  }

  & > .auth-form {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    margin-top: 0;
    width: 100%;

    @media (min-width: $lg) {
      flex-direction: row;
      justify-content: space-between;
    }

    & > .is-full {
      width: 100%;
    }
    & > .is-half {
      width: 100%;

      @media (min-width: $lg) {
        max-width: 458px;
      }
    }

    & > .auth-check-pass {
      align-items: center;
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      justify-content: space-between;
      margin-top: 10px;
      margin-bottom: 20px;
      width: 100%;

      .auth-checkbox {
        align-items: center;
        display: flex;

        @media (min-width: $lg) {
          max-height: 22px;
        }

        & > .auth-checkbox-icon {
          width: 36px;

          & > .q-checkbox__inner {
            color: $neutral300;
            left: -10px;
          }
          & > .q-checkbox__inner--truthy {
            color: $blue;
          }
        }

        & > .auth-checkbox-label {
          color: $neutral800;
          font-size: 16px;
          font-weight: 400;
          line-height: 24px;

          &.is-sign-up {
            color: $neutral500;
            font-size: 18px;
            line-height: 22px;
          }

          & > a {
            color: $blue;
            text-decoration: underline;
          }
        }
      }

      .auth-forgot-password > a > .is-blue {
        font-size: 16px;
        font-weight: 600;
        line-height: 24px;
      }
    }
  }

  &.is-email-code > .auth-form {
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;
  }

  & > .auth-send-code {
    color: $neutral800;
    font-size: 16px;
    line-height: 24px;
    margin-top: 30px;
    text-align: center;

    & > a {
      color: $blue;
      font-weight: 600;
    }
  }

  & > .auth-submit {
    width: 100%;
  }
}
</style>
