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
