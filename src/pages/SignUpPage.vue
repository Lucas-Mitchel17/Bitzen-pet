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
  <q-page padding class="sign-up">
    <AuthLayout
      form-variation="is-large"
      has-checkbox
      back-button
      back-button-link="/login"
      href-submit="#"
      submit-label="Criar Conta"
    >
      <template #main-title>
        <BaseText tag="h1"> Cadastre-se </BaseText>
      </template>

      <template #description>
        <BaseText class="description">
          Já possui uma conta?
          <RouterLink to="/login">Entrar na plataforma</RouterLink>
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

      <template #checkboxLabel>
        <BaseText class="auth-checkbox-label is-sign-up">
          Li e concordo com os <RouterLink to="#">Termos de uso</RouterLink> e a
          <RouterLink to="#">Política de privacidade</RouterLink> do sistema.
        </BaseText>
      </template>
    </AuthLayout>
  </q-page>
</template>

<style lang="scss" scoped>
.sign-up {
  display: grid;
  place-items: center;
}
</style>
