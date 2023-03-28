## Step made in order to increase performance score

Initial performance result: *16*
Report with al details: `reports/Performance raport original.pdf`

1. Server files compression:

Added piece of code:
```javascript
const fs = require('fs');
const compression = require('compression');
app.use(compression());
app.use(express.static('build'));
```
into `server.js`,

Performance result: *22*
Report with al details: `reports/Performance raport - server compression.pdf`

2. Image resizing:

In `src/model.js`, replacd `const dir = 'big'` with `const dir = 'small'`

Performance result: *27*
Report with al details: `reports/Performance raport - image resizing.pdf`

3. Unused scripts removing:

Deleted `<script src="/libs/lodash.js">` and `<script src="/libs/jquery.js"></script>`.

Performance result: *30*
Report with al details: `reports/Performance raport - remove unused scripts.pdf`

4. Webpack production mode "on":

In `webpack.config.js` changed `"mode":"development"` to `"mode":"production"`.

Performance result: *39*
Report with al details: `reports/Performance raport - production mode.pdf`

5. Remove blocking function:

In `src/App.jsx` removed `this.mineBitcoin(1500)` function call in the `constructor`.

Performance result: *100*
Report with al details: `reports/Performance raport - remove blocking function.pdf`