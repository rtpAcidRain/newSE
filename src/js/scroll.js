import LocomotiveScroll from "locomotive-scroll";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function scroll() {
  gsap.registerPlugin(ScrollTrigger);

  const scrollItem = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
    scrollFromAnywhere: false,
    getDirection: true,
    smartphone: {
      breakpoint: 668,
    },
    tablet: {
      breakpoint: 1024,
    },
  });

  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  scrollItem.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("[data-scroll-container]", {
    scrollTop(value) {
      return arguments.length
        ? scrollItem.scrollTo(value, { duration: 0, disableLerp: true })
        : scrollItem.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("[data-scroll-container]").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => scrollItem.update());
  ScrollTrigger.defaults({ scroller: "[data-scroll-container]" });
  // --- SETUP END ---

  // scrollItem.on("scroll", ({ scroll }) => {
  //   console.log(scroll);
  // });

  // if (mediaQuery.matches) {
  let onScroll = false;
  let time;
  function hideHeader() {
    clearTimeout(time);
    $(".header").css("top", -$(".header").height() + "px");
    $(".header").css("transition", "top 0.4s ease");
    $(".header").css("top", "0px");
    time = setTimeout(function () {
      $(".header").css("transition", "");
    }, 400);
    $(".header").addClass("scroll hide-subnav");

    onScroll = true;
  }

  function showHeader() {
    clearTimeout(time);
    $(".header").css("transition", "");

    $(".header").removeClass("hide-subnav");
    $(".header").removeClass("scroll");
    onScroll = false;
  }
  // console.log($(window).offset())
  scrollItem.on("scroll", ({ scroll, direction }) => {
    if (direction === "down") {
      if (scroll.y <= $(".header").height()) {
        $(".header").css("top", -scroll.y + "px");
      } else if (scroll.y <= $(window).height() - $(".header").height()) {
        $(".header").css("top", "-100%");
        showHeader();
      } else {
        if (!onScroll) {
          hideHeader();
        }
      }
    } else {
      if (scroll.y <= $(".header").height()) {
        if ($(".header").hasClass("scroll hide-subnav")) {
          $(".header").css("top", "0px");
          if (scroll.y === 0) {
            showHeader();
          }
        } else {
          $(".header").css("top", -scroll.y + "px");
        }
      }
    }
  });

  return scrollItem;
}
