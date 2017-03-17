# input-autocomplete

An autocomplete component using Vuejs and the HTML5's datalist tag.

## Installation

* Download Vuejs in the official page (https://vuejs.org)
* Call the vue.js file and the input-autocomplete.js file in your page

## How to use

### Passing the list

This component has a lot of feature and options, some are required, this is the example using only the required options:

```html
<input-autocomplete
    :list="listOfObjects"
    id="identifier"
    desc="description"
></input-autocomplete>
```
Imagine a ```<select>``` tag, this component has a similar concept. We have a list of options, an id and a desc(ription) for each option. So, if I have the following list in JSON:
```javascript
let array = [
  { key: 1, name: "Albert" },
  { key: 2, name: "Roger" },
  { key: 3, name: "Wilson" },
  { key: 4, name: "Jack" }
]
```
I'd declare the component like this:
```html
<input-autocomplete
    :list="array"
    id="key"
    desc="name"
></input-autocomplete>
```

### Taking the picked id

The component emits an event *value* with the id of the selected option (if no option was selected the id is empty).
So if I want to know what was the selected option I need to add the ```v-on:value``` attribute. The component'd be:
```html
<input-autocomplete
    v-on:value="myVariable = arguments[0]"
    :list="array"
    id="key"
    desc="name"
></input-autocomplete>
```

This way I take the value (arguments[0]) and set it to *myVariable*, if I need I can call a method and pass the value as a parameter ``` v-on:value="myMethod(arguments[0])"```

### Error event

The component also emits an event *error* with true or false as value, the default value is false until the user type the first character, then the value is true until the user type something that matches one of the options or select one of them.

If you want to use this event add the ```v-on:error``` attribute and it works the same way that the *value* event

### Text event

With this event you take what the user is typing, everytime the user types something the component emits this event with the text. ```v-on:text```

### Blur event

With this event you know when the component lose the focus. ```v-on:blur```

### Reset method

This component has a reset() method and you can use it to clear the value of the input and the selected id inside the component.
To use it you'll need to add the *ref* attribute in the component and use it to call the method.
Example:

* Html
```html
<input-autocomplete
    v-on:value="myVariable = arguments[0]"
    v-on:error="disableButton(arguments[0])"
    v-on:blur="checkValue()"
    v-on:text="text = arguments[0]"
    :list="array"
    id="key"
    desc="name"
    ref="autocomplete"
></input-autocomplete>
```
* JavaScript
```javacript
vm.$refs.autocomplete.reset();
```
(Where *vm* is your Vue instance, if you are inside Vue replace it with *this*)

### Styling

When you use this component in your page you'll see that the HTML renders the ```<input type="text">``` inside a ```<div>```.
You can add a class to this ```<div>```, as well to the ```<input>```, to do it add the attribute "groupclass" and "classname", respectively.

If you need to add a class when the error (emitted by the error event) is true, add the attribute *grouperror* (```<div>```) and/or *errorclass* (```<input>```).

To add a label to the input add the *label* attribute with the name of the label and *labelclass* if you want to add a class to the label. (The label will render as a ```<div>``` tag)

### HTML attributes

You can use some of the HTML attribute in the component, this attributes are:

* placeholder
* required
* maxlength
* name
* pattern
