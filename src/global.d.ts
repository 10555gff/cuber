declare interface Window {
  deviceAPI: {
    requestDevice:(deviceName:string, serviceUuid:string) => Promise<BluetoothDevice> | null;
    // connect:() => Promise<BluetoothRemoteGATTServer> | null;
    // getService:(serviceUuid:string) => Promise<BluetoothRemoteGATTService> | null;
    // getCharacteristic:(characteristicUuid:string) => Promise<BluetoothRemoteGATTCharacteristic> | null;

    connect:(serviceUuid:string,characteristicUuid:string)=> Promise<BluetoothRemoteGATTCharacteristic> | null;
    //write:(characteristic:BluetoothRemoteGATTCharacteristic, data:number [])=> Promise<void>;

    sendConnetc:(data:number [])=> Promise<void>;

    bindBluetoothDevices:(callback:any)=> Promise<void>;
  };

}

declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module "clipboard" {
  export class ClipboardJS {
    constructor(args: Element);
  }
  export default ClipboardJS;
}

