/* =====================================
   Hala Birthday Website
===================================== */


/* =====================================
   MUSIC
===================================== */

const music = document.getElementById("bgMusic");
const musicButton = document.getElementById("musicButton");

let musicPlaying = false;


/*
   SONGS

   music1 = Opening
   music2 = Story
   music3 = Photos / Memories
   music4 = Final Message
*/

const songs = {
  opening: "music/music1.mp3",
  story: "music/music2.mp3",
  memories: "music/music3.mp3",
  final: "music/music4.mp3"
};


let currentSong = "";

music.src = songs.opening;
currentSong = songs.opening;


/* =====================================
   CHANGE SONG
===================================== */

async function changeSong(songName) {

  const newSong = songs[songName];

  if (!newSong) return;

  /* Don't restart the same song */
  if (currentSong === newSong) return;

  currentSong = newSong;

  music.src = newSong;

  try {

    await music.play();

    musicPlaying = true;

    musicButton.textContent = "🔊";

  } catch (error) {

    console.log("Music waiting for user interaction.");

  }

}


/* =====================================
   START MUSIC
===================================== */

async function startMusic() {

  try {

    await music.play();

    musicPlaying = true;

    musicButton.textContent = "🔊";

  } catch (error) {

    console.log("Music waiting for user interaction.");

  }

}


/* =====================================
   MUSIC BUTTON
===================================== */

musicButton.addEventListener("click", async () => {

  if (music.paused) {

    try {

      await music.play();

      musicPlaying = true;

      musicButton.textContent = "🔊";

    } catch (error) {

      console.log(error);

    }

  } else {

    music.pause();

    musicPlaying = false;

    musicButton.textContent = "♫";

  }

});


/* =====================================
   OPEN SURPRISE
===================================== */

const openButton =
  document.getElementById("openButton");


openButton.addEventListener("click", () => {

  createConfetti(60);

  startMusic();


  setTimeout(() => {

    window.scrollTo({

      top: window.innerHeight,

      behavior: "smooth"

    });

  }, 500);

});



/* =====================================
   MUSIC CHAPTER DETECTION
===================================== */

const storySection =
  document.getElementById("story");

const memoriesSection =
  document.getElementById("memories");

const finalSection =
  document.getElementById("final");


const musicObserver =
  new IntersectionObserver(

    (entries) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) return;


        if (entry.target.id === "story") {

          changeSong("story");

        }


        if (entry.target.id === "memories") {

          changeSong("memories");

        }


        if (entry.target.id === "final") {

          changeSong("final");

        }

      });

    },

    {
      threshold: 0.5
    }

  );


if (storySection) {

  musicObserver.observe(storySection);

}


if (memoriesSection) {

  musicObserver.observe(memoriesSection);

}


if (finalSection) {

  musicObserver.observe(finalSection);

}



/* =====================================
   CONFETTI
===================================== */

function createConfetti(amount = 40) {

  for (let i = 0; i < amount; i++) {

    const confetti =
      document.createElement("div");

    confetti.className = "confetti";


    confetti.style.left =
      Math.random() * 100 + "vw";


    confetti.style.animationDelay =
      Math.random() * 0.5 + "s";


    confetti.style.background =
      `hsl(
        ${Math.random() * 360},
        80%,
        75%
      )`;


    document.body.appendChild(confetti);


    setTimeout(() => {

      confetti.remove();

    }, 3500);

  }

}


/* =====================================
   BALLOON GAME
===================================== */

const arena =
  document.getElementById("balloonArena");

const gameMessage =
  document.getElementById("gameMessage");

const resetGame =
  document.getElementById("resetGame");


let popped = 0;


const balloonColors = [

  "#ff8fb5",
  "#9e8cff",
  "#f7d58a",
  "#77d8d0",
  "#ff9b75",
  "#b9a0ff"

];


function createBalloons() {

  arena.innerHTML = "";

  popped = 0;


  gameMessage.textContent =
    "There are 10 balloons. Pop them all. 🎈";


  for (let i = 0; i < 10; i++) {

    const balloon =
      document.createElement("button");


    balloon.className =
      "game-balloon";


    balloon.setAttribute(
      "aria-label",
      "Pop balloon"
    );


    balloon.style.left =
      (5 + Math.random() * 82) + "%";


    balloon.style.top =
      (5 + Math.random() * 78) + "%";


    balloon.style.background =
      balloonColors[
        i % balloonColors.length
      ];


    balloon.style.animationDelay =
      (-Math.random() * 2) + "s";


    balloon.addEventListener("click", () => {

      if (balloon.classList.contains("pop")) {

        return;

      }


      balloon.classList.add("pop");

      popped++;


      createConfetti(8);


      setTimeout(() => {

        balloon.remove();

      }, 250);


      if (popped === 10) {

        gameMessage.textContent =
          "🎉 PARTY UNLOCKED. You did it. 🎉";


        createConfetti(100);

      } else {

        gameMessage.textContent =
          `${10 - popped} balloons left... 🎈`;

      }

    });


    arena.appendChild(balloon);

  }

}


createBalloons();


resetGame.addEventListener(
  "click",
  createBalloons
);


/* =====================================
   CAKE / WISH
===================================== */

const cake =
  document.getElementById("cake");

const wishButton =
  document.getElementById("wishButton");

const wishMessage =
  document.getElementById("wishMessage");


wishButton.addEventListener("click", () => {

  cake.classList.add("blown");


  wishMessage.classList.remove(
    "hidden"
  );


  wishButton.textContent =
    "Wish made ✨";


  wishButton.disabled = true;


  createConfetti(100);

});


/* =====================================
   PHOTO LIGHTBOX
===================================== */

const photos =
  document.querySelectorAll(
    ".photo-card img"
  );


photos.forEach((photo) => {

  photo.addEventListener("click", () => {

    const overlay =
      document.createElement("div");


    overlay.style.position =
      "fixed";

    overlay.style.inset = "0";

    overlay.style.background =
      "rgba(0,0,0,.92)";

    overlay.style.zIndex = "500";

    overlay.style.display =
      "grid";

    overlay.style.placeItems =
      "center";

    overlay.style.padding =
      "20px";


    const image =
      document.createElement("img");


    image.src = photo.src;


    image.style.maxWidth =
      "100%";

    image.style.maxHeight =
      "90vh";

    image.style.objectFit =
      "contain";

    image.style.borderRadius =
      "18px";


    overlay.appendChild(image);


    overlay.addEventListener(
      "click",
      () => overlay.remove()
    );


    document.body.appendChild(
      overlay
    );

  });

});