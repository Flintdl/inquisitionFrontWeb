export function SoundExecute(
  url,
  soundAllowed,
  unlocked = true,
  loop = false,
  action = null,
) {
  const sound = new Audio(url);
  if (soundAllowed === "allowed" && unlocked) {
    sound.play();
    if (loop) {
      sound.loop = true;
    }
  } else {
    sound.pause();
  }
}
