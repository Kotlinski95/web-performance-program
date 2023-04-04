(() => {
if ('IntersectionObserver' in window) {
    console.log("IntersectionObserver! ")
    if ("IntersectionObserver" in window) {
        var lazyImageObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    console.log("IMAGE LAZYLOADED: ", lazyImage)
                    if (lazyImage.tagName === 'IMG') {
                        lazyImage.src = lazyImage.dataset.src;
                        lazyImage.removeAttribute("data-src");
                    } else {
                        lazyImage.srcset = lazyImage.dataset.srcset;
                        lazyImage.removeAttribute("data-srcset");
                    }
                    lazyImage.classList.remove("lazyload");
                    lazyImage.classList.add("lazyloaded");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });
    }

    let lazyImages = document.querySelectorAll("img[data-src], source[data-srcset]");
    console.log("IntersectionObserver lazyImages: ", lazyImages)
    lazyImages.forEach(function(lazyImage) {
        lazyImageObserver.observe(lazyImage);
    });
}

scrollTrigger('img');

function scrollTrigger(selector, options = {}) {
    let els = document.querySelectorAll(selector);
    els = Array.from(els);
    els.forEach((el) => {
      addObserver(el, options);
    });
  }
  
function addObserver(el, options) {
    if (!("IntersectionObserver" in window)) {
      if (options.cb) {
        options.cb(el);
      } else {
        lazyloadElements(entry.target, "img");
        entry.target.classList.add("animated");
      }
      return;
    }
    let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (options.cb) {
            options.cb(el);
          } else {
            lazyloadElements(entry.target, "img");
            entry.target.classList.add("loaded");
          }
          observer.unobserve(entry.target);
        }
      });
    }, options);
    observer.observe(el);
}
  

function lazyloadElements(el, tag) {
    const elements = el.querySelectorAll(tag);
    if (elements && elements.length > 0) {
      Array.from(elements).forEach(function (element) {
        if (element.classList.contains("lazyload")) {
          const element_src = element.getAttribute("data-src");
          element.setAttribute("src", element_src);
          element.classList.replace("lazyload", "lazyloaded");
        }
      });
    }
}
})();