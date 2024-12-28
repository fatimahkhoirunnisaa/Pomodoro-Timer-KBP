//navigasi
document.addEventListener('DOMContentLoaded', function () {
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function () {
        navLinks.forEach(link => link.classList.remove('text-gray-900', 'font-bold'));
        this.classList.add('text-gray-900', 'font-bold');
    });
});

// Highlight home link on page load if hash is empty
if (window.location.hash === '') {
    document.querySelector('#home-link').classList.add('text-gray-900', 'font-bold');
}
});

// API SPOTIFY
const clientId = 'a63ba674085247b0933f8326463ed098'; // Ganti dengan Client ID Anda
const clientSecret = '1424e7212d8f45799184bbccf4a2b198'; // Ganti dengan Client Secret Anda

async function getSpotifyAccessToken() {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });
    const data = await response.json();
    return data.access_token;
}

async function getTrackData(accessToken) {
    const trackId = '2TpxZ7JUBn3uw7lM6p5K0Z'; // ID lagu yang ingin ditampilkan
    const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    const data = await response.json();
    return data;
}

async function loadSpotifyTrack() {
    const accessToken = await getSpotifyAccessToken();
    const trackData = await getTrackData(accessToken);

    // Update iframe untuk menampilkan pemutar Spotify
    document.getElementById('spotify-player').src = `https://open.spotify.com/embed/track/${trackData.id}`;

    // Menampilkan informasi lagu (judul dan artis)
    document.getElementById('track-info').innerText = `🎵 ${trackData.name} - ${trackData.artists[0].name}`;
}

// Panggil fungsi untuk memuat data Spotify saat halaman dimuat
loadSpotifyTrack();

    let workTime = 25;
    let breakTime = 5;
    let seconds = workTime * 60;
    let totalTime; // Total time for progress bar
    let completedSessions = 0;


// To-Do List functions
function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const taskList = document.getElementById('task-list');
    const taskItem = document.createElement('li');
    taskItem.classList.add('flex', 'items-center', 'justify-between', 'p-4', 'bg-white', 'rounded-md', 'shadow-md', 'space-x-4', 'mb-4');

    taskItem.innerHTML = `
        <span id="task-text">${taskText}</span>
        <div>
            <button onclick="toggleTaskStatus(this)" class="px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition">Done</button>
            <button onclick="editTask(this)" class="px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition">Edit</button>
            <button onclick="deleteTask(this)" class="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition">Delete</button>
        </div>
    `;

    taskList.appendChild(taskItem);
    taskInput.value = '';
}

function toggleTaskStatus(button) {
    const taskText = button.parentNode.parentNode.querySelector('#task-text');
    taskText.classList.toggle('line-through');
    button.innerText = button.innerText === 'Done' ? 'Undo' : 'Done';
    button.classList.toggle('bg-red-500');
    button.classList.toggle('bg-green-500');
}

function editTask(button) {
    const taskText = button.parentNode.parentNode.querySelector('#task-text');
    const newTaskText = prompt("Edit task:", taskText.innerText);
    if (newTaskText) {
        taskText.innerText = newTaskText;
    }
}

function deleteTask(button) {
    button.parentNode.parentNode.remove();
} 


// Load saved tasks from localStorage
        window.onload = () => {
    loadTasks();
};

// Function to add task
function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const taskList = document.getElementById('task-list');
    const taskItem = document.createElement('li');
    taskItem.classList.add('flex', 'items-center', 'justify-between', 'p-4', 'bg-white', 'rounded-md', 'shadow-md', 'space-x-4', 'mb-4');

    taskItem.innerHTML = `
        <span class="task-text">${taskText}</span>
        <div>
            <button onclick="toggleTaskStatus(this)" class="px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition">Done</button>
            <button onclick="editTask(this)" class="px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition">Edit</button>
            <button onclick="deleteTask(this)" class="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition">Delete</button>
        </div>
    `;

    taskList.appendChild(taskItem);
    taskInput.value = '';

