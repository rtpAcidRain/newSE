import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Inputmask from "inputmask";

let mm = gsap.matchMedia();

function setMainVideoAnim(mm) {
  const mainVideo = $("#mainVideo");
  const services = gsap.utils.toArray(".services__item");
  // const projects = gsap.utils.toArray(".mini-project__line");
  const projects = gsap.utils.toArray(".mini-project__line");

  const mainMiniProject = $("#mainMiniProject");

  // $(".mini-project:first-child").addClass("gsap-l");
  // $(".mini-project:last-child").addClass("gsap-r");

  // const mainMiniProjectLeft = gsap.utils.toArray("#mainMiniProject .gsap-l");
  // const mainMiniProjectRight = gsap.utils.toArray("#mainMiniProject .gsap-r");

  const config = {
    scrollTrigger: {
      trigger: mainVideo,

      // start: "179 top",
      // toggleActions: "play pause resume reverse",
      start: "top top",
      end: () => `${$(window).height() * 1.5}px center`,
      scrub: true,
    },
  };

  const configMainMiniProject = {
    scrollTrigger: {
      trigger: mainMiniProject,

      start: "top bottom",
      end: () => `top ${window.innerHeight * (60 / 100)}`,
      scrub: true,
      // toggleActions: "play pause resume reverse",
      onLeave: () => {
        $(".mini-project__line:first-child > div").addClass("sm:border-t");
      },
      onEnterBack: () => {
        $(".mini-project__line:first-child > div").removeClass("sm:border-t");
      },
    },
  };

  mm.add("(min-width: 1024px)", () => {
    gsap.fromTo(
      mainVideo.find(".animated-video__container"),
      {
        "clip-path": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      },
      {
        ...config,

        "clip-path":
          "polygon(55.63157894736842% 30.69498069498069%, 61.52631578947368%  30.69498069498069%, 54.7895% 62.06563706563707%, 48.89473684210526% 62.06563706563707%)",
      }
    );

    gsap.fromTo(
      mainVideo.find("h1"),
      {
        opacity: 1,
      },
      {
        scrollTrigger: {
          trigger: mainVideo,

          start: "top top",
          end: () => `180px top`,
          scrub: true,
        },
        opacity: 0,
        // ease: "circ.out",
      }
    );

    projects.forEach((el, i) => {
      gsap.fromTo(
        $(el).children(),
        {
          y: 0,
        },
        {
          y: `40vh`,
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: () => `bottom top`,
            scrub: true,
          },
          ease: "linear",
        }
      );
    });

    services.forEach((el, i) => {
      gsap.fromTo(
        el,
        {
          x: () => {
            if (i < 6) {
              if (i % 2 == 0) {
                return "-300%";
              } else {
                return "300%";
              }
            } else {
              return 0;
            }
          },
          y: () => {
            if (i >= 6) {
              return "1000%";
            } else {
              return 0;
            }
          },
        },
        {
          ...config,
          x: 0,
          y: 0,
        }
      );
      gsap.fromTo(
        el,
        {
          opacity: 0,
        },
        {
          ...config,

          ease: "circ.in",
          opacity: 1,
        }
      );
    });

    gsap.fromTo(
      "#mainVideo .animated-video",
      {
        opacity: 1,
        scale: "1",
      },
      {
        ...configMainMiniProject,
        opacity: 0,
        scale: "0.5",
      }
    );

    return () => {
      services.forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          x: 0,
          y: 0,
        });
      });
    };
  });
}

function openDroplist(scrollset) {
  const $drop = $(".drop-down");

  $drop.each(function () {
    const $el = $(this);
    const $els = $el.find(".drop-down__item:not(.disabled)");

    $els.on("click", function () {
      $els.not($(this)).removeClass("active");
      if (!$(this).hasClass("active")) {
        $(this).addClass("active");
        $el.addClass("opened");
      } else {
        $(this).removeClass("active");
        $el.removeClass("opened");
      }
      scrollset.update();
      setTimeout(function () {
        scrollset.update();
      }, 200);
    });

    $els.find("a").click(function (e) {
      e.stopPropagation();
    });
  });
}

function setStagesAnim(scrollset) {
  const stages = $(".stages");

  if (stages.length > 0) {
    const stagesPag = $(".stages__pag__item");
    const stagesSlide = $(".stages__slide");

    stagesPag.on("click", function () {
      stagesPag.removeClass("active");
      $(this).addClass("active");

      stagesSlide.addClass("hidden");
      stagesSlide.eq($(this).index()).removeClass("hidden");
      scrollset.update();
    });
  }
}

