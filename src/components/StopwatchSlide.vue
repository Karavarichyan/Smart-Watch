<template>
  <div
    class="full-screen bg-slate-950 text-white flex flex-col justify-center items-center font-sans"
  >
    <div class="flex space-x-4 md:space-x-4">
      <button @click="goToTimerPage(1)" class="button-style">
        1 <br />
        min
      </button>
      <button @click="goToTimerPage(2)" class="button-style">
        2 <br />
        min
      </button>
    </div>
    <div class="flex space-x-4 md:space-x-4 mt-4 md:mt-8">
      <button @click="goToTimerPage(3)" class="button-style">
        3 <br />
        min
      </button>
      <button @click="goToTimerPage(4)" class="button-style">
        4 <br />
        min
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goToTimerPage = (timerNumber) => {
  router.push(`/timer${timerNumber}`);
};
</script>

<style scoped>
.full-screen {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center;
}

.button-style {
  width: 12vw;
  height: 12vw;
  min-width: 70px;
  min-height: 70px;
  max-width: 100px;
  max-height: 100px;
  background-color: #3490dc;
  color: #ffffff;
  font-weight: bold;
  font-size: calc(2.5vw - 0.5em);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  outline: dotted;
  outline-width: 2px;
  outline-offset: 2px;
  transition: background-color 0.3s;
}

.button-style:hover {
  background-color: #2779bd;
}

.button-style:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
}

/* Медиа-запросы для мобильных устройств */
@media (max-width: 640px) {
  .button-style {
    font-size: 6vw; /* увеличение размера кнопок для мобильных устройств */
    width: 30vw; /* изменение ширины кнопок для мобильных устройств */
    height: 30vw; /* изменение высоты кнопок для мобильных устройств */
    min-width: unset;
    min-height: unset;
    max-width: unset;
    max-height: unset;
  }
}
</style>
