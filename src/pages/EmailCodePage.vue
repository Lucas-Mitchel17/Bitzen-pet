<script setup>
import { reactive } from "vue";
import { AuthLayout } from "src/layouts";
import { BaseText } from "src/components/ui/base";

const fields = reactive([
  {
    type: "number",
    size: "is-email-code",
    model: "",
  },
  {
    type: "number",
    size: "is-email-code",
    model: "",
  },
  {
    type: "number",
    size: "is-email-code",
    model: "",
  },
  {
    type: "number",
    size: "is-email-code",
    model: "",
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
          v-model="field.model"
          v-for="field in fields"
          :key="field.label"
          lazy-rules
          outlined
          stack-label
          :class="field.size"
          :label="field.label"
          :placeholder="field.placeholder"
          :rules="[(val) => (val && val.length > 0) || field.errorMessage]"
          :type="field.type"
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