function listBigHoverOut(t, c) {
  t.addClass("animated");
  let l = t.find(".list-item__hovered-el-cover");
  gsap.fromTo(
    l,
    {
      left: "-1%",
    },
    {
      width: "101%",
      duration: 0.4,
      ease: "easeOut",
      onComplete: () => {
        gsap.set(c, {
          x: "-20px",
          opacity: 0,
        });
        gsap.set(l, {
          width: "1%",
        });
      },
    }
  );
}

listBigHoverOut($("#siteMenu"), $("#siteMenu").find(".list-item__hovered-el"));

function hoverLightings() {
  const els = $(".mini-lighting-types__list__item");

  els.each(function () {
    let $this = $(this);
    listBigHoverOut($this, $this.find(".list-item__hovered-el"));

    gsap.fromTo(
      $this.find(".list-item__border"),
      {
        width: "0%",
      },
      {
        width: "100%",
        scrollTrigger: {
          trigger: $this,
          start: "top bottom",
        },
        ease: "easeOut",
      }
    );

    $this.on("mouseenter", function () {
      $(this).addClass("hovered");
      gsap.to($this.find(".list-item__hovered-el"), {
        opacity: 1,
        x: 0,
        duration: 0.4,
        ease: "easeOut",
      });
    });

    $this.on("mousemove", function (e) {
      var pos = $(this).offset();
      var elem_top = pos.top;
      var y = e.pageY - elem_top;

      $(this)
        .get(0)
        .style.setProperty("--imgpos", y + "px");
    });

    $this
      .find(".mini-lighting-types__list__item__img")
      .on("mousemove", function (e) {
        e.stopPropagation();
      });
    $this
      .find(".mini-lighting-types__list__item__img")
      .on("mouseenter", function (e) {
        e.stopPropagation();
      });

    $this.on("mouseleave", function () {
      $(this).removeClass("hovered");
      listBigHoverOut($this, $this.find(".list-item__hovered-el"));
    });
  });
}

// FORMS

export function setForms() {
  if ($(".input").length > 0) {
    function inputOnClick(el) {
      el.addClass("active");
    }

    function setInputs(el) {
      if (el.find(".input__item").val().trim().length < 1) {
        el.removeClass("active");
      } else {
        inputOnClick(el);
      }
    }

    let inp = $(".input");

    inp.each(function () {
      const $this = $(this);
      setInputs($this);

      $this.find(".input__item").on("focus", function () {
        inputOnClick($this);
      });

      $this.find(".input__item").on("blur", function () {
        setInputs($this);
      });
    });

    if ($(".input").hasClass("input--phone")) {
      let sm = new Inputmask({
        mask: "+7(999)999-99-99",
        showMaskOnHover: false,
      });
      sm.mask($(".input.input--phone").children("input"));
    }
  }

  if ($("textarea").length > 0) {
    const textareas = $("textarea");

    textareas.each(function () {
      $(this).on("input", function () {
        if ($(this).val().trim().length < 1) {
          $(this).css(
            "height",
            "calc(calc(var(--scale-rem) * 0.95) + var(--plusheight))"
          );
        } else {
          $(this).css("height", $(this).get(0).scrollHeight + "px");
        }
      });
    });
  }

  if ($(".check__container").length > 0) {
    const checks = $(".check__container");

    checks.each(function () {
      const $this = $(this);
      $this.find('[type="submit"]').attr("disabled", "true");
      $this.find('[type="checkbox"]').removeAttr("checked");

      $this.find('[type="checkbox"]').change(function () {
        if ($(this).is(":checked")) {
          $this.find('[type="submit"]').removeAttr("disabled");
        } else {
          $this.find('[type="submit"]').attr("disabled", "true");
        }
      });
    });
  }

  if ($(".search-input").length > 0) {
    const search = $(".search-input");
    const searchInput = search.find("input");

    searchInput.on("focus", function () {
      search.addClass("active");
    });

    searchInput.on("blur", function () {
      if ($(this).val().trim().length < 1) {
        search.removeClass("active");
      }
    });

    searchInput.on("input", function () {
      if ($(this).val().trim().length < 1) {
        search.find(".search-input__reset").addClass("display-none");
      } else {
        search.find(".search-input__reset").removeClass("display-none");
      }
    });
  }
}

// ----------------------------

