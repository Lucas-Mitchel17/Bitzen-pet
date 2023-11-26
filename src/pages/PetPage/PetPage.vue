<script setup>
import { BaseText } from "src/components/ui/base";
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { api } from "boot/axios";
import { Notify } from "quasar";
import { apiErrorHandler } from "src/helpers";

const ROUTER = useRouter();
const disabled = ref(false);
const loading = ref(false);
const route = useRoute();
const petId = route.params.id;

const petName = ref("");
const petColor = ref("");
const petAge = ref("");
const petDescription = ref("");
const petImage = ref("");

onMounted(
  async () => await getPetDetails(petId).finally(() => (loading.value = false))
);

async function getPetDetails(id) {
  loading.value = true;

  return await api
    .get(`/pets/${id}`)
    .then((response) => response.data.data)
    .then((data) => {
      petName.value = data.name;
      petColor.value = data.color;
      petAge.value = data.birthdate;
      petDescription.value = data.observation;
      petImage.value = data.image_url;
    })
    .catch((error) => {
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
    });
}
</script>

<template>
  <q-page padding class="pet-page">
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
      <q-btn class="btn is-blue edit-pet-btn">
        <q-tooltip>Em Breve</q-tooltip>
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
    </section>

    <section class="pet-info">
      <div class="pet-image">
        <img :src="petImage" />
      </div>

      <div class="card-infos">
        <div class="pet-id">
          <div class="pet-id-infos">
            <BaseText>
              Nome<br />
              <span class="info-detail">{{ petName }}</span>
            </BaseText>
          </div>

          <div class="pet-id-infos">
            <BaseText>
              Cor<br />
              <span class="info-detail">{{ petColor }}</span>
            </BaseText>
          </div>

          <div class="pet-id-infos">
            <BaseText>
              Idade<br />
              <span class="info-detail">{{ petAge }}</span>
            </BaseText>
          </div>
        </div>

        <div class="pet-description">
          <BaseText>
            Sobre o pet<br />
            <span class="info-detail">{{ petDescription }}</span>
          </BaseText>
        </div>
      </div>
    </section>
  </q-page>
</template>

<style lang="scss">
.pet-page {
  padding-top: 30px;

  & > .actions {
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: space-between;

    @media (min-width: $lg) {
      flex-direction: row;
    }

    & > .edit-pet-btn {
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

  & > .pet-info {
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
}
</style>
