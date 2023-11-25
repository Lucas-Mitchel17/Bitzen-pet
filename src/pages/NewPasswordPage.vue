<script setup>
import { computed, ref } from "vue";
import { AuthLayout } from "src/layouts";
import { BaseText } from "src/components/ui/base";

const password = ref("");
const confirmPassword = ref("");

const inputsInfo = computed(() => [
  {
    type: "password",
    size: "is-full",
    label: "Nova senha",
    model: password,
    placeholder: "Crie uma nova senha",
    errorMessage: "Campo obrigatório",
  },
  {
    type: "password",
    size: "is-full",
    label: "Confirmar nova senha",
    model: confirmPassword,
    placeholder: "Repita a senha",
    errorMessage: "Campo obrigatório",
  },
]);
</script>

<template>
  <q-page padding class="new-password">
    <AuthLayout
      has-image
      back-button
      back-button-link="#"
      href-submit="#"
      submit-label="Próximo"
    >
      <template #title>
        <BaseText tag="h2" class="auth-title"> Crie uma nova senha </BaseText>
      </template>

      <template #description>
        <BaseText class="description">
          Crie uma nova senha de acesso à sua conta.
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
.new-password {
  display: grid;
  place-items: center;
}
</style>
