import "../scss/style.scss";
import { setAnims } from "./animations";
import documentHeight from "./docHeight";
import { scroll } from "./scroll";
import Modals from "./modals";
import setSliders from "./sliders";
import { setPageLoader } from "./loader";
import { customVideo } from "./video";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

documentHeight();
$(window).on("resize", documentHeight);

// function loadScript(url, callback) {
//   var head = document.head;
//   var script = document.createElement("script");
//   script.type = "text/javascript";
//   script.src = url;

//   script.onreadystatechange = callback;
//   script.onload = callback;

//   head.appendChild(script);
// }

export function mobileValid() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
    navigator.userAgent
  );
}
export let scrollset = null;
export const modalsArr = [];

$(document).ready(function () {
  scrollset = scroll();
  if ($(".has-scroll-init").hasClass("has-scroll-smooth")) {
    scrollset.stop();
  } else {
    $("html").css("overflow", "hidden");
  }

  gsap.registerPlugin(ScrollTrigger);
  if (mobileValid()) {
    if ($("#mainVideo").length > 0) {
      $("#mainVideo")
        .find(".animated-video__container")
        .attr("style", "height: 100svh !important");
    }
  }

  setPageLoader(scrollset);
  customVideo(scrollset);

  $(window).on("resize", function () {
    scrollset.update();
  });

  $(".mini-lighting-types__list + div > .button").on("click", function () {
    $(".mini-lighting-types__list").toggleClass("opened");
    scrollset.update();
    if ($(".mini-lighting-types__list").hasClass("opened")) {
      $(this).find("span").html("Скрыть");
    } else {
      $(this).find("span").html("Смотреть больше");
    }
  });

  setSliders(scrollset);
  Modals();
  setAnims(scrollset);

  if ($("#ajaxOutput").length > 0) {
    var target = document.querySelector("#ajaxOutput");

    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        scrollset.update();
        ScrollTrigger.update();
        ScrollTrigger.refresh();
      });
    });

    var config = { attributes: true, childList: true, characterData: true };

    observer.observe(target, config);
  }

  if ($("#ajaxOutput .loadmore_wrap").length > 0) {
    var target = document.querySelector(".loadmore_wrap");

    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        scrollset.update();
        ScrollTrigger.update();
        ScrollTrigger.refresh();
      });
    });

    var config = { attributes: true, childList: true, characterData: true };

    observer.observe(target, config);
  }
});
