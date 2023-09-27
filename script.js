const songName = document.getElementById( 'song-name' );
const bandName = document.getElementById( 'band-name' );
const song = document.getElementById( 'audio' );
const cover =document.getElementById( 'cover' );
const play = document.getElementById( 'play' );
const previous = document.getElementById( 'previous' );
const next = document.getElementById( 'next' );

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
const playList = [gatinhaAssanhada, seSolta, elaQuerDancar];
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
    cover.src = `assets/${playList[index].file}.jpg`;
    song.src = `songs/${playList[index].file}.mp3`;
    songName.innerText = playList[index].songName;
    bandName.innerText =playList[index].artist;
}

function previousSong() {
    if(index === 0 ){
        index = playList.length -1;
    }
    else{
        index -= 1;
    }
    initializeSong();
    playSong();
}

function nextSong() {
    if(index === playList.length -1){
        index = 0;
    }
    else{
        index += 1;
    }
    initializeSong();
    playSong();
}

initializeSong();

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);