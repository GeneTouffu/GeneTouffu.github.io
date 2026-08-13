<template>
  <section>
    <div>
      <h1>Blogs</h1>
      <div class="category-filters">
        <button @click="categoryFilter = null">All</button>

        <button
          v-for="category in blogCategories"
          :key="category"
          @click="categoryFilter = category"
        >
          {{ category }}
        </button>
      </div>

      <BlogIndex
        :amount="10"
        :categoryFilter="categoryFilter"
      />

    </div>

  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import BlogIndex from "../components/BlogIndex.vue";
import {useBlogStore} from "../stores/BlogStore";

const blogStore = useBlogStore();
var categoryFilter = ref<string | null>(null);



const blogCategories = computed(() => blogStore.getCategories());
</script>
<style>
.category-filters
{ 
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 0.5rem;
}
</style>