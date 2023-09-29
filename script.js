const songName = document.getElementById( 'song-name' );
const bandName = document.getElementById( 'band-name' );
const song = document.getElementById( 'audio' );
const cover =document.getElementById( 'cover' );
const play = document.getElementById( 'play' );
const previous = document.getElementById( 'previous' );
const likeButton = document.getElementById( 'like' );
const next = document.getElementById( 'next' );
const currentProgress = document.getElementById( 'current-progress' );
const progressContainer = document.getElementById( 'progress-container' );
const shuffleButton = document.getElementById( 'shuffle' );
const repeatBotton = document.getElementById( 'repeat' );
const songTime = document.getElementById( 'song-time' );
const totalTime = document.getElementById( 'total-time' );

const gatinhaAssanhada = {
    songName: 'Gatinha Assanhada',
    artist: 'Gustavo Lima',
    file: 'gatinha-assanhada',
    liked: false,
};

const seSolta = {
    songName: 'Se Solta',
    artist: 'MC Jacáre',
    file: 'se-solta',
    liked: false,
};

const elaQuerDancar = {
    songName: 'Ela Quer Dancar',
    artist: 'Guilherme Silva',
    file: 'ela-quer-dancar',
    liked: false,
};

let isPlaying = false;
let isShuffled = false;
let repeatOn = false;

const originalPlayList = JSON.parse(localStorage.getItem('playlist')) ?? [gatinha-assanhada, se-seSolta, elaQuerDancar];
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

function likeButtonRender () {
    if(sortedPlayList[index].liked === true) {
        likeButton.querySelector('.bi').classList.remove('bi-heart');
        likeButton.querySelector('.bi').classList.add('bi-heart-fill');
        likeButton.classList.add('button-active');
    }
    else {
        likeButton.querySelector('.bi').classList.add('bi-heart');
        likeButton.querySelector('.bi').classList.remove('bi-heart-fill');
        likeButton.classList.remove('button-active');
    }
}

function initializeSong() {
    cover.src = `assets/${sortedPlayList[index].file}.jpg`;
    song.src = `songs/${sortedPlayList[index].file}.mp3`;
    songName.innerText = sortedPlayList[index].songName;
    bandName.innerText =sortedPlayList[index].artist;
    likeButtonRender();
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

function updateProgress() {
    const barWidth = (song.currentTime/song.duration)*100;
    currentProgress.style.setProperty('--progress', `${barWidth}%`);
    songTime.innerText = toHHMMSS(song.currentTime);
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

function repeatButtonClicked() {
    if(repeatOn === false){
        repeatOn = true;
        repeatBotton.classList.add('button-active');
    }
    else{
        repeatOn = false;
        repeatBotton.classList.remove('button-active');
    }
}

function nextOrRepeat () {
    if(repeatOn === false){
        nextSong();
    }
    else{}
    playSong();
}

function toHHMMSS(originalNumber) {
    let hours = Math.floor(originalNumber/3600);
    let min = Math.floor((originalNumber - hours * 3600)/60); 
    let secs = Math.floor(originalNumber - hours * 3600 - min * 60);

    return `${hours.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateTotalTime() {
    totalTime.innerText = toHHMMSS(song.duration);
}

function likeButtonClicked() {
    if(sortedPlayList[index].liked === false){
        sortedPlayList[index].liked = true;
    }
    else{
        sortedPlayList[index].liked = false;
    }
    likeButtonRender();
    localStorage.setItem('playlist', 
    JSON.stringify(sortedPlayList
    ));
}


initializeSong();

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateProgress);
song.addEventListener('ended', nextOrRepeat);
song.addEventListener('loadedmetadata', updateTotalTime);
progressContainer.addEventListener('click', jumpTo);
shuffleButton.addEventListener('click', shuffleButtonClicked);
repeatBotton.addEventListener('click', repeatButtonClicked);
likeButton.addEventListener('click', likeButtonClicked);