## How to start project?

1. npm install
2. npm run build (dist folder contains bundle files)

## Task description
Create a copy of project for each task. Each task needs only one file to be changed. As a result you need to comment 3
separate projects for each task. Do not change anything in the files other than those mentioned in the task description.

## Evaluation criteria
For every day of lateness there is a penalty in 0.5 point. Maximum 10 points.

## Task 1 [3 point]

### Task description 

In this task you need to work with `webpack.config.js` file.

1. Set mode to production.
2. Change webpack.config.js, so function sayHello and function sayBye would appear in final build.

## Result

```javascript
  mode: 'production', // set mode to production
```

```javascript
  optimization: {
    // add optimization section to include all exports
    usedExports: false,
    providedExports: false,
  }
```

Now after `npm run build` inside `dist/main.bundle.js`
there is also sayBye function appear:

```javascript
(()=>{"use strict";var e={334:(e,o,r)=>{function t(){console.log("Hello")}function l(){console.log("Bye")}r.r(o),r.d(o,{sayBye:()=>l,sayHello:()=>t})}},o={};function r(t){var l=o[t];if(void 0!==l)return l.exports;var n=o[t]={exports:{}};return e[t](n,n.exports,r),n.exports}r.d=(e,o)=>{for(var t in o)r.o(o,t)&&!r.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:o[t]})},r.o=(e,o)=>Object.prototype.hasOwnProperty.call(e,o),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};r.r({}),(0,r(334).sayHello)()})();
```