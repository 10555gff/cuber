


let _chrct_cube: BluetoothRemoteGATTCharacteristic | null = null;
let deviceName:string ='QY-QYSC-S-D2D3';
let deviceMac:string = 'CC:A3:00:00:D2:D3';
const UUID_SUFFIX:string = '-0000-1000-8000-00805f9b34fb';
const SERVICE_UUID:string = '0000fff0' + UUID_SUFFIX;
const CHRCT_UUID_CUBE:string = '0000fff6' + UUID_SUFFIX;
const KEYS = ['NoDg7ANAjGkEwBYCc0xQnADAVgkzGAzHNAGyRTanQi5QIFyHrjQMQgsC6QA'];


export async function connectBLE(): Promise<void> {
  try {
    const device= await window.deviceAPI.requestDevice(deviceName,SERVICE_UUID);
		console.log('设备:', device?.name);

    _chrct_cube = await window.deviceAPI.connect(SERVICE_UUID,CHRCT_UUID_CUBE);
    _chrct_cube?.addEventListener('characteristicvaluechanged', onCubeEvent);
    console.log('已订阅数据通知 ✅');
    await sendHello(deviceMac);
  } catch (err) {
    console.error(err);
  }
}

//数据处理函数
function onCubeEvent(event: Event) {
   const target = event.target as BluetoothRemoteGATTCharacteristic;
   if (!target.value) return;

	//得到加密数据
  const encMsg = new Uint8Array(target.value?.buffer);




}

async function sendHello(mac:string) {
  if (!mac) {
    return Promise.reject('empty mac');
  }
  var content = [0x00, 0x6b, 0x01, 0x00, 0x00, 0x22, 0x06, 0x00, 0x02, 0x08, 0x00];
  for (var i = 5; i >= 0; i--) {
    content.push(parseInt(mac.slice(i * 3, i * 3 + 2), 16));
  }
console.log("aa");

  //return sendMessage(content);
}