// Save tasks to localStorage
    saveTasks();
}

// Toggle task status (Done/Undo)
function toggleTaskStatus(button) {
    const taskText = button.parentNode.parentNode.querySelector('.task-text');
    taskText.classList.toggle('line-through');
    button.innerText = button.innerText === 'Done' ? 'Undo' : 'Done';
    button.classList.toggle('bg-red-500');
    button.classList.toggle('bg-green-500');
    saveTasks(); // Save after status change
}

// Edit task
function editTask(button) {
    const taskText = button.parentNode.parentNode.querySelector('.task-text');
    const newTaskText = prompt("Edit task:", taskText.innerText);
    if (newTaskText) {
        taskText.innerText = newTaskText;
        saveTasks(); // Save after editing
    }
}

// Delete task
function deleteTask(button) {
    button.parentNode.parentNode.remove();
    saveTasks(); // Save after deleting
}

// Save tasks to localStorage
function saveTasks() {
    const taskList = document.getElementById('task-list');
    const tasks = [];
    taskList.querySelectorAll('li').forEach(taskItem => {
        const taskText = taskItem.querySelector('.task-text').innerText;
        const isDone = taskItem.querySelector('.task-text').classList.contains('line-through');
        tasks.push({ taskText, isDone });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (!savedTasks) return;

    const taskList = document.getElementById('task-list');
    savedTasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('flex', 'items-center', 'justify-between', 'p-4', 'bg-white', 'rounded-md', 'shadow-md', 'space-x-4', 'mb-4');

        taskItem.innerHTML = `
            <span class="task-text ${task.isDone ? 'line-through' : ''}">${task.taskText}</span>
            <div>
                <button onclick="toggleTaskStatus(this)" class="px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition">${task.isDone ? 'Undo' : 'Done'}</button>
                <button onclick="editTask(this)" class="px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition">Edit</button>
                <button onclick="deleteTask(this)" class="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition">Delete</button>
            </div>
        `;

        taskList.appendChild(taskItem);
    });
}

// pesan motivasi
const motivasiList = [
"Tetap semangat! Setiap langkah kecil membawa kita lebih dekat pada tujuan.",
"Belajar adalah kunci untuk membuka masa depan yang cerah!",
"Kesulitan hari ini adalah kekuatan untuk hari esok.",
"Jangan berhenti belajar, karena hidup tidak berhenti mengajarkan.",
"Keberhasilan dimulai dengan tekad dan usaha yang konsisten.",
"Terus belajar, terus berkembang, dan raih impianmu!"
];

function ubahMotivasi() {
const motivasi = document.getElementById("motivasi");
const randomIndex = Math.floor(Math.random() * motivasiList.length);
motivasi.textContent = motivasiList[randomIndex];
}

setInterval(ubahMotivasi, 5 * 60 * 1000);  // Ubah pesan setiap 5 menit
ubahMotivasi();  // Tampilkan pesan pertama segera setelah halaman dimuat

// POMODORO TIMER
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const deleteBtn = document.getElementById('delete-btn');
const resumeBtn = document.getElementById('resume-btn');

const workTimeInput = document.getElementById('work-time');
const breakTimeInput = document.getElementById('break-time');
const breakHourInput = document.getElementById('break-hour');
const timerStatus = document.getElementById('timer-status');

const totalSessionsDisplay = document.getElementById('total-sessions');
const totalStudyTimeDisplay = document.getElementById('total-study-time');
const totalBreakTimeDisplay = document.getElementById('total-break-time');

let timerInterval;
let isRunning = false;
let isWorkTime = true;
let timeLeft = localStorage.getItem('timeLeft') ? parseInt(localStorage.getItem('timeLeft')) : 1500; // Default to 25 minutes

let totalSessions = parseInt(localStorage.getItem('totalSessions')) || 0;
let totalStudyTime = parseInt(localStorage.getItem('totalStudyTime')) || 0;
let totalBreakTime = parseInt(localStorage.getItem('totalBreakTime')) || 0;

