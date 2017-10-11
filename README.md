# input-autocomplete

An autocomplete component using Vuejs and the HTML5's datalist tag.

Check the [demo](http://run.plnkr.co/plunks/3dEO6Fk7x7VBaTCRcj1n/)

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


The component emits an event *input* with the id of the selected option (if no option was selected the id is empty).
So if I want to know what was the selected option I just need to add a ```v-model``` attribute. The component'd be:
```html
<input-autocomplete
    v-model="myVariable"
    :list="array"
    id="key"
    desc="name"
></input-autocomplete>
```

The old way to pick the id is using the *value* event through the ```arguments[0]``` variable. You'll need to add the ```v-on:value``` attribute. The component'd be:

```html
<input-autocomplete
    v-on:value="val => { myVariable = val }"
    :list="array"
    id="key"
    desc="name"
></input-autocomplete>
```

This way I take the value and set it to *myVariable*, if I need I can call a method and the value is passed as a parameter ``` v-on:value="myMethod"```

### How to use the events

To use the events listed below you just need to add an ```v-on:``` directive on the component passing a function, that function will be called everytime the event triggers, example:

```html
<input-autocomplete
    v-on:error="err => { myErrorVariable = err }"
    v-on:text="myTextMethod"
    v-on:blur="myBlurMethod"
    :list="array"
    id="key"
    desc="name"
></input-autocomplete>
```

and on Vue:

```javascript
new Vue({
    ...
    data: {
        myErrorVariable: false
    },
    ...
    methods: {
        myTextMethod(text) {
            // do something with text variable
        },
        myBlurMethod(blur) {
            // do something with blur variable
        }
    }
    ...
})
```

### Error event

The component also emits an event *error* with true or false as value, the default value is false until the user types the first character, then the value is true until the user types something that matches one of the options or select one of them.


If you want to use this event add the ```v-on:error``` attribute. It works the same way that the *value* event

### Text event

With this event you take what the user is typing, every time the user types something the component emits this event with the text. ```v-on:text```

### Blur event

With this event you know when the component lose the focus. ```v-on:blur```

### Reset method

This component has a reset() method and you can use it to clear the value of the input and the selected id inside the component.
To use it you'll need to add the *ref* attribute in the component and use it to call the method.
Example:

* HTML
```html
<input-autocomplete
    v-on:value="val => { myVariable = val }"
    v-on:error="disableButton"
    v-on:blur="checkValue"
    v-on:text="txt => { text = txt }"
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

### SelectId and SelectDesc Method

If you want the autocomplete to set an item in a list as selected you want to use the ```selectId(id)``` or ```selectDesc(desc)``` methods.

Using the ```selectId(id)``` method you just need to pass the item's *id* and it'll select the item and trigger all the events.
The ```selectDesc(desc)``` method works the same way, obviously, you need to pass the *desc* and it'll search the item in the list and selected it.

**Attention: If there are more than one item with the specified *id* or *desc* the method will throw an error on the console and not select anything**

The usage is similar to the *reset* method.
Example:
```javacript
vm.$refs.autocomplete.selectId(4);
vm.$refs.autocomplete.selectDesc("Roger");
```
(Where *vm* is your Vue instance, if you are inside Vue replace it with *this*)

### SetText method

This method is used when you just want to set a text on the input, without triggering any event, simple like that.
The usage is similar the above methods:
Example:
```javacript
vm.$refs.autocomplete.setText("Some text");
```
(Where *vm* is your Vue instance, if you are inside Vue replace it with *this*)


### Styling

When you use this component in your page you'll see that the HTML renders the ```<input type="text">``` inside a ```<div>```.
You can add a class to this ```<div>```, as well to the ```<input>```, to do it add the attribute *groupclass* and *classname*, respectively.

If you need to add a class when the error (emitted by the error event) is true, add the attribute *grouperror* (```<div>```) and/or *errorclass* (```<input>```).

To add a label to the input add the *label* attribute with the name of the label and *labelclass* if you want to add a class to the label. (The label will render as a ```<div>``` tag)

### HTML attributes

You can use some of the HTML attribute in the component, this attributes are:

* placeholder
* required
* maxlength
* name
* pattern