const setAnchors = (scrollset) => {
  if ($(".anchor-source h4").length > 0) {
    const anchor = $(".anchor-source");
    const anchorsComponent = `
      <div
        class="anchor col-span-4 max-w-[219px] hidden pin-container relative sm:block"
        id="pinAnch"
      >
        <div
          class="target right-0 left-0 -top-[var(--header)] bottom-[var(--header)] pointer-events-none lg:absolute"
        ></div>
        <ul class="pin-element sm:pt-80 text-16 flex flex-col gap-y-12 anchor__container text-black-30">

        </ul>
      </div>
    `;

    anchor.before(anchorsComponent);

    const anchors = $(".anchor");
    const pin = $(".pin-element");
    pin.each(function () {
      $(this).attr({
        "data-scroll": true,
        "data-scroll-sticky": true,
        "data-scroll-target": `#${$(this).parent().attr("id")} .target`,
      });
    });

    anchor.find("h4").each(function (i) {
      $(this).attr("id", `head${i}`);
      anchors.find("ul").append(`
            <li><a href="#head${i}">${$(this).text()}</a></li>
        `);
    });

    anchors.find("li:first-child a").addClass("active");

    if (scrollset) {
      anchors.find("a").each(function () {
        $(this).on("click", function (e) {
          var id = e.target.getAttribute("href");
          scrollset.scrollTo(id, {
            offset: -84,
          });
          e.preventDefault();
        });
      });

      scrollset.on("scroll", ({ scroll }) => {
        anchor.find("h4").each(function (i) {
          if ($(this).offset().top < 160 && $(this).offset().top >= 0) {
            anchors.find("a").removeClass("active");
            anchors.find("a").eq(i).addClass("active");
          }
        });
      });
    }
  }
};

// PARTNERS

function setPartners(scrollset) {
  if ($(".partners-carousel").length > 0) {
    if ($(".line-scroll__cont").length > 0) {
      var oQuotes = document.querySelectorAll(".line-scroll__cont");

      function fDoublingQuotes() {
        oQuotes.forEach((el) => {
          let nElem = el.children.length;

          for (let i = 0; i < nElem; i++) {
            el.appendChild(el.children[i].cloneNode(true));
          }
          el.style.animationDuration = 22 + "s";
        });
      }

      fDoublingQuotes();
    }

    function b(el, pos) {
      var elementTop = el.offset().top;
      var leftPosition = ((elementTop * elementTop) / elementTop) * 0.15;
      if (pos === "left") {
        el.find(".line-scroll__cont").css({ left: leftPosition });
      } else {
        el.find(".line-scroll__cont").css({ right: leftPosition });
      }
    }

    function a() {
      if (
        $(".partners-carousel").offset().top - $(window).height() <= 0 &&
        $(".partners-carousel").offset().top * -1 <
          $(".partners-carousel").height()
      ) {
        $(".line-scroll-left").each(function () {
          b($(this), "left");
        });

        $(".line-scroll-right").each(function () {
          b($(this), "right");
        });
      }
    }

    scrollset.on("scroll", ({}) => {
      a();
    });

    $(window).on("load resize", function () {
      a();
    });
  }
}

function scaleImg() {
  const els = gsap.utils.toArray(".content-scale-up");

  els.forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: "top center",
      onEnter: () => {
        el.classList.add("content-scale-up-animation");
      },
    });
  });
}

export function setAnims(scrollset) {
  gsap.registerPlugin(ScrollTrigger);

  if ($(".has-scroll-init").hasClass("has-scroll-smooth")) {
    mm.add("(min-width: 1024px)", () => {
      // const pinContainer = gsap.utils.toArray(".pin-container");
      const pin = $(".pin-element");

      pin.each(function () {
        $(this).attr({
          "data-scroll": true,
          "data-scroll-sticky": true,
          "data-scroll-target": `#${$(this).parent().attr("id")} .target`,
        });
      });

      if ($(".anchor-source").length > 0) {
        setAnchors(scrollset);
      }

      if ($("#mainVideo").length > 0) {
        setMainVideoAnim(mm);
      }

      return () => {
        pin.attr({
          "data-scroll": false,
          "data-scroll-sticky": false,
          "data-scroll-target": "",
        });
      };
    });
  }

  if ($(".content-scale-up").length > 0) {
    scaleImg();
  }
  setPartners(scrollset);
  openDroplist(scrollset);
  setStagesAnim(scrollset);
  hoverLightings();
  setForms();
}
