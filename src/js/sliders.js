import Swiper from "swiper";
import { Scrollbar } from "swiper/modules";
import "swiper/css";
// import "swiper/css/scrollbar";

const setSliders = (scrollset) => {
  if ($("#workStages.swiper").length > 0) {
    const swiper1 = new Swiper("#workStages.swiper", {
      modules: [Scrollbar],
      slidesPerView: "auto",
      spaceBetween: 13,
      scrollbar: {
        el: "#workStages.swiper .swiper-scrollbar",
        draggable: true,
      },
      breakpoints: {
        668: {
          spaceBetween: 36,
        },
      },
    });

    if ($(window).width() > 667) {
      $("#workStages.swiper .swiper-slide:not(.disabled)").on(
        "mouseenter",
        function () {
          scrollset.stop();
        }
      );

      $("#workStages.swiper .swiper-slide:not(.disabled)").on(
        "mouseleave",
        function () {
          scrollset.start();
        }
      );
    }
  }

  if ($("#masterplan.swiper").length > 0) {
    const swiper2 = new Swiper("#masterplan.swiper", {
      modules: [Scrollbar],
      slidesPerView: "auto",
      spaceBetween: 16,
      breakpoints: {
        668: {
          slidesPerView: 2,
          spaceBetween: 36,
        },
      },
    });
  }
};

export default setSliders;
