<script setup>
const props = defineProps({
  petId: String,
});
</script>

<template>
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
</template>

<style scoped lang="scss">
.actions {
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: space-between;
  align-items: center;

  @media (min-width: $lg) {
    flex-direction: row;
  }

  button {
    margin-bottom: 0 !important;
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
</style>
