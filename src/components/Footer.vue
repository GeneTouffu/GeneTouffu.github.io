<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-content">
        <b class="website-name">Daniel Butres</b>
        <nav class="contact-nav">
          <button class="email-btn" @click="sendEmail">Email Me</button>
        </nav>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const email = import.meta.env.VITE_PERSONAL_EMAIL;

function sendEmail() {
  window.open(`mailto:${email}`, "_blank");
}
</script>

<style scoped>
.footer {
  background-color: var(--color-nav-element);
}

.footer-content {
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 1.5rem;
  gap: 1rem;
}

.website-name {
  color: var(--color-heading);
  font-weight: bold;
  font-size: 1.25rem;
}
</style>
