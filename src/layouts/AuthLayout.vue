<script setup>
import { BaseText } from "src/components/ui/base";
import { computed, ref } from "vue";

const checkbox = ref(false);

const props = defineProps({
  formSize: {
    type: String,
    default: "is-small",
  },
  title: String,
  hasImage: Boolean,
  inputSize: {
    type: String,
    default: "is-full",
  },
  inputLabel: String,
  inputType: String,
  model: String,
  placeholder: String,
  errorMessage: String,
  hrefSubmit: {
    type: String,
    required: true,
  },
  submitLabel: {
    type: String,
    required: true,
  },
  hasCheckbox: Boolean,
  resetPassword: Boolean,
});

const sizes = computed(() => {
  const defaultFormSizes = props.formSize;

  return ["auth-section", defaultFormSizes];
});

const inputSize = computed(() => {
  const defaultInputSizes = props.inputSize;

  return [defaultInputSizes];
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

    <slot name="main-title"></slot>

    <slot name="title"></slot>

    <slot name="sign-up-in"></slot>

    <slot name="description"></slot>

    <q-form class="q-gutter-md auth-form">
      <slot name="input"></slot>

      <div class="auth-check-pass">
        <div class="auth-checkbox">
          <q-checkbox
            class="auth-checkbox-icon"
            v-model="checkbox"
            v-if="hasCheckbox"
          />

          <BaseText v-if="hasCheckbox" class="auth-checkbox-label">
            <slot name="checkboxLabel"></slot>
          </BaseText>
        </div>

        <div v-if="resetPassword" class="auth-forgot-password">
          <router-link to="#">
            <BaseText class="is-blue"> Esqueceu sua senha? </BaseText>
          </router-link>
        </div>
      </div>
    </q-form>

    <router-link class="auth-submit" :to="hrefSubmit">
      <q-btn
        type="submit"
        class="btn is-blue is-sign-up is-full"
        :label="submitLabel"
      />
    </router-link>

    <slot name="send-code"></slot>
  </section>
</template>

<style lang="scss">
.auth-section {
  &.is-small {
    max-width: 704px;
    width: 100%;
    padding: 63px 64px 80px;
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

  & > .auth-form {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
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

          // TODO -> Verificar um jeito de passar essa classe como prop ou algo do tipo para o caso de ser a tela de Cadastro
          &.is-sign-up {
            color: neutral500;
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

  & > .auth-submit {
    width: 100%;
  }
}
</style>
