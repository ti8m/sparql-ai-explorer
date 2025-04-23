<script setup>
import {ref} from "vue";
import SparqlEditor from "~/components/sparql-editor/SparqlEditor.vue";
import SparqlTemplate from "~/components/sparql-template/SparqlTemplate.vue";

const selected = ref({});
const shouldReset = ref(false);

const handleUpdate = (value) => {
  selected.value = value;
  shouldReset.value = false;
};

const resetSelected = () => {
  shouldReset.value = true;
  // reset to false to trigger again
  setTimeout(() => {
    shouldReset.value = false;
  }, 100);
};
</script>

<template>
  <UContainer class="mt-4 w-full">
    <h1 class="font-bold text-md">Welcome to the LINDASnext Landing Page</h1>
    <SparqlTemplate
        :should-reset="shouldReset"
        @update-selected="handleUpdate"
    />
    <SparqlEditor :query="selected" @reset-selected="resetSelected"/>
  </UContainer>
</template>
