const audioContext = new window.AudioContext();

const numberOfSamples = 1024;

const audioBuffer = new audioContext.createBuffer(
  2,
  numberOfSamples,
  audioContext.sampleRate
);

const originalAudioSample = new Float32Array(numberOfSamples);
const amplifiedAudioSample = new Float32Array(numberOfSamples);
