
<template>
<div class="page-shell">
    <Navbar />

    <main class="page-content">
      <Content />
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { useData } from 'vitepress';
const { site, frontmatter } = useData();
import Navbar from '../../src/components/Navbar.vue';
import Footer from '../../src/components/Footer.vue';
</script>