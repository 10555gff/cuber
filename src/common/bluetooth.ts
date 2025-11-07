
var _chrct_cube;
var UUID_SUFFIX = '-0000-1000-8000-00805f9b34fb';
var SERVICE_UUID = '0000fff0' + UUID_SUFFIX;
var CHRCT_UUID_CUBE = '0000fff6' + UUID_SUFFIX;

// index.html 或 main.js
export async function connectBLE(): Promise<void> {
  console.log('1111111111111111111111111111111连接:');

  try {
    // const bluetooth:Bluetooth |null = await window.deviceAPI.scanBluetoothDevices();
    
    const device:BluetoothDevice | null = await window.deviceAPI.requestDevice({
		filters: [{name: 'QY-QYSC-S-D2D3'}],
		optionalServices: [SERVICE_UUID] // 这里加上你要访问的所有 service UUID
		});
		console.log('设备:', device.name);

     // 2. 连接 GATT 服务
     const gatt= await device.gatt!.connect();
    console.log('已连接 GATT Server');

    // 3. 获取 Service
    const service = await gatt.getPrimaryService(SERVICE_UUID);
    console.log('service:\n',service);
 
    // 4. 获取 Characteristic
    const characteristic  = await service.getCharacteristic(CHRCT_UUID_CUBE);
    console.log('Characteristic:\n', characteristic);


    // 5. 订阅数据通知
    _chrct_cube=await characteristic.startNotifications();
    _chrct_cube.addEventListener('characteristicvaluechanged', onCubeEvent);
    console.log('已订阅数据通知 ✅');



  } catch (err) {
    console.error(err);
  }
}

//数据处理函数
  function onCubeEvent(event:any):void {
    console.log("aaaaaaaaaaaaaaaa");
 
  }