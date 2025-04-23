<script setup lang="ts">
import AppSpinner from "~/components/spinner/AppSpinner.vue";
import {exampleQueries} from "./exampleQueries";

const props = defineProps({
  aiQuery: {
    type: String,
    default: "",
  },
  shouldReset: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update-selected"]);

const aiPrompt = ref("");
const isLoading = ref(false);
const error = ref("");
const selected = ref(props.aiQuery || "");
const filterPromptIsOpen = ref(false);
const optimizationRequest = ref("");

watch(
    () => selected.value,
    (newQuery) => {
      emit("update-selected", newQuery);
    }
);

watch(
    () => props.shouldReset,
    () => {
      selected.value = "";
    }
);

const options = ref(exampleQueries);

const askAI = async () => {
  error.value = "";
  if (!aiPrompt.value) {
    error.value = "You have to give me some advice!";
    return;
  }
  isLoading.value = true;
  const prompt = aiPrompt.value;

  const response = await fetch("/api/ai", {
    method: "POST",
    body: prompt,
  });

  const data = await response.json();

  if (data.error) {
    error.value = data.error;
    isLoading.value = false;
    return;
  }

  selected.value = {
    name: aiPrompt.value,
    id: options.value.length,
    value: indentAiResponse(data.query),
  };
  options.value.push(selected.value);
  isLoading.value = false;
};

const indentAiResponse = (query) => {
  query = query.replaceAll(/SELECT/g, "\n\nSELECT");
  query = query.replaceAll(/ PREFIX/g, "\nPREFIX");
  query = query.replaceAll(/WHERE/g, "\nWHERE");
  query = query.replaceAll(/\{ /g, "{\n\t");
  query = query.replaceAll(/\}/g, "\n}");
  query = query.replaceAll(/\. \?/g, ".\n\t?");
  return query + "\n\n";
};

const openPromptFilter = () => {
  filterPromptIsOpen.value = !filterPromptIsOpen.value;
};

const optimizePrompt = async () => {
  isLoading.value = true;

  const response = await $fetch("/api/ai/optimizePrompt", {
    method: "POST",
    body: {
      originalQuery: selected.value.value,
      optimizationRequest: optimizationRequest.value,
    },
  });

  if (response?.result === 'error') {
    error.value = response.result;
    isLoading.value = false;
    return;
  }

  selected.value = {
    name: aiPrompt.value,
    id: options.value.length,
    value: indentAiResponse(response.query),
  };
  options.value.push(selected.value);
  isLoading.value = false;
};
</script>

<template>
  <div class="mt-4 flex items-center gap-4">
    <USelectMenu
        v-model="selected"
        searchable
        searchable-placeholder="Search a template..."
        class="w-full lg:w-80"
        placeholder="Select a template"
        :options="options"
        option-attribute="name"
    />
    <span>OR ASK AI</span>
    <UInput
        v-model="aiPrompt"
        class="w-full lg:w-80"
        placeholder="Ask AI..."
        icon="i-heroicons-magnifying-glass-20-solid"
    />
    <UButton @click="askAI">Ask AI</UButton>
    <AppSpinner v-if="isLoading"/>
    <span v-if="error" class="text-red-500">{{ error }}</span>
    <UButton
        label="Optimize Query"
        color="gray"
        variant="link"
        @click="openPromptFilter"
    >
      <template #trailing>
        <UIcon
            v-if="!filterPromptIsOpen"
            name="i-heroicons-chevron-down-20-solid"
            class="w-5 h-5"
        />
        <UIcon
            v-if="filterPromptIsOpen"
            name="i-heroicons-chevron-up-20-solid"
            class="w-5 h-5"
        />
      </template>
    </UButton>
  </div>
  <div v-if="filterPromptIsOpen" class="mt-4">
    <UTextarea
        v-model="optimizationRequest"
        class="w-full"
        placeholder="Optimize query. example: Sort query by name"
    />
    <UButton class="mt-2" @click="optimizePrompt">Optimize</UButton>
  </div>
</template>
