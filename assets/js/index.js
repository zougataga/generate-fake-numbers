$(document).ready(function () {
    // const loading = document.getElementsByClassName("loading")[0];
    // loading.style = "display:none;"

    $(".open").click(function () {
        var container = $(this).parents(".topic");
        var answer = container.find(".answer");
        var trigger = container.find(".faq-t");

        answer.slideToggle(200);

        if (trigger.hasClass("faq-o")) {
            trigger.removeClass("faq-o");
        } else {
            trigger.addClass("faq-o");
        }

        if (container.hasClass("expanded")) {
            container.removeClass("expanded");
        } else {
            container.addClass("expanded");
        }
    });
    $(".question").each(function () {
        $(this).attr(
            "data-search-term",
            $(this).text().toLowerCase() + $(this).find("ptag").text().toLowerCase()
        );
    });

    $(".live-search-box").on("keyup", function () {
        var searchTerm = $(this).val().toLowerCase();

        $(".question").each(function () {
            if (
                $(this).filter("[data-search-term *= " + searchTerm + "]").length > 0 ||
                searchTerm.length < 1
            ) {
                $(this).parent().parent().show();
            } else {
                $(this).parent().parent().hide();
            }
        });
    });
});
const sr = ScrollReveal({
    distance: '60px',
    interval: 750,
});
window.sr = sr;
sr.reveal(`.reveal`, { origin: 'top' })
sr.reveal(`#topBtn`, { origin: 'bottom' })


const body = document.querySelector("body"),
    nav = document.querySelector("nav"),
    sidebarOpen = document.querySelector(".sidebarOpen"),
    siderbarClose = document.querySelector(".siderbarClose");


sidebarOpen.addEventListener("click", () => {
    nav.classList.add("active");
});

body.addEventListener("click", e => {
    let clickedElm = e.target;

    if (!clickedElm.classList.contains("sidebarOpen") && !clickedElm.classList.contains("menu")) {
        nav.classList.remove("active");
    }
});

// window.addEventListener("scroll", reveal);

// function reveal() {
//     var reveals = document.querySelectorAll(".reveal");

//     for (var i = 0; i < reveals.length; i++) {
//         var windowheight = window.innerHeight;
//         var revealtop = reveals[i].getBoundingClientRect().top;
//         var revealpoint = 150;

//         if (revealtop < windowheight - revealpoint) {
//             reveals[i].classList.add("active");
//         } else {
//             reveals[i].classList.remove("active");
//         }
//     }
// }

const allLink = document.querySelectorAll(`a`);
allLink.forEach(e => {
    let data = e.getAttribute("data");
    if (data) {
        e.addEventListener("click", (ev) => {
            allLink.forEach(a => a.classList.remove("active-navlink"));
            if (data.startsWith("#")) {
                setTimeout(() => {
                    e.classList.add("active-navlink");
                }, 700);
            } else if (data.startsWith("2_")) {
                data = data.split("2_")[1];
                allLink.forEach(ee => {
                    if (ee.getAttribute("data") && ee.getAttribute("data") == "#" + data) {
                        setTimeout(() => {
                            ee.classList.add("active-navlink")
                        }, 700);
                    }
                })
            };
            if (data === "#home") {
                $('html,body').animate({
                    scrollTop: 0
                }, 1250);
            } else {
                $('html,body').animate({
                    scrollTop: $(`${data}`).offset().top
                }, 1250);
            };
        })
    };
});
const topBtn = document.getElementById("topBtn");
topBtn.addEventListener("click", (ev) => {
    allLink.forEach(a => a.classList.remove("active-navlink"));
    allLink.forEach(e => {
        if (e.getAttribute("data") && e.getAttribute("data") == "#home") {
            setTimeout(() => {
                e.classList.add("active-navlink")
            }, 700);
        }
    });
    $('html,body').animate({
        scrollTop: 0
    }, 1250);

})
window.addEventListener("scroll", () => {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    };

    const scrollY = window.pageYOffset;
    if (scrollY > 5) {
        document.querySelector("header").classList.add("header-active");
    } else {
        document.querySelector("header").classList.remove("header-active");
    };

    allLink.forEach(e => {
        if (e.getAttribute("data") && e.getAttribute("data").startsWith("#")) {
            const id = e.getAttribute("data") + "_b";
            const section = document.querySelector(id);
            if (!section) return;
            let sectionHeight = section.offsetHeight,
                sectionTop = section.offsetTop - 100;

            const exist = document.getElementsByClassName("active-navlink");
            if (id == "home_b") {
                sectionHeight = 0 + "px";
                sectionTop = 0 + "px";
            };
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                if (exist) {
                    allLink.forEach(a => a.classList.remove("active-navlink"));
                };
                e.classList.add("active-navlink")
            } else {
                if (!exist) {
                    e.classList.remove("active-navlink")
                }
            }
        }
    })
});

