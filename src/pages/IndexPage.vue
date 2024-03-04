<template>
  <q-page class="flex flex-center">
    <pokemonList />
  </q-page>
</template>

<script setup>
import { defineComponent, onMounted } from "vue";
import pokemonList from "src/components/PokemonList.vue";
import { usePokemonData } from "stores/store";

const pokeStore = usePokemonData();

onMounted(() => {
  pokeStore.getAllPokemon();
});
</script>
