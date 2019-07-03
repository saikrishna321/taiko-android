<h1 align="center">
	<br>
	<img src="images/TaikoAndroid.png" alt="TaikoAndroid">
	<br>
	<br>
	<br>
</h1>

[![Build Status](https://dev.azure.com/saikrishna321/taiko-android/_apis/build/status/saikrishna321.taiko-android?branchName=master)](https://dev.azure.com/saikrishna321/taiko-android/_build/latest?definitionId=4&branchName=master)

[![Demo Doccou alpha](images/video.gif)](https://youtu.be/HRdDJDA7S2I)

## Installation

```
npm install taiko-android

```

## Usage

```javascript
import { openBrowser, closeBrowser, goto, evaluate } from 'taiko';

jest.setTimeout(30000);
beforeEach(async () => {
  await openBrowser();
});

afterEach(async () => {
  await closeBrowser();
});
test('Should open browser and send events', async () => {
  await goto('http://the-internet.herokuapp.com/');
  let version = await evaluate(
    () => navigator.appVersion.match(/.*Chrome\/([0-9.]+)/)[1]
  );
  expect(version.result).toBeTruthy();
});
```

### `openBrowser` Command

Opens the chrome browser and forwards the host and port to taiko and start using all the taiko API.

```js
openBrowser();
```

### `closeBrowser` Command

Close chrome browser.

```js
closeBrowser();
```

## Thanks for support

<h3 align="left">
	<a href= "https://www.genymotion.com/"><img src="images/genymotion.png" alt="TaikoAndroid" width="50%"></a>
</h3>
