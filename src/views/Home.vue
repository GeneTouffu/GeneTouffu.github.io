<template>
  <div class="page-shell">
    <Navbar />

    <main class="page-content">
      <section>
        <div>
          <h1>Hi, I'm Daniel</h1>
          <div >
            <p>
              This is my personal and semi-professional space. Everything here is written by me, not AI. I'm hoping to write about board games, movies, and software development, and I hope you find something here that sparks your interest.
            </p>
          </div>
        </div>
        <hr>
      </section>
      <NewestBlogs />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import NewestBlogs from '../components/NewestBlogs.vue'
</script>

