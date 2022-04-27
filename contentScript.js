// Author: Srikanth Bandaru

addEventListener("keydown", (event) => {
  const isURLMatch = window.location.pathname === "/watch";
  const videoContainer = document.querySelector("video");
  let speed = videoContainer.playbackRate;

  const isIncreasing = event.ctrlKey && event.key === "ArrowRight";
  const isDecreasing = event.ctrlKey && event.key === "ArrowLeft";

  if (isURLMatch && videoContainer && isIncreasing) {
    speed += 0.25;
    if (speed > 16) speed = 16;
    displayCurrentPlaybackRate(speed);
  } else if (isURLMatch && videoContainer && isDecreasing) {
    speed -= 0.25;
    if (speed < 0.25) speed = 0.25;
    displayCurrentPlaybackRate(speed);
  }

  videoContainer.playbackRate = speed;
});

displayCurrentPlaybackRate = (speed) => {
  const div = document.createElement("div");
  div.className = "ytp-bezel";
  div.style = "display: block;font-size: 130%;";
  div.innerHTML = `<div class="ytp-bezel-icon" style="margin: 32% 0 0 17%;">${speed.toFixed(2)}x</div>`;

  document.getElementsByClassName("html5-video-player")[0].appendChild(div);
};

calculatePlaylistDuration = () => {
  const videosTimestamp = document.querySelectorAll("ytd-thumbnail-overlay-time-status-renderer");
  let totalSeconds = 0;
  for (let i = 0; i < videosTimestamp.length; i++) {
    let videoLength = videosTimestamp[i].innerText.split(":");

    totalSeconds += Number(videoLength[0]) * (videoLength.length === 3 ? 3600 : 60);
    totalSeconds += Number(videoLength[1]) * (videoLength.length === 3 ? 60 : 1);
    totalSeconds += videoLength[2] ? Number(videoLength[2]) : 0;
  }
  const totalPlaylistDuration = new Date(totalSeconds * 1000).toISOString().substr(11, 8);

  return totalPlaylistDuration;
};

const isPlaylistURL = window.location.pathname === "/playlist";
if (isPlaylistURL) {
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(calculatePlaylistDuration()));
  document.getElementById("stats").appendChild(li);
}
