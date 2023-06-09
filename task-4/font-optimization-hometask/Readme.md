# Font Optimization hometask

## Task description

Main goal of the task is to load and use fonts in an optimized way.

## Evaluation criteria

For every day of lateness there is a penalty in 0.5 point. Maximum 10 points.

1. Import both roboto and raleway fonts properly using the most optimal font format (woff, woff2) **[2 points]**
2. Use Roboto for all paragraph texts and Raleway for all headers **[1 point]**
3. Ensure that fonts are properly preloaded with crossorgin property set properly **[2 points]**
4. Use proper font-face declaration with the appropriate unicode range, setting a correct font stack starting with local() **[3 points]**
5. Make sure that fonts are displayed with the FOUT strategy

## Results:

Both fonts loaded
![Screenshot](assets/fonts-downloaded.png)

Displayed fonts with the FOUT strategy:

https://user-images.githubusercontent.com/44818359/232053579-94775f90-d4c8-4416-8c46-e840ded84320.mov

Lighthouse:

![lighthouse-fonts](https://user-images.githubusercontent.com/44818359/232053744-1ff37c72-8b54-4039-b4ee-10a188ccfa55.png)
