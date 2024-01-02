<script setup>
import { BaseText } from "src/components/ui/base";

const props = defineProps({
  petImage: String,
  petName: String,
  petColor: String,
  petAge: String,
  petDescription: String,
});
</script>

<template>
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
</template>

<style lang="scss" scoped>
.pet-info {
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
      border-radius: 8px;
    }
  }

  & > .card-infos {
    background-color: white;
    border-radius: 8px;
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
</style>
