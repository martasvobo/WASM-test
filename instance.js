export const wasmBrowserInstantiate = async (wasmModuleUrl, importObject) => {
  let response;

  if (!importObject) {
    importObject = {
      env: {
        abort: () => console.log("Abort!"),
      },
    };
  }
  if (WebAssembly.instantiateStreaming) {
    response = await WebAssembly.instantiateStreaming(
      fetch(wasmModuleUrl),
      importObject
    );
  } else {
    const fetchAndInstantiateTask = async () => {
      const wasmArrayBuffer = await fetch(wasmModuleUrl).then((response) =>
        response.arrayBuffer()
      );
      return WebAssembly.instantiate(wasmArrayBuffer, importObject);
    };
  }
  return response;
};

const runWasmAdd = async () => {
  const wasmModule = await wasmBrowserInstantiate("./addition-function.wasm");
  const addResult = wasmModule.instance.exports.add(24, 24);

  document.querySelector("p").innerHTML = "result " + addResult;
};
runWasmAdd();
