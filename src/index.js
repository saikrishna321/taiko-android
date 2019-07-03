import ADB from './adb';
let adb;
let taikoSession;
let page;
let tcpProp;
process.env['LOCAL_PROTOCOL'] = true;
let _openBrowser;
let _closeBrowser;
let _eventEmitter;

export const ID = 'android';

export function init(taiko, eventEmitter) {
  _eventEmitter = eventEmitter;
  _openBrowser = taiko.openBrowser;
  _closeBrowser = taiko.closeBrowser;
  _eventEmitter.addListener('createdSession', async () => {
    taikoSession = await taiko.client();
    page = taikoSession.Page;
    Promise.all([page.enable()]);
  });
}

export async function openBrowser() {
  adb = new ADB();
  await adb.checkIfDevices();
  let tcpDetails = await adb.portForwardTcp();
  tcpProp = Object.assign({}, ...tcpDetails.map(tcp => ({ tcp })));
  const device = tcpProp.tcp.device;
  await adb.closeChrome(device);
  await adb.skipChromeWelcomeScreen(device);
  await adb.openChrome(device);
  await adb.currentActivity(device);
  await _openBrowser(tcpProp.tcp);
  return { description: 'Browser opened' };
}

export async function closeBrowser() {
  await _closeBrowser();
  await adb.closeChrome(tcpProp.tcp.device);
}
