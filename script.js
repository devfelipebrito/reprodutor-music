const songName = document.getElementById( 'song-name' );
const bandName = document.getElementById( 'band-name' );
const song = document.getElementById( 'audio' );
const cover =document.getElementById( 'cover' );
const play = document.getElementById( 'play' );
const previous = document.getElementById( 'previous' );
const next = document.getElementById( 'next' );
const currentProgress = document.getElementById( 'current-progress' );
const progressContainer = document.getElementById( 'progress-container' );
const shuffleButton = document.getElementById( 'shuffle' );

const gatinhaAssanhada = {
    songName: 'Gatinha Assanhada',
    artist: 'Gustavo Lima',
    file: 'gatinha-assanhada'
};

const seSolta = {
    songName: 'Se Solta',
    artist: 'MC Jacáre',
    file: 'se-solta'
};

const elaQuerDancar = {
    songName: 'Ela Quer Dancar',
    artist: 'Guilherme Silva',
    file: 'ela-quer-dancar'
};

let isPlaying = false;
let isShuffled = false;

const originalPlayList = [gatinhaAssanhada, seSolta, elaQuerDancar];
let sortedPlayList = [...originalPlayList];
let index = 0;

function playSong() {
    play.querySelector('.bi').classList.remove('bi-play-circle');
    play.querySelector('.bi').classList.add('bi-pause-circle');
    song.play();
    isPlaying = true;
}

function pauseSong() {
    play.querySelector('.bi').classList.add('bi-play-circle');
    play.querySelector('.bi').classList.remove('bi-pause-circle');
    song.pause();
    isPlaying = false;
}

function playPauseDecider() {
    if ( isPlaying === true) {
        pauseSong();
    }
    else {
        playSong();
    }
}

function initializeSong() {
    cover.src = `assets/${sortedPlayList[index].file}.jpg`;
    song.src = `songs/${sortedPlayList[index].file}.mp3`;
    songName.innerText = sortedPlayList[index].songName;
    bandName.innerText =sortedPlayList[index].artist;
}

function previousSong() {
    if(index === 0 ){
        index = sortedPlayList.length -1;
    }
    else{
        index -= 1;
    }
    initializeSong();
    playSong();
}

function nextSong() {
    if(index === sortedPlayList.length -1){
        index = 0;
    }
    else{
        index += 1;
    }
    initializeSong();
    playSong();
}

function updateProgressBar() {
    song.currentTime
    song.duration
    const barWidth = (song.currentTime/song.duration)*100;
    currentProgress.style.setProperty('--progress', `${barWidth}%`);
}

function jumpTo(event) {
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition/width)*song.duration;
    song.currentTime = jumpToTime;
}

function shuffleArray(preShuffleArray) {
    const size = preShuffleArray.length;
    let currentIndex = size - 1;
    while (currentIndex > 0){
        let randomIndex = Math.floor(Math.random()*size);
        let aux = preShuffleArray[currentIndex];
        preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
        preShuffleArray[randomIndex] = aux;
        currentIndex -= 1;
    }
}

function shuffleButtonClicked() {
    if(isShuffled === false){
        isShuffled = true;
        shuffleArray(sortedPlayList);
        shuffleButton.classList.add('button-active');
    }
    else {
        isShuffled = false;
        sortedPlayList = [...originalPlayList];
        shuffleButton.classList.remove('button-active');
    }
}

initializeSong();

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', jumpTo);
shuffleButton.addEventListener('click', shuffleButtonClicked);