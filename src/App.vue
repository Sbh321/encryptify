<script setup></script>

<template>
  <div class="flex gap-4 flex-col lg:flex-row">
    <div
      class="lg:w-1/3 container p-4 bg-gray-100 border border-gray-200 rounded-lg shadow-md"
    >
      <h2 class="font-bold text-2xl mb-2">Encryption Algorithms:</h2>
      <nav class="flex flex-col gap-2">
        <router-link
          to="/"
          class="block p-4 border border-gray-300 rounded-lg transition"
          :class="{
            'bg-blue-100': $route.path === '/',
            'bg-white hover:bg-blue-50': $route.path !== '/',
          }"
        >
          Advanced Encryption Standard (AES)
        </router-link>
        <router-link
          to="/rsa"
          class="block p-4 border border-gray-300 rounded-lg transition"
          :class="{
            'bg-blue-100': $route.path === '/rsa',
            'bg-white hover:bg-blue-50': $route.path !== '/rsa',
          }"
        >
          Rivest Shamir Adleman (RSA)
        </router-link>
      </nav>
    </div>
    <div class="lg:w-2/3">
      <h1 class="container text-center font-bold text-4xl">Encryptify</h1>
      <router-view />
    </div>
  </div>
</template>
