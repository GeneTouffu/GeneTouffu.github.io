
<template>
  <BlogComponent
    v-if="markdown"
    :markdown="markdown"
    :slug="slug"
  />

  <div v-else>
    <h1>404</h1>
    <h2>Blog not found</h2>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import BlogComponent from '../components/BlogComponent.vue'

const route = useRoute()

const slug = computed(() => route.params.slug as string)

const blogs = import.meta.glob('../../blog/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>

const markdown = computed(() => {
  const content =  blogs[`../../blog/${slug.value}.md`]
  return content.replace(/^---[\s\S]*?---\s*/, '')
})

</script>
