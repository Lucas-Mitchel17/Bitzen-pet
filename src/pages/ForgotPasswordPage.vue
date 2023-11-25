<script setup>
import { reactive } from "vue";
import { AuthLayout } from "src/layouts";
import { BaseText } from "src/components/ui/base";

const fields = reactive([
  {
    type: "email",
    size: "is-full",
    label: "Email",
    model: "",
    placeholder: "Insira seu e-mail",
    errorMessage: "Campo obrigatório",
  },
]);
</script>

<template>
  <q-page padding class="forgot-password">
    <AuthLayout
      hasImage
      backButton
      backButtonLink="/login"
      hrefSubmit="#"
      submitLabel="Próximo"
    >
      <template #title>
        <BaseText tag="h2" class="auth-title"> Esqueceu sua senha? </BaseText>
      </template>

      <template #description>
        <BaseText class="description">
          Vamos te ajudar nisso! Primeiro, digite seu e-mail cadastrado ao criar
          a sua conta.
        </BaseText>
      </template>

      <template #input>
        <q-input
          v-model="field.model"
          v-for="field in fields"
          lazy-rules
          outlined
          stack-label
          :class="field.size"
          :label="field.label"
          :key="field.label"
          :placeholder="field.placeholder"
          :rules="[(val) => (val && val.length > 0) || field.errorMessage]"
          :type="field.type"
        />
      </template>
    </AuthLayout>
  </q-page>
</template>

<style lang="scss" scoped>
.forgot-password {
  display: grid;
  place-items: center;
}
</style>
