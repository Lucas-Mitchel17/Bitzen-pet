<script setup>
import { BaseText } from "src/components/ui/base";
</script>

<template>
  <nav class="nav">
    <div class="nav-container">
      <div class="nav-logo">
        <img
          src="../../../../assets/Logo.png"
          alt="Logo da Bitzen Pet"
          class="auth-section-image"
        />
      </div>

      <div class="nav-links">
        <div class="nav-links-items">
          <router-link to="/seus-pets">
            <BaseText class="nav-link-item">Início</BaseText>
          </router-link>
        </div>

        <div class="nav-link-profile">
          <button class="btn profile-button">
            <q-avatar>LM</q-avatar>

            <q-menu>
              <q-list>
                <q-item clickable v-close-popup>
                  <q-item-section>Minhas informações</q-item-section>
                </q-item>
              </q-list>
            </q-menu>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 320 512"
            >
              <path
                d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </nav>
  <div class="nav-info">
    <div class="nav-info-container">
      <BaseText tag="h2">Seus Pets</BaseText>
    </div>
  </div>
</template>

<style lang="scss">
.nav {
  border-bottom: 1px solid $neutral200;
  height: 86px;
  width: 100%;

  & > .nav-container {
    align-items: center;
    display: flex;
    gap: 72px;
    height: 100%;
    margin: auto;
    max-width: 1440px;
    padding: 0 20px;

    & > .nav-links {
      align-items: center;
      display: flex;
      height: 100%;
      justify-content: space-between;
      width: 100%;

      & > .nav-links-items {
        height: 100%;

        a {
          height: 100%;
          position: relative;
          display: flex;

          &::after {
            background-color: $blue;
            bottom: 0;
            content: "";
            height: 0;
            left: 0;
            position: absolute;
            transition: 0.3s;
            width: 0;
          }

          &:hover::after,
          &:active::after {
            height: 4px;
            max-width: 64px;
            width: 100%;
          }

          & > .nav-link-item {
            align-items: center;
            color: $neutral800;
            display: flex;
            font-weight: 500;
            height: 100%;
            position: relative;
            text-align: center;
          }
        }
      }

      & > .nav-link-profile {
        & > .profile-button {
          align-items: center;
          background: transparent;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          gap: 5px;
          margin: 0;
          padding: 0;

          .q-avatar {
            background-color: $neutral200;
            color: $neutral500;
            font-size: 36px;
            font-weight: 500;
            height: 48px;
            width: 48px;
          }

          svg {
            fill: $neutral500;
          }
        }
      }
    }
  }
}
.nav-info {
  box-shadow: 0 1px 2px 0 #00000014;
  height: 74px;

  & > .nav-info-container {
    align-items: center;
    display: flex;
    height: 100%;
    margin: auto;
    max-width: 1440px;
    padding: 0 20px;
  }
}
</style>
