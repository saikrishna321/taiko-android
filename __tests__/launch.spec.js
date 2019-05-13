import { goto, loadPlugin, evaluate } from 'taiko';
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
test('Should open browser and send events', async () => {
  await goto('http://the-internet.herokuapp.com/');
  let version = await evaluate(
    () => navigator.appVersion.match(/.*Chrome\/([0-9.]+)/)[1]
  );
  expect(version.result).toBe('74.0.3729');
});
