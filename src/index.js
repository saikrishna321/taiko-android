import ADB from './adb';
import { openBrowser } from 'taiko';
let adb;
let taikoSession;
let page;
let tcpProp;
process.env['LOCAL_PROTOCOL'] = true;
export const ID = 'android';

export async function clientHandler(taiko) {
  taikoSession = await taiko.client();
  page = await taiko.client().Page;
  Promise.all([page.enable()]);
}

export async function openAndroidBrowser() {
  adb = new ADB();
  await adb.checkIfDevices();
  let tcpDetails = await adb.portForwardTcp();
  tcpProp = Object.assign({}, ...tcpDetails.map(tcp => ({ tcp })));
  const device = tcpProp.tcp.device;
  await adb.closeChrome(device);
  await adb.skipChromeWelcomeScreen(device);
  await adb.openChrome(device);
  await adb.currentActivity(device);
  await openBrowser(tcpProp.tcp);
  return { description: 'Browser opened' };
}

export async function closeAndroidBrowser() {
  await page.close();
  await taikoSession.removeAllListeners();
  await taikoSession.close();
  await adb.closeChrome(tcpProp.tcp.device);
}
