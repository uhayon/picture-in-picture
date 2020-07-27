const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// Prompt to select media stream, pass to video element, then play
async function selectMediaStream() {
  try {
    // If there's a picture in picture active, close it
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
    }

    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
  } catch (err) {
    console.log(err);
  }
}

// When the data is loaded on the video, play it automatically
videoElement.onloadedmetadata = async () => {
  videoElement.play();

  await startPictureInPicture();
};

// Start the picture-in-picture feature
async function startPictureInPicture() {
  // Disable de button
  button.disabled = true;

  // Start picture in picture
  await videoElement.requestPictureInPicture();

  // Reset the button
  button.disabled = false;
}

// Event listeners
button.addEventListener('click', selectMediaStream);
