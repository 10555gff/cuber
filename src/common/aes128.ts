import * as aesjs from "aes-js";

export class Aes128Ecb {
  private key: Uint8Array;

  constructor(key: number[] | Uint8Array) {
    if (key.length !== 16) throw new Error("AES-128 密钥必须是 16 字节");
    this.key = key instanceof Uint8Array ? key : new Uint8Array(key);
  }

  decrypt(block: Uint8Array): Uint8Array {
    if (block.length !== 16) throw new Error("AES 解密块必须是 16 字节");
    const aes = new aesjs.ModeOfOperation.ecb(this.key);
    return aes.decrypt(block);
  }

  encrypt(block: Uint8Array): Uint8Array {
    if (block.length !== 16) throw new Error("AES 加密块必须是 16 字节");
    const aes = new aesjs.ModeOfOperation.ecb(this.key);
    return aes.encrypt(block);
  }
}
