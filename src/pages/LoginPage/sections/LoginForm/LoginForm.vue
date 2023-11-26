<script setup>
import { ref } from "vue";
import { BaseText } from "src/components/ui/base";

const checkbox = ref(false);

const emits = defineEmits(["onSubmitLoginForm"]);

defineProps({
  disabled: {
    required: true,
    type: Boolean,
  },

  fields: {
    required: true,
    type: Array,
  },

  loading: {
    required: true,
    type: Boolean,
  },
});
</script>

<template>
  <q-form class="q-gutter-md auth-form" @submit="emits('onSubmitLoginForm')">
    <q-input
      v-model="field.model"
      v-for="field in fields"
      lazy-rules
      outlined
      stack-label
      :rules="[field.errorMessage]"
      :class="field.size"
      :label="field.label"
      :key="field.label"
      :placeholder="field.placeholder"
      :type="field.type"
      :loading="loading"
      :disable="disabled"
      :error="!!field.errorMessage"
      :mask="field.mask"
    >
      <template #error>
        <div>{{ field.errorMessage }}</div>
      </template>
    </q-input>

    <div class="auth-check-pass">
      <div class="auth-checkbox">
        <q-checkbox class="auth-checkbox-icon" v-model="checkbox" />

        <BaseText class="auth-checkbox-label is-sign-up">
          Manter conectado
        </BaseText>
      </div>

      <div class="auth-forgot-password">
        <router-link to="/esqueceu-sua-senha">
          <BaseText class="is-blue"> Esqueceu sua senha? </BaseText>
        </router-link>
      </div>
    </div>

    <q-btn
      :disable="loading || disabled"
      :loading="loading"
      type="submit"
      class="btn is-blue is-full"
      label="Entrar na plataforma"
    />
  </q-form>
</template>
