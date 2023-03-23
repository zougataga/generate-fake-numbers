## generateFakeNumbers

[![generate-fake-numbers on npm](https://img.shields.io/npm/v/generate-fake-numbers.svg)](https://www.npmjs.com/package/generate-fake-numbers)

## Installation

```python
npm i generate-fake-numbers
```

## Example

```js
const generateFakeNumbers = require("generate-fake-numbers");
const generator = new generateFakeNumbers({
    max: 0, // 0/Undefined = Infinie
    pays: ["france", "belgique"], //  Allpays: france, qatar, belgique, suisse, royaumeuni, paysbas, allemagne, espagne

}, (err, numbers) => {
    if (err) return console.log(err);
    console.log(numbers);
    // -> { i: 1, numbers: '+3264093951' }
});

setTimeout(() => {
    generator.stop()
}, 2000);
```