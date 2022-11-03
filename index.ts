memory.grow(1);

const index = 0;
const value = 69;
store<u8>(index, value);

export function readWasmMemoryAndReturnIndexOne(): i32 {
    let valueAtIndexOne = load<u8>(1);
    return valueAtIndexOne;
}

declare function consoleLog(arg0: i32): void;

consoleLog(4206969)