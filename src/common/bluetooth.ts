
export async function deviceConnect(): Promise<void> {
  console.log("请求 BLE 设备11111111111111111111111133333333333333333333333");
  // if (!navigator.bluetooth) {
  //   console.error("当前浏览器不支持 Web Bluetooth API");
  //   return;
  // }

  // try {
  //   const device = await navigator.bluetooth.requestDevice({
  //     acceptAllDevices: true,
  //     //optionalServices: ["battery_service"], // 可以换成你需要的 Service UUID
  //   });

  //   console.log("设备:", device.name || device.id);

  //   // 如果需要可以进一步连接 GATT
  //   // const server = await device.gatt?.connect();
  //   // console.log("连接 GATT:", server);

  // } catch (err) {
  //   console.error("连接失败:", err);
  // }
}

