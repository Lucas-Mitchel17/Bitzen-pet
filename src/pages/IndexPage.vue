<script setup>
import { BaseText } from "src/components/ui/base";
</script>

<template>
  <q-page padding class="home">
    <BaseText tag="h1">Bitzen Pet </BaseText>

    <BaseText> Faça login ou cadastre-se para continuar. </BaseText>

    <div class="sign">
      <router-link to="/entrar">
        <q-btn class="btn is-blue">Entrar</q-btn>
      </router-link>

      <router-link to="/cadastro">
        <q-btn class="btn is-blue">Cadastre-se</q-btn>
      </router-link>
    </div>
  </q-page>
</template>

<style lang="scss">
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .text-h1 {
    color: $neutral800;
  }
  .text-p {
    color: $neutral500;
  }
  & > .sign {
    display: flex;
    gap: 10px;
  }
}
</style>
