<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { Notify } from "quasar";
import { apiErrorHandler } from "src/helpers";
import { api } from "boot/axios";
import { BaseText } from "src/components/ui/base";

const ROUTER = useRouter();

const disabled = ref(false); // Adicionar disabled ao botao de criar quando em loading
const loading = ref(false);
const pets = ref([]);
const pagination = ref(1);
const search = ref();
const confirmationModal = ref(false);

onMounted(
  async () => await getPetsList().finally(() => (loading.value = false))
);

// async function getPetsInfos() {
//   loading.value = true;

//   return await api
//     .get(`/pets/${id}`)
//     .then((response) => response.data)
//     .then(({ data }) => {
//       console.log("Infos", data);
//       pets.value = data;
//     })
//     .catch((error) => {
//       const { message, data } = apiErrorHandler(error);

//       if (message === "MISSING_AUTH") {
//         ROUTER.push("/entrar");
//         return;
//       }

//       if (data) {
//         Notify.create({ type: "negative", message });

//         fields.forEach((field) => {
//           const hasKey = data.hasOwnProperty(field.name);

//           if (hasKey) {
//             field.errorMessage = data[field.name][0];
//           }
//         });
//       }
//     });
// }

async function getPetsList() {
  loading.value = true;

  const URL = search.value ? `/pets/search=${search.value}` : `/pets/`;

  return await api
    .get(URL)
    .then((response) => response.data.data)
    .then(({ data }) => {
      console.log(data);
      pets.value = data;
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
  <q-page padding class="your-pets">
    <section class="pets-search-new">
      <q-input class="input-search" outlined placeholder="Pesquisar um pet">
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>

        <template v-slot:append>
          <q-btn
            :disable="loading || disabled"
            class="btn is-blue is-input-btn"
            label="Buscar"
          />
        </template>
      </q-input>

      <router-link to="/cadastrar-novo-pet">
        <q-btn :disable="loading || disabled" class="btn is-blue new-pet-btn">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            <path
              d="M12 9V15M15 12H9M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          Cadastrar pet
        </q-btn>
      </router-link>
    </section>

    <section class="pets-list">
      <div class="list-title">
        <BaseText tag="h3">Lista de pets</BaseText>
      </div>

      <div class="list-details">
        <ul class="details-list">
          <li class="details-item">Pet</li>
          <li class="details-item">Nome</li>
          <li class="details-item">Idade</li>
          <li class="details-item">Cor</li>
        </ul>
      </div>

      <div class="pet-card-row">
        <ul class="pet-row">
          <li class="pet-card" v-for="(pet, id) in pets" :key="id">
            <div class="pet-infos">
              <div class="pet-info">
                <img class="pet-info pet-image" :src="pet.image_url" />
              </div>

              <BaseText class="pet-info pet-name">
                <span class="details-menu-mobile">Nome:</span>
                {{ pet.name }}
              </BaseText>

              <BaseText class="pet-info pet-age">
                <span class="details-menu-mobile">Idade:</span>
                1 ano
              </BaseText>

              <BaseText class="pet-info pet-color">
                <span class="details-menu-mobile">Cor:</span>
                Pintado
              </BaseText>
            </div>

            <div class="pet-actions">
              <router-link :to="`/pet/${pet.id}`">
                <q-btn class="pet-action-btn">
                  <q-tooltip>Visualizar Pet</q-tooltip>

                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.03589 12.322C1.96688 12.1146 1.96688 11.8904 2.03589 11.683C3.42289 7.51 7.35989 4.5 11.9999 4.5C16.6379 4.5 20.5729 7.507 21.9629 11.678C22.0329 11.885 22.0329 12.109 21.9629 12.317C20.5769 16.49 16.6399 19.5 11.9999 19.5C7.36189 19.5 3.42589 16.493 2.03589 12.322Z"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12Z"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </q-btn>
              </router-link>

              <q-btn
                class="pet-action-btn action-delete-btn"
                @click="confirmationModal = true"
              >
                <q-tooltip>Apagar Pet</q-tooltip>

                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.74 9.00003L14.394 18M9.606 18L9.26 9.00003M19.228 5.79003C19.57 5.84203 19.91 5.89703 20.25 5.95603M19.228 5.79003L18.16 19.673C18.1164 20.2383 17.8611 20.7662 17.445 21.1513C17.029 21.5364 16.4829 21.7502 15.916 21.75H8.084C7.5171 21.7502 6.97102 21.5364 6.55498 21.1513C6.13894 20.7662 5.88359 20.2383 5.84 19.673L4.772 5.79003M19.228 5.79003C18.0739 5.61555 16.9138 5.48313 15.75 5.39303M4.772 5.79003C4.43 5.84103 4.09 5.89603 3.75 5.95503M4.772 5.79003C5.92613 5.61555 7.08623 5.48313 8.25 5.39303M15.75 5.39303V4.47703C15.75 3.29703 14.84 2.31303 13.66 2.27603C12.5536 2.24067 11.4464 2.24067 10.34 2.27603C9.16 2.31303 8.25 3.29803 8.25 4.47703V5.39303M15.75 5.39303C13.2537 5.20011 10.7463 5.20011 8.25 5.39303"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </q-btn>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <q-dialog v-model="confirmationModal" class="confirmation-modal">
      <q-card>
        <q-card-section>
          <BaseText tag="h3">Atenção</BaseText>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <BaseText>
            Você está prestes a apagar os dados do seu Pet. Deseja mesmo fazer
            isso ?
          </BaseText>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn flat label="Apagar" color="warning" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<style lang="scss" scoped>
.your-pets {
  padding-top: 33px;

  & > .pets-search-new {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    gap: 20px;

    @media (min-width: $lg) {
      flex-direction: row;
    }

    & > a > .new-pet-btn {
      min-width: 213px;

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

  & > .pets-list {
    border-radius: 8px;
    box-shadow: 2px 2px 16px 0 #0000000a;
    margin-top: 41px;

    & > .list-title {
      align-items: center;
      display: flex;
      height: 68px;
      padding: 0 30px;

      & > .text-h3 {
        font-size: 16px;
        font-weight: 600;
        line-height: 24px;
      }
    }

    & > .list-details {
      background-color: $grey;
      padding: 0 30px;
      height: 59px;
      display: none;

      @media (min-width: $lg) {
        display: block;
      }

      & > .details-list {
        align-items: center;
        display: flex;
        height: 100%;
        justify-content: start;

        & > .details-item {
          color: $neutral700;
          font-size: 16px;
          font-weight: 600;
          max-width: 279px;
          width: 100%;
        }
      }
    }

    .pet-card-row {
      max-width: 600px;
      width: 100%;
      margin: 50px auto;
      border: 1px solid $blue;
      border-radius: 8px;

      @media (min-width: $lg) {
        border: none;
        border-radius: none;
        max-width: 100%;
      }
      & > .pet-row {
        & > .pet-card {
          align-items: center;
          display: flex;
          height: 300px;
          justify-content: space-between;
          padding: 30px;
          position: relative;

          @media (min-width: $lg) {
            height: 116px;
            margin-bottom: 0;
            padding: 0 30px;
          }

          & > .pet-infos {
            display: flex;
            align-items: center;
            flex-direction: column;
            height: 100%;
            width: 100%;

            @media (min-width: $lg) {
              flex-direction: row;
            }

            & > .pet-info {
              color: $neutral700;
              font-weight: 400;
              margin-bottom: 5px;
              width: 100%;

              @media (min-width: $lg) {
                max-width: 279px;
              }

              & > .pet-image {
                border-radius: 8px;
                height: 150px;
                max-width: 150px;
                object-fit: cover;
                width: 100%;

                @media (min-width: $lg) {
                  height: 88px;
                  max-width: 88px;
                }
              }

              & > .details-menu-mobile {
                color: $neutral700;
                font-size: 16px;
                font-weight: 600;

                @media (min-width: $lg) {
                  display: none;
                }
              }
            }
          }

          &:nth-child(2n) {
            background-color: $grey;
          }

          & > .pet-actions {
            display: flex;
            position: absolute;
            right: 20px;
            flex-direction: column;
            gap: 24px;

            @media (min-width: $lg) {
              flex-direction: row;
              right: 64px;
            }

            & > a > .pet-action-btn,
            & > .pet-action-btn {
              border-radius: 8px;
              border: 1px solid $neutral300;
              box-shadow: 0 1px 1.5px 0 #0000001a;
              display: grid;
              height: 42px;
              padding: 0;
              place-items: center;
              width: 42px;

              svg > path {
                stroke: $neutral600;
              }

              &:hover {
                border-color: $sucess;
                background-color: white;
                color: $sucess;

                svg > path {
                  stroke: $sucess;
                }
              }

              &.action-delete-btn {
                svg > path {
                  stroke: $warning;
                }

                &:hover {
                  border-color: $warning;
                  background-color: white;
                  color: $warning;
                }
              }
            }
          }
        }
      }
    }
  }

  .btn {
    margin: 0;
  }
}

.confirmation-modal {
  .text-h3 {
    color: $neutral900;
  }
  .q-pt-none {
    color: $neutral800;
  }
}
</style>
