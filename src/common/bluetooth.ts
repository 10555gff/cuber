let _gatt;
let _chrct_cube:any=null;
let deviceName:string ='QY-QYSC-S-D2D3';
let deviceMac:string = 'CC:A3:00:00:D2:D3';
let UUID_SUFFIX:string = '-0000-1000-8000-00805f9b34fb';
let SERVICE_UUID:string = '0000fff0' + UUID_SUFFIX;
let CHRCT_UUID_CUBE:string = '0000fff6' + UUID_SUFFIX;

// index.html 或 main.js
export async function connectBLE(): Promise<void> {
  console.log('1111111111111111111111111111111连接:');

  try {
    // const bluetooth:Bluetooth |null = await window.deviceAPI.scanBluetoothDevices();
    
    const device= await window.deviceAPI.requestDevice(deviceName,SERVICE_UUID);
		console.log('设备:', device?.name);

    // // 2. 连接 GATT 服务
    // _gatt= await window.deviceAPI.connect();
    // 


    // // 3. 获取 Service
    // const service = await window.deviceAPI.getService(SERVICE_UUID);
    // console.log('service:\n',service);
 

    _chrct_cube = await window.deviceAPI.connect(SERVICE_UUID,CHRCT_UUID_CUBE);
    console.log('已订阅数据通知 ✅');
    _chrct_cube.addEventListener('characteristicvaluechanged', onCubeEvent);


  } catch (err) {
    console.error(err);
  }
}

//数据处理函数
  function onCubeEvent(event:any):void {
    console.log("aaaaaaaaaaaaaaaa");
 
  }