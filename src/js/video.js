import { gsap } from "gsap";

export const customVideo = (scrollset) => {
  if ($(".video__component").length > 0) {
    $(".video__component").each((_, el) => {
      var video = document.getElementById("myVideo");
      var mouseX = 0;
      var mouseY = 0;
      var posXSpan = 0;
      var posYSpan = 0;

      $(".video-container__btn:not(.mobile__btn) > .tn-atom").attr(
        "id",
        "play-video"
      );
      var btn = document.getElementById("play-video");

      $(el).find(".video-play-shape").on("click", myFunction);
      $(el).find(".video-play-shape").attr("id", "folower");
      // $(el).find("#myVideo").appendTo(".video-container .tn-atom");
      $(".video-container__btn:not(.mobile__btn)").appendTo(".t-records");

      $(el)
        .find(".video-play-shape")
        .click(function () {
          $(".video__component ").toggleClass("opened");
          setTimeout(function () {
            scrollset.update();
          }, 400);

          $(".video-container__btn.mobile__btn").toggleClass("hidden");
          if ($(el).find(".transform-block").hasClass("transform-hide")) {
            $(el).find(".transform-block").removeClass("transform-hide");
            $(el).find(".transform-block").addClass("transform-animate");
          } else {
            $(el).find(".transform-block").removeClass("transform-animate");
            setTimeout(function () {
              $(el).find(".transform-block").toggleClass("transform-hide");
            }, 400);
          }
        });

      var container = document.getElementById("folower");
      var circle = document.querySelector(
        ".video-container__btn:not(.mobile__btn)"
      );

      gsap.set(circle, { scale: 0, xPercent: -50, yPercent: -50 });

      container.addEventListener("mouseenter", function (e) {
        gsap.to(circle, { duration: 0.3, scale: 1, opacity: 1 });
        gsap.to(circle, { duration: 0.3, scale: 1, opacity: 1 });
      });

      container.addEventListener("pointerleave", function (e) {
        gsap.to(circle, { duration: 0.3, scale: 0, opacity: 1 });
      });

      $("body").on("mousemove", function (e) {
        positionCircle(e);
      });

      $(document).on("mousemove", function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
      });

      function positionCircle(e) {
        posXSpan += mouseX - posXSpan;
        posYSpan += mouseY - posYSpan;

        gsap.to(circle, { duration: 0.3, left: posXSpan, top: posYSpan });
      }

      function myFunction() {
        if (video.paused) {
          video.play();
          btn.innerHTML = "Pause";
        } else {
          video.pause();
          btn.innerHTML = "Play";
        }
      }
    });
  }
};
