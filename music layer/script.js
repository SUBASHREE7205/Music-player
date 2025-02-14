// Get all the elements from the HTML
const audio = document.getElementById('audio');
const playButton = document.getElementById('play');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
const progress = document.getElementById('progress');
const volumeControl = document.getElementById('volume');
const songTitle = document.getElementById('song-title');
const artistName = document.getElementById('artist');
const coverImage = document.getElementById('cover');

// Array of songs (you can add more songs to the list)
const songs = [
    { title: "MISMATCHED(S-3)", file: "song1.mp3", cover: "cover1.jpg" },
    { title: "CHHICHHORE",  file: "song2.mp3", cover: "cover2.jpg" },
    { title: "SHERSHAAH",  file: "song3.mp3", cover: "cover3.jpg" }
];

// Start playing from the first song
let currentSongIndex = 0;

// Function to update the UI with the current song info
function updateUI() {
    const song = songs[currentSongIndex];
    audio.src = song.file;
    songTitle.textContent = song.title;
    artistName.textContent = song.artist;
    coverImage.src = song.cover;
    audio.load();
}

// Play the current song
playButton.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playButton.innerHTML = '⏸️'; // Change play button to pause symbol
    } else {
        audio.pause();
        playButton.innerHTML = '▶️'; // Change pause button to play symbol
    }
});

// Next song functionality
nextButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length; // Loop through the songs
    updateUI();
    audio.play();
    playButton.innerHTML = '⏸️'; // Change to pause symbol when the song is playing
});

// Previous song functionality
prevButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length; // Loop to the last song if we're at the beginning
    updateUI();
    audio.play();
    playButton.innerHTML = '⏸️';
});

// Volume control functionality
volumeControl.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});

// Update progress bar as the song plays
audio.addEventListener('timeupdate', () => {
    const progressValue = (audio.currentTime / audio.duration) * 100;
    progress.value = progressValue;
});

// Set the song's progress when the user moves the slider
progress.addEventListener('input', (e) => {
    const seekTime = (e.target.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

// Loop the song when it ends
audio.addEventListener('ended', () => {
    nextButton.click(); // Automatically play the next song
});

// Initialize with the first song
updateUI();
