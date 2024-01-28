// Track Database
tracks = [
 
  {
    name: "Bunde Bhi To Aaye Nahin",
    artist: "Rahat Fateh Ali Khan",
    cover: "https://www.pagalwrold.com/siteuploads/thumb/sft37/18170_4.jpg",
    source: "Bunde Bhi To Aaye Nahin.mp3",
  },
  {
    name: "Sher Khul Gaye Remix",
    artist: "DJ Dalal London",
    cover: "https://dl.songspk.com.se/thumb/sft199/99489_4.jpg",
    source: "Sher Khul Gaye Remix.mp3",
  },
  {
    name: "Zara Zara Flute Fusion",
    artist: "Manohari Singh",
    cover:
      "https://images.hungama.com/c/1/4d2/d5a/86621913/86621913_300x300.jpg",
    source: "Zara Zara Flute Fusion.mp3",
  },
  {
    name: "Such Keh Raha Hai Deewana",
    artist: "KK",
    cover:
      "https://i1.sndcdn.com/artworks-urMbQ49UzQKc2n8l-4yPuAg-t500x500.jpg",
    source: "Such Keh Raha Hai Deewana.mp3",
  },
  
];
// ----------------------------- Track End ---------------------------------

const audioTitle = document.querySelector(".audio-title");
const singerName = document.querySelector(".audio-singer");
const songCover = document.querySelector(".audio-img img");
const audio = document.querySelector("audio");

const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress-bar");
const progressHead = document.querySelector(".progress-head");

const songCurTime = document.querySelector(".current-time");
const songDuration = document.querySelector(".duration");

const prevBtn = document.querySelector(".skip-back");
const playPauseBtn = document.querySelector("#playPause");
const nextBtn = document.querySelector(".skip-forward");

let songPosition = 0;
let isPlaying = false;

// ----------------------------- Variable End ------------------------------

function loadSong() {
  console.log("Song Loaded");
  audioTitle.textContent = tracks[songPosition].name;
  singerName.textContent = tracks[songPosition].artist;
  songCover.src = tracks[songPosition].cover;
  audio.src = `./songs/${tracks[songPosition].source}`;
}

audio.addEventListener("ended", () => {
  loadSong(songPosition++);
  play();
});

loadSong();

// Song Play function
const play = () => {
  isPlaying = true;
  audio.play();
  playPauseBtn.classList.replace("fa-play", "fa-pause");
};

// Song Pause Function
const pause = () => {
  isPlaying = false;
  audio.pause();
  playPauseBtn.classList.replace("fa-pause", "fa-play");
};

playPauseBtn.addEventListener("click", () => {
  if (isPlaying) {
    pause();
  } else {
    play();
  }
});

// Previous Song
prevBtn.addEventListener("click", () => {
  songPosition--;
  if (songPosition < 0) {
    songPosition = tracks.length - 1;
  }
  loadSong(tracks[songPosition]);
  play();
});

// Next Song
nextBtn.addEventListener("click", () => {
  songPosition++;
  if (songPosition > tracks.length - 1) {
    songPosition = 0;
  }
  loadSong(tracks[songPosition]);
  play();
});

audio.addEventListener("timeupdate", (e) => {
  let { duration, currentTime } = e.target;

  // Current Time in second & Minute
  const currTimeSec = Math.floor(currentTime % 60);
  const sec = currTimeSec < 10 ? "0"+ currTimeSec : currTimeSec
  const currTimeMin = Math.floor(currentTime / 60);
  const currentTotalTime = `${currTimeMin} : ${sec}`;

  // Duration in second & Minute
  const durSec = Math.floor(duration % 60);
  const durSecond = durSec < 10 ? "0"+ durSec : durSec
  const durMin = Math.floor(duration / 60);
  const durationTotalTime = `${durMin} : ${durSecond}`;

  if (duration) {
    songDuration.textContent = durationTotalTime;
  }
  songCurTime.textContent = currentTotalTime;

  const percentage = (currentTime / duration) * 100;
  progressBar.style.width = `${percentage}%`;
  progressHead.style.left = `${percentage - 2}%`;
});

progress.addEventListener("click", (e) => {
  const { duration } = audio;
  const width = e.target.clientWidth;
  clickX = e.offsetX;
  audio.currentTime = (clickX / width) * duration;
});
