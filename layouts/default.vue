<!-- layouts/default.vue -->
<template>
    <div>
      <header>
        <Header />
      </header>
      <main>
        <NuxtPage /> <!-- This is where the page content will be injected -->
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  </template>
  
  <script setup>
  import Header from '~/components/Header.vue';
  import Footer from '~/components/Footer.vue';
  </script>
  