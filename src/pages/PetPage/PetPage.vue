<script setup>
import { BaseText } from "src/components/ui/base";
import { onBeforeMount, reactive, ref, watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";
import { api } from "boot/axios";
import { itemDetails, updateItem } from "src/services/pets";
import { Notify } from "quasar";
import { apiErrorHandler, formHelper } from "src/helpers";

const { getPayload } = formHelper();
const ROUTER = useRouter();
const disabled = ref(false);
const loading = ref(false);
const route = useRoute();
const isEditing = ref(route.path.includes("edit"));

const petId = route.params.id;

const petName = ref("");
const petColor = ref("");
const petDescription = ref("");
const petImage = ref("");
const petBirthdate = ref("");

const petFile = ref("");

const petData = reactive({
  name: "",
  color: "",
  age: "",
  birthdate: "",
  description: "",
  image: "",
});

watchEffect(() => {
  isEditing.value = route.path.includes("edit");
});

const fields = reactive([
  {
    name: "name",
    type: "text",
    size: "is-half",
    label: "Nome",
    model: petName,
    placeholder: "Nome do pet",
    errorMessage: "",
  },
  {
    name: "color",
    type: "text",
    size: "is-half",
    label: "Cor",
    model: petColor,
    placeholder: "Cor do pet",
    errorMessage: "",
  },
  {
    name: "birthdate",
    type: "date",
    size: "is-half",
    label: "Data de Nascimento",
    model: petBirthdate,
    placeholder: "Selecione",
    errorMessage: "",
  },
  {
    name: "observation",
    type: "textarea",
    size: "is-half",
    label: "Sobre o pet",
    model: petDescription,
    placeholder: "Escreva um pequeno texto sobre o pet",
    errorMessage: "",
  },
  {
    name: "image",
    type: "file",
    size: "is-pet-picture",
    label: "Foto",
    model: petFile,
    placeholder: "Clique para adicionar uma imagem",
    errorMessage: "",
    multiple: false,
  },
]);

onBeforeMount(async () => await getPetDetails(petId));

async function getPetDetails(id) {
  loading.value = true;
  try {
    const { data } = await itemDetails(id, ROUTER);

    Object.assign(petData, data);
    petData.description = data.observation;
    petData.image = data.image_url;

    petName.value = data.name;
    petColor.value = data.color;
    petDescription.value = data.observation;
    petBirthdate.value = data.birthdate;
    petImage.value = data.image_url;
  } catch (error) {
    const { message, data } = apiErrorHandler(error);

    if (data) {
      Notify.create({ type: "negative", message });

      fields.forEach((field) => {
        const hasKey = data.hasOwnProperty(field.name);

        if (hasKey) {
          field.errorMessage = data[field.name][0];
        }
      });
    }
  } finally {
    loading.value = false;
  }
}

function selectFile() {
  const input = document.querySelector(".is-pet-picture");
  input.addEventListener("change", handleFileChange);
  input.click();
}

function handleFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    const imageURL = URL.createObjectURL(file);

    petFile.value = [file];
    petImage.value = imageURL;
  }
}

async function onSubmit() {
  const payload = getPayload(fields);

  loading.value = true;
  await updatePet(payload).finally(() => (loading.value = false));
}

async function updatePet(payload) {
  try {
    await updateItem(petId, payload, ROUTER);

    petData.description = petDescription.value;
    petData.image = petImage.value;
    petData.birthdate = petBirthdate.value;
    petData.color = petColor.value;
    petData.name = petName.value;

    Notify.create({
      type: "positive",
      message: "Pet atualizado com sucesso!",
    });

    ROUTER.push(`/pet/${petId}`);
  } catch (error) {
    const { message, data } = apiErrorHandler(error);

    if (message === "MISSING_AUTH") {
      ROUTER.push("/entrar");
      return;
    }

    if (data) {
      Notify.create({ type: "negative", message });

      fields.forEach((field) => {
        const hasKey = data.hasOwnProperty(field.name);

        if (hasKey) {
          field.errorMessage = data[field.name][0];
        }
      });
    }
  }
}
</script>

