<script setup>
import KeyGeneration from "./KeyGeneration.vue";
import {
  generateKeyPair,
  encryptMessage,
  decryptMessage,
} from "../utils/cryptoUtils.js";
import { copyToClipboard } from "../utils/copyUtils.js";
import { ref } from "vue";
import { toast } from "vue3-toastify";
import messages from "../utils/data.js";

const messageToEncrypt = ref("");
const messageToDecrypt = ref("");
const publicKeyInput = ref("");
const privateKeyInput = ref("");
const encryptedMessage = ref("");
const decryptedMessage = ref("");
const generatedPublicKey = ref("");
const generatedPrivateKey = ref("");

const handleEncrypt = async () => {
  const encrypted = await encryptMessage(
    publicKeyInput.value,
    messageToEncrypt.value
  );
  encryptedMessage.value = encrypted;
  console.log(`Message encrypted: ${encryptedMessage.value}`);
};

const handleDecrypt = async () => {
  const decrypted = await decryptMessage(
    privateKeyInput.value,
    messageToDecrypt.value
  );

  decryptedMessage.value = decrypted;
  console.log(`Message decrypted: ${decryptedMessage.value}`);
};

const handleCopy = (message) => {
  console.log(`Copying message to clipboard: ${message}`);

  copyToClipboard(message);

  toast("Copied!", {
    autoClose: 500,
    position: toast.POSITION.TOP_RIGHT,
  });
};

const handleAddKey = (keyType) => {
  if (keyType === "public") {
    publicKeyInput.value = generatedPublicKey.value;
  } else {
    privateKeyInput.value = generatedPrivateKey.value;
  }
};

// Function to handle the emitted keys
const handleKeysGenerated = ({ publicKey, privateKey }) => {
  generatedPublicKey.value = publicKey;
  generatedPrivateKey.value = privateKey;

  console.log(`Public Key: ${publicKey}`);
  console.log(`Private Key: ${privateKey}`);
};

const handleGenerateMessage = () => {
  const randomIndex = Math.floor(Math.random() * messages.length); // Generate a random index
  const randomMessage = messages[randomIndex]; // Get the message at the random index

  if (messageToEncrypt) {
    messageToEncrypt.value = randomMessage; // Assign the random message to messageToEncrypt
  }
};
</script>

<template>
  <h2 class="container font-bold text-2xl">Asynchronous Cryptography - RSA</h2>

  <!-- Add the @keys-generated event listener here -->
  <KeyGeneration
    :generateKeyPair="generateKeyPair"
    @keys-generated="handleKeysGenerated"
  />

  <div class="container">
    <p class="text-2xl font-semibold mb-4">Encrypt Message</p>

    <div class="relative">
      <label class="block text-gray-700 font-medium mb-2">
        Message to Encrypt:
      </label>
      <div class="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2em"
          height="2em"
          viewBox="0 0 24 24"
          class="absolute top-2 right-2 cursor-pointer bg-gray-200 p-1 rounded-md hover:bg-gray-300 active:bg-gray-400"
          @click="handleGenerateMessage"
        >
          <path
            fill="currentColor"
            d="M15 5.25A3.25 3.25 0 0 0 18.25 2h1.5A3.25 3.25 0 0 0 23 5.25v1.5A3.25 3.25 0 0 0 19.75 10h-1.5A3.25 3.25 0 0 0 15 6.75zM4 7a2 2 0 0 1 2-2h7V3H6a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4v-5h-2v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"
          />
        </svg>
        <textarea
          v-model="messageToEncrypt"
          rows="5"
          class="w-full border border-gray-300 rounded-lg p-2 text-gray-700 bg-gray-100"
        />
      </div>
    </div>

    <div class="relative">
      <label class="block text-gray-700 font-medium mb-2">
        Public Key (for Encryption):
      </label>
      <div class="relative">
        <svg
          v-if="generatedPrivateKey.trim().length > 0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          width="28"
          height="32"
          class="absolute top-2 right-2 text-blue-500 cursor-pointer bg-gray-200 p-1 rounded-md hover:bg-gray-300 active:bg-gray-400"
          @click="handleAddKey('public')"
        >
          <path
            d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288l111.5 0L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7l-111.5 0L349.4 44.6z"
          />
        </svg>
        <textarea
          v-model="publicKeyInput"
          rows="5"
          class="w-full border border-gray-300 rounded-lg p-2 text-gray-700 bg-gray-100"
        />
      </div>
    </div>

    <button
      @click="handleEncrypt"
      class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 my-2"
    >
      Encrypt Message
    </button>

    <div class="relative">
      <label class="block text-gray-700 font-medium mb-2">
        Encrypted Message:
      </label>
      <div class="relative">
        <svg
          v-if="encryptedMessage.trim().length > 0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          width="34"
          height="34"
          class="absolute top-2 right-2 text-blue-500 cursor-pointer bg-gray-200 p-1 rounded-md hover:bg-gray-300 active:bg-gray-400"
          aria-label="Copy"
          @click="handleCopy(encryptedMessage)"
        >
          <path
            d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l140.1 0L400 115.9 400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-204.1c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-32-48 0 0 32c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l32 0 0-48-32 0z"
          />
        </svg>
        <textarea
          v-model="encryptedMessage"
          rows="5"
          class="w-full border border-gray-300 rounded-lg p-2 text-gray-700 bg-gray-100"
          readonly
        />
      </div>
    </div>
  </div>

  <div class="container">
    <p class="text-2xl font-semibold mb-4">Decrypt Message</p>

    <label class="block text-gray-700 font-medium mb-2">
      Message to Decrypt:
    </label>
    <textarea
      v-model="messageToDecrypt"
      rows="5"
      class="w-full border border-gray-300 rounded-lg p-2 text-gray-700 bg-gray-100"
    />

    <div>
      <label class="block text-gray-700 font-medium mb-2">
        Private Key (for Decryption):
      </label>
      <div class="relative">
        <svg
          v-if="generatedPublicKey.trim().length > 0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          width="28"
          height="32"
          class="absolute top-2 right-2 text-blue-500 cursor-pointer bg-gray-200 p-1 rounded-md hover:bg-gray-300 active:bg-gray-400"
          @click="handleAddKey('private')"
        >
          <path
            d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288l111.5 0L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7l-111.5 0L349.4 44.6z"
          />
        </svg>
        <textarea
          v-model="privateKeyInput"
          rows="5"
          class="w-full border border-gray-300 rounded-lg p-2 text-gray-700 bg-gray-100"
        />
      </div>
    </div>

    <button
      @click="handleDecrypt"
      class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 my-2"
    >
      Decrypt Message
    </button>

    <div class="relative">
      <label class="block text-gray-700 font-medium mb-2">
        Decrypted Message:
      </label>
      <div class="relative">
        <svg
          v-if="decryptedMessage.trim().length > 0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          width="34"
          height="34"
          class="absolute top-2 right-2 text-blue-500 cursor-pointer bg-gray-200 p-1 rounded-md hover:bg-gray-300 active:bg-gray-400"
          aria-label="Copy"
          @click="handleCopy(decryptedMessage)"
        >
          <path
            d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l140.1 0L400 115.9 400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-204.1c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-32-48 0 0 32c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l32 0 0-48-32 0z"
          />
        </svg>
        <textarea
          v-model="decryptedMessage"
          rows="5"
          class="w-full border border-gray-300 rounded-lg p-2 text-gray-700 bg-gray-100"
          readonly
        />
      </div>
    </div>
  </div>
</template>
