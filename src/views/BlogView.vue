<template>
  <BlogComponent v-if="markdown" :markdown="markdown" :slug="slug" />

  <div v-else>
    <h1>404</h1>
    <h2>Blog not found</h2>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import BlogComponent from "../components/BlogComponent.vue";

const route = useRoute();

const slug = ref("");
const markdown = ref<string | undefined>();
const rawMarkdown = ref<string>();

const blogs = import.meta.glob("../../blog/**/*.md", {
  query: "?raw",
  import: "default",
});

async function loadBlog() {
  slug.value = route.params.slug as string;

  const loader = blogs[`../../blog/${slug.value}.md`] as
    (() => Promise<string>) | undefined;

  if (!loader) {
    markdown.value = undefined;
    return;
  }

  rawMarkdown.value = await loader();

  markdown.value = rawMarkdown.value.replace(/^---[\s\S]*?---\s*/, "");
}

watch(() => route.params.slug, loadBlog, { immediate: true });
</script>
