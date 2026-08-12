<template>
  <section>
    <div>
      <h1>Hi, I'm Daniel</h1>

      <div>
        <p>
          This is my personal and semi-professional space. Everything here is written by me, not AI. I'm hoping to write about board games, movies, and software development, and I hope you find something here that sparks your interest.
        </p>
      </div>
    </div>

    <hr>
  </section>

  <h1>Most Recent Blogs</h1>
  <NewestBlogs  :amount="3" />
</template>

<script setup>
import NewestBlogs from '../components/NewestBlogs.vue';
</script>