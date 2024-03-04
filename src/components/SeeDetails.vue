<template>
  <q-card style="max-width: 500px; width: 500px; min-height: 400px">
    <q-toolbar class="bg-primary text-white">
      <q-toolbar-title>
        {{ pokeName.charAt(0).toUpperCase() + pokeName.slice(1) }}
      </q-toolbar-title>
      <q-btn flat icon="close" round v-close-popup></q-btn>
    </q-toolbar>
    <q-card-section>
      <div>
        <p class="poke_name">
          {{ pokeName.charAt(0).toUpperCase() + pokeName.slice(1) }}
        </p>
        <q-img :src="imgUrl" />
      </div>
    </q-card-section>
  </q-card>
</template>
<script setup>
import { ref, reactive, onMounted, watch, computed } from "vue";
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { useRoute } from "vue-router";
import { usePokemonData } from "stores/store";

const emit = defineEmits(["hideDetailsDialog"]);
const props = defineProps(["pokeName"]);
const pokeStore = usePokemonData();

const imgUrl = ref("");
onMounted(() => {
  pokeStore.getPokemon(props.pokeName);

  setTimeout(() => {
    imgUrl.value = pokeStore.pokemon.sprites.front_default;
  }, 500);
});
</script>
<style lang="scss" scoped>
$nameColor: black;
$nameFont: 30px;
$imgSpaceTop: -50px;
.poke_name {
  font-size: $nameFont;
  color: $nameColor;
}
img {
  margin-top: $imgSpaceTop;
}
</style>
