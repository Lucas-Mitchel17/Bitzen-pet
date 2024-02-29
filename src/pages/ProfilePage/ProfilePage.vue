<script setup>
import { onBeforeMount, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { userData, update, logout } from "src/services/user";
import { useUserStore } from "src/stores";
import { Notify } from "quasar";
import { apiErrorHandler, formHelper } from "src/helpers";
import { BaseText } from "src/components/ui/base";

const USER_STORE = useUserStore();
const { getPayload } = formHelper();
const ROUTER = useRouter();
const disabled = ref(false);
const loading = ref(false);

const userName = ref("");
const userEmail = ref("");

const fields = reactive([
  {
    name: "name",
    type: "text",
    size: "is-full",
    label: "Nome",
    model: userName,
    placeholder: "Seu nome",
    errorMessage: "",
  },
  {
    name: "email",
    type: "text",
    size: "is-full",
    label: "Email",
    model: userEmail,
    placeholder: "Seu email",
    errorMessage: "",
  },
]);

onBeforeMount(async () => await getUserData());

async function getUserData() {
  loading.value = true;

  try {
    const { data } = await userData(ROUTER);
    userName.value = data.name;
    userEmail.value = data.email;
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

async function onSubmit() {
  const payload = getPayload(fields);

  await updateUserData(payload);
}

async function updateUserData(payload) {
  loading.value = true;

  try {
    const { data } = await update(payload, ROUTER);
    userName.value = data.name;
    userEmail.value = data.email;

    USER_STORE.setUser(data);

    Notify.create({
      type: "positive",
      message: "Usuário atualizado com sucesso!",
    });
  } catch (error) {
    const { message, data } = apiErrorHandler(error);

    Notify.create({ type: "negative", message });

    if (data) {
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

const logoutUser = async () => {
  await logout(ROUTER);
};
</script>

<template>
  <section class="my-profile">
    <div class="profile-card">
      <div class="user-data">
        <BaseText>Meus dados</BaseText>
      </div>

      <div class="form">
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

          <q-btn
            class="btn is-blue is-full"
            label="Salvar"
            @click="onSubmit"
            :loading="loading"
          />
        </q-form>
      </div>
    </div>

    <div class="password-card">
      <BaseText>Senha</BaseText>

      <div class="change-password">
        <a>
          <img src="../../assets/editar.png" />
          <BaseText>Alterar</BaseText>
        </a>
      </div>
    </div>

    <div class="logout">
      <a @click.prevent="logoutUser" class="logout-section">
        <img src="../../assets/logout.png" />

        <BaseText>Sair da minha conta</BaseText>
      </a>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.my-profile {
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 40px 20px;

  & > .profile-card {
    background-color: white;
    border-radius: 8px;
    border: 1px solid $neutral200;
    max-width: 704px;
    width: 100%;

    & > .user-data {
      border-bottom: 1px solid $neutral200;
      padding: 20px 40px;

      & > .text-p {
        color: $neutral800;
        font-size: 16px;
        font-weight: 600;
      }
    }

    & > .form {
      padding: 40px 40px 56px;
    }
  }

  & > .password-card {
    background-color: white;
    border-radius: 8px;
    border: 1px solid $neutral200;
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    padding: 20px 40px;
    max-width: 704px;
    width: 100%;

    & > .text-p {
      font-weight: 600;
      color: $neutral800;
    }

    & > .change-password > a {
      display: flex;
      align-items: center;
      gap: 10px;

      & > .text-p {
        font-weight: 600;
        color: $blue;
      }
    }
  }

  & > .logout {
    background-color: white;
    border-radius: 8px;
    border: 1px solid $neutral200;
    margin-top: 30px;
    padding: 20px 40px;
    max-width: 704px;
    width: 100%;

    & > .logout-section {
      display: flex;
      gap: 8px;
      justify-content: flex-start;

      & > .text-p {
        color: $warning;
        font-weight: 600;
      }
    }
  }
}
</style>