swip()
// staff

const owner = `
<div class="slide swiper-slide">
<img src="./resource/img/equipe/owners/wezah.png" alt="logo" class="image" />
<p class="media-icons"><a target="_blanck" href="https://github.com/wezah"><i class="fab fa-github"></i></a></p>
<i class="bx bxs-quote-alt-left quote-icon"></i>
<div class="details"><span class="name">Wezah</span><span class="job">Cr&eacute;ateur</span></div></div>

<div class="slide swiper-slide">
<img src="./resource/img/equipe/owners/zougataga.png" alt="logo" class="image" />
<p class="media-icons"><a target="_blanck" href="https://github.com/zougataga"><i class="fab fa-github"></i></a></p>
<i class="bx bxs-quote-alt-left quote-icon"></i>
<div class="details"><span class="name">zougataga</span><span class="job">Cr&eacute;ateur & D&eacute;velopeur</span></div></div>

<div class="slide swiper-slide">
<img src="./resource/img/equipe/owners/aposh.png" alt="logo" class="image" />
<p class="media-icons"><a target="_blanck" href="https://github.com/apoow3b"><i class="fab fa-github"></i></a></p>
<i class="bx bxs-quote-alt-left quote-icon"></i>
<div class="details"><span class="name">Aposh</span><span class="job">Cr&eacute;ateur</span></div></div>

<div class="slide swiper-slide">
<img src="./resource/img/equipe/owners/marnelo.png" alt="logo" class="image" />
<p class="media-icons"></p>
<i class="bx bxs-quote-alt-left quote-icon"></i>
<div class="details"><span class="name">Marnelo</span><span class="job">Cr&eacute;ateur</span></div></div>
`;

const help = `
<div class="slide swiper-slide">
<img src="./resource/img/equipe/helpers/sato.png" alt="logo" class="image" />
<p class="media-icons">
<a target="_blanck" href="https://github.com/Sate1337"><i class="fab fa-github"></i></a>
<a target="_blanck" href="https://tiktok.com/@satesg"><i class="fab fa-tiktok"></i></a>
<a target="_blanck" href="https://www.youtube.com/channel/UC8T6_7wu_Ri1PY8WNZouMaA"><i class="fab fa-youtube"></i></a>
</p>
<i class="bx bxs-quote-alt-left quote-icon"></i>
<div class="details"><span class="name">Sato</span><span class="job">Helper</span></div></div>

<div class="slide swiper-slide">
<img src="./resource/img/equipe/helpers/No24700.png" alt="logo" class="image" />
<p class="media-icons"><a target="_blanck" href="https://www.youtube.com/channel/UCafwziSDagv91dJapNsuchg"><i class="fab fa-youtube"></i></a></p>
<i class="bx bxs-quote-alt-left quote-icon"></i>
<div class="details"><span class="name">No24700</span><span class="job">Helper</span></div></div>

<div class="slide swiper-slide">
<img src="./resource/img/equipe/helpers/pando.png" alt="logo" class="image" />
<p class="media-icons">
<a target="_blanck" href="https://github.com/PandoffYT"><i class="fab fa-github"></i></a>
<a target="_blanck" href="https://twitch.tv/pando2525"><i class="fab fa-twitch"></i></a>
<a target="_blanck" href="https://www.youtube.com/channel/UCqFlrL53AiLDkVLXinarCyg"><i class="fab fa-youtube"></i></a>
</p>
<i class="bx bxs-quote-alt-left quote-icon"></i>
<div class="details"><span class="name">Pando</span><span class="job">Helper</span></div></div>
`;

