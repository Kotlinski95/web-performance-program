## How to start project?

1. npm install
2. npm run build (dist folder contains bundle files)

## Task description
Create a copy of project for each task. Each task needs only one file to be changed. As a result you need to comment 3
separate projects for each task. Do not change anything in the files other than those mentioned in the task description.

## Evaluation criteria
For every day of lateness there is a penalty in 0.5 point. Maximum 10 points.

## Task 3 [4 point]

### Task description

In this task you need to work with `package.json` file.

1. Set mode to production.
2. Remove optimization object.
3. Don't change js files or webpack configuration file.
4. There should be no 'console.log' statement in final bundle file.


## Result

Ad. 1.  Mode seet to production (in `package.json`, using `--mode=production` flag of webpack cli command.)

Ad 2. There was no optimization object by default, so there is no need to remove it.

Ad 4. Script section was modified during this task in `package.json` file:
```javascript
  "scripts": {
    "build": "webpack --mode=production --entry ./src/task3.js && npm run remove-logs",
    "serve": "webpack-dev-server",
    "remove-logs": "find ./dist -name '*.js' -type f -exec sed -E -i '' -e 's/console\\.log\\(([^()]|\\\\\\([^()]*\\\\\\))*\\);?,?//g' {} \\;"
  },
```

build script changing mode to production, change entry to script task3.js (in task 1 we used task1.js, in task 2 we use task2.js so it's a a logical convention.)

'remove-logs' script is used in order to remove all console logs from all javascript files inside dist folder.

This solution was required, because since we use webpack 4+ we can't use webpack CLI command like --optimize-minimize with additional flag for optimizin inside package.json.

Running npx webpack --help - there is no such flags to use.
