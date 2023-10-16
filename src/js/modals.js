import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollset } from "./main";
import { modalsArr } from "./main";

gsap.registerPlugin(ScrollTrigger);

function setArrow(l) {
  gsap.set($("#siteMenu").find(".list-item__hovered-el"), {
    x: "-20px",
    opacity: 0,
  });
  gsap.set(l, {
    width: "1%",
  });
}

// data-modal-target="search"
//                     data-modal-close="headerOpenButton"
//                     data-modal-after="true"

function openItem(target, data, modals, modalAfter = false) {
  this.target = "#" + target;
  this.openButton = "#" + data.openButton;
  this.closeButton = "#" + data.closeButton;
  this.time;
  this.opened = false;
  this.transition = 900;

  this.open = () => {
    if (!this.opened && !$(this.openButton).hasClass("open")) {
      clearTimeout(this.time);
      for (let i = 0; i < modals.length; i++) {
        window[`modal${i + 1}`].close();
      }
      if (this.closeButton === "#headerOpenButton") {
        setTimeout(() => {
          $(this.closeButton).addClass("show");
        }, this.transition - 200);
      }
      setSize();
      $(this.openButton).addClass("open show");
      $(this.closeButton).addClass("open show");
      $(this.target).addClass("open show modal--transition");
      $("body").addClass(`isModalOpened`);
      $("body").addClass(`is${target}Opened`);
      if ($(".has-scroll-init").hasClass("has-scroll-smooth")) {
        scrollset.stop();
      } else {
        $("html").css("overflow", "hidden");
      }

      this.time = setTimeout(() => {
        $(this.target).removeClass("modal--transition");

        if ($(this.openButton).data("modal-after") === true || modalAfter) {
          $("body").addClass(`is${target}LazyAnims`);
        }

        if (this.target === "#search") {
          $("#title-search-input").trigger("focus");
        }
        if (this.target === "#siteMenu" || this.target === "#search") {
          gsap.to($(this.target).find(".list-item__hovered-el"), {
            opacity: 1,
            x: 0,
            duration: 0.4,
            ease: "easeOut",
          });

          $("#connectButtonMobile").addClass("opacity-100");
        }
        this.opened = true;
        $("body").addClass(`isModalOpened`);
      }, this.transition);
    }
  };

  this.close = () => {
    if (this.opened) {
      clearTimeout(this.time);

      $(this.openButton).removeClass("open");
      $(this.closeButton).removeClass("open");
      $(this.target).removeClass("open");
      $(this.target).addClass("modal--transition");
      if ($(this.openButton).data("modal-after") === true || modalAfter) {
        $("body").removeClass(`is${target}LazyAnims`);
      }

      if (this.target === "#siteMenu" || this.target === "#search") {
        let l = $("#siteMenu").find(".list-item__hovered-el-cover");
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
              setArrow(l);
            },
          }
        );

        $("#connectButtonMobile").removeClass("opacity-100 ");
      }

      this.time = setTimeout(() => {
        $("body").removeClass(`is${target}Opened`);
        $("body").removeClass(`isModalOpened`);
        $(this.openButton).removeClass("show");
        $(this.closeButton).removeClass("show");
        $(this.target).removeClass("show modal--transition");
        this.opened = false;
        if ($(".has-scroll-init").hasClass("has-scroll-smooth")) {
          scrollset.start();
        } else {
          $("html").css("overflow", "");
        }
      }, this.transition);
    }
  };

  $(this.openButton).on("click", (e) => {
    e.preventDefault();
    if (!$(this.openButton).hasClass("show")) {
      return this.open();
    } else {
      return this.close();
    }
  });

  $(this.closeButton).on("click", (e) => {
    e.preventDefault();
    if ($(this.closeButton).hasClass("open")) {
      return this.close();
    }
  });

  $(this.target).on("click", () => {
    return this.close();
  });

  $(this.target)
    .find(".modal__close-button")
    .on("click", () => {
      return this.close();
    });

  const setSize = () => {
    const height = $(this.target).find(".modal__wrapper").outerHeight() + "px";
    $(this.target).get(0).style.setProperty("--h", height);
  };

  setTimeout(function () {
    setSize();
  }, 100);

  $(window).on("resize", function () {
    setSize();
  });
}

const Modals = () => {
  const modalOpenButtons = $("[data-modal-target]");

  modalOpenButtons.each(function () {
    let newModal = {
      target: $(this).data("modal-target"),
      button: $(this).attr("id"),
      buttonClose: $(this).data("modal-close")
        ? $(this).data("modal-close")
        : $(this).attr("id"),
    };
    modalsArr.push(newModal);
  });

  for (let i = 0; i < modalsArr.length; i++) {
    window[`modal${i + 1}`] = new openItem(
      modalsArr[i].target,
      {
        openButton: modalsArr[i].button,
        closeButton: modalsArr[i].buttonClose,
      },
      modalsArr
    );
  }

  setArrow($("#siteMenu").find(".list-item__hovered-el-cover"));

  $(".modal__container").on("click", function (e) {
    e.stopPropagation();
  });

  return { modal1 };
};

export default Modals;
