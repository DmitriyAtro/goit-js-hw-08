import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
const iframeEl = document.querySelector('#vimeo-player');

const player = new Player(iframeEl);

const VIDEO_CURRENT_TIME = 'videoplayer-current-time';

const onPlay = function (data) {
  const currentTime = data.seconds;
  localStorage.setItem(VIDEO_CURRENT_TIME, currentTime);
};

player.on('timeupdate', throttle(onPlay, 1000));

function populateVideo() {
  if (localStorage.getItem(VIDEO_CURRENT_TIME)) {
    player.setCurrentTime(localStorage.getItem(VIDEO_CURRENT_TIME));
  }
}

populateVideo();
