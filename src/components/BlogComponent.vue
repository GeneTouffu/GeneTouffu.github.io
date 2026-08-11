<template>
  <article>
    <VueMarkdown :source="markdown" />
  </article>
</template>

<script setup lang="ts">
import VueMarkdown from 'vue-markdown-render'

defineProps<{
  markdown: string
  slug: string
}>()
</script>