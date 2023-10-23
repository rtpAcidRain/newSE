export function loadMore(scrollset, ScrollTrigger) {
  if ($("#ajaxOutput .loadmore_wrap").length > 0) {
    $(".navi_wrap").css({
      visibility: "hidden",
      height: 0,
      padding: 0,
    });

    scrollset.on("scroll", function () {
      if ($(".navi_wrap").offset().top <= $(window).height() * 1.5) {
        var targetContainer = $(".loadmore_wrap"),
          naviContainer = $(".navi_wrap"),
          //  Контейнер, в котором хранятся элементы
          url = $(".load_more").attr("data-url"); //  URL, из которого будем брать элементы

        $(".load_more").remove();

        if (url !== undefined) {
          $.ajax({
            type: "GET",
            url: url,
            dataType: "html",
            success: function (data) {
              //  Удаляем старую навигацию

              var elements = $(data)
                  .find(".loadmore_wrap")
                  .children()
                  .not(".bottomcontent"), //  Ищем элементы
                pagination = $(data).find(".load_more"); //  Ищем навигацию

              targetContainer.append(elements); //  Добавляем посты в конец контейнера
              naviContainer.append(pagination); //  добавляем навигацию следом
              // ScrollTrigger.refresh();
            },
          });
        }
        return false;
      }
    });

    function update() {
      scrollset.update();
      ScrollTrigger.update();
      ScrollTrigger.refresh();
      setTimeout(function () {
        scrollset.update();
        ScrollTrigger.update();
        ScrollTrigger.refresh();
      }, 1000);
    }

    $(".filters a").on("click", function () {
      update();
    });

    const target = document.querySelector(".loadmore_wrap");

    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        update();
      });
    });

    const config = { attributes: true, childList: true, characterData: true };

    observer.observe(target, config);
  }
}
