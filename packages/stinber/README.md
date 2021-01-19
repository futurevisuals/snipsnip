![Stinber](https://raw.githubusercontent.com/futurevisuals/snipsnip/master/packages/stinber/stinber.png)

# Stinber
Vanilla JS two-way databinding made easy! With this lightweight (**608 bytes**) vanilla JS library (written in Typescript) it is easy to update the DOM based on data.

## Installation
To incorporate Stinber in your project simply run:

```
npm install @futurevisuals/stinber
```

## Usage
You can do a lot of things with Stinber, a very simple example might look something like this.

```html
<!-- HTML -->
<div>
  <h1 data-binding="name"></h1>
  <h2 data-binding="job">Initial data, will be overwritten unless you define the 'initialRender' property.</h2>
</div>
<input type="text" data-model="name" />
```

```typescript
// Javascript/Typescript
import { createState, listener } from '@futurevisuals/stinber';

const myState = createState({
  name: 'Future Visuals',
  job: 'Developer'
});

document.querySelector('input').addEventListener('keyup', listener.bind(myState));
```

## API reference
Stinber exports two functions which you are gonna use primarily. These function are:

### createState
```typescript
import { createState } from '@futurevisuals/stinber';

const myState = {
  name: 'Future Visuals'
  // ... more data you want to bind
}

const renderConfig = {
  /**
   * description: Determines if a HTML string should be rendered as string or should be parsed to the DOM. False will render it as a string.
   * type: boolean
   * initialValue: false
   */
  allowHTML: false,

  /**
   * description: Sometimes when content comes out of a CMS you might not want to overwrite instantly. When set to false it doesn't render from the get go, only on change.
   * type: boolean
   * initialValue: true
   */
  initialRender: true,

  /**
   * description: The `innerHTML` and `textContent` methods (which are used under the hood) doesn't receive anything else other than String (officialy). With this method you can parse values to a string.
   * type: boolean
   * initialValue: false
   */
  stringifyValues: false
}

// The renderConfig and its properties are all optional.
createState(myState, renderConfig)
```

### listener
To really create two-way databinding you should link your data to some kind of user input. For now Stinber only support binding with the following inputs:

- `<input />`
- `<textarea></textarea>`
- `<select></select>`

You can ofcourse create your own listening event and update the state manually, however for simple usage you can use the built-in listener.

```typescript
import { createState, listener } from './node_modules/@futurevisuals/stinber';

const myState = createState({
  name: 'Future Visuals',
});

document.querySelector('input').addEventListener('keyup', listener.bind(myState));
```
*Note: Don't forget to bind your state as in the example!*

## Contributing
If you experiencing some bugs or like to see some feature added please create a feature request, issue or a PR on [https://github.com/futurevisuals/snipsnip](https://github.com/futurevisuals/snipsnip).