document.addEventListener("DOMContentLoaded", () => {
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    // Fade-in effect on scroll
    const sections = document.querySelectorAll(".section");
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        { threshold: 0.3 }
    );

    sections.forEach((section) => {
        observer.observe(section);
    });
});

// Playlist with Songs
const songs = [
    { title: "Pasilyo", artist: "SunKissed Lola", src: "songs/P.mp3" },
    { title: "Ako na Lang", artist: "Zia Quizon", src: "songs/A.mp3" },
    { title: "Understand", artist: "KESHI", src: "songs/U.mp3" },
    { title: "Lovesick", artist: "Cesca", src: "songs/L.mp3" },
    { title: "in my heart", artist: "Grent Perez", src: "songs/I.mp3" },
    { title: "Nothing's Gonna Hurt You", artist: "Cigarettes After Sex", src: "songs/N.mp3" },
    { title: "Easy", artist: "Mac Ayres", src: "songs/E.mp3" }
];

let songIndex = 0;
let isPlaying = false;

const audio = document.getElementById("audio");
const playPauseButton = document.getElementById("play-pause");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");

const progressBar = document.getElementById("progress-bar");
const currentTimeDisplay = document.getElementById("current-time");
const totalDurationDisplay = document.getElementById("total-duration");

const volumeSlider = document.getElementById("volume-slider");
const volumeIcon = document.getElementById("volume-icon");

// Load the initial song
function loadSong(song) {
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    audio.src = song.src;
    updateProgress();
}

loadSong(songs[songIndex]);

// Play or pause the song
function togglePlayPause() {
    if (isPlaying) {
        audio.pause();
        playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        audio.play();
        playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
}

// Play the next song and reset to the first song if at the end of the list
function playNext() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    audio.play();
    playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
    isPlaying = true;
}

// Play the previous song and loop back to the last song if at the beginning
function playPrev() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    audio.play();
    playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
    isPlaying = true;
}

// Update the progress bar and time display
function updateProgress() {
    const currentTime = audio.currentTime;
    const duration = audio.duration;

    // Update the progress bar
    const progressPercent = (currentTime / duration) * 100;
    progressBar.value = progressPercent;

    // Update time displays
    currentTimeDisplay.textContent = formatTime(currentTime);
    totalDurationDisplay.textContent = formatTime(duration);
}

// Format time as mm:ss
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Seek to a specific time in the song
progressBar.addEventListener("input", () => {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

// Volume Control Functionality
audio.volume = volumeSlider.value; // Set initial volume based on slider value

volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value; // Update audio volume as slider moves
    updateVolumeIcon();
});

function updateVolumeIcon() {
    // Ensure the icon toggles properly without doubling
    if (audio.volume === 0) {
        volumeIcon.classList.remove("fa-volume-up", "fa-volume-down");
        volumeIcon.classList.add("fa-volume-mute");
    } else if (audio.volume < 0.5) {
        volumeIcon.classList.remove("fa-volume-up", "fa-volume-mute");
        volumeIcon.classList.add("fa-volume-down");
    } else {
        volumeIcon.classList.remove("fa-volume-mute", "fa-volume-down");
        volumeIcon.classList.add("fa-volume-up");
    }
}

volumeIcon.addEventListener("click", () => {
    if (audio.volume > 0) {
        audio.volume = 0; // Mute audio
        volumeSlider.value = 0;
    } else {
        audio.volume = 0.5; // Unmute and set to mid-level
        volumeSlider.value = 0.5;
    }
    updateVolumeIcon();
});

// Event listeners for playback control
playPauseButton.addEventListener("click", togglePlayPause);
nextButton.addEventListener("click", playNext);
prevButton.addEventListener("click", playPrev);

// Automatically play the next song when the current song ends
audio.addEventListener("ended", playNext);

// Update the progress bar as the song plays
audio.addEventListener("timeupdate", updateProgress);

// Load total duration when song metadata is loaded
audio.addEventListener("loadedmetadata", updateProgress);

// Envelope Modals
function openModal(index) {
    document.getElementById(`modal-${index}`).style.display = "block";
}

function closeModal(index) {
    document.getElementById(`modal-${index}`).style.display = "none";
}

// Close modal if clicked outside of modal content
window.onclick = function(event) {
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal, index) => {
        if (event.target === modal) {
            closeModal(index);
        }
    });
};

// Carousel photo data
const photos = [
    { src:"photos/photo-1.jpg", caption: "Taylor Swift Listening Session" },
    { src:"photos/photo-2.jpeg", caption: "Unforgettable Night ;)" },
    { src:"photos/photo-3.jpeg", caption: "TAMANG PACUTE LANG NI BUBU" },
    { src:"photos/photo-4.jpeg", caption: "WE SO CUTE HERE!!!" },
    { src:"photos/photo-5.jpeg", caption: "Bubu, Henlin Version" }
];

let currentPhotoIndex = 0;

const carouselImage = document.getElementById("carousel-image");
const carouselCaption = document.getElementById("carousel-caption");
const prevPhotoButton = document.getElementById("prev-photo");
const nextPhotoButton = document.getElementById("next-photo");

// Load the initial photo
function loadPhoto(index) {
    carouselImage.src = photos[index].src;
    carouselCaption.textContent = photos[index].caption;
}

// Show previous photo
prevPhotoButton.addEventListener("click", () => {
    currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
    loadPhoto(currentPhotoIndex);
});

// Show next photo
nextPhotoButton.addEventListener("click", () => {
    currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
    loadPhoto(currentPhotoIndex);
});

// Initialize carousel with the first photo
loadPhoto(currentPhotoIndex);
