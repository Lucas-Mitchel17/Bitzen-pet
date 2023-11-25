<script setup>
import { computed, ref } from "vue";
import { AuthLayout } from "src/layouts";
import { BaseText } from "src/components/ui/base";

const name = ref("");
const email = ref("");
const cpf = ref("");
const phone = ref("");
const password = ref("");
const confirmPassword = ref("");

const inputsInfo = computed(() => [
  {
    type: "text",
    size: "is-full",
    label: "Nome",
    model: name,
    placeholder: "Seu Nome",
    errorMessage: "Campo obrigatório",
  },
  {
    type: "email",
    size: "is-full",
    label: "Email",
    model: email,
    placeholder: "Insira seu e-mail",
    errorMessage: "Campo obrigatório",
  },
  {
    type: "number",
    size: "is-half",
    label: "CPF",
    model: cpf,
    placeholder: "Insira o seu CPF",
    errorMessage: "Campo obrigatório",
  },
  {
    type: "tel",
    size: "is-half",
    label: "Telefone",
    model: phone,
    placeholder: "Insira o seu telefone",
    errorMessage: "Campo obrigatório",
  },
  {
    type: "password",
    size: "is-half",
    label: "Senha",
    model: password,
    placeholder: "Crie uma senha",
    errorMessage: "Campo obrigatório",
  },
  {
    type: "password",
    size: "is-half",
    label: "Confirmar senha",
    model: confirmPassword,
    placeholder: "Repita a senha",
    errorMessage: "Campo obrigatório",
  },
]);
</script>

<template>
  <q-page padding class="login">
    <AuthLayout
      formSize="is-large"
      hasImage
      hasCheckbox
      resetPassword
      hrefSubmit="#"
      submitLabel="Criar Conta"
    >
      <template #main-title>
        <BaseText tag="h1"> Cadastre-se </BaseText>
      </template>

      <template #input>
        <q-input
          v-for="{
            label,
            size,
            type,
            model,
            placeholder,
            errorMessage,
          } in inputsInfo"
          :key="label"
          :label="label"
          :class="size"
          stack-label
          :type="type"
          outlined
          :v-model="model"
          :placeholder="placeholder"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || errorMessage]"
        />
      </template>

      <template #checkboxLabel>
        Li e concordo com os <RouterLink to="#">Termos de uso</RouterLink> e a
        <RouterLink to="#">Política de privacidade</RouterLink> do sistema.
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
