# Images performance hometask

## Task description
Main goal of the task is to implement an approach with responsive images and lazy loading images.

## Evaluation criteria
For every day of lateness there is a penalty in 0.5 point. Maximum 10 points. 

1. Use sharp plugin (https://sharp.pixelplumbing.com/api-resize) to cut pictures into resolutions:
320, 768, 1024 and 1920 pixels and convert them into webp format during the assembly process.
Include the sliced images to the page via srcset and media **[3 points]**
2. Add jpeg images for browsers that are not support webp with the same resolutions (320,
768, 1024 and 1920 pixels) and compress them (80%). Include the sliced images to the page
via srcset and media **[3 points]**
3. Implement a lazy loading image approach (browser-level) **[1 point]**
4. Implement a lazy loading image polyfill for older browsers and use this approach only in 
browsers that do not support standard **[3 point]**

## How to run project

Ensure that Node.js is installed on your system (version 14.x is required).
Open the project directory in a terminal.
Run the following command to install the project dependencies:

**[npm install]**

Run the following command to build the project and start the server:

**[npm run start]**

Open a web browser and navigate to http://127.0.0.1:8080 to access the project.
Note: If you only want to build the project or start the server separately, you can use the following commands:

**[npm run build]**

**[npm run serve]**

