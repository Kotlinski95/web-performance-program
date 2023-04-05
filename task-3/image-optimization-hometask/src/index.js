if ("loading" in HTMLImageElement.prototype) {
  // Native lazy-loading is supported.
  // Do nothing, the browser will handle it automatically.
  console.info("Support native lazyloading");
  const images = document.querySelectorAll(
    "img[data-src], img[data-srcset], source[data-srcset]"
  );
  images.forEach((image) => {
    if (image.tagName === "IMG") {
      image.src = image.dataset.src;
      image.srcset = image.dataset.srcset;
      delete image.dataset.srcset;
      delete image.dataset.src;
    } else if (image.tagName === "SOURCE") {
      image.srcset = image.dataset.srcset;
      delete image.dataset.srcset;
    }
  });
} else {
  // Native lazy-loading is not supported.
  // Implement a polyfill or fallback.
  console.info("Don't support native lazyloading");
  if ("IntersectionObserver" in window) {
    const images = document.querySelectorAll(
      "img[data-src], img[data-srcset], source[data-srcset]"
    );
    const config = {
      rootMargin: "50px",
      threshold: 0.01,
    };

    const observer = new IntersectionObserver((entries, self) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          if (lazyImage.tagName === "IMG") {
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.srcset = lazyImage.dataset.srcset;
            delete lazyImage.dataset.srcset;
            delete lazyImage.dataset.src;
          } else if (lazyImage.tagName === "SOURCE") {
            lazyImage.srcset = lazyImage.dataset.srcset;
            delete lazyImage.dataset.srcset;
          }
          lazyImage.removeAttribute("data-src");
          lazyImage.removeAttribute("data-srcset");
          observer.unobserve(lazyImage);
        }
      });
    }, config);

    images.forEach((image) => {
      observer.observe(image);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    document.addEventListener("DOMContentLoaded", () => {
      const lazyImages = document.querySelectorAll(
        "img[data-src], img[data-srcset], source[data-srcset]"
      );
      lazyImages.forEach((lazyImage) => {
        if (lazyImage.tagName === "IMG") {
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.srcset = lazyImage.dataset.srcset;
          delete lazyImage.dataset.srcset;
          delete lazyImage.dataset.src;
        } else if (lazyImage.tagName === "SOURCE") {
          lazyImage.srcset = lazyImage.dataset.srcset;
          delete lazyImage.dataset.srcset;
        }
        lazyImage.removeAttribute("data-src");
        lazyImage.removeAttribute("data-srcset");
      });
    });
  }
}
document.querySelector('body').style.opacity = 1;