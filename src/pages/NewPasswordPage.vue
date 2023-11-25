<script setup>
import { reactive } from "vue";
import { AuthLayout } from "src/layouts";
import { BaseText } from "src/components/ui/base";

const fields = reactive([
  {
    type: "password",
    size: "is-full",
    label: "Nova senha",
    model: "",
    placeholder: "Crie uma nova senha",
    errorMessage: "Campo obrigatório",
  },
  {
    type: "password",
    size: "is-full",
    label: "Confirmar nova senha",
    model: "",
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
.new-password {
  display: grid;
  place-items: center;
}
</style>
