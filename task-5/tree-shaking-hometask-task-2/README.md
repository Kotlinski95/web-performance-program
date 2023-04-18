## How to start project?

1. npm install
2. npm run build (dist folder contains bundle files)

## Task description
Create a copy of project for each task. Each task needs only one file to be changed. As a result you need to comment 3
separate projects for each task. Do not change anything in the files other than those mentioned in the task description.

## Evaluation criteria
For every day of lateness there is a penalty in 0.5 point. Maximum 10 points.

## Task 2 [3 point]

### Task description

In this task you need to work with `task2.js` file.

1. Set mode to production.
2. Remove optimization object.
3. Change task2.js file so no message will apear in a console.

## Result

Ad. 1.  Mode seet to production (in `webpack.config.js`, but it's not possible to change mode from task2.js file)

```javascript
  mode: 'production', // set mode to production
```

Ad. 2. There is no optimization object in `webpack.config.js`.

But we have to switch file from task1.js to task2.js in entry of `webpack.config.js`: 
```javascript
  entry: './src/task2.js',
```

Ad. 3. In order to remove appearing message from a console, I've commented out both function calls.

```javascript
import { sayHello, sayBye } from './fn1';

// sayHello();
// sayBye();
```



