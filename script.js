const timerDisplay = document.getElementById("timer");

const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const fullscreenBtn = document.getElementById("fullscreenBtn");
const themeBtn = document.getElementById("themeBtn");

let seconds = 0;
let timerInterval = null;
let isRunning = false;


// ======================
// تحديث شكل الوقت
// ======================

function updateTimer() {

    const hours = Math.floor(seconds / 3600);

    const minutes = Math.floor((seconds % 3600) / 60);

    const remainingSeconds = seconds % 60;

    timerDisplay.textContent =
        `${String(hours).padStart(2, "0")}:` +
        `${String(minutes).padStart(2, "0")}:` +
        `${String(remainingSeconds).padStart(2, "0")}`;
}


// ======================
// زر ابدأ
// ======================

startBtn.addEventListener("click", () => {

    if (isRunning) {

        clearInterval(timerInterval);

        isRunning = false;

        startBtn.textContent = "استئناف";

        return;
    }

    timerInterval = setInterval(() => {

        seconds++;

        updateTimer();

    }, 1000);

    isRunning = true;

    startBtn.textContent = "إيقاف مؤقت";
});


// ======================
// إعادة الضبط
// ======================

resetBtn.addEventListener("click", () => {

    clearInterval(timerInterval);

    seconds = 0;

    isRunning = false;

    startBtn.textContent = "ابدأ";

    updateTimer();
});


// ======================
// ملء الشاشة
// ======================

fullscreenBtn.addEventListener("click", async () => {

    try {

        if (!document.fullscreenElement) {

            await document.documentElement.requestFullscreen();

        } else {

            await document.exitFullscreen();

        }

    } catch (error) {

        console.log("Fullscreen غير متاح في هذا المتصفح.");

    }
});


// ======================
// تغيير الوضع
// ======================

function setTheme(theme) {

    if (theme === "light") {

        document.body.classList.add("light");

        themeBtn.textContent = "🌙";

    } else {

        document.body.classList.remove("light");

        themeBtn.textContent = "☀️";
    }

    localStorage.setItem("studyTimerTheme", theme);
}


// ======================
// زر تغيير الوضع
// ======================

themeBtn.addEventListener("click", () => {

    const isLight =
        document.body.classList.contains("light");

    if (isLight) {

        setTheme("dark");

    } else {

        setTheme("light");
    }
});


// ======================
// تحميل الوضع المحفوظ
// ======================

const savedTheme =
    localStorage.getItem("studyTimerTheme");

if (savedTheme) {

    setTheme(savedTheme);

} else {

    setTheme("dark");
}


// تشغيل العداد أول مرة
updateTimer();