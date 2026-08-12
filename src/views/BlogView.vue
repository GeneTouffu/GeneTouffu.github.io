<template>
  <div v-if="loading">
    <h1>Loading...</h1>
  </div>

  <BlogComponent
    v-else-if="markdown"
    :markdown="markdown"
    :slug="slug"
  />

  <div v-else>
    <h1>404</h1>
    <h2>Blog not found</h2>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import BlogComponent from "../components/BlogComponent.vue";
import { useBlogStore } from "../stores/BlogStore";

const route = useRoute();

const { loadBlogs, loadContent } = useBlogStore();

const slug = ref("");
const markdown = ref<string>();
const loading = ref(true);

async function loadBlog() {
  loading.value = true;
  markdown.value = undefined;

  try {
    slug.value = route.params.slug as string;

    await loadBlogs();

    markdown.value = await loadContent(slug.value);
  } finally {
    loading.value = false;
  }
}

watch(
  () => route.params.slug,
  loadBlog,
  { immediate: true }
);
</script>