<template>
  <input
    ref="input"
    type="text"
    v-bind="validProps"
    v-model="displayValue"
    @blur="onBlurHandler"
    @change="onChangeHandler"
    @focus="onFocusHandler"
    @keydown="onKeyDownHandler"
    @keypress="onKeyPressHandler"
    @keyup="onKeyUpHandler"
    @click="onClickHandler"
  />
</template>

<script>
export default {
  name: 'VueNumberInputFormatted',
  props: {
    value: {
      type: [Number, String],
      default: null,
    },
    positions: {
      type: Number,
      default: 2,
    },
    prefix: {
      type: String,
      default: '$',
    },
    suffix: {
      type: String,
      default: '',
    },
    separator: {
      type: String,
      default: ',',
    },
    id: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    form: {
      type: String,
      default: null,
    },
    maxlength: {
      type: [String, Number],
      default: null,
    },
    minlength: {
      type: [String, Number],
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    pattern: {
      type: RegExp,
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
    padStart: {
      type: Number,
      default: 0,
    },
    padStartString: {
      type: String,
      default: '',
    },
    allowEmpty: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    isInputActive: false,
  }),
  computed: {
    displayValue: {
      get() {
        if (this.isInputActive) {
          return (this.value || '').toString();
        }
        if (this.allowEmpty && (this.value === null || this.value === undefined || this.value === '')) return '';
        const prefix = this.prefix?.length ? `${this.prefix} ` : '';
        const suffix = this.suffix?.length ? ` ${this.suffix}` : '';
        console.log(this.value || 0)
        let value = (this.value || 0).toFixed(this.positions).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, `$1${this.separator}`);
        if (this.padStart > 0) {
          const indexDecimalSeparator = value.indexOf(this.decimalSeparator);
          if (indexDecimalSeparator !== -1) {
            const beginString = value.slice(0, indexDecimalSeparator);
            const endString = value.slice(indexDecimalSeparator, value.length);
            value = beginString.padStart(this.padStart, this.padStartString) + endString;
          } else {
            value = value.padStart(this.padStart, this.padStartString);
          }
        }
        return `${prefix}${value}${suffix}`;
      },
      set(modifiedValue) {
        let newValue = parseFloat(modifiedValue);
        if (this.allowEmpty && (modifiedValue === null || modifiedValue === undefined || modifiedValue === '')) {
          newValue = '';
        } else if (Number.isNaN(newValue)) {
          newValue = 0;
        }
        this.$emit('input', newValue);
      },
    },
    decimalSeparator() {
        let n = 1.1;
        n = n.toLocaleString().substring(1, 2);
        return n;
    },
    validProps() {
      return {
        id: this.id,
        disabled: this.disabled,
        readonly: this.readonly,
        form: this.form,
        maxlength: this.maxlength,
        minlength: this.minlength,
        name: this.name,
        pattern: this.pattern,
        placeholder: this.placeholder,
      };
    },
  },
  methods: {
    onBlurHandler(event) {
      this.isInputActive = false;
      this.$emit('blur', event);
    },
    onChangeHandler(event) {
      this.$emit('change', event);
    },
    onFocusHandler(event) {
      this.isInputActive = true;
      this.$emit('focus', event);
    },
    onKeyDownHandler(event) {
      this.$emit('keydown', event);
    },
    onKeyPressHandler(event) {
      const { value } = event.target;
      const char = String.fromCharCode(event.which);
      const text = value.toString() + char.toString();
      if (isNaN(text) && text !== '-') {
        event.preventDefault();
      }
      this.$emit('keypress', event);
    },
    onKeyUpHandler(event) {
      this.$emit('keyup', event);
    },
    onClickHandler(event) {
      this.$emit('click', event);
    },
    focus() {
      this.$refs.input.focus();
    },
  },
};
</script>

<style scoped>

</style>
