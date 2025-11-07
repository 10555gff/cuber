// 告诉 TypeScript 存在全局对象 window.deviceAPI
declare global {
  interface Window {
    deviceAPI: {
      scanBluetoothDevices: () => Bluetooth;
    };
  }
}

export {};
