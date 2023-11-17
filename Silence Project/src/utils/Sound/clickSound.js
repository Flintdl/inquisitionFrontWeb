export function SoundExecuteClick(url, soundAllowed) {
  const sound = new Audio(url);
  if (soundAllowed === 'allowed') {
    sound.play();
  }
}
