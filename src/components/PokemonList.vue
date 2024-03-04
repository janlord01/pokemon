<template>
  <q-table
    style="width: 1000px"
    :rows="pokeStore.rowDatas"
    :pagination="pagination"
    :columns="columns"
    title="Pokémon"
    row-key="name"
    :separator="$q.screen.gt.xs ? 'horizontal' : 'none'"
    :visible-columns="
      $q.screen.gt.xs
        ? ['name', 'type', 'abilities', 'total']
        : ['name', 'type', 'abilities', 'total']
    "
  >
    <div class="q-mt-md">Selected: {{ JSON.stringify(selected) }}</div>
    <template #body="props">
      <q-tr :props="props" v-if="props.row.data">
        <q-td key="name" :props="props">
          {{
            props.row.data.name.charAt(0).toUpperCase() +
            props.row.data.name.slice(1)
          }}
        </q-td>
        <q-td key="type" :props="props">
          <span v-for="(type, index) in props.row.data.types" :key="index"
            >{{
              type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)
            }},
          </span>
        </q-td>
        <q-td key="abilities" :props="props">
          <span
            v-for="(ability, index) in props.row.data.abilities"
            :key="index"
            >{{
              ability.ability.name.charAt(0).toUpperCase() +
              ability.ability.name.slice(1)
            }},
          </span>
        </q-td>
        <q-td key="total" :props="props">
          {{ calculateTotalStats(props.row.data.stats) }}
          <q-btn
            label="see details"
            outline
            size="sm"
            @click="seeDetailsFunc(props.row.data.name)"
            class="float-right"
          />
        </q-td>
      </q-tr>
    </template>
  </q-table>

  <q-dialog v-model="showDetails" class="z-top">
    <SeeDetails
      :poke-name="pokeName"
      @hide-details-dialog="showDetails = !showDetails"
    />
  </q-dialog>
</template>

<script setup>
import { api } from "src/boot/axios";
import { LocalStorage } from "quasar";
import { reactive, computed, ref } from "vue";
import { usePokemonData } from "stores/store";
import SeeDetails from "src/components/SeeDetails.vue";

const pokeStore = usePokemonData();
const pokeName = ref("");
const showDetails = ref(false);

const selected = ref([]);

const seeDetailsFunc = (name) => {
  pokeName.value = name;
  showDetails.value = true;
};

const totalStats = computed(() => {
  return props.pokeStore.rowDatas.map((row) =>
    calculateTotalStats(row.data.stats)
  );
});

const calculateTotalStats = (stats) => {
  let total = 0;
  stats.forEach((stat) => {
    total += parseInt(stat.base_stat);
  });
  return total;
};

const pagination = reactive({
  sortBy: "name",
  rowsPerPage: 5,
});
const columns = reactive([
  {
    name: "id",
    label: "ID",
    field: "id",
    align: "left",
    sortable: true,
    classes: "bg-grey-4",
  },
  {
    name: "name",
    label: "Name",
    field: "name",
    align: "left",
    sortable: true,
    field: (row) => row.name,
    format: (val) => `${val}`,
  },
  {
    name: "type",
    label: "Type",
    field: "type",
    align: "left",
    sortable: false,
  },
  {
    name: "abilities",
    label: "Abilities",
    field: "abilities",
    align: "left",
    sortable: false,
  },
  {
    name: "status",
    label: "Status",
    field: "status",
    align: "left",
    sortable: false,
  },
  {
    name: "total",
    label: "Total Base Stat",
    field: "total",
    align: "left",
    sortable: false,
  },
]);
</script>

<style></style>
