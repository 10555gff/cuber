// import * as LZString from 'lz-string';
// import { Aes128Ecb } from './aes128.js';
import { LZString} from 'lzstring.ts';


let decoder:any= null;
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



  // // 🔹 初始化 AES-128 解密器（只执行一次）
  // if (!decoder) {
  //   const decompressed= LZString.decompressFromEncodedURIComponent(KEYS[0]);
  //   if (!decompressed) throw new Error("解压密钥失败");
  //   const keyArray: number[] = JSON.parse(decompressed);

  //   decoder = new Aes128Ecb(keyArray);
  //   console.log("✅ AES-128 解密器已初始化:", keyArray);
  // }



  // // 🔹 解密每个 16 字节块
  // const msg: Uint8Array[] = [];
  // for (let i = 0; i < encMsg.length; i += 16) {
  //   const block = encMsg.slice(i, i + 16);
  //   if (block.length < 16) break; // 忽略不足 16 字节的尾块
  //   const decrypted = decoder.decrypt(block);
  //   msg.push(decrypted);
  // }


	// console.log('[qiyicube] decrypted msg', msg);






}

function sendHello(mac:string) {
  if (!mac) {
    return Promise.reject('empty mac');
  }
  var content = [0x00, 0x6b, 0x01, 0x00, 0x00, 0x22, 0x06, 0x00, 0x02, 0x08, 0x00];
  for (var i = 5; i >= 0; i--) {
    content.push(parseInt(mac.slice(i * 3, i * 3 + 2), 16));
  }

    // 🔹 初始化 AES-128 解密器（只执行一次）
  if (!decoder) {
    const decompressed= LZString.decompressFromEncodedURIComponent(KEYS[0]);
    if (!decompressed) throw new Error("解压密钥失败");
    const keyArray: number[] = JSON.parse(decompressed);

    // decoder = new Aes128Ecb(keyArray);
    console.log("✅ AES-128 解密器已初始化:", keyArray);
  }
  //return sendMessage(content);
}


  //使用的 CRC16 校验算法,确保发送和接收的数据没有被损坏
function crc16modbus(data: number[]):number {
  var crc = 0xFFFF;
  for (var i = 0; i < data.length; i++) {
    crc ^= data[i];
    for (var j = 0; j < 8; j++) {
      crc = (crc & 0x1) > 0 ? (crc >> 1) ^ 0xa001 : crc >> 1;
    }
  }
  return crc;
}


	// // content: [u8, u8, ..]
	// function sendMessage(content:number[]): Promise<void> {
  //   if (!_chrct_cube) throw new Error('未连接 Characteristic');

  //   const msg: number[] = [0xfe];
	// 	msg.push(4 + content.length); // length = 1 (op) + cont.length + 2 (crc)
	// 	for (var i = 0; i < content.length; i++) {
	// 		msg.push(content[i]);
	// 	}
	// 	const crc = crc16modbus(msg);
	// 	msg.push(crc & 0xff, crc >> 8);
	// 	const npad = (16 - msg.length % 16) % 16;
	// 	for (let i = 0; i < npad; i++) {
	// 		msg.push(0);
	// 	}
	// 	const encMsg: number[] = [];


  // // 🔹 初始化 AES-128 解密器（只执行一次）
  // if (!decoder) {
  //   const decompressed= LZString.decompressFromEncodedURIComponent(KEYS[0]);
  //   if (!decompressed) throw new Error("解压密钥失败");
  //   const keyArray: number[] = JSON.parse(decompressed);

  //   decoder = new Aes128Ecb(keyArray);
  //   console.log("✅ AES-128 解密器已初始化:", keyArray);
  // }



	// 	for (let i = 0; i < msg.length; i += 16) {
	// 		const block:number[] = msg.slice(i, i + 16);
	// 		decoder.encrypt(new Uint8Array(block));
	// 		for (var j = 0; j < 16; j++) {
	// 			encMsg[i + j] = block[j];
	// 		}
	// 	}

  // console.log("e:",encMsg);

	//  //decoder = decoder || $.aes128(JSON.parse(LZString.decompressFromEncodedURIComponent(KEYS[0])));
	// 	// for (let i = 0; i < msg.length; i += 16) {
	// 	// 	const block = msg.slice(i, i + 16);
	// 	// 	decoder.encrypt(block);
	// 	// 	for (let j = 0; j < 16; j++) {
	// 	// 		encMsg[i + j] = block[j];
	// 	// 	}
	// 	// }
	// 	// console.log('[qiyicube] send message to cube', msg, encMsg);
	// 	return _chrct_cube.writeValue(new Uint8Array(encMsg).buffer);
	// }



//: number[]