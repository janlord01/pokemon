import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { route } from "quasar/wrappers";
import { useQuasar } from "quasar";
import { Notify, Loading, LocalStorage } from "quasar";

export const usePokemonData = defineStore("pokemonStore", {
  state: () => ({
    rowDatas: [],
    tempRowDatas: [],
    pokemon: [],
  }),
  getters: {},
  actions: {
    async getAllPokemon() {
      Loading.show();
      await api
        .get("/pokemon/?offset=20&limit=20")
        .then((response) => {
          if (response.status === 200) {
            Object.entries(response.data.results).map(([key, val]) => {
              api
                .get(`/pokemon/${val.name}`)
                .then((response) => {
                  this.tempRowDatas.push(response);
                })
                .catch((error) => {
                  console.log(error);
                });
            });

            this.rowDatas = this.tempRowDatas;
            Loading.hide();

            console.log(this.rowDatas);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getPokemon(payload) {
      api
        .get(`/pokemon/${payload}`)
        .then((response) => {
          this.pokemon = response.data;
          console.log(this.pokemon);
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(payload);
    },
  },
});
