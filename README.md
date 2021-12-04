# vue-number-input-formatted
A component to build a simple input with a format and without any wrappers. 

<img src="https://raw.githubusercontent.com/ajomuch92/vue-number-input-formatted/main/gif/demo.gif" width="300" height="429"/>

### Install  

NPM:  
```bash
npm install --save vue-number-input-formatted
```

### Usage instructions  

```javascript
import VueNumberInputFormatted from 'vue-number-input-formatted';

export default {
  ...
  components: {
    VueNumberInputFormatted
  }
  ...
}
```

**Props**

|  Name | Type | Description   | Required   | Default   |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| value  | Number, String| Props to set the value of the input. Ready to use with v-model directive | True   | ''   |
| positions  | Number | Number of decimal positions | False   | 2   |
| prefix  | String | String to set the symbol as input prefix | False   | '$'   |
| suffix  | String | String to set the symbol as input suffix | False   | ''   |
| separator  | String| String to set the thousands separator | False   | ','   |
| id  | String| Props to set the input id | False   | null   |
| disabled  | Boolean | Props to disabled/enabled the input | False   | false   |
| readonly  | Boolean | Props to set the input as readonly | False   | false   |
| form  | String| Name of the form to which the input belongs | False   | null   |
| maxlength  | Number | Max number of characters for the input | False   | null   |
| minlength  | Number | Min number of characters for the input | False   | null   |
| name  | Number | String to set the input name | False   | null   |
| pattern  | RegExp | Regular expression to validate the input value | False   | null   |
| placeholder  | String | String to set the input placeholder | False   | null   |
| padStart  | String | Number to set a specific length for the input | False   | 0   |
| padStartString  | String| String to fill the missing characters for a specified padStart prop | False   | ''   |
| allowEmpty  | Boolean | Value to indicate when the input could have an empty string  | False   | false   |


**Events**

|  Name |
| ------------ |
|  blur |
|  change |
|  focus |
|  keydown |
|  keypress |
|  keyup |
|  click |

**Methods**

|  Name |
| ------------ |
|  focus |

### License
MIT

