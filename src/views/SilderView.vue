<!-- <template>
  <div class="full-screen bg-slate-950 flex items-center justify-center">
    <TimeSlide />
    <StopwatchSlide />
  </div>

  <RouterView />
</template>

<script setup>
import StopwatchSlide from "@/components/StopwatchSlide.vue";
import TimeSlide from "@/components/TimeSlide.vue";
</script> -->

<!-- 
<template>
  <div class="h-screen bg-slate-950 flex items-center justify-center">
    <div class="carousel relative">
      <div :class="{ 'block': currentSlide === index, 'hidden': currentSlide !== index }" v-for="(slide, index) in slides" :key="index">
        <component :is="slide.component" />
      </div>
      <button @click="prevSlide" class="absolute left-0 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-gray-800 text-white rounded-md">Prev</button>
      <button @click="nextSlide" class="absolute right-0 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-gray-800 text-white rounded-md">Next</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import StopwatchSlide from "@/components/StopwatchSlide.vue";
import TimeSlide from "@/components/TimeSlide.vue";

const currentSlide = ref(0);
const slides = [
  { component: TimeSlide },
  { component: StopwatchSlide }
];

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length;
};

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length;
};
</script> -->



<!-- 
<template>
  <div class="full-screen bg-slate-950 flex items-center justify-center">
    <div
      class="swiper-container overflow-hidden cursor-pointer flex items-center justify-center"
      @mousedown="onMouseDown"
    >
      <transition name="slide" mode="out-in">
        <div
          class="swiper-wrapper flex"
          :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          :key="currentSlide"
        >
          <div
            v-for="(slide, index) in slides"
            :key="index"
            class="swiper-slide flex flex-col items-center justify-center w-full"
          >
            <component :is="slide" />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import StopwatchSlide from "@/components/StopwatchSlide.vue";
import TimeSlide from "@/components/TimeSlide.vue";

const slides = ref([]);
let currentSlide = 0;
const startX = ref(0);

const updateTime = () => {
  const now = new Date();
  slides.value = [TimeSlide, StopwatchSlide];
};

const onMouseDown = (event) => {
  startX.value = event.clientX;
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
};

const onMouseMove = (event) => {
  const movementX = event.clientX - startX.value;
  if (Math.abs(movementX) > 50) {
    if (movementX > 0 && currentSlide > 0) {
      currentSlide--;
    } else if (movementX < 0 && currentSlide < slides.value.length - 1) {
      currentSlide++;
    }
    startX.value = event.clientX;
  }
};

const onMouseUp = () => {
  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseup", onMouseUp);
};

updateTime();
setInterval(updateTime, 1000);
</script>

<style scoped>
.swiper-container {
  transition: transform 0.3s ease-in-out;
}

.swiper-wrapper {
  transition: transform 0.3s ease-in-out;
}

.swiper-slide {
  flex: 0 0 100%;
  width: 100%;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
}
v-touch:swipe =" swipeHandler "
</style> -->
<template>
  <div class="full-screen bg-slate-950 flex items-center justify-center">
    <div
      class="swiper-container overflow-hidden cursor-pointer flex items-center justify-center"
      @mousedown="onMouseDown"
    >
      <transition name="slide" mode="out-in">
        <div
          class="swiper-wrapper flex"
          :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          :key="currentSlide"
        > 
          <div
            v-for="(slide, index) in slides"
            :key="index"
            class="swiper-slide flex flex-col items-center justify-center w-full"
          >
            <component :is="slide" />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import StopwatchSlide from "@/components/StopwatchSlide.vue";
import TimeSlide from "@/components/TimeSlide.vue";
import Vue3TouchEvents from "vue3-touch-events";

const slides = ref([]);
let currentSlide = 0;
const startX = ref(0);
let isDragging = false;

const updateTime = () => {
  const now = new Date();
  slides.value = [TimeSlide, StopwatchSlide];
};

const onMouseDown = (event) => {
  startX.value = event.clientX;
  isDragging = true;
};

const onMouseMove = (event) => {
  if (isDragging) {
    const movementX = event.clientX - startX.value;
    if (Math.abs(movementX) > 50) {
      if (movementX > 0 && currentSlide > 0) {
        currentSlide--;
      } else if (movementX < 0 && currentSlide < slides.value.length - 1) {
        currentSlide++;
      }
      startX.value = event.clientX;
    }
  }
};

const onMouseUp = () => {
  isDragging = false;
};

updateTime();
setInterval(updateTime, 1000);

onMounted(() => {
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
});

</script>

<style scoped>
.swiper-container {
  transition: transform 0.5s ease-in-out;
}

.swiper-wrapper {
  transition: transform 0.5s ease-in-out;
}

.swiper-slide {
  flex: 0 0 100%;
  width: 100%;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
}
</style>