const tech = `
<div class="slide swiper-slide">
<img src="./resource/img/equipe/techniciens/Callikill.png" alt="logo" class="image" />
<p class="media-icons">
</p>
<i class="bx bxs-quote-alt-left quote-icon"></i>
<div class="details"><span class="name">Callikill</span><span class="job">Technicien</span></div></div>

<div class="slide swiper-slide">
<img src="./resource/img/equipe/techniciens/Design Builder 3D.png" alt="logo" class="image" />
<p class="media-icons"><a target="_blanck" href="https://www.youtube.com/channel/UCVzLR-RADC2Q3E0GVaxsccw"><i class="fab fa-youtube"></i></a>
<a target="_blanck" href="https://twitch.tv/designbuilder3d"><i class="fab fa-twitch"></i></a>
</p>
<i class="bx bxs-quote-alt-left quote-icon"></i>
<div class="details"><span class="name">Design Builder 3D</span><span class="job">Technicien</span></div></div>

<div class="slide swiper-slide">
<img src="./resource/img/equipe/techniciens/Tyrex074.png" alt="logo" class="image" />
<p class="media-icons">
<a target="_blanck" href="https://twitch.tv/tyrex074"><i class="fab fa-twitch"></i></a>
<a target="_blanck" href="https://www.youtube.com/@Tyrex074"><i class="fab fa-youtube"></i></a>
</p>
<i class="bx bxs-quote-alt-left quote-icon"></i>
<div class="details"><span class="name">Tyrex074</span><span class="job">Technicien</span></div></div>

<div class="slide swiper-slide">
<img src="./resource/img/equipe/techniciens/Made in Ritonade.png" alt="logo" class="image" />
<p class="media-icons">
<a target="_blanck" href="https://www.youtube.com/@Made in Ritonade"><i class="fab fa-youtube"></i></a>
</p>
<i class="bx bxs-quote-alt-left quote-icon"></i>
<div class="details"><span class="name">Made in Ritonade</span><span class="job">Technicien</span></div></div>

<div class="slide swiper-slide">
<img src="./resource/img/equipe/techniciens/ZIP.png" alt="logo" class="image" />
<p class="media-icons">
<a target="_blanck" href="https://github.com/ZiP-was-deleted"><i class="fab fa-youtube"></i></a>
<a target="_blanck" href="https://www.youtube.com/@ZIP"><i class="fab fa-youtube"></i></a>
</p>
<i class="bx bxs-quote-alt-left quote-icon"></i>
<div class="details"><span class="name">ZIP</span><span class="job">Technicien</span></div></div>
`;

const allIcon = document.querySelectorAll(".optionstaff a");

$('#owner').click(async function () {
    allIcon.forEach(e => e.classList.remove("on"));
    allIcon[0].classList.add("on");
    $(".container").html(await getCode(owner));
    swip()
});
$('#help').click(async function () {
    allIcon.forEach(e => e.classList.remove("on"));
    allIcon[1].classList.add("on");
    $(".container").html(await getCode(help));
    swip()
});
$('#tech').click(async function () {
    allIcon.forEach(e => e.classList.remove("on"));
    allIcon[2].classList.add("on");
    $(".container").html(await getCode(tech));
    swip()
});

function getCode(code) {
    const html = `
    <div class="testimonial mySwiper">
    <div class="testi-content swiper-wrapper">
     ${code}
    </div>
    <div class="swiper-button-next nav-btn"></div>
    <div class="swiper-button-prev nav-btn"></div>
    <div class="swiper-pagination"></div>
</div>`;
    return html
}
function swip() {
    new Swiper(".mySwiper", {
        slidesPerView: 1,
        grabCursor: true,
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
}