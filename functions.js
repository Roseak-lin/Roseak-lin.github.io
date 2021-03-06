var scrollBtn = document.getElementById("to-top");
window.onscroll = function () {
    // determine if scroll to top button should show
    const scrollDistance = window.pageYOffset;
    if (scrollDistance > 40) {
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }

    // determine colors of scroll to top button
    if (scrollDistance > document.getElementById("experience").scrollHeight + 40) {
        scrollBtn.classList.remove("light");
        scrollBtn.classList.add("dark");
    } else if (scrollDistance <= document.getElementById("experience").scrollHeight + 40 && scrollBtn.classList.contains("dark")) {
        scrollBtn.classList.remove("dark");
        scrollBtn.classList.add("light");
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

var navbar = document.getElementById("nav-bar");
var modal = document.getElementById("enlargedImageContainer");
var modalImg = document.getElementById("img");

for (let i = 0; i < document.getElementsByClassName("card-img").length; i++) {
    document.getElementsByClassName("card-img")[i].onclick = function () {
        navbar.style.display = "none";
        modal.style.display = "flex";
        modalImg.src = document.getElementsByClassName("card-img")[i].src;
        scrollBtn.style.display = "none";
    }
}

document.getElementsByClassName("close-override")[0].onclick = function () {
    modal.style.display = "none";
}


// close enlarged image
window.onclick = function (event) {
    if (event.target == modal) {
        navbar.style.display = "block";
        modal.style.display = "none";
        scrollBtn.style.display = "block";
    }
}

////////////// name animation //////////////

var text = document.getElementById("name");
var newDom = "";

for (let i = 0; i < text.innerText.length; i++) {
    newDom +=
        '<span class="char">' +
        (text.innerText[i] == " " ? "&nbsp;" : text.innerText[i]) +
        "</span>";
}

text.innerHTML = newDom;
var length = text.children.length;

for (let i = 0; i < length; i++) {
    text.children[i].style["animation-delay"] = 20 * i + "ms";
}

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

