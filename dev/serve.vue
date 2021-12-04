<script>
import Vue from 'vue';
import VueNumberInputFormatted from '@/vue-number-input-formatted.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    VueNumberInputFormatted
  }
});
</script>

<template>
  <div id="app">
    <vue-number-input-formatted />
  </div>
</template>
