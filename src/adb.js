import adb from 'adbkit';
import log from 'npmlog';
import getPort from 'get-port';
var Promise = require('bluebird');
var adbClient = adb.createClient();

class ABD {
  async portForwardTcp() {
    let freePort = await getPort();
    return adbClient.listDevices().then(function(devices) {
      return Promise.map(devices, function(device) {
        return adbClient
          .forward(
            device.id,
            `tcp:${freePort}`,
            'localabstract:chrome_devtools_remote'
          )
          .then(function() {
            log.info(` TCP port forwarded to device ${device.id}`);
            return {
              device: device.id,
              host: 'localhost',
              port: freePort
            };
          });
      });
    });
  }

  async checkIfDevices() {
    let devices = await adbClient.listDevices();
    this.assert(devices);
  }

  async skipChromeWelcomeScreen(device) {
    await adbClient
      .shell(
        device,
        'echo "chrome --disable-fre --no-first-run" > /data/local/tmp/chrome-command-line'
      )
      .then(adb.util.readAll)
      .then(output => {
        log.info(` Skipped Chrome welcome screen ${output}`);
      });
  }

  async openChrome(device) {
    await adbClient
      .startActivity(device, {
        wait: true,
        component: 'com.android.chrome/com.google.android.apps.chrome.Main',
        data: 'taiko.gauge.org',
        flags: 0x00008000
      })
      .catch(log.error);
  }

  async currentActivity(device) {
    await adbClient
      .shell(
        device,
        'dumpsys window windows | grep -E "mCurrentFocus|mFocusedApp"'
      )
      .then(adb.util.readAll)
      .then(output => {
        log.info(`Current Activity ${output}`);
      });
  }

  async closeChrome(device) {
    await adbClient
      .shell(device, 'am force-stop com.android.chrome')
      .then(adb.util.readAll)
      .then(() => {
        log.info(' Closed Chrome');
      });
  }

  assert(value) {
    if (value.length == 0) {
      throw new Error(
        'No Android Devices/Emulators found, Make sure adb device can detect connected devices'
      );
    }
  }
}

export default ABD;
