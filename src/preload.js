const { bluetooth } = require("webbluetooth");

let _device = null;
let _gatt=null;
let _service=null;
let _characteristic=null;
let _chrct_cube=null;








window.deviceAPI = {
  async requestDevice(deviceName, serviceUuid) {
    _device = await bluetooth.requestDevice({
      filters: [{ name: deviceName }],
      optionalServices: [serviceUuid],
    });
    return _device;
  },


  async connect(serviceUuid, characteristicUuid) {
    if (!_device) throw new Error("请先调用 requestDevice()");
    if (!_device.gatt) throw new Error("设备不支持 GATT");
    _gatt = await _device.gatt.connect();
    _service = await _gatt.getPrimaryService(serviceUuid);
    _characteristic = await _service.getCharacteristic(characteristicUuid);
    _chrct_cube= await _characteristic.startNotifications();
    return _chrct_cube;
  }








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
