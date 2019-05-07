import adb from 'adbkit';
import log from 'npmlog';
var Promise = require('bluebird');
var adbClient = adb.createClient();

class ABD {
  async portForwardTcp() {
    return adbClient.listDevices().then(function(devices) {
      return Promise.map(devices, function(device) {
        return adbClient
          .forward(
            device.id,
            'tcp:9222',
            'localabstract:chrome_devtools_remote'
          )
          .then(function() {
            log.info(` TCP port forwarded to device ${device.id}`);
            return {
              device: device.id,
              host: 'localhost',
              port: '9222'
            };
          });
      });
    });
  }

  async openChrome(device) {
    adbClient
      .startActivity(device, {
        wait: true,
        component: 'com.android.chrome/com.google.android.apps.chrome.Main'
      })
      .catch(log.error);
  }

  async closeChrome(device) {
    adbClient
      .shell(device, 'am force-stop com.android.chrome')
      .then(adb.util.readAll)
      .then(() => {
        log.info('Closed Chrome');
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
