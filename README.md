<h1 align="center">
	<br>
	<img src="images/TaikoAndroid.png" alt="TaikoAndroid">
	<br>
	<br>
	<br>
</h1>


[![Build Status](https://dev.azure.com/saikrishna321/taiko-android/_apis/build/status/saikrishna321.taiko-android?branchName=master)](https://dev.azure.com/saikrishna321/taiko-android/_build/latest?definitionId=4&branchName=master)

[![Demo Doccou alpha](images/video.gif)](https://youtu.be/HRdDJDA7S2I)
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


## Thanks for support 
<h3 align="left">
	<a href= "https://www.genymotion.com/"><img src="images/genymotion.png" alt="TaikoAndroid" width="50%"></a>
</h3>
