<template>
  <div class="full-screen bg-slate-950	 flex items-center justify-center font-sans">
    <div class="flex font-bold flex-col items-center">
      <p class="text-9xl md:text-9xl sm:text-9xl xs:text-3xl text-white">{{ hours }}</p>
      <p class="text-9xl md:text-9xl sm:text-9xl xs:text-3xl min-h-max text-white">{{ minutes }}</p>
    </div>
    <div class="flex flex-col font-thin items-center ml-3">
      <p class="text-2xl md:text-x3 sm:text-lg xs:text-sm text-white">{{ dayOfWeek }}</p>
      <p class="text-2xl md:text-x3 sm:text-lg xs:text-sm text-white">{{ monthDay }}</p>
    </div>
  </div>
  <button @click="download" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">Download</button>

</template>




<script setup>
import { ref, onMounted } from "vue";

const hours = ref("");
const minutes = ref("");
const timeColor = ref("black");
const dayOfWeek = ref("");
const monthDay = ref("");

const updateTime = () => {
  const now = new Date();
  hours.value = String(now.getHours()).padStart(2, "0");
  minutes.value = String(now.getMinutes()).padStart(2, "0");

  const daysOfWeek = ["Sun", "Mon", "Tues", "Wedn", "Thurs", "Fri", "Satur"];
  dayOfWeek.value = daysOfWeek[now.getDay()];

  const date = now.getDate();
  monthDay.value = `${date} `;

  const totalSeconds =
    now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
  const brightness = Math.round((totalSeconds / 86400) * 100);
  timeColor.value = `hsl(205, 100%, ${brightness}%)`;
};

onMounted(() => {
  updateTime();
  setInterval(updateTime, 1000);
});
</script>


<style scoped>
.full-screen {
  width: 100vw;
  height: 100vh;
}

@media (max-width: 940px) {
 
  .text-7xl {
    font-size: 5vw;
  }
  .text-5xl {
    font-size: 4vw;
  }
  .text-3xl {
    font-size: 3vw;
  }
  .text-2xl {
    font-size: 5vw;
  }
  .text-xl {
    font-size: 1.5vw;
  }
  .text-lg {
    font-size: 1.25vw;
  }
  .text-sm {
    font-size: 1vw;
  }
}
</style>