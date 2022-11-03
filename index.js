import { wasmBrowserInstantiate } from "./hello-world.js";

const runWasm = async () => {
  const wasmModule = await wasmBrowserInstantiate("index.wasm", {
    index: { consoleLog: (value) => console.log(value) },
  });

  const exports = wasmModule.instance.exports;

  const memory = exports.memory;

  const wasmByteMemoryArray = new Uint8Array(memory.buffer);

  console.log(`0th index of array: ${wasmByteMemoryArray[0]}`);

  wasmByteMemoryArray[1] = 511;
  console.log(exports.readWasmMemoryAndReturnIndexOne());
  const canvasElement = document.querySelector("canvas");
  const canvasContext = canvasElement.getContext("2d");
  const canvasImageData = canvasContext.createImageData(
    canvasElement.width,
    canvasElement.height
  );

  canvasContext.clearRect(0, 0, canvasElement.width, canvasContext.height);

  const getDarkValue = () => Math.floor(Math.random() * 100);
  const getLightValue = () => Math.floor(Math.random() * 127 + 127);

  const drawCheckerBoard = () => {
    const size = exports.CHECKBOARD_SIZE.valueOf();
    exports.generateCheckboard(
      getDarkValue(),
      getDarkValue(),
      getDarkValue(),
      getLightValue(),
      getLightValue(),
      getLightValue()
    );

    const imageData = wasmByteMemoryArray.slice(
      exports.CHECKBOARD_BUFFER_POINTER.valueOf(),
      exports.CHECKBOARD_BUFFER_SIZE.valueOf()
    );

    canvasImageData.data.set(imageData);

    canvasContext.clearRect(0, 0, canvasElement.width, canvasContext.height);
    canvasContext.putImageData(canvasImageData, 0, 0);
  };

  drawCheckerBoard();

  setInterval(() => {
    drawCheckerBoard();
  }, 1000);
};
runWasm();
