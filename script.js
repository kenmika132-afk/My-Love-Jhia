/* ========================================= */
/* ============ ENVELOPE INTRO ============= */
/* ========================================= */

const introOverlay =
  document.getElementById("introOverlay");

const envelopeWrap =
  document.getElementById("envelopeWrap");

const loveCard =
  document.getElementById("loveCard");


envelopeWrap.addEventListener("click", () => {

  /* Only allow opening once */

  if (envelopeWrap.classList.contains("opened")) {

    return;

  }

  envelopeWrap.classList.add("opened");


  /* Start playing "our song" right away, */
  /* while the user gesture is still fresh */

  const ourSong =
    songs.song1;

  ourSong.currentTime = 0;

  ourSong.play()
    .then(() => {

      topMusicButton.innerHTML =
        "⏸ &nbsp; Pause Song";

      currentSong =
        ourSong;

    })
    .catch(() => {

      /* Autoplay was blocked, that's okay - */
      /* the top button still lets her play it */

    });


  /* Let the envelope + letter animation play, */
  /* then fade the intro away and reveal the card */

  setTimeout(() => {

    introOverlay.classList.add("fade-out");

    loveCard.classList.add("revealed");

    setTimeout(() => {

      introOverlay.style.display = "none";

    }, 900);

  }, 1200);

});



/* ========================================= */
/* ============== NAVIGATION =============== */
/* ========================================= */

const navButtons =
  document.querySelectorAll(".nav-btn");

const pages =
  document.querySelectorAll(".page");


navButtons.forEach(button => {

  button.addEventListener("click", () => {

    const pageName =
      button.dataset.page;


    /* Remove active from buttons */

    navButtons.forEach(btn => {

      btn.classList.remove("active");

    });


    /* Activate clicked button */

    button.classList.add("active");


    /* Hide every page */

    pages.forEach(page => {

      page.classList.remove("active-page");

    });


    /* Show selected page */

    document
      .getElementById(pageName)
      .classList.add("active-page");

  });

});



/* ========================================= */
/* =============== SURPRISE ================ */
/* ========================================= */

const surpriseBtn =
  document.getElementById("surpriseBtn");

const surprise =
  document.getElementById("surprise");

const closeSurprise =
  document.getElementById("closeSurprise");


surpriseBtn.addEventListener("click", () => {

  surprise.classList.add("show");

});


closeSurprise.addEventListener("click", () => {

  surprise.classList.remove("show");

});


/* Close when clicking outside */

surprise.addEventListener("click", event => {

  if (event.target === surprise) {

    surprise.classList.remove("show");

  }

});



/* ========================================= */
/* ================= SONGS ================== */
/* ========================================= */


/*
  Make sure these files exist
  in the same folder as index.html
*/

const songs = {

  song1:
    new Audio("Kali_Uchis_-_Melting__mp3_pm_.mp3"),

  song2:
    new Audio("Cup_of_Joe_-_Pahina__mp3_pm_.mp3"),

  song3:
    new Audio("Deniece_Williams_-_It_s_Gonna_Take_a_Miracle__mp3_pm_.mp3")

};


const playButtons =
  document.querySelectorAll(".play-btn");


const topMusicButton =
  document.getElementById("topMusicButton");


let currentSong = null;

let currentButton = null;



/* ========================================= */
/* ============ PLAY SONG ================== */
/* ========================================= */

playButtons.forEach(button => {

  button.addEventListener("click", () => {

    const songName =
      button.dataset.song;

    const selectedSong =
      songs[songName];


    /* If another song is playing */

    if (
      currentSong &&
      currentSong !== selectedSong
    ) {

      currentSong.pause();

      currentSong.currentTime = 0;


      if (currentButton) {

        currentButton.textContent =
          "▶ Play";

      }

    }


    /* Play */

    if (selectedSong.paused) {

      selectedSong.play();

      button.textContent =
        "⏸ Pause";

      currentSong =
        selectedSong;

      currentButton =
        button;

    }

    /* Pause */

    else {

      selectedSong.pause();

      button.textContent =
        "▶ Play";

    }

  });

});



/* ========================================= */
/* ===== TOP PLAY OUR SONG BUTTON ========== */
/* ========================================= */

topMusicButton.addEventListener("click", () => {

  const firstSong =
    songs.song1;


  if (firstSong.paused) {

    firstSong.play();

    topMusicButton.innerHTML =
      "⏸ &nbsp; Pause Song";

    currentSong =
      firstSong;

  }

  else {

    firstSong.pause();

    topMusicButton.innerHTML =
      "♫ &nbsp; Play Our Song";

  }

});



/* ========================================= */
/* ===== RESET BUTTON WHEN SONG ENDS ======= */
/* ========================================= */

Object.values(songs).forEach(song => {

  song.addEventListener("ended", () => {

    if (currentButton) {

      currentButton.textContent =
        "▶ Play";

    }


    if (song === songs.song1) {

      topMusicButton.innerHTML =
        "♫ &nbsp; Play Our Song";

    }


    currentSong = null;

    currentButton = null;

  });

});