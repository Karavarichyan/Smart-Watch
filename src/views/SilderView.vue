<template>
  <!-- <div>
    <div>Slider page</div>
    <router-link to="/stopwatch">
      <button>Go to Stopwatch</button>
   
  </div> -->
  <div>
    <TimeSlide/>
    TimeSlide
  </div>
  <div>
    <StopwatchSlide/>
    StopwatchSlide
  </div>
  <RouterView />
   <!-- </router-link> -->
</template>

<script setup>
import StopwatchSlide from '@/components/StopwatchSlide.vue';
import TimeSlide from '@/components/TimeSlide.vue';
</script>
