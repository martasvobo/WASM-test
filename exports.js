import { wasmBrowserInstantiate } from "./hello-world.js";

const runWasm = async () => {
  const wasmModule = await wasmBrowserInstantiate("./exports.wasm");

  const exports = wasmModule.instance.exports;

  console.log(exports.addValue(1));

  console.log(exports.CONSTANT_VALUE.valueOf());

  console.log(exports.random);
};
runWasm();
