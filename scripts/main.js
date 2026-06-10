const DUANWU_CONFIG = {
  links: {
    purchase: "TODO_PURCHASE_URL",
    try: "https://www.wmnetwork.cc/manage/meet_list?do=build_activity&scene_index=55",
  },
  images: {
    heroFull: "assets/duanwu/duanwu_hero_full.png",
    package688: "assets/duanwu/duanwu_package_688.png",
    package988: "assets/duanwu/duanwu_package_988.png",
    gameLongzhouKuaichong: [
      "assets/duanwu/duanwu_game_longzhou_kuaichong.gif",
      "assets/duanwu/duanwu_game_longzhou_kuaichong.png",
    ],
    gameTouzongDazhan: [
      "assets/duanwu/duanwu_game_touzong_dazhan.gif",
      "assets/duanwu/duanwu_game_touzong_dazhan.png",
    ],
    gameLongzhouJingdu: "assets/duanwu/duanwu_game_longzhou_jingdu.gif",
    featureSignin: "assets/duanwu/duanwu_feature_signin.png",
    featureCloudvenue: "assets/duanwu/duanwu_feature_cloudvenue.png",
    process4steps: "assets/duanwu/duanwu_process_4steps.png",
    solutionGame: "assets/duanwu/duanwu_solution_game.gif",
    solutionSignin: "assets/duanwu/duanwu_solution_signin.png",
    solutionCloudvenue: "assets/duanwu/duanwu_solution_cloudvenue.png",
    solutionBigscreen: "assets/duanwu/duanwu_solution_bigscreen.png",
    solutionPackage: "assets/duanwu/duanwu_solution_package.png",
    qrcodeDuanwuGame: "assets/duanwu/qrcode-duanwu-game.jpg",
    qrcodeSignin: "assets/duanwu/qrcode-signin.jpg",
    qrcodeCloudVenue: "assets/duanwu/qrcode-cloud-venue.jpg",
    qrcodeBigScreen: "assets/duanwu/qrcode-big-screen.jpg",
    qrcodeLongzhouFast: "assets/duanwu/qrcode-longzhou-fast.jpg",
    qrcodeTouzong: "assets/duanwu/qrcode-touzong.jpg",
    qrcodeHualongzhou: "assets/duanwu/qrcode-hualongzhou.jpg",
    qrcodeSigninPlay: "assets/duanwu/qrcode-signin-play.jpg",
    qrcodeCloudPlay: "assets/duanwu/qrcode-cloud-play.jpg",
    caseShanghaiSports: "assets/duanwu/duanwu_case_shanghai_sports.png",
    caseRedbullHubei: "assets/duanwu/duanwu_case_redbull_hubei.png",
    caseMoreClients: "assets/duanwu/duanwu_case_more_clients.png",
    sideDecorLeft: "assets/duanwu/duanwu_side_left.svg",
    sideDecorRight: "assets/duanwu/duanwu_side_right.svg",
  },
};

function jumpToConfiguredUrl(url) {
  if (url.startsWith("TODO_")) {
    window.alert("当前为演示页面，正式跳转地址待配置。");
    return;
  }

  window.location.href = url;
}

function handlePurchaseClick() {
  jumpToConfiguredUrl(DUANWU_CONFIG.links.purchase);
}

function handleScrollToPackages() {
  const target = document.querySelector("#packages");
  if (!target) {
    return;
  }

  target.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function handleTryClick(button) {
  const tryUrl = button?.dataset.tryLink || DUANWU_CONFIG.links.try;
  if (tryUrl.startsWith("TODO_")) {
    window.alert("当前为演示页面，正式跳转地址待配置。");
    return;
  }

  window.open(tryUrl, "_blank", "noopener,noreferrer");
}

function applyImageFallback(image) {
  image.classList.add("image-fallback");
  image.parentElement?.classList.add("has-image-fallback");
  image.removeAttribute("src");
  image.removeAttribute("srcset");
  image.setAttribute("aria-hidden", "true");
}

function bindActionButtons() {
  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.action;

      if (action === "purchase") {
        handlePurchaseClick();
        return;
      }

      if (action === "purchase-packages") {
        handleScrollToPackages();
        return;
      }

      if (action === "try") {
        handleTryClick(button);
      }
    });
  });
}

function applyConfiguredImages() {
  document.querySelectorAll("[data-image-key]").forEach((image) => {
    const key = image.dataset.imageKey;
    const sourceConfig = DUANWU_CONFIG.images[key];

    if (!sourceConfig) {
      applyImageFallback(image);
      return;
    }

    const sourceQueue = Array.isArray(sourceConfig) ? sourceConfig.filter(Boolean) : [sourceConfig];

    if (sourceQueue.length === 0) {
      applyImageFallback(image);
      return;
    }

    let sourceIndex = 0;

    const tryNextSource = () => {
      if (sourceIndex >= sourceQueue.length) {
        image.onerror = null;
        applyImageFallback(image);
        return;
      }

      image.onerror = tryNextSource;
      image.src = sourceQueue[sourceIndex];
      sourceIndex += 1;
    };

    tryNextSource();
  });
}

function bindSolutionOverlays() {
  const mediaNodes = Array.from(document.querySelectorAll(".solution-media[data-overlay], .play-media[data-overlay]"));
  if (mediaNodes.length === 0) {
    return;
  }

  const desktopHoverOnly = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (desktopHoverOnly) {
    return;
  }

  const closeAll = () => {
    mediaNodes.forEach((node) => node.classList.remove("overlay-open"));
  };

  mediaNodes.forEach((node) => {
    node.addEventListener("click", (event) => {
      event.stopPropagation();
      const willOpen = !node.classList.contains("overlay-open");
      closeAll();
      if (willOpen) {
        node.classList.add("overlay-open");
      }
    });
  });

  document.addEventListener("click", closeAll);
}

document.addEventListener("DOMContentLoaded", () => {
  applyConfiguredImages();
  bindActionButtons();
  bindSolutionOverlays();
});
