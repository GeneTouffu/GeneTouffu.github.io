<template>
  <nav class="navbar">
    <a class="brand" href="#">danbutres.dev/</a>
    <div class="nav-links">
      <a href="#about">about/</a>
      <a href="#blogs">blogs/</a>
      <a href="#contact">contact/</a>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>
.navbar {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  font-size: 1.5rem;
  padding: 1rem 1.5rem;
  background-color: var(--color-bg-alt);
  height: 3rem;
}

.brand {
  font-weight: 1000;
  font-size: 1.75rem;
  text-decoration: none;
  padding-right: 1rem;
  align-self: center;
  min-width: 0;
}

.nav-links {
  display: flex;
  gap: 2rem;
  justify-self: center;
  align-items: center;
  min-width: 0;
  max-width: 100%;
}

@media (max-width: 864px) {
  .navbar {
    font-size: 1rem;
    grid-template-columns: auto 1fr;
  }

  .brand {
    font-size: clamp(1.25rem, 2.5vw, 1.25rem);
  }


  .nav-links {
    gap: 1rem;
  }
}
</style>