<template>
  <div>
    <div @click="toggleAccordion()" class="w-100 flex items-center acc-btn" :aria-expanded="isOpen"
      :aria-controls="`collapse${_uid}`">
      <slot name="title" />
      <svg class="w-3 transition-all duration-200 transform" :class="{
        'rotate-180': isOpen,
        'rotate-0': !isOpen,
      }" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 10" aria-hidden="true">
        <path d="M15 1.2l-7 7-7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>

    <div v-show="isOpen" :id="`collapse${_uid}`">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },

  methods: {
    toggleAccordion() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>
<style >
.acc-btn {
  border: 1px solid transparent !important;
  position: relative;
}

.acc-btn svg {
  position: absolute;
  top: 50%;
  right: 0;
  width: 12px;
  transform: translateY(-50%);
}

svg.rotate-180 {
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  -o-transform: rotate(180deg);
}
</style>