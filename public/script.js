const userVideo = document.getElementById("user-video");
const startButton = document.getElementById("start-btn");

const state = { media: null };
const socket = io(); // this helps passing the connection id to the server

startButton.addEventListener("click", async (e) => {
  // record media stream and send in binary format
  const mediaRecorder = new MediaRecorder(state.media, {
    audioBitsPerSecond: 128000,
    videoBitsPerSecond: 2500000,
    framerate: 25,
  });
  mediaRecorder.ondataavailable = (ev) => {
    console.log(ev.data, "Binary stream available");
    socket.emit("binaryStream", ev.data); // send binary stream to server
  };
  mediaRecorder.start(25);
});
window.addEventListener("load", async (e) => {
  const media = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  //   after getting state value
  state.media = media;
  //   store media stream in video element
  userVideo.srcObject = media;
  userVideo.onloadedmetadata = (e) => {
    userVideo.play();
  };
});
