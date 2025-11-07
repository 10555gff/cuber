const { bluetooth } = require("webbluetooth");

let _device = null;
let _serverGatt=null;
let _service=null;
let _characteristic=null;


var _chrct_cube;
var UUID_SUFFIX = '-0000-1000-8000-00805f9b34fb';
var SERVICE_UUID = '0000fff0' + UUID_SUFFIX;
var CHRCT_UUID_CUBE = '0000fff6' + UUID_SUFFIX;





window.deviceAPI = {
  async requestDevice(deviceName, serviceUuid) {
    _device = await bluetooth.requestDevice({
      filters: [{ name: deviceName }],
      optionalServices: [serviceUuid],
    });
    return _device;
  },
  async connect() {
    if (!_device) throw new Error("请先调用 requestDevice()");
    _serverGatt=await _device.gatt.connect();
    return _serverGatt;
  },
  async getService(serviceUuid) {
    _service = await _serverGatt.getPrimaryService(serviceUuid);
    return _service;
  },
  async getCharacteristic(characteristicUuid) {
    _characteristic = await _service.getCharacteristic(characteristicUuid);
    return _characteristic;
  },

  // /**
  //  * 发送数据（带缓存）
  //  */
  // async write(characteristic, data) {
  //   if (!characteristic) throw new Error("未指定特征值");
  //   return characteristic.writeValueWithoutResponse(new Uint8Array(data));
  // },

  // /**
  //  * 断开连接
  //  */
  // disconnect() {
  //   if (_device?.gatt?.connected) {
  //     _device.gatt.disconnect();
  //     console.log("已断开连接");
  //   }
  // },
};
