<script setup>
const emits = defineEmits(["onSubmitForgotPasswordForm"]);

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
  <q-form
    class="q-gutter-md auth-form"
    @submit="emits('onSubmitForgotPasswordForm')"
  >
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

    <q-btn
      :disable="loading || disabled"
      :loading="loading"
      type="submit"
      class="btn is-blue is-full"
      label="Próximo"
    />
  </q-form>
</template>
