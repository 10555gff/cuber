
var UUID_SUFFIX = '-0000-1000-8000-00805f9b34fb';
var SERVICE_UUID = '0000fff0' + UUID_SUFFIX;
var CHRCT_UUID_CUBE = '0000fff6' + UUID_SUFFIX;

// index.html 或 main.js
export async function connectBLE(): Promise<void> {
   console.log('1111111111111111111111111111111连接:');
  try {
    const bluetooth:Bluetooth |null = await window.deviceAPI.scanBluetoothDevices();
    
    const device = await bluetooth.requestDevice({
		filters: [{
			name: 'QY-QYSC-S-D2D3'
		}],
		optionalServices: [SERVICE_UUID] // 这里加上你要访问的所有 service UUID
		});
		console.log('设备:', device.name);


    // const server = await device.gatt.connect();
    // console.log('已连接:', device.name);
    // ……后续读写特征值
  } catch (err) {

  }
}
