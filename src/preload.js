const bluetooth = require('webbluetooth').bluetooth;

window.deviceAPI = {
    scanBluetoothDevices:() => {
      return bluetooth;
    },
};
 
 