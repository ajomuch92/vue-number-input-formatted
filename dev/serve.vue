<script>
import Vue from 'vue';
import VueNumberInputFormatted from '@/vue-number-input-formatted.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    VueNumberInputFormatted
  },
  data: () => ({
    value1: 0,
    value2: 0,
    value3: 0,
    value4: '',
  }),
});
</script>

<template>
  <div id="app">
    <label>Normal</label>
    <vue-number-input-formatted v-model="value1" />
    <label>Value {{value1}}</label>
    <br/> <br />
    <label>Percentage</label>
    <vue-number-input-formatted v-model="value2" prefix="" suffix="%"/>
    <label>Value {{value2}}</label>
    <br/> <br />
    <label>Pad Star (no positions)</label>
    <vue-number-input-formatted v-model="value3" :pad-start="6" pad-start-string="*" :positions="0" prefix=""/>
    <label>Value {{value3}}</label>
    <br/> <br />
    <label>Allow Empty</label>
    <vue-number-input-formatted v-model="value4" allow-empty/>
    <label>Value {{value4}}</label>
    <br/> <br />
  </div>
</template>

<style scoped>
  #app {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
  }
</style>
