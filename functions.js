var scrollBtn = document.getElementById("to-top");
window.onscroll = function () {
    if (document.documentElement.scrollTop > 40) {
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }
};

function expClick() {
    document.getElementById("experience").scrollIntoView();
}

function projClick() {
    document.getElementById("projects").scrollIntoView();
}

function scrollToTop() {
    document.documentElement.scrollTop = 0;
}

////////////// name animation ///////////////////////////
var text = document.getElementById("text");
var newDom = "";
var animationDelay = 10;

for (let i = 0; i < text.innerText.length; i++) {
    newDom +=
        '<span class="char">' +
        (text.innerText[i] == " " ? "&nbsp;" : text.innerText[i]) +
        "</span>";
}

text.innerHTML = newDom;
var length = text.children.length;

for (let i = 0; i < length; i++) {
    text.children[i].style["animation-delay"] = animationDelay * i + "ms";
}

//////////// image models /////////////////////////////////
var navbar = document.getElementById("nav-bar");
var modal = document.getElementById("image");
var img = document.getElementById("qt");
var img1 = document.getElementById("pb");
var modalImg = document.getElementById("img");

img.onclick = function () {
    navbar.style.display = "none";
    modal.style.display = "block";
    modalImg.src = "images/Quickness_Test_screenshot.jpg";
    scrollBtn = scrollBtn.style.display = "none";
}

img1.onclick = function () {
    navbar.style.display = "none";
    modal.style.display = "block";
    modalImg.src = "images/Phonebook_screenshot.jpg";
    scrollBtn.style.display = "none";
}

document.getElementsByClassName("close")[0].onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        navbar.style.display = "block";
        modal.style.display = "none";
        scrollBtn.style.display = "block";
    }
}

//////////// particle background ////////////////////////////////////////
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
            speed: 7.50,
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

