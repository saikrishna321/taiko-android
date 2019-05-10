import { goto, loadPlugin, evaluate } from 'taiko';
import {
  ID,
  clientHandler,
  openAndroidBrowser,
  closeAndroidBrowser
} from '../src/index';
import { getConsoleOutput } from '@jest/console';

loadPlugin(ID, clientHandler);

jest.setTimeout(30000);
beforeEach(async () => {
  await openAndroidBrowser();
});

afterEach(async () => {
  await closeAndroidBrowser();
});
test('Should open browser and send events', async () => {
  await goto('http://github.com');
  let version = await evaluate(() => navigator.appVersion);
  console.log(version);
});
