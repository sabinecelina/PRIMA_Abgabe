namespace Bomberpac {
  import fCore = FudgeCore;

  export function showMenue(): void {
    document.getElementById("menueButtons").style.display = "initial";
    document.getElementById("gameWrapper").style.display = "none";
    document.getElementById("winScreen").style.display = "none";
    document.getElementById("creditsPage").style.display = "none";
    document.getElementById("controlPage").style.display = "none";
    document.getElementById("backButton").style.display = "none";
    document.getElementById("level").style.display = "initial";
  }
  export function showControls(): void {
    document.getElementById("menueButtons").style.display = "none";
    document.getElementById("winScreen").style.display = "none";
    document.getElementById("controlPage").style.display = "initial";
    document.getElementById("backButton").style.display = "initial";
    document.getElementById("level").style.display = "none";
  }
  export function showCredits(): void {
    document.getElementById("menueButtons").style.display = "none";
    document.getElementById("winScreen").style.display = "none";
    document.getElementById("creditsPage").style.display = "initial";
    document.getElementById("backButton").style.display = "initial";
    document.getElementById("level").style.display = "none";
  }

  export function toggleMusic(): void {
    Sound.init();
    if (!musicMuted) {
      musicMuted = true;
      document.getElementById("musicButton").innerHTML = "Musik: aus";
      Sound.stopMusic();
    } else if (musicMuted) {
      musicMuted = false;
      document.getElementById("musicButton").innerHTML = "Musik: an";
      Sound.playMusic();
      Sound.sounds["gameMusic"].muted = false;
    }
  }
  export function toggleSounds(): void {
    Sound.init();
    if (!soundMuted) {
      soundMuted = true;
      document.getElementById("soundButton").innerHTML = "Sound: aus";
    } else if (soundMuted) {
      soundMuted = false;
      document.getElementById("soundButton").innerHTML = "Sound: an";
    }
  }
  export function randomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  export function getRandomTranslateX(): number {
    return randomInteger(1, 28);
  }
  export function getRandomTranslateY(): number {
    return randomInteger(1, 19);
  }
  export function gameWinningScreen(pacman: number): void {
    Sound.stopMusic();
    fCore.Loop.stop();
    document.getElementById("winScreen").style.display = "initial";
    document.getElementById("gameWrapper").style.display = "none";
    if (pacman === 1) {
      document.getElementById("winScreenPlayerOne").style.display = "initial";
      document.getElementById("winScreenPlayerTwo").style.display = "none";
    } else {
      document.getElementById("winScreenPlayerOne").style.display = "none";
      document.getElementById("winScreenPlayerTwo").style.display = "initial";
    }
  }
}