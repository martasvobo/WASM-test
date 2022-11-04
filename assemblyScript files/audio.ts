memory.grow(1);

export const INPUT_BUFFER_SIZE: i32 = 1024;
export const OUTPUT_BUFFER_SIZE: i32 = INPUT_BUFFER_SIZE;

export const INPUT_BUFFER_POINTER: i32 = 0;
export const OUTPUT_BUFFER_POINTER: i32 =
  INPUT_BUFFER_POINTER + INPUT_BUFFER_SIZE;

export const amplifyAudioinBuffer = (): void => {
  for (let i = 0; i < INPUT_BUFFER_SIZE; i++) {
    let audioSample = load<u8>(INPUT_BUFFER_POINTER + i);

    if (audioSample > 127) {
      const audioDiff = audioSample - 127;
      audioSample = audioSample + audioDiff;
    } else if (audioSample < 127) {
      audioSample /= 2;
    }
    store<u8>(OUTPUT_BUFFER_POINTER + i, audioSample);
  }
};
