<script setup>
import { BaseText } from "src/components/ui/base";

const emits = defineEmits(["onSelectFile"]);

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
  petImage: {
    type: String,
  },
});
</script>

<template>
  <q-form class="pet-form">
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

    <div class="file-picker">
      <div v-if="!petImage" class="no-file" @click="emits('onSelectFile')">
        <img src="../../../../assets/camera.png" alt="Imagem de uma Camera" />
        <BaseText tag="p" class="file-picker-text"
          >Clique para adicionar<br />
          uma imagem</BaseText
        >
      </div>

      <div v-else class="has-file">
        <img :src="petImage" alt="Imagem do Pet" class="pet-image" />

        <q-btn class="btn is-blue edit-pet-btn" @click="emits('onSelectFile')">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.862 4.48676L18.549 2.79876C18.9007 2.44708 19.3777 2.24951 19.875 2.24951C20.3723 2.24951 20.8493 2.44708 21.201 2.79876C21.5527 3.15044 21.7502 3.62741 21.7502 4.12476C21.7502 4.62211 21.5527 5.09908 21.201 5.45076L10.582 16.0698C10.0533 16.5981 9.40137 16.9865 8.685 17.1998L6 17.9998L6.8 15.3148C7.01328 14.5984 7.40163 13.9464 7.93 13.4178L16.862 4.48676ZM16.862 4.48676L19.5 7.12476M18 13.9998V18.7498C18 19.3465 17.7629 19.9188 17.341 20.3407C16.919 20.7627 16.3467 20.9998 15.75 20.9998H5.25C4.65326 20.9998 4.08097 20.7627 3.65901 20.3407C3.23705 19.9188 3 19.3465 3 18.7498V8.24976C3 7.65302 3.23705 7.08073 3.65901 6.65877C4.08097 6.23681 4.65326 5.99976 5.25 5.99976H10"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <q-tooltip>Atualizar foto</q-tooltip>
        </q-btn>
      </div>
    </div>
  </q-form>
</template>

<style lang="scss">
.pet-form {
  background-color: white;
  border-radius: 8px;
  max-width: 1023px;
  padding: 64px 40px;
  width: 100%;

  @media (min-width: $xxl) {
    padding: 64px 40px 0;
  }

  & > .is-half {
    width: 100%;

    @media (min-width: $xxl) {
      width: 50%;
    }
  }

  & > .is-pet-picture {
    display: none;
  }

  & > .file-picker {
    @media (min-width: $xxl) {
      left: -370px;
      margin: 0;
      max-width: 336px;
      position: absolute;
      top: 0;
      width: 100%;
    }

    & > .no-file {
      align-items: center;
      background-color: #ededed;
      border-radius: 8px;
      border: 1px dashed $neutral400;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: center;
      max-width: 336px;
      min-height: 280px;
      width: 100%;

      & > .file-picker-text {
        color: $neutral700;
        font-size: 14;
        font-weight: 400;
        text-align: center;
      }
    }

    & > .has-file {
      max-width: 336px;
      min-height: 280px;
      height: 280px;
      width: 100%;
      position: relative;

      & > .pet-image {
        border-radius: 8px;
        max-width: 336px;
        min-height: 280px;
        height: 280px;
        object-fit: cover;
        width: 100%;
      }

      & > .edit-pet-btn {
        margin: 0;
        min-height: 28px;
        padding: 5px;
        position: absolute;
        right: 5px;
        top: 5px;

        & svg > path {
          stroke: white;
        }
      }
    }
  }
  .q-field--with-bottom {
    padding-bottom: 50px;
  }

  .q-field--outlined .q-field__control {
    height: auto !important;
  }

  .q-field {
    margin: 0;
  }
}
</style>
