<h1 align="center">
	<br>
	<img src="images/TaikoAndroid.png" alt="TaikoAndroid">
	<br>
	<br>
	<br>
</h1>

A plugin to run web tests on android devices and emulator using Taiko

## Usage

```javascript
import { goto, loadPlugin, click } from 'taiko';
import {
  ID,
  clientHandler,
  openAndroidBrowser,
  closeAndroidBrowser
} from '../src/index';

loadPlugin(ID, clientHandler);

jest.setTimeout(30000);
beforeEach(async () => {
  await openAndroidBrowser();
});

afterEach(async () => {
  await closeAndroidBrowser();
});
test('Should return speedindex and perceptualSpeedIndex', async () => {
  await goto('http://github.com');
  await click('Sign up');
});
```

### `openAndroidBrowser` Command

Opens the chrome browser and forwards the host and port to taiko.

```js
openAndroidBrowser();
```

### `closeAndroidBrowser` Command

Close chrome browser.

```js
closeAndroidBrowser();
```
