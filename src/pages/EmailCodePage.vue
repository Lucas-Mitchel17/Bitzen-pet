<script setup>
import { computed, ref } from "vue";
import { AuthLayout } from "src/layouts";
import { BaseText } from "src/components/ui/base";

const code1 = ref("");
const code2 = ref("");
const code3 = ref("");
const code4 = ref("");

const inputsInfo = computed(() => [
  {
    type: "number",
    size: "is-email-code",
    model: code1,
  },
  {
    type: "number",
    size: "is-email-code",
    model: code2,
  },
  {
    type: "number",
    size: "is-email-code",
    model: code3,
  },
  {
    type: "number",
    size: "is-email-code",
    model: code4,
  },
]);
</script>

<template>
  <q-page padding class="email-code">
    <AuthLayout
      form-variation="is-email-code"
      has-image
      back-button
      back-button-link="/login"
      href-submit="#"
      submit-label="Próximo"
    >
      <template #title>
        <BaseText tag="h2" class="auth-title"> Confira o seu email </BaseText>
      </template>

      <template #description>
        <BaseText class="description">
          Insira nos campos abaixo o código que enviamos para você no seu
          endereço de e-mail.
        </BaseText>
      </template>

      <template #input>
        <q-input
          :v-model="model"
          v-for="{
            label,
            size,
            type,
            model,
            placeholder,
            errorMessage,
          } in inputsInfo"
          lazy-rules
          outlined
          stack-label
          :class="size"
          :label="label"
          :key="label"
          :placeholder="placeholder"
          :rules="[(val) => (val && val.length > 0) || errorMessage]"
          :type="type"
        />
      </template>

      <template #send-code>
        <BaseText class="auth-send-code">
          Não recebeu o código? <RouterLink to="#">Reenviar</RouterLink>
        </BaseText>
      </template>
    </AuthLayout>
  </q-page>
</template>

<style lang="scss" scoped>
.email-code {
  display: grid;
  place-items: center;
}
</style>
