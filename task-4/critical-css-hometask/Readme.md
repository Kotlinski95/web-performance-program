# Critical css hometask

## Task description
Main goal of the task is to try the critical css approach and understand its effectiveness by comparing.

## Evaluation criteria
For every day of lateness there is a penalty in 0.5 point. Maximum 10 points. 

1. Launch webpack server and capture FP, FCP, FMP, LCP, DCL metrics for fast 3G connection in performance of dev tools **[2 point]**
2. Determine at what resolution the maximum amount of content is placed at the top of the page **[2 point]**
3. Connect critical-css-webpack plugin to separate the critical css and include it inline (take into account iphone 5,
   ipad and desktop resolutions) **[2 point]**
4. Repeat the first point of the task for the critical css approach **[2 point]**
5. Prepare a report of comparisons of metrics before and after optimization. Attach it to the task **[2 point]**

## Results

## Best resolution for show the maximum amount of content is mobile: like. Iphone 12 Pro or similar devices.

![critical-css-iphone](https://user-images.githubusercontent.com/44818359/232057977-dbfbaa60-03b2-405c-8b3f-0af8a1eb6d2c.png)

Performance profile before changes: Desktop

| Metric  | time       |
|---------|------------|
| FP      | 1218.3ms   |
| FCP     | 1218.3ms   |
| FMP     | deprecated |
| LCP     | 1218.3ms   |
| DCL     | 1431.2 ms  |

Performance profile after changes: Desktop

| Metric  | time       |
|---------|------------|
| FP      | 636.9 ms   |
| FCP     | 636.9 ms   |
| FMP     | deprecated |
| LCP     | 636.9 ms   |
| DCL     | 1174.9 ms  |

Performance profile before changes: Iphone

| Metric  | time       |
|---------|------------|
| FP      | 1284.9 ms  |
| FCP     | 1284.9 ms  |
| FMP     | deprecated |
| LCP     | 2284.8 ms  |
| DCL     | 1287.8 ms  |

Performance profile after changes: Iphone

| Metric  | time       |
|---------|------------|
| FP      | 616.8 ms   |
| FCP     | 616.8 ms   |
| FMP     | deprecated |
| LCP     | 1710.5 ms  |
| DCL     | 1171.4 ms  |

