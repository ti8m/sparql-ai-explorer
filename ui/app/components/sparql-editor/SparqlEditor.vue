<script setup lang="ts">
import {ref, computed} from "vue";
import {StreamLanguage} from "@codemirror/language";
import {autocompletion} from "@codemirror/autocomplete";
import {sparql} from "@codemirror/legacy-modes/mode/sparql";
import {sparqlCompletions} from "./sparqlCompletions"; // Pfad zur exportierten Datei
import AppSpinner from "~/components/spinner/AppSpinner.vue";

const props = defineProps({
  query: {
    type: Object,
    default: () => ({name: "", value: ""}),
  },
});

const results = ref([]);
const error = ref("");
const page = ref(1);
const pageCount = 20;
const isLoading = ref(false);
const sparqlQuery = ref(props.query);
const codemirror = ref("");
const theme = ref<"light" | "dark" | "none">("light");
const columns = ref([]);
const startContentEmptyRows = "\n\n\n\n\n\n\n\n\n";
var activeTabIndex = ref(0);
const tabItems = ref([
  {
    label: "New Query",
    icon: "i-heroicons-chat-bubble-left",
    content: "",
    inhalt: startContentEmptyRows,
  },
]);
var activeItem = ref(0);

const emit = defineEmits(["reset-selected"]);

watch(
    () => props.query,
    (newQuery) => {
      error.value = "";
      results.value = [];
      const newVal = newQuery.value || startContentEmptyRows;
      tabItems.value[activeItem.value].inhalt = newVal;
      tabItems.value[activeItem.value].label =
          newQuery.name?.slice(0, 25) || `New Query ${activeItem.value || ""}`;
      sparqlQuery.value = newQuery;
    }
);

const rows = computed(() => {
  return results.value.slice(
      (page.value - 1) * pageCount,
      page.value * pageCount
  );
});

const extensions = [
  StreamLanguage.define(sparql),
  autocompletion({override: [sparqlCompletions]}),
];

const addAllPrefixes = (sparqlQueryToBeSent: string | undefined) => {
  if (!sparqlQueryToBeSent) {
    return sparqlQueryToBeSent;
  }

  let prefixes: string = `
    prefix dc: <http://purl.org/dc/elements/1.1/>
    prefix dbo: <http://dbpedia.org/ontology/>
    prefix owl: <http://www.w3.org/2002/07/owl#>
    prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    prefix xml: <http://www.w3.org/XML/1998/namespace>
    prefix xsd: <http://www.w3.org/2001/XMLSchema#>
    prefix foaf: <http://xmlns.com/foaf/0.1/>
    prefix obda: <https://w3id.org/obda/vocabulary#>
    prefix schema: <https://schema.org/>
    prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    prefix parl: <http://opendata.parlament.ch/>
    prefix parl-group: <http://opendata.parlament.ch/Group#>
    prefix parl-person: <http://opendata.parlament.ch/Person#>
    prefix parl-address: <http://opendata.parlament.ch/Address#>
    prefix parl-election: <http://opendata.parlament.ch/Election#>
    prefix parl-groupName: <http://opendata.parlament.ch/GroupName#> \n`;

  return prefixes + sparqlQueryToBeSent;
}

const runQuery = async () => {
  error.value = "";
  if (!sparqlQuery.value) {
    error.value = "Please enter a SPARQL query.";
    return;
  }

  isLoading.value = true;

  const response = await fetch("/api/sparql", {
    method: "POST",
    headers: {
      "Content-Type": "application/sparql-query",
    },
    body: addAllPrefixes(tabItems.value[activeItem.value]?.inhalt),
  });

  const data = await response.json();

  if (data.error) {
    error.value = data.error;
    isLoading.value = false;
    results.value = [];
    columns.value = [];
    return;
  }

  if (data?.head?.vars && data?.results?.bindings) {
    columns.value = data.head.vars.map((key) => ({key, label: key}));
    results.value = data.results.bindings.map((result) => {
      const row = {};
      data.head.vars.forEach((header) => {
        row[header] = result[header]?.value || "";
      });
      return row;
    });
  } else {
    console.error("Unexpected API response structure:", data);
  }
  isLoading.value = false;
};

const clearQuery = () => {
  error.value = "";
  tabItems.value[activeItem.value].label = `New Query ${
      activeItem.value || ""
  }`;
  tabItems.value[activeItem.value].inhalt = startContentEmptyRows;
  emit("reset-selected");
};

const handleChange = (value) => {
  error.value = "";
  sparqlQuery.value = value;
};

const onTabChange = (index) => {
  activeItem.value = index;
};

const onAddTable = () => {
  tabItems.value.push({
    label: "New Query " + tabItems.value.length,
    icon: "i-heroicons-chat-bubble-left",
    content: "",
    inhalt: startContentEmptyRows,
  });
  activeTabIndex.value = tabItems.value.length - 1;
  activeItem.value = activeTabIndex.value;
};
</script>

<template>
  <div class="flex items-center mt-4">
    <UTabs v-model="activeTabIndex" :items="tabItems" @change="onTabChange"/>
    <UButton
        class="ml-4 mb-2"
        icon="i-material-symbols:add"
        @click="onAddTable"
    />
  </div>

  <NuxtCodeMirror
      ref="codemirror"
      v-model="tabItems[activeItem].inhalt"
      min-height="175px"
      class="mt-0 border border-gray-300"
      :extensions="extensions"
      :theme="theme"
      placeholder="Enter your code here..."
      :auto-focus="true"
      :editable="true"
      :basic-setup="true"
      :indent-with-tab="true"
      @on-change="handleChange"
  />
  <div class="flex items-center mt-4">
    <UButton @click="runQuery">Run Query</UButton>
    <UButton
        v-if="tabItems[activeItem].inhalt !== startContentEmptyRows"
        class="ml-4"
        icon="i-ooui:clear"
        @click="clearQuery"
    >Clear
    </UButton
    >
    <span v-if="error" class="text-red-500 ml-4">{{ error }}</span>
  </div>

  <template v-if="!isLoading">
    <UTable :rows="rows" class="w-full mt-4">
      <template
          v-for="col in columns"
          :key="col.key"
          #[`${col.key}-data`]="{ row }"
      >
        <template v-if="row[col.key].startsWith('http')">
          <ULink
              :to="row[col.key]"
              active-class="text-primary"
              inactive-class="text-blue-whale-600 dark:text-blue-whale-800 hover:text-blue-whale-700 dark:hover:text-blue-whale-200"
              target="_blank"
          >
            {{ row[col.key] }}
          </ULink>
        </template>
      </template>
    </UTable>
    <UPagination
        v-if="results.length > pageCount"
        v-model="page"
        :page-count="pageCount"
        :total="results.length"
        class="justify-end pb-4"
    />
  </template>
  <AppSpinner v-if="isLoading"/>
</template>
