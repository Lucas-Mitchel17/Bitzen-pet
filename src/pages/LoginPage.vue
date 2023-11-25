<script setup>
import { reactive } from "vue";
import { AuthLayout } from "src/layouts";
import { BaseText } from "src/components/ui/base";

const inputsInfo = reactive([
  {
    type: "email",
    size: "is-full",
    label: "Email",
    model: "",
    placeholder: "Insira seu e-mail",
    errorMessage: "Campo obrigatório",
  },
  {
    type: "password",
    size: "is-full",
    label: "Senha",
    model: "",
    placeholder: "Sua Senha",
    errorMessage: "Campo obrigatório",
  },
]);
</script>

<template>
  <q-page padding class="login">
    <AuthLayout
      has-image
      has-checkbox
      reset-password
      href-submit="#"
      submit-label="Entrar na Plataforma"
    >
      <template #title>
        <BaseText tag="h2" class="auth-title"> Entrar na plataforma </BaseText>
      </template>

      <template #description>
        <BaseText class="description">
          Não tem uma conta?
          <RouterLink to="/cadastro">Cadastre-se gratuitamente</RouterLink>
        </BaseText>
      </template>

      <template #input>
        <q-input
          v-model="input.model"
          v-for="input in inputsInfo"
          :key="input.label"
          lazy-rules
          outlined
          stack-label
          :class="input.size"
          :label="input.label"
          :placeholder="input.placeholder"
          :rules="[(val) => (val && val.length > 0) || input.errorMessage]"
          :type="input.type"
        />
      </template>

      <template #checkboxLabel>
        <BaseText class="auth-checkbox-label"> Manter Conectado </BaseText>
      </template>
    </AuthLayout>
  </q-page>
</template>

<style lang="scss" scoped>
.login {
  display: grid;
  place-items: center;
}
</style>
