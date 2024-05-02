<template>
  <div class="timers-container h-screen w-full bg-slate-950 flex justify-center font-sans">
    <div
      v-for="timer in timers"
      :key="timer.id"
      class="progress-ring-container"
      @click="toggleTimer(timer)"
    >
      <svg
        class="progress-ring"
        :viewBox="`0 0 ${timer.size} ${timer.size}`"
        :width="380"
        :height="380"
      >
        <circle
          class="progress-ring-circle"
          :stroke-dasharray="timer.circumference"
          :stroke-dashoffset="timer.time <= 0 ? timer.circumference : blueLineProgress"
          :r="timer.radius"
          :cx="timer.size / 2"
          :cy="timer.size / 2"
          :stroke="timer.isCompleted ? '#808080' : '#007bff'"
          :stroke-width="15"
        />
      </svg>

      <div class="timer-content flex flex-col items-center justify-center text-white">
        <div class="current-time font-bold">
          <div id="current-time" class="font-bold">
            {{ hours }}:{{ minutes }}
          </div>

          <div class="pb-2">{{ timer.minutes }} min</div>
          <p class="pb-4">{{ formatTime(timer.time) }}</p>
          <div class="pb-2" v-if="timer.time <= 0">
            <PhHourglassLow :size="16" color="#f2eeee" />
          </div>
         
        </div>

        <div class="timer-controls flex p-3 justify-center">
          <button
            @click="redirectToHomePage(timer)"
            class="button-style rounded-full p-1 w-8 h-8 justify-center mr-2"
            :class="{
              'bg-slate-800': timer.time > 0,
              'bg-red-500': timer.time <= 0,
              'cursor-not-allowed': timer.time <= 0,
            }"
          >
            <PhX :size="12" class="h-6 w-6 " :color="timer.time > 0 ? '#f2eeee' : '#808080'" />
          </button>

          <button
            class="button-style rounded-full p-1 w-8 h-8 justify-center mr-4"
            :class="{
              'bg-red-500': timer.intervalId,
              'bg-sky-700': !timer.intervalId,
            }"
            v-if="timer.time > 0 && !timer.isCompleted"
            @click.stop="toggleTimer(timer)"
          >
            <PhPause :size="12" v-if="timer.intervalId"   />
            <PhPlay :size="12" v-else />
          </button>

          <PhArrowCounterClockwise
            :size="12"
            color="#f2eeee"
            v-if="timer.isCompleted || timer.time <= 0"
            @click.stop="resetTimer(timer)"
            class="button-style rounded-full p-1 w-8 h-8 justify-center"
            :class="{ 'bg-neutral-500': timer.intervalId, 'bg-sky-700': !timer.intervalId }"
          />
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
  import { ref, onMounted, computed, watch, defineProps } from "vue";
  import { useRouter } from "vue-router";
  import {
    PhPlay,
    PhPause,
    PhX,
    PhArrowCounterClockwise,
    PhHourglassLow,
  } from "@phosphor-icons/vue";
  


  const isMobile = ref(window.innerWidth <= 768); 
  window.addEventListener("resize", () => {
    isMobile.value = window.innerWidth <= 768;
  });
  
  const hours = ref("");
  const minutes = ref("");
  const router = useRouter();
  
  const updateTime = () => {
    const now = new Date();
    hours.value = String(now.getHours()).padStart(2, "0");
    minutes.value = String(now.getMinutes()).padStart(2, "0");
  };
  
  onMounted(() => {
    updateTime();
    setInterval(updateTime, 100);
  });
  
  const redirectToHomePage = () => {
    router.push("/");
  };
  

 
  const props = defineProps({
    initialMinutes: {
      type: Number,
      default: 1 
    }
  });
  
  const timers = ref([
    {
      id: 1,
      minutes: props.initialMinutes,
      time: props.initialMinutes * 60,
      size: Math.min(window.innerWidth, window.innerHeight) * 0.6,
      radius: Math.min(window.innerWidth, window.innerHeight) * 0.25 - 10,
      center: Math.min(window.innerWidth, window.innerHeight) * 0.3,
      progress: 0,
      circumference:
        2 *
        Math.PI *
        (Math.min(window.innerWidth, window.innerHeight) * 0.25 - 10),
      isCompleted: false,
    },
  ]);
  
  window.addEventListener("resize", () => {
    const newSize = Math.min(window.innerWidth, window.innerHeight) * 0.6;
    timers.value[0].size = newSize;
    timers.value[0].radius = newSize * 0.25 - 10;
    timers.value[0].center = newSize * 0.3;
    timers.value[0].circumference = 2 * Math.PI * (newSize * 0.25 - 10);
  });
  
  const blueLineProgress = computed(() => {
    return (
      ((timers.value[0].minutes * 60 - timers.value[0].time) /
        (timers.value[0].minutes * 60)) *
      timers.value[0].circumference
    );
  });
  
  const startTimer = (timer) => {
  if (!timer.intervalId) {
    const totalProgress = 1000;
    timer.intervalId = setInterval(() => {
      if (timer.time > 0) {
        timer.time--;
        timer.progress -= totalProgress;
      } else {
        clearInterval(timer.intervalId);
        timer.intervalId = null;
        timer.isCompleted = true;
        
        let negativeTime = 1;
        timer.intervalId = setInterval(() => {
          timer.time = -negativeTime;
          negativeTime++;
          
          const formattedTime = formatTime(-timer.time);
          hours.value = formattedTime.split(':')[0];
          minutes.value = formattedTime.split(':')[1];
        }, totalProgress);
      }
    }, totalProgress);
  } else {
    clearInterval(timer.intervalId);
    timer.intervalId = null;
  }
};



  
  const pauseTimer = (timer) => {
    clearInterval(timer.intervalId);
    timer.intervalId = null;
  };
  
  const resetTimer = (timer) => {
  clearInterval(timer.intervalId);
  timer.intervalId = null;
  timer.time = timer.minutes * 60;
  timer.progress = 0;
  timer.isCountingDown = true;
  startTimer(timer); 
};

