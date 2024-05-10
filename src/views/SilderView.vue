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
 <!-- <div class="full-screen bg-slate-950 flex snap-x snap-mandatory overflow-x-auto overflow-y-hidden items-center justify-center">
    <div
      class="swiper-container overflow-hidden shrink-0 cursor-pointer flex items-center justify-center"
      @mousedown="onMouseDown"
      @touchmove.prevent="onTouchMove"
    >
      <transition name="slide" mode="out-in">
        <div
          v-touch:swipe="swipeHandler"
          class="swiper-wrapper flex"
          :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          :key="currentSlide"
        >
          <div
            v-for="(slide, index) in slides"
            :key="index"
            class="swiper-slide shrink-0 flex flex-col items-center justify-center w-full"
          >
            <component :is="slide" />
          </div>
        </div>
      </transition>
    </div>
  </div> 

<template>
  <div
    class="flex h-screen w-full snap-x snap-mandatory overflow-x-hidden overflow-y-hidden bg-slate-500"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    @mousemove="onMouseMove"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
  >
    <div class="h-screen w-screen shrink-0 snap-center bg-slate-800">
      <transition name="slide" mode="out-in">
        <div
          v-touch:swipe="swipeHandler"
          class="swiper-wrapper flex"
          :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          :key="currentSlide"
        >
          <div
            v-for="(slide, index) in slides"
            :key="index"
            class="h-screen w-screen shrink-0 snap-center bg-slate-400"
          >
            <component :is="slide" />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import StopwatchSlide from "@/components/StopwatchSlide.vue";
import TimeSlide from "@/components/TimeSlide.vue";
import { onMounted, onUnmounted, ref } from "vue";

const slides = ref([]);
const currentSlide = ref(0);
const startX = ref(0);
let isDragging = false;

const updateTime = () => {
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
      if (movementX > 0 && currentSlide.value > 0) {
        currentSlide.value--;
      } else if (movementX < 0 && currentSlide.value < slides.value.length - 1) {
        currentSlide.value++;
      }
      startX.value = event.clientX;
    }
  }
};

const onMouseUp = () => {
  isDragging = false;
};

const onTouchStart = (event) => {
  startX.value = event.touches[0].clientX;
  isDragging = true;
};

const onTouchMove = (event) => {
  if (isDragging) {
    const touch = event.touches[0];
    const movementX = touch.clientX - startX.value;
    if (Math.abs(movementX) > 50) {
      if (movementX > 0 && currentSlide.value > 0) {
        currentSlide.value--;
      } else if (movementX < 0 && currentSlide.value < slides.value.length - 1) {
        currentSlide.value++;
      }
      startX.value = touch.clientX;
    }
  }
};

const onTouchEnd = () => {
  isDragging = false;
};

onMounted(() => {
  updateTime();
  setInterval(updateTime, 1000);
});

onUnmounted(() => {
  clearInterval(updateTime);
});

</script>


</style> -->
<template>
  <div
    class="flex h-screen w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden bg-slate-500"
  >
    <div class="h-screen w-screen shrink-0 snap-center bg-slate-800">
      <transition name="slide" mode="out-in">
        <div
          class="swiper-wrapper flex"
          :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          :key="currentSlide"
        >
          <div
            v-for="(slide, index) in SLIDES"
            :key="index"
            class="h-screen w-screen shrink-0 snap-center bg-slate-400"
          >
            <component :is="slide" />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import StopwatchSlide from "@/components/StopwatchSlide.vue";
import TimeSlide from "@/components/TimeSlide.vue";
import { onMounted, onUnmounted, ref } from "vue";

const SLIDES = [TimeSlide, StopwatchSlide];

const currentSlide = ref(0);
const startX = ref(0);
let isDragging = false;

const onMouseDown = (event) => {
  startX.value = event.clientX;
  isDragging = true;
};

const onTouchStart = (event) => {
  startX.value = event.touches[0].clientX;
  isDragging = true;
};

const onMouseMove = (event) => {
  if (isDragging) {
    const movementX = event.clientX - startX.value;
    if (Math.abs(movementX) > 50) {
      if (movementX > 0 && currentSlide.value > 0) {
        currentSlide.value--;
      } else if (
        movementX < 0 &&
        currentSlide.value < SLIDES.value.length - 1
      ) {
        currentSlide.value++;
      }
      startX.value = event.clientX;
    }
  }
};

const onTouchMove = (event) => {
  if (isDragging) {
    const touch = event.touches[0];
    const movementX = touch.clientX - startX.value;
    if (Math.abs(movementX) > 50) {
      if (movementX > 0 && currentSlide.value > 0) {
        currentSlide.value--;
      } else if (
        movementX < 0 &&
        currentSlide.value < SLIDES.value.length - 1
      ) {
        currentSlide.value++;
      }
      startX.value = touch.clientX;
    }
  }
};

const onMouseUp = () => {
  isDragging = false;
};

onMounted(() => {
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("touchmove", onTouchMove, { passive: false });
  document.addEventListener("mouseup", onMouseUp);
});

onUnmounted(() => {
  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("touchmove", onTouchMove);
  document.removeEventListener("mouseup", onMouseUp);
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