function updateDisplay() {
const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
const seconds = (timeLeft % 60).toString().padStart(2, '0');
timerDisplay.textContent = `${minutes}:${seconds}`;
}

function updateStatistics() {
totalSessionsDisplay.textContent = `Total Sessions: ${totalSessions}`;
totalStudyTimeDisplay.textContent = `Total Study Time: ${totalStudyTime} minutes`;
totalBreakTimeDisplay.textContent = `Total Break Time: ${totalBreakTime} minutes`;
}

function startTimer() {
if (isRunning) return;
isRunning = true;
timerStatus.textContent = isWorkTime ? 'Waktu Belajar Dimulai' : 'Waktu Istirahat Dimulai';
timerInterval = setInterval(() => {
if (timeLeft > 0) {
  timeLeft--;
  localStorage.setItem('timeLeft', timeLeft);
  updateDisplay();
} else {
  clearInterval(timerInterval);
  isRunning = false;
  if (isWorkTime) {
    totalStudyTime += parseInt(workTimeInput.value);
    totalSessions++;
    localStorage.setItem('totalStudyTime', totalStudyTime);
    localStorage.setItem('totalSessions', totalSessions);
  } else {
    totalBreakTime += parseInt(breakTimeInput.value);
    localStorage.setItem('totalBreakTime', totalBreakTime);
  }
  isWorkTime = !isWorkTime;
  timeLeft = (isWorkTime ? parseInt(workTimeInput.value) : parseInt(breakTimeInput.value)) * 60;
  localStorage.setItem('timeLeft', timeLeft);
  updateStatistics();
  startTimer();
}
}, 1000);
}

function pauseTimer() {
clearInterval(timerInterval);
isRunning = false;
}

function resetTimer() {
clearInterval(timerInterval);
isWorkTime = true;
timeLeft = parseInt(workTimeInput.value) * 60;
localStorage.setItem('timeLeft', timeLeft);
updateDisplay();
timerStatus.textContent = 'Waktu Belajar Dimulai';
isRunning = false;
}

function deleteTimer() {
clearInterval(timerInterval);
localStorage.removeItem('timeLeft');
timeLeft = parseInt(workTimeInput.value) * 60;
updateDisplay();
timerStatus.textContent = 'Timer Dihapus';
isRunning = false;
}

function resumeTimer() {
if (!isRunning && timeLeft > 0) {
startTimer();
}
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
deleteBtn.addEventListener('click', deleteTimer);
resumeBtn.addEventListener('click', resumeTimer);

// Initialize display on page load
updateDisplay();
updateStatistics();

// ALARM
const alarmSound = document.getElementById('alarm-sound');

function playAlarm() {
alarmSound.play();
}

function startTimer() {
if (isRunning) return;
isRunning = true;
timerStatus.textContent = isWorkTime ? 'Waktu Belajar Dimulai' : 'Waktu Istirahat Dimulai';
timerInterval = setInterval(() => {
if (timeLeft > 0) {
timeLeft--;
localStorage.setItem('timeLeft', timeLeft);
updateDisplay();
} else {
clearInterval(timerInterval);
isRunning = false;

// Play alarm sound
playAlarm();

if (isWorkTime) {
    totalStudyTime += parseInt(workTimeInput.value);
    totalSessions++;
    localStorage.setItem('totalStudyTime', totalStudyTime);
    localStorage.setItem('totalSessions', totalSessions);
} else {
    totalBreakTime += parseInt(breakTimeInput.value);
    localStorage.setItem('totalBreakTime', totalBreakTime);
}
isWorkTime = !isWorkTime;
timeLeft = (isWorkTime ? parseInt(workTimeInput.value) : parseInt(breakTimeInput.value)) * 60;
localStorage.setItem('timeLeft', timeLeft);
updateStatistics();
startTimer();
}
}, 1000);
}