<template>
  <q-page padding class="pet-page">
    <section class="show-pet" v-if="!isEditing">
      <section class="actions">
        <router-link to="/seus-pets">
          <q-btn class="btn is-back">
            <svg
              fill="none"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.5 19.5L3 12M3 12L10.5 4.5M3 12H21"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Voltar
          </q-btn>
        </router-link>

        <router-link :to="`/pet/${petId}/edit`">
          <q-btn class="btn is-blue edit-pet-btn">
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

            Editar
          </q-btn>
        </router-link>
      </section>

      <section class="pet-info">
        <div class="pet-image">
          <img :src="petData.image" />
        </div>

        <div class="card-infos">
          <div class="pet-id">
            <div class="pet-id-infos">
              <BaseText>
                Nome<br />
                <span class="info-detail">{{ petData.name }}</span>
              </BaseText>
            </div>

            <div class="pet-id-infos">
              <BaseText>
                Cor<br />
                <span class="info-detail">{{ petData.color }}</span>
              </BaseText>
            </div>

            <div class="pet-id-infos">
              <BaseText>
                Idade<br />
                <span class="info-detail">{{ petData.age }}</span>
              </BaseText>
            </div>
          </div>

          <div class="pet-description">
            <BaseText>
              Sobre o pet<br />
              <span class="info-detail">{{ petData.description }}</span>
            </BaseText>
          </div>
        </div>
      </section>
    </section>

    <section class="form" v-else>
      <div class="pet-form">
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
          <div v-if="!petImage" class="no-file" @click="selectFile()">
            <img src="../../assets/camera.png" alt="Imagem de uma Camera" />
            <BaseText tag="p" class="file-picker-text"
              >Clique para adicionar<br />
              uma imagem</BaseText
            >
          </div>

          <div v-else class="has-file">
            <img :src="petImage" alt="Imagem do Pet" class="pet-image" />
            <q-btn class="btn is-blue edit-pet-btn" @click="selectFile()">
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
      </div>

      <q-btn
        class="btn is-blue is-full new-pet-btn"
        label="Atualizar Pet"
        @click="onSubmit"
        :loading="loading"
      />
    </section>
  </q-page>
</template>

<style lang="scss">
.pet-page {
  padding-top: 30px;

  & > .show-pet > .actions {
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: space-between;

    @media (min-width: $lg) {
      flex-direction: row;
    }

    & > a > .edit-pet-btn {
      margin: 0;
      max-width: 213px;
      width: 100%;

      svg {
        margin-right: 7px;

        & > path {
          stroke: white;
        }
      }

      &:hover {
        svg > path {
          stroke: $blue;
        }
      }
    }
  }

  & > .show-pet > .pet-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 32px;
    margin-top: 40px;

    @media (min-width: $lg) {
      flex-direction: row;
    }

    & > .pet-image {
      max-width: 336px;
      width: 100%;
      height: 280px;

      & > img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }

    & > .card-infos {
      box-shadow: 2px 2px 16px 0 #0000000a;
      background-color: white;
      display: flex;
      flex-direction: column;
      gap: 56px;
      height: auto;
      padding: 50px 0px;
      width: 100%;

      @media (min-width: $lg) {
        padding: 50px 40px;
        height: 280px;
      }

      & > .pet-id {
        display: flex;
        flex-direction: column;
        gap: 20px;

        @media (min-width: $lg) {
          flex-direction: row;
          gap: 88px;
        }
      }

      .pet-id-infos,
      .pet-description {
        & > .text-p {
          font-size: 16px;
          line-height: 24px;
          font-weight: 500;
          color: $neutral800;

          & > .info-detail {
            font-weight: 400;
            color: $neutral600;
          }
        }
      }
    }
  }

  .form {
    align-items: center;
    display: flex;
    flex-direction: column;
    padding-top: 65px;
    position: relative;

    @media (min-width: $xxl) {
      align-items: flex-end;
    }

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
          position: absolute;
          top: 65px;
          left: 0;
          max-width: 336px;
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
    }

    .new-pet-btn {
      max-width: 1023px;
    }

    .q-field--with-bottom {
      padding-bottom: 50px;
    }

    .q-field--outlined .q-field__control {
      height: auto !important;
    }
  }
}
</style>
