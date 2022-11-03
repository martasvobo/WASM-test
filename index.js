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
};
runWasm();
