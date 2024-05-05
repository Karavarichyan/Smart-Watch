<template>
  <div
    class="full-screen bg-slate-950 font-sans relative flex items-center justify-center"
  >
    <button
      @click="download"
      class="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute top-0 right-0 mt-5 mr-5"
    >
      <PhDownload class="text-white" :size="32" />
    </button>

    <div class="flex font-bold flex-col items-center">
      <p class="text-9xl md:text-9xl sm:text-9xl xs:text-3xl text-white">
        {{ hours }}
      </p>
      <p
        class="text-9xl md:text-9xl sm:text-9xl xs:text-3xl min-h-max text-white"
      >
        {{ minutes }}
      </p>
    </div>
    <div class="flex flex-col font-thin items-center ml-3">
      <p class="text-2xl md:text-x3 sm:text-lg xs:text-sm text-white">
        {{ dayOfWeek }}
      </p>
      <p class="text-2xl md:text-x3 sm:text-lg xs:text-sm text-white">
        {{ monthDay }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { PhDownload } from "@phosphor-icons/vue";
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

const download = () => {
  const filename = `time_${hours.value}-${minutes.value}.txt`;
  const content = `Current time: ${hours.value}:${minutes.value}`;

  // Создаем элемент <a> для скачивания файла
  const element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(content)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

onMounted(() => {
  updateTime();
  setInterval(updateTime, 1000);
});
</script>
