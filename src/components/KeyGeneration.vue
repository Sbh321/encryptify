<script setup>
import { ref, defineEmits } from "vue";
import { toast } from "vue3-toastify";
import { copyToClipboard } from "../utils/copyUtils.js";

const emit = defineEmits();

const props = defineProps({
  generateKeyPair: Function,
});

const publicKey = ref("");
const privateKey = ref("");

const handleGenerateKeys = async () => {
  console.log("Generating RSA keys...");

  const { publicKey: pubKey, privateKey: privKey } =
    await props.generateKeyPair();
  publicKey.value = pubKey;
  privateKey.value = privKey;

  // Emit the keys to the parent component
  emit("keys-generated", { publicKey: pubKey, privateKey: privKey });
};

const handleCopyPublicKey = () => {
  copyToClipboard(publicKey.value);

  toast("Copied!", {
    autoClose: 500,
    position: toast.POSITION.TOP_RIGHT,
  });
};

const handleCopyPrivateKey = () => {
  copyToClipboard(privateKey.value);

  toast("Copied!", {
    autoClose: 500,
    position: toast.POSITION.TOP_RIGHT,
  });
};
</script>

<template>
  <div class="container mx-auto p-6 bg-white rounded-lg shadow-md">
    <p class="text-2xl font-semibold mb-4">Generate RSA Keys</p>
    <button
      @click="handleGenerateKeys"
      class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
    >
      Generate RSA Keys
    </button>

    <div class="relative mt-6">
      <label class="block text-gray-700 font-medium mb-2">Public Key:</label>
      <div class="relative">
        <svg
          v-if="publicKey.trim().length > 0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          width="34"
          height="34"
          class="absolute top-2 right-2 text-blue-500 cursor-pointer bg-gray-200 p-1 rounded-md hover:bg-gray-300 active:bg-gray-400"
          aria-label="Copy"
          @click="handleCopyPublicKey"
        >
          <path
            d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l140.1 0L400 115.9 400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-204.1c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-32-48 0 0 32c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l32 0 0-48-32 0z"
          />
        </svg>
        <textarea
          v-model="publicKey"
          rows="5"
          readonly
          class="w-full border border-gray-300 rounded-lg p-2 text-gray-700 bg-gray-100"
        />
      </div>
    </div>

    <div class="mt-4">
      <label class="block text-gray-700 font-medium mb-2">Private Key:</label>
      <div class="relative">
        <svg
          v-if="privateKey.trim().length > 0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          width="34"
          height="34"
          class="absolute top-2 right-2 text-blue-500 cursor-pointer bg-gray-200 p-1 rounded-md hover:bg-gray-300 active:bg-gray-400"
          aria-label="Copy"
          @click="handleCopyPrivateKey"
        >
          <path
            d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l140.1 0L400 115.9 400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-204.1c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-32-48 0 0 32c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l32 0 0-48-32 0z"
          />
        </svg>

        <textarea
          v-model="privateKey"
          rows="5"
          readonly
          class="w-full border border-gray-300 rounded-lg p-2 text-gray-700 bg-gray-100"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Additional styles can go here if needed */
</style>
