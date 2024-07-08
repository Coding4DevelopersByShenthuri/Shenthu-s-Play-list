let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img : 'images/stay.png',
        name : 'Stay',
        artist : 'The Kid LAROI, Justin Bieber',
        music : 'media/music_stay.mp3'
    },
    {
        img : 'images/fallingdown.jpg',
        name : 'Falling Down',
        artist : 'Wid Cards',
        music : 'media/music_fallingdown.mp3'
    },
    {
        img : 'images/faded.png',
        name : 'Faded',
        artist : 'Alan Walker',
        music : 'media/Alan Walker - Faded.mp3'
    },
    {
        img : 'images/ratherbe.jpg',
        name : 'Rather Be',
        artist : 'Clean Bandit',
        music : 'media/music_Rather Be.mp3'
    },
    {
        img : 'images/maroon-5.avif',
        name : 'Sugar',
        artist : 'Maroon 5',
        music : 'media/Sugar - Maroon 5 320(PagalWorld).mp3'
    },
    {
        img : 'images/singer.webp',
        name : 'Scars To Your Beautiful',
        artist : 'Alessia Cara',
        music : 'media/Scars-To-Your-Beautiful(PagalNew.Com.Se).mp3'
    },
    {
        img : 'images/singer1.jpg',
        name : 'See You Again',
        artist : 'Charlie Puth',
        music : 'media/See-You-Again(musicdownload.cc).mp3'
    },
    {
        img : 'images/Ed-sheeran.jpg',
        name : 'Shape of You',
        artist : 'Ed Sheeran',
        music : 'media/spotifydown.com - Shape of You.mp3'
    },
    {
        img : 'images/Ed-sheeran1.jpg',
        name : 'Perfect',
        artist : 'Ed Sheeran',
        music : 'media/Perfect Ed Sheeran-(PagalSongs.Com.IN).mp3'
    },
    {
        img : 'images/Ducan-Lawrence.jpg',
        name : 'losing Game',
        artist : 'Duncan laurence',
        music : 'media/Duncan Laurence - Loving You Is A Losing Game (Arcade) (Lyrics)(MP3_320K).mp3'
    },
    {
        img : 'images/DJ-Snake.jpg',
        name : 'Taki Taki',
        artist : 'DJ Snake',
        music : 'media/DJ Snake Selena Gomez Cardi B Ozuna - Taki Taki.mp3'
    },
    {
        img : 'images/justin-bieber.avif',
        name : 'Despacito',
        artist : 'Justin Bieber',
        music : 'media/Justin Bieber – Despacito 🎤 ft. Luis Fonsi & Daddy Yankee Pop.mp3'
    },
    {
        img : 'images/serena.jpg',
        name : 'Safari',
        artist : 'Serena',
        music : 'media/AUD-20220513-WA0063.mp3'
    },
    {
        img : 'images/XXXTentacion.webp',
        name : 'Hope',
        artist : 'XXXTentacion',
        music : 'media/XXXTENTACION-Hope.mp3'
    },
    {
        img : 'images/justin-skye.webp',
        name : 'Collide(FT. Tyga)',
        artist : 'Justin Skye',
        music : 'media/Justine-Skye-Collide-Ft-Tyga-(HiphopKit.com).mp3'
    },
    {
        img : 'images/Rema-Selena-Gomez.jpg',
        name : 'Calm Down',
        artist : 'Rema & Selena Gomez',
        music : 'media/Baby Calm Down - Rema ( Divine Ikubor ), Selena Gomez [www.sangeethe.com].mp3'
    },
    {
        img : 'images/Alan-walker.jpg',
        name : 'Alone',
        artist : 'Alan Walker',
        music : 'media/Alan Walker - Alone.mp3'
    },
    {
        img : 'images/justin-bieber.jpg',
        name : 'Baby',
        artist : 'Justin Bieber Ft.Ludacris',
        music : 'media/Baby(PaglaSongs).mp3'
    },
    {
        img : 'images/justin-bieber1.jpg',
        name : 'Sorry',
        artist : 'Justin Bieber',
        music : 'media/Justin-Bieber-Sorry-Purpose_The-Movement.mp3'
    },
    {
        img : 'images/sam-smith.jpg',
        name : 'Stay With Me',
        artist : 'Sam Smith',
        music : 'media/Stay With Me Goblin-(PagalWorld).mp3'
    },
    {
        img : 'images/Ellie-Goulding.jpg',
        name : 'Love Me Like You Do',
        artist : ' Ellie Goulding',
        music : 'media/Love Me Like You Do Full Mp3 Song Download 2021(SongsZilla.Net).mp3'
    },
    {
        img : 'images/ALEC-BENJAMIN.jpg',
        name : 'Let Me Down Slowly',
        artist : 'Alec Benjamin',
        music : 'media/Let Me Down Slowly_320(PaglaSongs).mp3'
    },
    {
        img : 'images/mario.jpg',
        name : 'Let Me Love You',
        artist : 'Mario',
        music : 'media/Let Me Love You(PagalWorld).mp3'
    }
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
}

function random_bg_color(){
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;

    function populate(a){
        for(let i=0; i<6; i++){
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let Color1 = populate('#');
    let Color2 = populate('#');
    var angle = 'to right';

    let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
    document.body.style.background = gradient;
}
function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}