// 1 page growth (64kB)

memory.grow(1);

const index = 0;
const value = 69;
store<u8>(index, value);

export function readWasmMemoryAndReturnIndexOne(): i32 {
  let valueAtIndexOne = load<u8>(1);
  return valueAtIndexOne;
}

declare function consoleLog(arg0: i32): void;

consoleLog(4206969);

export const CHECKBOARD_SIZE: i32 = 20;

export const CHECKBOARD_BUFFER_POINTER: i32 = 0;
export const CHECKBOARD_BUFFER_SIZE: i32 = CHECKBOARD_SIZE * CHECKBOARD_SIZE * 4;

export function generateCheckboard(
  darkRed: i32,
  darkGreen: i32,
  darkBlue: i32,
  lightRed: i32,
  lightGreen: i32,
  lightBlue: i32
): void {
  for (let x = 0; x < CHECKBOARD_SIZE; x++) {
    for (let y = 0; y < CHECKBOARD_SIZE; y++) {
      let isDark = true;

      if (y % 2 === 0) {
        isDark = false;
      }
      if (x % 2 === 0) {
        isDark = !isDark;
      }

      const redValue: i32 = isDark ? darkRed : lightRed;
      const greenValue: i32 = isDark ? darkGreen : lightGreen;
      const blueValue: i32 = isDark ? darkBlue : lightBlue;

      const squareNumber = y * CHECKBOARD_SIZE + x;
      const colorIndex = squareNumber * 4;

      store<u8>(CHECKBOARD_BUFFER_POINTER + colorIndex, redValue);
      store<u8>(CHECKBOARD_BUFFER_POINTER + colorIndex + 1, greenValue);
      store<u8>(CHECKBOARD_BUFFER_POINTER + colorIndex + 2, blueValue);
      store<u8>(CHECKBOARD_BUFFER_POINTER + colorIndex + 3, 255);
    }
  }
}
