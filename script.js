/* =================================
   ELEMENTS
================================= */

const opening = document.getElementById("opening");
const mainContent = document.getElementById("mainContent");

const openButton = document.getElementById("openInvitation");

const music = document.getElementById("weddingMusic");
const musicButton = document.getElementById("musicButton");


/* =================================
   OPEN INVITATION
================================= */

/* =================================
   OPEN INVITATION - SLIDE UP
================================= */

openButton.addEventListener("click", () => {

    // Hilangkan scroll sementara
    document.body.classList.add("opening-active");

    // Jalankan animasi slide ke atas
    opening.classList.add("slide-up");

    // Tampilkan konten utama
    mainContent.classList.remove("hidden");

    // Tampilkan tombol musik
    musicButton.style.display = "block";

    // Play music
    music.volume = 0;

    music.play()
        .then(() => {

            musicButton.classList.add("playing");

            fadeInMusic();

        })
        .catch(() => {

            console.log("Music membutuhkan interaksi pengguna.");

        });

    // Trigger animations setelah opening selesai
    setTimeout(() => {

        opening.style.display = "none";

        document.body.classList.remove("opening-active");

        observeElements();

    }, 1200);

});


/* =================================
   MUSIC FADE IN
================================= */

function fadeInMusic() {

    let volume = 0;

    const fade = setInterval(() => {

        if (volume < 0.5) {

            volume += 0.02;

            music.volume = volume;

        } else {

            clearInterval(fade);

        }

    }, 100);

}


/* =================================
   MUSIC BUTTON
================================= */

musicButton.addEventListener("click", () => {

    if (music.paused) {

        music.play();

        musicButton.classList.add("playing");

    } else {

        music.pause();

        musicButton.classList.remove("playing");

    }

});


/* =================================
   COUNTDOWN
================================= */

const weddingDate = new Date(
    "March 14, 2027 08:00:00"
).getTime();


function updateCountdown() {

    const now = new Date().getTime();

    const distance = weddingDate - now;


    if (distance <= 0) {

        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";

        return;

    }


    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60))
        / 1000
    );


    document.getElementById("days").innerText =
        String(days).padStart(2, "0");

    document.getElementById("hours").innerText =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").innerText =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").innerText =
        String(seconds).padStart(2, "0");

}


setInterval(updateCountdown, 1000);

updateCountdown();


/* =================================
   FADE UP OBSERVER
   FADE IN + FADE OUT
================================= */

function observeElements() {

    const elements =
        document.querySelectorAll(".fade-up");

    const observer =
        new IntersectionObserver(

            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        // Masuk viewport
                        entry.target.classList.add("show");

                    } else {

                        // Keluar viewport
                        entry.target.classList.remove("show");

                    }

                });

            },

            {
                threshold: 0.2
            }

        );


    elements.forEach(element => {

        observer.observe(element);

    });

}


/* =================================
   PARALLAX
================================= */

const parallaxElements =
    document.querySelectorAll(".parallax");


/* =================================
   PARALLAX SECTION
================================= */

function parallaxEffect() {

    const viewportCenter =
        window.innerHeight / 2;

    parallaxElements.forEach(element => {

        const speed =
            parseFloat(
                element.dataset.speed
            ) || 0.2;

        const rect =
            element.getBoundingClientRect();

        const elementCenter =
            rect.top + rect.height / 2;

        const distance =
            elementCenter - viewportCenter;

        const movement =
            distance * speed;

        element.style.transform =
            `translate3d(0, ${movement}px, 0)`;

    });

}


/* =================================
   HERO ORNAMENT PARALLAX
================================= */

const heroCenter =
    document.querySelector(".hero-center-ornament");

const heroLeft =
    document.querySelector(".hero-center-left");

const heroRight =
    document.querySelector(".hero-center-right");


function updateHeroParallax() {

    if (!heroCenter) return;

    const scrollY =
        window.scrollY;

    /*
       Ornamen tengah
       bergerak sangat perlahan
    */

    heroCenter.style.transform =
        `translate3d(
            -50%,
            calc(-50% + ${scrollY * 0.03}px),
            0
        )`;


    /*
       Ornamen kiri
       bergerak ke kiri + sedikit turun
    */

    if (heroLeft) {

        heroLeft.style.transform =
            `translate3d(
                calc(-50% - ${scrollY * 0.05}px),
                calc(-50% + ${scrollY * 0.08}px),
                0
            )`;

    }


    /*
       Ornamen kanan
       bergerak ke kanan + sedikit naik
    */

    if (heroRight) {

        heroRight.style.transform =
            `translate3d(
                calc(-50% + ${scrollY * 0.05}px),
                calc(-50% - ${scrollY * 0.06}px),
                0
            )`;

    }

}


/* =================================
   SCROLL
================================= */

window.addEventListener(
    "scroll",
    () => {

        parallaxEffect();

        // Animasi bunga kiri dan kanan
        // tetap dikendalikan oleh CSS

    },
    { passive: true }
);

/* =================================
   INITIAL POSITION
================================= */

parallaxEffect();

/* =================================
   RSVP → WHATSAPP
================================= */

const rsvpForm = document.getElementById("rsvpForm");

if (rsvpForm) {
    rsvpForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name =
            document.getElementById("guestName").value.trim();

        const selectedAttendance =
            document.querySelector(
                'input[name="attendance"]:checked'
            );

        if (!selectedAttendance) {
            alert("Silakan pilih konfirmasi kehadiran.");
            return;
        }

        const attendance = selectedAttendance.value;

        const guestCount =
            document.getElementById("guestCount").value;

        const message =
            document.getElementById("guestMessage").value.trim();

        const phoneNumber = "628994019020";

        const whatsappMessage =
`Halo Zenny & Alif 👋

Saya ingin mengonfirmasi kehadiran untuk acara pernikahan kalian.

Nama: ${name}
Kehadiran: ${attendance}
Jumlah tamu: ${guestCount} orang

Ucapan & doa:
${message}

Terima kasih 🙏`;

        const whatsappURL =
            "https://wa.me/" +
            phoneNumber +
            "?text=" +
            encodeURIComponent(whatsappMessage);

        window.open(whatsappURL, "_blank");

    });
}