const toTop = $("#to-top")[0];
const navBar = $("#nav-bar");
const modal = $("#enlargedImageContainer");
const modalImg = $("#img");
const experienceHeight = $("#experience").height();

window.onscroll = function () {
  const scrollDistance = window.pageYOffset;
  if (scrollDistance > 40) {
    toTop.style.display = "block";
  } else {
    toTop.style.display = "none";
  }

  if (
    scrollDistance >
    document.getElementById("experience").scrollHeight + 40
  ) {
    toTop.classList.remove("light");
    toTop.classList.add("dark");
  } else if (
    scrollDistance <= document.getElementById("experience").scrollHeight + 40 &&
    toTop.classList.contains("dark")
  ) {
    toTop.classList.remove("dark");
    toTop.classList.add("light");
  }
};

function scrollToTop() {
  document.documentElement.scrollTop = 0;
}

function scrollToExperience() {
  document.getElementById("experience").scrollIntoView();
}

function scrollToProjects() {
  document.getElementById("projects").scrollIntoView();
}

//////////// image models ////////////

for (let i = 0; i < document.getElementsByClassName("card-img").length; i++) {
  document.getElementsByClassName("card-img")[i].onclick = function () {
    navBar.css("display", "none");
    modal.css("display", "flex");
    modalImg.attr("src", $(".card-img").eq(i).attr("src"));
    $("#to-top").fadeOut(100);
  };
}

// close enlarged image

document.getElementsByClassName("close-override")[0].onclick = function () {
  modal.fadeOut(100);
  navBar.css("display", "block");
};

window.onclick = function (event) {
  if (event.target == modal[0]) {
    navBar.css("display", "block");
    modal.fadeOut(100);
    toTop.fadeIn();
  }
};

//////////// particle background ////////////

particlesJS("particles-js", {
  particles: {
    number: { value: 60, density: { enable: true, value_area: 800 } },
    color: { value: "#000000" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#000000" },
      polygon: { nb_sides: 3 },
      image: { src: "img/github.svg", width: 100, height: 100 },
    },
    opacity: {
      value: 0.75,
      random: true,
      anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
    },
    size: {
      value: 3,
      random: true,
      anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
    },
    line_linked: {
      enable: true,
      distance: 200,
      color: "#000000",
      opacity: 0.5,
      width: 0.5,
    },
    move: {
      enable: true,
      speed: 5.0,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 1200 },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: false, mode: "repulse" },
      onclick: { enable: false, mode: "push" },
      resize: true,
    },
    modes: {
      grab: { distance: 400, line_linked: { opacity: 1 } },
      bubble: {
        distance: 585,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3,
      },
      repulse: { distance: 200, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 },
    },
  },
  retina_detect: false,
});
var count_particles, update;

update = function () {
  if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
    try {
      count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
    } catch (err) {
      console.error();
    }
  }
  requestAnimationFrame(update);
};
requestAnimationFrame(update);
