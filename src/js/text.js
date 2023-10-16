import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function loadTexts() {
  function splits(el) {
    let mySplitText;
    function createSplits() {
      mySplitText = new SplitText(el, {
        type: "lines",
        tag: "span",
        linesClass: "split-lines",
      });
    }
    createSplits();
  }

  $(".text-anim").each(function (index) {
    splits($(this));
  });

  $(".head-anim").each(function (index) {
    splits($(this));
    $(this)
      .find(".split-lines")
      .each(function () {
        $(this)
          .wrapAll("<span class='split-lines__wrapper' />")
          .wrapAll("<span class='split-lines__container' />");
      });
  });

  gsap.registerPlugin(ScrollTrigger);

  function createTextAnimations() {
    // Line Animation
    $(".text-anim").each(function (index) {
      let triggerElement = $(this);
      let targetElement = $(this).find(".split-lines");

      gsap.fromTo(
        targetElement,
        {
          y: "150%",
          rotationX: -90,
          opacity: 0,
        },
        {
          y: "0%",
          rotationX: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: triggerElement,
            // trigger element - viewport
            start: () => `top-=${$(window).height() / 4} bottom`,
            // end: "bottom top",
            // toggleActions: "restart none none none",
          },
          duration: 0.5,
          ease: "power1.inOut",
          stagger: {
            amount: 0.4,
            from: "0",
          },
        }
      );
    });

    $(".head-anim").each(function (index) {
      let triggerElement = $(this).find(".split-lines__wrapper");

      gsap.fromTo(
        triggerElement,
        {
          opacity: 1,
        },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: triggerElement,
            start: () => `top-=${$(window).height() / 4} bottom`,
          },

          onStart: () => {
            triggerElement.addClass("header_hidden_leftVisible");
          },
        }
      );
    });
  }
  createTextAnimations();
}
