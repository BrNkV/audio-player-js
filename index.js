let isPlay = false,
    track,
    progressBar = document.querySelector('.progress-bar'),
    durationTime = document.querySelector('.duration-time'),
    currentTime = document.querySelector('.current-time'),
    volume = 1;

window.onload = () => track = 0;

const audio = document.querySelector('audio'),
    playPauseBtn = document.querySelector('.play-pause'),
    audioImg = document.querySelector('.player__img'),
    nextTrack = document.querySelector('.control__next'),
    prevTrack = document.querySelector('.control__prev'),
    backgroundImg = document.querySelector('.background'),
    artist = document.querySelector('.song__artist'),
    title = document.querySelector('.song__title'),
    volumePlus = document.querySelector('.control__vol-plus'),
    volumeMinus = document.querySelector('.control__vol-minus'),

    playlist = [
        {
            artist: "Beyonce",
            title: "Don't Hurt Yourself",
            cover: "lemonade",
            src: "beyonce"
        },
        {
            artist: "Dua Lipa",
            title: "Don't Start Now",
            cover: "dontstartnow",
            src: "dontstartnow"
        }
    ];

playPauseBtn.addEventListener('click', () => playPauseAudio(track));

function playPauseAudio(track) {
    if (!isPlay) {
        playAudio(track);
    }
    else if (isPlay) {
        stopAudio(track);
    }
}

let currentAudioTime = 0;

function playAudio(track) {
    audio.src = `https://github.com/rolling-scopes-school/file-storage/blob/audio-player/assets/audio/${playlist[track].src}.mp3?raw=true`;
    audio.currentTime = currentAudioTime;
    playPauseBtn.src = './assets/icons/pause.png';
    audioImg.style.transform = 'scale(1.15)';
    audio.onloadeddata = () => {
        audio.play();
        audioTimer();
        isPlay = true;
    }
}

let audioPlay;

function audioTimer() {
    audioPlay = setInterval(() => {
        let audioLength = Math.floor(audio.duration);
        let audioTime = Math.round(audio.currentTime);
        durationTime.innerHTML = Math.floor(audioLength / 60) + ':' + audioLength % 60;
        currentTime.innerText = Math.floor(audioTime / 60) + ':' + seconds();
        function seconds() {
            let sec = Math.floor(audioTime % 60);
            if (sec < 10) return '0' + sec;
            else return sec;
        }
        progressBar.max = audioLength;
        progressBar.value = audioTime;
    }, 10)
};

audio.addEventListener('play', () => {
    changeInfo();
});

function setProgress(e) {
    audio.currentTime = e.target.value;
    currentAudioTime = e.target.value;
}

progressBar.addEventListener('input', setProgress);

audio.addEventListener('ended', autoNext);

function autoNext(e) {
    if (track > 0) {
        track -= 1;
        switchTrack(track);
    } else if (track == 0) {
        track = 1;
        switchTrack(track);
    }
}


function changeInfo() {
    audioImg.src = `./assets/images/${playlist[track].cover}.png`;
    backgroundImg.src = `./assets/images/${playlist[track].cover}.png`;
    artist.innerHTML = playlist[track].artist;
    title.innerHTML = playlist[track].title;
}

function stopAudio(track) {
    playPauseBtn.src = './assets/icons/play.png';
    audio.pause();
    audioImg.style.transform = 'scale(1)';
    isPlay = false;
    currentAudioTime = audio.currentTime;
    clearInterval(audioPlay);
}

nextTrack.addEventListener('click', () => {
    if (track == 0) {
        track += 1;
        switchTrack(track)
    } else if (track > 0) {
        track = 0;
        switchTrack(track);
    }

});
prevTrack.addEventListener('click', () => {
    if (track > 0) {
        track -= 1;
        switchTrack(track);
    } else if (track == 0) {
        track = 1;
        switchTrack(track);
    }
});

function switchTrack(track) {
    clearInterval(audioPlay);
    currentAudioTime = 0;
    playAudio(track);
}

volumePlus.addEventListener('click', () => {
    if (volume < 1) {
        volume += 0.2;
        audio.volume = volume;
    }
});

volumeMinus.addEventListener('click', () => {
    if (volume > 0.2) {
        volume -= 0.2;
        audio.volume = volume;
    }
});