const formatTime = (time) => {
  const minutes = Math.floor(Math.abs(time) / 60);
  const seconds = Math.abs(time) % 60;

  if (minutes === 0) {
    return `${seconds}`;
  } else {
    const formattedMinutes = (time >= 0 ? minutes : -minutes).toString();
    const formattedSeconds = seconds.toString().padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  }
};

  
  const toggleTimer = (timer) => {
    if (timer.intervalId) {
      clearInterval(timer.intervalId);
      timer.intervalId = null;
    } else if (!timer.isCompleted && timer.time > 0) {
      startTimer(timer);
    } else {
      resetTimer(timer);
      if (timer.time <= 0) {
        timer.isCompleted = true;
      }
    }
  };
  
  const toggleCounterClockwiseButton = (timer) => {
    return timer.isCompleted || timer.time <= 0;
  };
  
  onMounted(() => {
    timers.value.forEach((timer) => {
      startTimer(timer);
    });
  });
  </script>
  <style>
  .full-screen {
    width: 100%;
    height: 100vh;
  }
  .timer-container {
    margin-right: 10px;
    cursor: pointer;
  }
  .progress-ring {
    transform: rotate(-90deg);
  }
  
  .timer-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
  .timer-time {
    margin-top: 20px;
  }
  .timers-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .progress-ring-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  
  .progress-ring {
    transform: rotate(-90deg);
  }
  
  .progress-ring-circle {
    fill: transparent;
    stroke: #007bff;
    stroke-width: 10;
  }
  
  @media (max-width: 768px) {
    .progress-ring-container {
      width: 100%;
    }
  
    .timer-content {
      padding: 20px;
    }
    
    .timer-controls  {
     
      margin: 40px; 
    }
   
  }
  </style>