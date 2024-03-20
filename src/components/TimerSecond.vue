<template>
    <div>
      <div class="flex justify-center mt-4 space-x-4">
        <button @click="goToTimerPage(1)" class="w-20 h-20 rounded-full bg-blue-500 text-white font-bold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">1 min </button>
        <button @click="goToTimerPage(2)" class="w-20 h-20 rounded-full bg-blue-500 text-white font-bold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">2 min </button>
      </div>
      <div class="flex justify-center mt-4 space-x-4">
        <button @click="goToTimerPage(3)" class="w-20 h-20 rounded-full bg-blue-500 text-white font-bold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">3 min </button>
        <button @click="goToTimerPage(4)" class="w-20 h-20 rounded-full bg-blue-500 text-white font-bold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">4 min </button>
      </div>
    </div>
  </template>
  <script setup>
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const goToTimerPage = (timerNumber) => {
    router.push(`/about`);
  };
  </script>