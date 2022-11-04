import { wasmBrowserInstantiate } from "./instance.js";

const runWasm = async () => {
  const wasmModule = await wasmBrowserInstantiate("./constant-add-value.wasm");

  const exports = wasmModule.instance.exports;

  console.log(exports.addValue(1));

  console.log(exports.CONSTANT_VALUE.valueOf());

  console.log(exports.random);
};
runWasm();
