<script setup>
import { computed, ref } from "vue";
import { AuthLayout } from "src/layouts";
import { BaseText } from "src/components/ui/base";

const email = ref("");

const inputsInfo = computed(() => [
  {
    type: "email",
    size: "is-full",
    label: "Email",
    model: email,
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
    </AuthLayout>
  </q-page>
</template>

<style lang="scss" scoped>
.forgot-password {
  display: grid;
  place-items: center;
}
</style>
