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
  await adb.skipChromeWelcomeScreen(tcpProp.tcp.device);
  await adb.openChrome(tcpProp.tcp.device);
  await adb.currentActivity(tcpProp.tcp.device);
  await openBrowser(tcpProp.tcp);
  return { description: 'Browser opened' };
}

export async function closeAndroidBrowser() {
  await page.close();
  await taikoSession.removeAllListeners();
  await taikoSession.close();
  await adb.closeChrome(tcpProp.tcp.device);
}
