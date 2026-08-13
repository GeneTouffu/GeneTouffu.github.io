<template>
  <section class="newest-blogs">
    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: 300px;
      "
      v-if="loading"
    >
      <p>Loading...</p>
    </div>
    <RouterLink
      v-else
      v-for="blog in newestBlogs"
      :key="blog.slug"
      :to="`blogs/${blog.slug}`"
      class="blog-preview"
    >
      <div class="blog-meta">
        <span v-if="blog.category" class="blog-category">
          {{ blog.category }}
        </span>

        <span class="blog-date">
          {{ formatDate(blog.date) }}
        </span>
      </div>

      <h2>{{ blog.title }}</h2>

      <div class="blog-tags">
        <span style="color: var(--color-link);">Tags: </span>
        <span v-for="tag in blog.tags" :key="tag" class="blog-tag">
          {{ tag }}
        </span>
      </div>
    </RouterLink>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { useBlogStore } from "../stores/BlogStore";
import {useFormatHelper} from "../helpers/FormatHelper";

const props = defineProps<{
  amount: number;
}>();

const {formatDate} = useFormatHelper()

const blogStore = useBlogStore();
const loading = ref(true);

onMounted(async () => {
  try {
    await blogStore.loadBlogs();
  } finally {
    loading.value = false;
  }
});

const newestBlogs = computed(() => {
  return blogStore.getRecent().slice(0, props.amount);
});
</script>

<style scoped>
.newest-blogs {
  padding: 1rem;
  border: 2px solid var(--color-bg-alt);
  border-radius: 15px;
  background: var(--color-bg-alt);
}

.blog-preview {
  display: block;
  padding: 1rem 0;
  color: var(--color-text);
  text-decoration: none;
}

.blog-preview + .blog-preview {
  border-top: 1px solid var(--color-bg);
}

.blog-preview:hover h2 {
  color: var(--color-link);
}

.blog-meta {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.blog-category,
.blog-tag {
  border-radius: 999px;
  padding: 0.2rem 0.6rem;
  font-size: 0.8rem;
}

.blog-category {
  background: var(--color-button);
  color: var(--color-heading);
}

.blog-date {
  color: var(--color-text-alt);
  font-size: 0.85rem;
}

.blog-tags {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.blog-tag {
  border: 1px solid var(--color-link);
  color: var(--color-link);
}
</style>
