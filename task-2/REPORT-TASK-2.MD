# Identify target browser hometask
## Task description
The main goal of the task is to create 2 webpack projects and compare the sizes of the resulting js files. 
In the first project you need to connect babel and configure the browserlist according to the condition. 
In the second, you need to configure a separate assembly for old and modern browsers based on the esmodules in babel.

Structure of the task:

```
<task folder>
+---Part 1
|   +---src
|   \---package.json
|   \---webpack.config.js
|   \---.babelrc
|   \---...
+---Part 2
|   +---src
|   \---package.json
|   \---webpack.config.js
|   \---.babelrc
|   \---...
+---Comparative Report
```

## Evaluation criteria

1. In first project setup webpack to work with babel. Create .babelrc file and configure babel to support last 2
   versions of browsers, not dead browsers and browsers with usability more then 5%. **[4 points]**
2. In second project use ES modules with Babel in order to create two different js files, one of which will be less weight
   and load in modern browsers, and the second will be larger and provide support for older browsers **[3 points]**
3. Compare 3 js file sizes from both projects and attach small comparative report in hometask **[3 points]**

## Summary report:

| Project | Build      | File Size |
|---------|------------|-----------|
| Part 1  | Production | 105  B    |
| Part 2  | Legacy     | 34.8 kB   |
| Part 2  | Modern     | 18.6 kB   |

As you can see, the modern build from Part 2 is smaller than the legacy build from Part 2. This is because the modern build only includes the necessary polyfills for modern browsers, while the other builds include polyfills for older browsers as well.

The production build from Part 1 is smaller than the development build because it includes additional optimizations such as minification and dead code elimination.

Overall, it's important to optimize your webpack builds for the specific needs of your project and target audience.