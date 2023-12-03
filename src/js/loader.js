import gsap from "gsap";
import { loadTexts } from "./text";
import { mobileValid } from "./main";
import { ScrollTrigger } from "gsap/all";

var tl = gsap.timeline();
gsap.registerPlugin(ScrollTrigger);

export function initLoaderHome(videos) {
  if (videos.length > 0) {
    videos.get(0).pause();
    videos.get(0).currentTime = 0;
  }
  if ($(window).width() > 540) {
    gsap.to(" .once-in", {
      y: "50vh",
      duration: 0.01,
      ease: "none",
    });
    gsap.to(".loading-screen .rounded-div-wrap.bottom", {
      height: "10vh",
      ease: "none",
    });
  } else {
    gsap.to(" .once-in", {
      y: "10vh",
      duration: 0.01,
      ease: "none",
    });
    gsap.to(".loading-screen .rounded-div-wrap.bottom", {
      height: "5vh",
      duration: 0.01,
    });
  }

  tl.to(".loading-words", {
    opacity: 0,
    duration: 0.1,
  });

  tl.to(".loading-words .home-active, .loading-words .home-active-last", {
    display: "flex",
    duration: 0.1,
    opacity: 0,
  });

  tl.to(".loading-words .home-active-first", {
    opacity: 1,
  });

  tl.to(".loading-words", {
    duration: 0.8,
    opacity: 1,
    ease: "Power4.easeOut",
  });

  tl.to(".loading-words .home-active:not(.home-active-last)", {
    duration: 0.01,
    opacity: 1,
    ease: "none",
    stagger: {
      each: 0.15,
      onStart: function () {
        gsap.to(this.targets()[0], {
          duration: 0.01,
          opacity: 0,
          ease: "none",
          delay: 0.15,
        });
      },
    },
  });

  tl.to(".loading-words .home-active-last", {
    duration: 0.01,
    opacity: 1,
    ease: "none",
    delay: 0.15,
  });
}

export function loaderOut(scrollset, videos) {
  tl.to(".loading-screen", {
    duration: 0.8,
    top: "-100%",
    ease: "Power4.easeInOut",
    onStart: () => {
      if (!mobileValid()) {
        loadTexts();
      }
      gsap.to(".loading-screen .rounded-div-wrap.bottom", {
        duration: 0.8,
        height: "0vh",
        ease: "Power4.easeInOut",
      });

      gsap.to(".loading-screen .rounded-div-wrap.bottom", {
        height: "0vh",
      });

      gsap.to(".once-in", {
        duration: 0.8,
        y: "0vh",
        stagger: 0.07,
        ease: "Expo.easeOut",
        delay: 0.2,
        onStart: () => {
          if (videos.length > 0) {
            videos.get(0).play();
          }
        },
        onComplete: () => {
          $(".once-in")
            .find("h1")
            .find(".split-lines__wrapper")
            .addClass("header_hidden_leftVisible");
          $("h1.once-in")
            .find(".split-lines__wrapper")
            .addClass("header_hidden_leftVisible");
          $(".header").addClass("loaded");
          setTimeout(() => {
            $(".header").addClass("full-loaded");
          }, 800);

          if ($(".has-scroll-init").hasClass("has-scroll-smooth")) {
            scrollset.update();
            scrollset.start();
          } else {
            $("html").css("overflow", "");
          }

          ScrollTrigger.update();
          ScrollTrigger.refresh();
        },
      });
    },
  });
}

export function setPageLoader(scrollset) {
  const videos = $("video[autoplay]");

  initLoaderHome(videos);
  loaderOut(scrollset, videos);
}
