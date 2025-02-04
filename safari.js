window.App = {
  videos: [],
  play () {
    this.videos.forEach(v => v.play());
  },
  pause () {
    this.videos.forEach(v => v.pause());
  },
  muted () {
    this.videos.forEach(v => v.muted = false)
  },
  seek (value) {
    console.log(value);
    const time = Number(value/1000);
    this.videos.forEach(v => {
      v.currentTime = time;
    });
  }
}

function init (src) {
  const container = document.getElementById("container");
  const video = document.createElement("video");
  video.className = "b-container__video video-js vjs-default-skin"
  video.muted = true;

  video.addEventListener("durationchange", function (event) {
    console.log("durationchange", event.target.duration)
  })

  video.addEventListener("timeupdate", function () {
    const currentTimes = App.videos.map(v => v.currentTime);
    const delta = Math.abs(currentTimes[0] - currentTimes[1]);

    if (delta > 0.03) {
      console.log(`%c${delta}`, 'background: red; color: white; padding: 2px 5px;');
      const isReady = App.videos.map(v => v.readyState).every(state => state === 4)

      if (isReady) {
        App.videos.forEach(p => {
          p.currentTime = currentTimes[0];
        });
      }
    }
    else {
      console.log(delta);
    }
  });

  video.addEventListener("waiting", function () {
    console.log("waiting");
  })

  video.addEventListener("canplay", function () {
    console.log("canplay")
    const isReady = App.videos.map(v => v.readyState).every(v => v === 4);
    if (isReady) {
      playButton.removeAttribute("disabled");
    }
  });

  video.addEventListener("canplaythrough", function (event) {
    const isReady = App.videos.map(v => v.readyState).every(v => v === 4);
    if (isReady) {
      playButton.removeAttribute("disabled");
    }
  });

  const source = document.createElement("source");
  source.src = src;
  source.type = "application/x-mpegurl";
  video.appendChild(source);

  container.appendChild(video);

  App.videos.push(video);
}

init("https://flussonic-cdn.vod4.mediastore.app/cas/mcentral/streaming/2025/01/24/3388469/20250124-1526-1466-8002-4b13849121fd/video-1737732378660.smil/index.m3u8?token=2202505160000d6f8f687caa3b0fa50403cf3435a8aee0ddec891382e144176a184179b2be6a7");
init("https://flussonic-cdn.vod4.mediastore.app/cas/mcentral/streaming/2025/01/24/3388468/20250124-1523-2123-2117-3eaad944a1eb/video-1737732202728.smil/index.m3u8?token=22025051600008661b1ee789b03a996d2179de039fe7b9d1fab049d3f582b1d30ff2a66b54a0f");

