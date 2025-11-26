<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary', // primary, secondary, danger
    validator: (value) => ['primary', 'secondary', 'danger'].includes(value)
  }
})
</script>

<template>
  <button
    class="px-6 py-2 rounded-sm font-display font-bold tracking-wider uppercase transition-all duration-300 relative overflow-hidden group"
    :class="{
      'bg-neon-blue text-dark-bg hover:shadow-[0_0_20px_rgba(0,243,255,0.5)]': variant === 'primary',
      'border border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-white hover:shadow-[0_0_20px_rgba(188,19,254,0.5)]': variant === 'secondary',
      'border border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]': variant === 'danger'
    }"
  >
    <span class="relative z-10"><slot /></span>
    <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
  </button>
</template>
