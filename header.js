const siteHeader = document.querySelector("[data-site-header]");
const mobileToggle = document.querySelector("[data-mobile-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const lookupToggle = document.querySelector("[data-lookup-toggle]");
const lookupPanel = document.querySelector("[data-lookup-panel]");
const lookupForm = document.querySelector("[data-lookup-form]");
const lookupLabel = document.querySelector("[data-lookup-label]");
const lookupInput = lookupForm?.querySelector('input[name="description"]');
const lookupOptions = [...document.querySelectorAll("[data-lookup-option]")];
const searchPreview = document.querySelector("[data-search-preview]");
const searchPreviewItems = document.querySelector("[data-search-preview-items]");
const megaItems = [...document.querySelectorAll("[data-mega-item]")];
const desktopCategoryNav = document.querySelector("[data-category-nav]");
const mobileCategoryMenu = document.querySelector("[data-mobile-category-menu]");
const accountPanel = document.querySelector("[data-account-panel]");
const accountToggles = [...document.querySelectorAll("[data-account-toggle]")];
const accountForm = document.querySelector("[data-account-form]");
const cartPanel = document.querySelector("[data-cart-panel]");
const cartToggles = [...document.querySelectorAll("[data-cart-toggle]")];
const cartItems = document.querySelector("[data-cart-items]");
const cartEmpty = document.querySelector("[data-cart-empty]");
const cartBadges = [...document.querySelectorAll("[data-cart-badge]")];
const cartCountLabel = document.querySelector("[data-cart-count-label]");
const checkoutButton = document.querySelector("[data-checkout-button]");
const heroCarousel = document.querySelector("[data-hero-carousel]");
const heroSlides = heroCarousel ? [...heroCarousel.querySelectorAll("[data-hero-slide]")] : [];
const heroDots = heroCarousel ? [...heroCarousel.querySelectorAll("[data-hero-dot]")] : [];
const heroPrev = heroCarousel?.querySelector("[data-hero-prev]");
const heroNext = heroCarousel?.querySelector("[data-hero-next]");
const promosCarousel = document.querySelector("[data-promos-carousel]");
const promosTrack = document.querySelector("[data-promos-track]");
const brandsCarousel = document.querySelector("[data-brands-carousel]");
const brandsTrack = document.querySelector("[data-brands-track]");
const productsGrid = document.querySelector("[data-products-grid]");
const productsModule = document.querySelector("[data-products-module]");
const productsCard = productsModule?.querySelector(".catalog-feed-card");
const productsFeedButtons = [...document.querySelectorAll("[data-products-feed]")];
const productsViewButtons = [...document.querySelectorAll("[data-products-view]")];
const productsCollapseButton = document.querySelector("[data-products-collapse]");
const productsExportButton = document.querySelector("[data-products-export]");
const productsPeriod = document.querySelector("[data-products-period]");
const productsSearchForm = document.querySelector("[data-products-search]");
const productsSearchInput = document.querySelector("[data-products-search-input]");
const productsFilterButtons = [...document.querySelectorAll("[data-products-filter]")];
const catalogFilterContainers = [...document.querySelectorAll("[data-catalog-options]")];
const catalogClearButton = document.querySelector("[data-catalog-clear]");
const catalogResultsCount = document.querySelector("[data-catalog-results-count]");
const catalogSort = document.querySelector("[data-catalog-sort]");
const newsletterForm = document.querySelector("[data-newsletter-form]");
const newsletterButton = document.querySelector("[data-newsletter-submit]");
const newsletterFeedback = document.querySelector("[data-newsletter-feedback]");
const cartState = [];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let catalogProducts = [];
let searchPreviewResults = [];
let searchPreviewMessage = "";
let activeProductsFilter = "Todos";
let activeProductsFeed = "arrivals";
let activeProductsView = "list";
let activeCatalogSort = "recent";
let activeHeroSlide = 0;
let heroTimer = 0;
let activePromoSlide = 0;
let promoTimer = 0;
let activeBrandSlide = 0;
let brandTimer = 0;
const activeCatalogFilters = {
  brand: new Set(),
  family: new Set(),
  type: new Set(),
};

function setMobileMenu(isOpen) {
  siteHeader.classList.toggle("is-mobile-open", isOpen);
  mobileToggle.setAttribute("aria-expanded", String(isOpen));
}

function setLookupPanel(isOpen) {
  if (!lookupPanel || !lookupToggle) {
    return;
  }

  lookupPanel.classList.toggle("is-open", isOpen);
  lookupToggle.setAttribute("aria-expanded", String(isOpen));

  if (isOpen) {
    setSearchPreview(false);
  }
}

function setSearchPreview(isOpen) {
  if (!searchPreview) {
    return;
  }

  const shouldOpen = isOpen && (searchPreviewResults.length > 0 || searchPreviewMessage);
  searchPreview.hidden = !shouldOpen;
  searchPreview.classList.toggle("is-open", shouldOpen);
}

function setLookupMode(option) {
  if (!option || !lookupLabel || !lookupInput || !lookupForm) {
    return;
  }

  lookupOptions.forEach((item) => {
    item.classList.toggle("is-active", item === option);
  });

  lookupForm.dataset.lookupMode = option.dataset.label;
  lookupLabel.textContent = option.dataset.label;
  lookupInput.placeholder = option.dataset.placeholder;
  lookupInput.focus();
}

function setAccountPanel(isOpen) {
  if (!accountPanel) {
    return;
  }

  accountPanel.classList.toggle("is-open", isOpen);
  accountToggles.forEach((button) => {
    button.setAttribute("aria-expanded", String(isOpen));
  });
}

function setCartPanel(isOpen) {
  if (!cartPanel) {
    return;
  }

  cartPanel.classList.toggle("is-open", isOpen);
  cartToggles.forEach((button) => {
    button.setAttribute("aria-expanded", String(isOpen));
  });
}

function closeMegaMenus() {
  megaItems.forEach((item) => {
    const button = item.querySelector("[data-mega-button]");
    item.classList.remove("is-open");
    button.setAttribute("aria-expanded", "false");
  });
}

function addMegaCloseButtons() {
  megaItems.forEach((item) => {
    const menu = item.querySelector("[data-mega-menu]");

    if (!menu || menu.querySelector("[data-mega-close]")) {
      return;
    }

    const closeButton = document.createElement("button");
    closeButton.className = "mega-close";
    closeButton.type = "button";
    closeButton.dataset.megaClose = "";
    closeButton.setAttribute("aria-label", "Fechar menu");
    closeButton.textContent = "×";
    closeButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      closeMegaMenus();
      item.classList.add("is-suppressed");
      item.querySelector("[data-mega-button]")?.focus();
    });

    menu.prepend(closeButton);
  });
}

function toggleMegaMenu(item) {
  const isOpen = item.classList.contains("is-open");
  closeMegaMenus();

  if (!isOpen) {
    const button = item.querySelector("[data-mega-button]");
    item.classList.add("is-open");
    button.setAttribute("aria-expanded", "true");
  }
}

function syncCartCount() {
  const itemCount = cartState.reduce((total, item) => total + item.quantity, 0);
  const label = `${itemCount} ${itemCount === 1 ? "produto" : "produtos"}`;
  const hasItems = cartState.length > 0;

  cartBadges.forEach((badge) => {
    badge.textContent = String(itemCount);
  });

  if (cartCountLabel) {
    cartCountLabel.textContent = label;
  }

  if (cartEmpty) {
    cartEmpty.hidden = hasItems;
  }

  if (checkoutButton) {
    checkoutButton.disabled = !hasItems;
    checkoutButton.setAttribute("aria-disabled", String(!hasItems));
  }
}

function setHeroSlide(index) {
  if (!heroSlides.length) {
    return;
  }

  activeHeroSlide = (index + heroSlides.length) % heroSlides.length;

  heroSlides.forEach((slide, slideIndex) => {
    const isActive = slideIndex === activeHeroSlide;
    slide.classList.toggle("is-active", isActive);
    slide.setAttribute("aria-hidden", String(!isActive));
  });

  heroDots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === activeHeroSlide;
    dot.classList.toggle("is-active", isActive);
    dot.setAttribute("aria-current", String(isActive));
  });
}

function nextHeroSlide() {
  setHeroSlide(activeHeroSlide + 1);
}

function restartHeroTimer() {
  window.clearInterval(heroTimer);

  if (heroSlides.length > 1 && !reduceMotion.matches) {
    heroTimer = window.setInterval(nextHeroSlide, 6500);
  }
}

function visiblePromoCards() {
  if (!promosTrack) {
    return 1;
  }

  const value = Number.parseInt(getComputedStyle(promosTrack).getPropertyValue("--promo-visible"), 10);
  return Number.isNaN(value) ? 1 : value;
}

function setPromoSlide(index, options = {}) {
  if (!promosTrack) {
    return;
  }

  const originalCards = promosTrack.querySelectorAll(".promo-card:not([data-promo-clone])");

  if (!originalCards.length) {
    return;
  }

  const shouldReset = index >= originalCards.length;
  activePromoSlide = shouldReset ? originalCards.length : (index + originalCards.length) % originalCards.length;

  const card = promosTrack.querySelector(".promo-card");
  const gap = Number.parseFloat(getComputedStyle(promosTrack).columnGap || "0");
  const step = card ? card.getBoundingClientRect().width + gap : 0;

  promosTrack.style.transition = options.instant ? "none" : "";
  promosTrack.style.transform = `translateX(-${activePromoSlide * step}px)`;

  if (shouldReset && !options.instant) {
    window.setTimeout(() => {
      activePromoSlide = 0;
      promosTrack.style.transition = "none";
      promosTrack.style.transform = "translateX(0)";
      window.requestAnimationFrame(() => {
        promosTrack.style.transition = "";
      });
    }, 540);
    return;
  }

  if (options.instant) {
    window.requestAnimationFrame(() => {
      promosTrack.style.transition = "";
    });
  }
}

function nextPromoSlide() {
  setPromoSlide(activePromoSlide + 1);
}

function restartPromoTimer() {
  window.clearInterval(promoTimer);

  if (promosTrack && !reduceMotion.matches) {
    promoTimer = window.setInterval(nextPromoSlide, 3600);
  }
}

function setupPromosCarousel() {
  if (!promosCarousel || !promosTrack) {
    return;
  }

  const cards = [...promosTrack.querySelectorAll(".promo-card")];
  const clonesNeeded = Math.max(visiblePromoCards(), 1);

  cards.slice(0, clonesNeeded).forEach((card) => {
    const clone = card.cloneNode(true);
    clone.dataset.promoClone = "";
    clone.setAttribute("aria-hidden", "true");
    clone.querySelectorAll("a, button").forEach((control) => {
      control.tabIndex = -1;
    });
    promosTrack.append(clone);
  });

  setPromoSlide(0, { instant: true });
  restartPromoTimer();

  promosCarousel.addEventListener("mouseenter", () => {
    window.clearInterval(promoTimer);
  });

  promosCarousel.addEventListener("mouseleave", restartPromoTimer);
  promosCarousel.addEventListener("focusin", () => {
    window.clearInterval(promoTimer);
  });
  promosCarousel.addEventListener("focusout", restartPromoTimer);

  window.addEventListener("resize", () => {
    setPromoSlide(activePromoSlide, { instant: true });
  });
}

function visibleBrandCards() {
  if (!brandsTrack) {
    return 1;
  }

  const value = Number.parseInt(getComputedStyle(brandsTrack).getPropertyValue("--brands-visible"), 10);
  return Number.isNaN(value) ? 1 : value;
}

function setBrandSlide(index, options = {}) {
  if (!brandsTrack) {
    return;
  }

  const originalCards = brandsTrack.querySelectorAll(".partner-brand-card:not([data-brand-clone])");

  if (!originalCards.length) {
    return;
  }

  const shouldReset = index >= originalCards.length;
  activeBrandSlide = shouldReset ? originalCards.length : (index + originalCards.length) % originalCards.length;

  const card = brandsTrack.querySelector(".partner-brand-card");
  const gap = Number.parseFloat(getComputedStyle(brandsTrack).columnGap || "0");
  const step = card ? card.getBoundingClientRect().width + gap : 0;

  brandsTrack.style.transition = options.instant ? "none" : "";
  brandsTrack.style.transform = `translateX(-${activeBrandSlide * step}px)`;

  if (shouldReset && !options.instant) {
    window.setTimeout(() => {
      activeBrandSlide = 0;
      brandsTrack.style.transition = "none";
      brandsTrack.style.transform = "translateX(0)";
      window.requestAnimationFrame(() => {
        brandsTrack.style.transition = "";
      });
    }, 540);
    return;
  }

  if (options.instant) {
    window.requestAnimationFrame(() => {
      brandsTrack.style.transition = "";
    });
  }
}

function restartBrandTimer() {
  window.clearInterval(brandTimer);

  if (brandsTrack && !reduceMotion.matches) {
    brandTimer = window.setInterval(() => {
      setBrandSlide(activeBrandSlide + 1);
    }, 2800);
  }
}

function setupBrandsCarousel() {
  if (!brandsCarousel || !brandsTrack) {
    return;
  }

  const cards = [...brandsTrack.querySelectorAll(".partner-brand-card")];
  const clonesNeeded = Math.max(visibleBrandCards(), 1);

  cards.slice(0, clonesNeeded).forEach((card) => {
    const clone = card.cloneNode(true);
    clone.dataset.brandClone = "";
    clone.setAttribute("aria-hidden", "true");
    clone.tabIndex = -1;
    brandsTrack.append(clone);
  });

  setBrandSlide(0, { instant: true });
  restartBrandTimer();

  brandsCarousel.addEventListener("mouseenter", () => {
    window.clearInterval(brandTimer);
  });
  brandsCarousel.addEventListener("mouseleave", restartBrandTimer);
  brandsCarousel.addEventListener("focusin", () => {
    window.clearInterval(brandTimer);
  });
  brandsCarousel.addEventListener("focusout", restartBrandTimer);

  window.addEventListener("resize", () => {
    setBrandSlide(activeBrandSlide, { instant: true });
  });
}

function renderCartItem(item) {
  const card = document.createElement("article");
  card.className = "cart-product";

  const thumb = document.createElement("div");
  thumb.className = "cart-thumb";
  thumb.setAttribute("aria-hidden", "true");

  if (item.image) {
    thumb.classList.add("has-image");
    const image = document.createElement("img");
    image.src = item.image;
    image.alt = "";
    thumb.append(image);
  }

  const body = document.createElement("div");
  body.className = "cart-product-body";

  const meta = document.createElement("p");
  meta.className = "cart-product-meta";
  meta.textContent = `${item.brand} | SKU: ${item.sku}`;

  const title = document.createElement("h3");
  title.className = "cart-product-title";
  title.textContent = item.title;

  const price = document.createElement("strong");
  price.className = "cart-product-price";
  price.textContent = item.price;

  const quantity = document.createElement("button");
  quantity.className = "cart-product-remove";
  quantity.type = "button";
  quantity.dataset.quantity = `x${item.quantity}`;
  quantity.title = "Eliminar produto";
  quantity.setAttribute("aria-label", `Eliminar ${item.title} do carrinho`);
  quantity.addEventListener("click", (event) => {
    event.stopPropagation();
    removeCartItem(item.sku);
  });

  body.append(meta, title, price);
  card.append(thumb, body, quantity);
  return card;
}

function renderSearchPreviewItem(item) {
  const card = document.createElement("article");
  card.className = "search-preview-product";

  const thumb = document.createElement("div");
  thumb.className = "search-preview-thumb";
  thumb.setAttribute("aria-hidden", "true");

  if (item.image) {
    thumb.classList.add("has-image");
    const image = document.createElement("img");
    image.src = item.image;
    image.alt = "";
    thumb.append(image);
  }

  const body = document.createElement("div");
  body.className = "search-preview-body";

  const meta = document.createElement("p");
  meta.className = "search-preview-meta";
  meta.textContent = `${item.brand} | SKU: ${item.sku}`;

  const title = document.createElement("h3");
  title.className = "search-preview-title";
  title.textContent = item.title;

  const price = document.createElement("strong");
  price.className = "search-preview-price";
  price.textContent = item.price || "Sob consulta";

  const actions = document.createElement("div");
  actions.className = "search-preview-actions";

  const quantity = document.createElement("input");
  quantity.className = "search-preview-qty";
  quantity.type = "number";
  quantity.min = "1";
  quantity.value = "1";
  quantity.inputMode = "numeric";
  quantity.setAttribute("aria-label", `Quantidade para ${item.title}`);

  const addButton = document.createElement("button");
  addButton.className = "search-preview-add";
  addButton.type = "button";
  addButton.textContent = "+";
  addButton.setAttribute("aria-label", `Adicionar ${item.title} ao carrinho`);
  addButton.addEventListener("click", (event) => {
    event.stopPropagation();

    const selectedQuantity = Math.max(1, Number(quantity.value) || 1);
    addCartItem(
      {
        ...productFromCatalog(item),
        quantity: selectedQuantity,
      },
      { openCart: false }
    );

    setSearchPreview(true);
    addButton.classList.add("is-added");
    window.clearTimeout(addButton.addedStateTimer);
    addButton.addedStateTimer = window.setTimeout(() => {
      addButton.classList.remove("is-added");
    }, 900);
  });

  actions.append(quantity, addButton);

  body.append(meta, title, price);
  card.append(thumb, body, actions);
  return card;
}

function renderSearchPreview() {
  if (!searchPreviewItems) {
    return;
  }

  searchPreviewItems.replaceChildren();

  if (searchPreviewMessage) {
    const message = document.createElement("p");
    message.className = "search-preview-empty";
    message.textContent = searchPreviewMessage;
    searchPreviewItems.append(message);
    return;
  }

  searchPreviewResults.slice(0, 4).forEach((item) => {
    searchPreviewItems.append(renderSearchPreviewItem(item));
  });
}

function renderCart() {
  cartItems.querySelectorAll(".cart-product").forEach((item) => item.remove());
  cartState.forEach((item) => {
    cartItems.append(renderCartItem(item));
  });
  syncCartCount();
}

function addCartItem(product, options = {}) {
  const existingItem = cartState.find((item) => item.sku === product.sku);

  if (existingItem) {
    existingItem.quantity += product.quantity;
  } else {
    cartState.unshift(product);
  }

  renderCart();
  if (options.openCart !== false) {
    setCartPanel(true);
  }
  setLookupPanel(false);
  setAccountPanel(false);
  closeMegaMenus();
}

function removeCartItem(sku, options = {}) {
  const itemIndex = cartState.findIndex((item) => item.sku === sku);

  if (itemIndex === -1) {
    return;
  }

  cartState.splice(itemIndex, 1);
  renderCart();
  if (options.openCart !== false) {
    setCartPanel(true);
  }
}

function productFromQuickCart(form) {
  const sku = form.elements.sku.value.trim().toUpperCase();
  const quantity = Math.max(1, Number(form.elements.qty.value) || 1);

  return {
    brand: "Asus",
    sku,
    title:
      sku === "CCB650EMAXGAMINGWIFIW"
        ? "ASUS B650E MAX GAMING WIFI W AM5 ATX Motherboard, White PCB, DDR..."
        : `Produto ${sku} adicionado diretamente ao carrinho`,
    price: "$149.99",
    quantity,
  };
}

function productFromCatalog(product) {
  return {
    brand: product.brand,
    sku: product.sku,
    title: product.title,
    price: product.price,
    image: product.image,
    quantity: 1,
  };
}

function matchesCatalogSearch(product, query) {
  if (!query) {
    return true;
  }

  const searchable = `${product.brand} ${product.sku} ${product.title} ${product.category}`.toLowerCase();
  return searchable.includes(query);
}

function setActiveProductsFilter(filter) {
  activeProductsFilter = filter;
  productsFilterButtons.forEach((item) => {
    item.classList.toggle("is-active", item.dataset.productsFilter === filter);
  });
}

function setActiveProductsFeed(feed) {
  activeProductsFeed = feed;
  productsFeedButtons.forEach((item) => {
    const isActive = item.dataset.productsFeed === feed;
    item.classList.toggle("is-active", isActive);
    item.setAttribute("aria-selected", String(isActive));
  });
}

function setActiveProductsView(view) {
  activeProductsView = view;
  productsViewButtons.forEach((item) => {
    const isActive = item.dataset.productsView === view;
    item.classList.toggle("is-active", isActive);
    item.setAttribute("aria-pressed", String(isActive));
  });
}

function searchCatalogProducts(query) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return [];
  }

  return catalogProducts.filter((product) => matchesCatalogSearch(product, normalizedQuery));
}

function productDepartment(product) {
  const searchable = `${product.category} ${product.title}`.toLowerCase();

  if (searchable.includes("gaming") || searchable.includes("gamer")) {
    return "Tecnologia gaming";
  }

  if (searchable.includes("office") || searchable.includes("desktop")) {
    return "PC Office";
  }

  if (searchable.includes("workstation") || searchable.includes("quadro") || searchable.includes("threadripper")) {
    return "Workstation";
  }

  if (searchable.includes(" ai ") || searchable.includes("gpu") || searchable.includes("rtx")) {
    return "AI Solutions";
  }

  if (searchable.includes("nuc") || searchable.includes("mini pc") || searchable.includes("mini-pc") || searchable.includes("barebone")) {
    return "NUC / Mini PC";
  }

  if (searchable.includes("aio") || searchable.includes("all in one") || searchable.includes("all-in-one")) {
    return "AIO all-in-one";
  }

  if (searchable.includes("servidor") || searchable.includes("server") || searchable.includes("nas")) {
    return "Servidores";
  }

  return "Hardware";
}

function productType(product) {
  const searchable = `${product.category} ${product.title}`.toLowerCase();

  if (searchable.includes("motherboard")) {
    return "Motherboards";
  }

  if (searchable.includes("barebone")) {
    return "Barebones";
  }

  if (searchable.includes("all in one") || searchable.includes("all-in-one") || searchable.includes(" aio ")) {
    return "All in one";
  }

  if (searchable.includes("mini pc") || searchable.includes("mini-pc") || searchable.includes("nuc")) {
    return "Mini PCs";
  }

  return product.category;
}

function catalogFilterValue(product, filter) {
  if (filter === "brand") {
    return product.brand;
  }

  if (filter === "family") {
    return product.category;
  }

  return productType(product);
}

function buildCatalogSidebarFilters() {
  catalogFilterContainers.forEach((container) => {
    const filter = container.dataset.catalogOptions;
    const values = [...new Set(catalogProducts.map((product) => catalogFilterValue(product, filter)))]
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b, "pt", { sensitivity: "base" }));

    container.replaceChildren();

    values.forEach((value) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      const text = document.createElement("span");

      input.type = "checkbox";
      input.value = value;
      input.dataset.catalogFilter = filter;
      text.textContent = value;
      label.append(input, text);
      container.append(label);
    });
  });
}

function matchesCatalogSidebarFilters(product) {
  return Object.entries(activeCatalogFilters).every(([filter, selected]) => {
    return !selected.size || selected.has(catalogFilterValue(product, filter));
  });
}

function productPriceNumber(product) {
  const rawPrice = String(product.price || "").replace(/[^\d.,-]/g, "");
  const normalizedPrice =
    rawPrice.includes(",") && rawPrice.includes(".")
      ? rawPrice.replace(/\./g, "").replace(",", ".")
      : rawPrice.replace(",", ".");
  return Number.parseFloat(normalizedPrice) || 0;
}

function sortCatalogProducts(products) {
  const sortedProducts = [...products];

  if (activeCatalogSort === "brand") {
    return sortedProducts.sort((a, b) => a.brand.localeCompare(b.brand, "pt", { sensitivity: "base" }));
  }

  if (activeCatalogSort === "price-asc") {
    return sortedProducts.sort((a, b) => productPriceNumber(a) - productPriceNumber(b));
  }

  if (activeCatalogSort === "price-desc") {
    return sortedProducts.sort((a, b) => productPriceNumber(b) - productPriceNumber(a));
  }

  return sortedProducts;
}

function performHeaderSearch(form) {
  const query = form.elements.description?.value.trim() || "";

  searchPreviewResults = searchCatalogProducts(query);
  searchPreviewMessage = "";

  if (!query) {
    searchPreviewMessage = "Escreva uma pesquisa para encontrar produtos.";
  } else if (!searchPreviewResults.length) {
    searchPreviewMessage = "Sem resultados para esta pesquisa.";
  }

  if (productsSearchInput) {
    productsSearchInput.value = query;
    setActiveProductsFilter("Todos");
    renderCatalogProducts();
  }

  renderSearchPreview();
  setLookupPanel(false);
  setSearchPreview(true);
  setCartPanel(false);
  setAccountPanel(false);
  closeMegaMenus();
}

function visibleCatalogProducts() {
  const query = productsSearchInput?.value.trim().toLowerCase() || "";
  const halfPoint = Math.ceil(catalogProducts.length / 2);
  const feedProducts =
    activeProductsFeed === "news" ? catalogProducts.slice(halfPoint) : catalogProducts.slice(0, halfPoint);

  return feedProducts.filter((product) => {
    const matchesFilter = activeProductsFilter === "Todos" || productDepartment(product) === activeProductsFilter;
    return matchesFilter && matchesCatalogSearch(product, query) && matchesCatalogSidebarFilters(product);
  });
}

function renderCatalogProductRow(product) {
  const row = document.createElement("a");
  row.className = "product-row";
  row.href = product.url;
  row.target = "_blank";
  row.rel = "noreferrer";

  const imageCell = document.createElement("span");
  imageCell.className = "product-row-image";
  const image = document.createElement("img");
  image.src = product.image;
  image.alt = "";
  image.loading = "lazy";
  imageCell.append(image);

  const brand = document.createElement("span");
  brand.className = "product-row-brand";
  brand.textContent = product.brand;

  const sku = document.createElement("span");
  sku.className = "product-row-ref";
  sku.textContent = product.sku;

  const title = document.createElement("span");
  title.className = "product-row-title";
  title.textContent = product.title;

  const price = document.createElement("strong");
  price.className = "product-row-price";
  price.textContent = product.price ? `${product.price} c/IVA` : "Sob consulta";

  row.append(imageCell, brand, sku, title, price);
  return row;
}

function renderCatalogProductsList(products) {
  const list = document.createElement("div");
  list.className = "products-list";

  const header = document.createElement("div");
  header.className = "products-list-header";
  ["Img", "Marca", "Ref.", "Descrição", "Preço"].forEach((label) => {
    const item = document.createElement("span");
    item.textContent = label;
    header.append(item);
  });

  list.append(header);
  products.forEach((product) => {
    list.append(renderCatalogProductRow(product));
  });
  productsGrid.append(list);
}

function renderCatalogProductsGrid(products) {
  products.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.dataset.productCard = "";

    const media = document.createElement("a");
    media.className = "product-media";
    media.href = product.url;
    media.target = "_blank";
    media.rel = "noreferrer";

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = "";
    image.loading = "lazy";
    media.append(image);

    const body = document.createElement("div");
    body.className = "product-body";

    const meta = document.createElement("p");
    meta.className = "product-meta";

    const brand = document.createElement("span");
    brand.textContent = product.brand;

    const category = document.createElement("span");
    category.textContent = product.category;
    meta.append(brand, category);

    const title = document.createElement("h3");
    title.className = "product-title";

    const titleLink = document.createElement("a");
    titleLink.href = product.url;
    titleLink.target = "_blank";
    titleLink.rel = "noreferrer";
    titleLink.textContent = product.title;
    title.append(titleLink);

    const sku = document.createElement("p");
    sku.className = "product-sku";
    sku.textContent = `SKU: ${product.sku}`;

    body.append(meta, title, sku);

    const footer = document.createElement("div");
    footer.className = "product-footer";

    const price = document.createElement("strong");
    price.className = "product-price";
    price.textContent = product.price || "Sob consulta";

    const addButton = document.createElement("button");
    addButton.className = "product-add";
    addButton.type = "button";
    addButton.textContent = "Adicionar";
    addButton.addEventListener("click", (event) => {
      event.stopPropagation();
      addCartItem(productFromCatalog(product));
    });

    footer.append(price, addButton);
    card.append(media, body, footer);
    productsGrid.append(card);
  });
}

function renderCatalogProducts() {
  if (!productsGrid) {
    return;
  }

  productsGrid.replaceChildren();
  productsGrid.classList.toggle("is-list-view", activeProductsView === "list");
  productsGrid.classList.toggle("is-grid-view", activeProductsView === "grid");

  const products = sortCatalogProducts(visibleCatalogProducts());

  if (catalogResultsCount) {
    catalogResultsCount.textContent = `${products.length} ${products.length === 1 ? "produto" : "produtos"}`;
  }

  if (!products.length) {
    const empty = document.createElement("p");
    empty.className = "products-empty";
    empty.textContent = "Sem produtos para este filtro.";
    productsGrid.append(empty);
    return;
  }

  if (activeProductsView === "list") {
    renderCatalogProductsList(products);
    return;
  }

  renderCatalogProductsGrid(products);
}

function exportVisibleCatalogProducts() {
  const products = visibleCatalogProducts();

  if (!products.length) {
    return;
  }

  const headers = ["Marca", "Ref.", "Descrição", "Categoria", "Preço", "URL"];
  const rows = products.map((product) => [
    product.brand,
    product.sku,
    product.title,
    product.category,
    product.price || "Sob consulta",
    product.url,
  ]);
  const escapeCell = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
  const content = [headers, ...rows].map((row) => row.map(escapeCell).join("\t")).join("\n");
  const blob = new Blob(["\ufeff", content], {
    type: "application/vnd.ms-excel;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const feedLabel = activeProductsFeed === "news" ? "novidades" : "acabados-de-chegar";

  link.href = url;
  link.download = `niposom-${feedLabel}.xls`;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

async function loadCatalogProducts() {
  if (!productsGrid) {
    return;
  }

  if (Array.isArray(window.NIPOSOM_PRODUCTS)) {
    catalogProducts = window.NIPOSOM_PRODUCTS;
    buildCatalogSidebarFilters();
    renderCatalogProducts();
    return;
  }

  try {
    const response = await fetch("./assets/products.json", { cache: "no-store" });
    catalogProducts = await response.json();
    buildCatalogSidebarFilters();
    renderCatalogProducts();
  } catch {
    const empty = document.createElement("p");
    empty.className = "products-empty";
    empty.textContent = "Não foi possível carregar os produtos.";
    productsGrid.replaceChildren(empty);
  }
}

function createMobileSubfamilyLink(link) {
  const item = document.createElement("a");
  item.href = link.href;
  item.textContent = link.textContent.trim();
  return item;
}

function createMobileFamilySection(section, categoryIndex, familyIndex, categoryLabel) {
  const family = document.createElement("details");
  family.className = "mobile-family";

  const title = section.querySelector("h2");
  const titleLink = title?.querySelector("a");
  const summary = document.createElement("summary");
  summary.textContent = title?.textContent.trim() || (categoryLabel === "Marcas" ? "Todas as marcas" : `Família ${familyIndex + 1}`);

  if (titleLink?.href) {
    summary.dataset.href = titleLink.href;
  }

  const links = [...section.querySelectorAll(":scope > a")].filter((link) => link.textContent.trim());

  if (!links.length && titleLink?.href) {
    const directLink = document.createElement("a");
    directLink.href = titleLink.href;
    directLink.textContent = summary.textContent;
    directLink.className = "mobile-direct-family-link";
    family.append(summary, directLink);
    return family;
  }

  const subfamilies = document.createElement("div");
  subfamilies.className = "mobile-subfamilies";
  subfamilies.id = `mobile-category-${categoryIndex}-family-${familyIndex}`;

  links.forEach((link) => {
    subfamilies.append(createMobileSubfamilyLink(link));
  });

  family.append(summary, subfamilies);
  return family;
}

function buildMobileCategoryMenu() {
  if (!desktopCategoryNav || !mobileCategoryMenu) {
    return;
  }

  const categoryItems = [...desktopCategoryNav.querySelectorAll(".category-inner > a, .category-inner > .nav-item")];
  mobileCategoryMenu.replaceChildren();

  categoryItems.forEach((item, categoryIndex) => {
    if (item.matches("a")) {
      const link = document.createElement("a");
      link.href = item.href;
      link.textContent = item.textContent.trim();
      mobileCategoryMenu.append(link);
      return;
    }

    const button = item.querySelector("[data-mega-button]");
    const sections = [...item.querySelectorAll("[data-mega-menu] section")];
    const category = document.createElement("details");
    category.className = "mobile-category";

    const summary = document.createElement("summary");
    summary.textContent = button?.textContent.trim() || `Categoria ${categoryIndex + 1}`;

    const families = document.createElement("div");
    families.className = "mobile-families";

    sections.forEach((section, familyIndex) => {
      families.append(createMobileFamilySection(section, categoryIndex, familyIndex, summary.textContent));
    });

    category.append(summary, families);
    mobileCategoryMenu.append(category);
  });
}

buildMobileCategoryMenu();
addMegaCloseButtons();

if (mobileCategoryMenu) {
  mobileCategoryMenu.addEventListener(
    "toggle",
    (event) => {
      const panel = event.target;

      if (!(panel instanceof HTMLDetailsElement) || !panel.open) {
        return;
      }

      const selector = panel.classList.contains("mobile-category") ? ".mobile-category" : ".mobile-family";
      const scope = panel.classList.contains("mobile-category")
        ? mobileCategoryMenu
        : panel.closest(".mobile-families");

      scope?.querySelectorAll(selector).forEach((sibling) => {
        if (sibling !== panel) {
          sibling.removeAttribute("open");
        }
      });
    },
    true
  );
}

syncCartCount();
loadCatalogProducts();
setupPromosCarousel();
setupBrandsCarousel();

if (heroCarousel && heroSlides.length > 1) {
  setHeroSlide(0);
  restartHeroTimer();

  heroPrev?.addEventListener("click", () => {
    setHeroSlide(activeHeroSlide - 1);
    restartHeroTimer();
  });

  heroNext?.addEventListener("click", () => {
    nextHeroSlide();
    restartHeroTimer();
  });

  heroDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      setHeroSlide(index);
      restartHeroTimer();
    });
  });

  heroCarousel.addEventListener("mouseenter", () => {
    window.clearInterval(heroTimer);
  });

  heroCarousel.addEventListener("mouseleave", restartHeroTimer);

  reduceMotion.addEventListener("change", restartHeroTimer);
}

if (mobileToggle && mobileMenu) {
  mobileToggle.addEventListener("click", () => {
    setMobileMenu(!siteHeader.classList.contains("is-mobile-open"));
    setLookupPanel(false);
    setSearchPreview(false);
    setAccountPanel(false);
    setCartPanel(false);
    closeMegaMenus();
  });

  mobileMenu.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setMobileMenu(false);
    }
  });
}

if (lookupToggle && lookupPanel) {
  lookupToggle.addEventListener("click", (event) => {
    event.preventDefault();
    setLookupPanel(!lookupPanel.classList.contains("is-open"));
    setSearchPreview(false);
    setAccountPanel(false);
    setCartPanel(false);
    closeMegaMenus();
  });

  lookupOptions.forEach((option) => {
    option.addEventListener("click", () => {
      setLookupMode(option);
      setLookupPanel(false);
    });
  });
}

megaItems.forEach((item) => {
  const button = item.querySelector("[data-mega-button]");

  button.addEventListener("click", (event) => {
    event.preventDefault();
    item.classList.remove("is-suppressed");
    toggleMegaMenu(item);
    setLookupPanel(false);
    setSearchPreview(false);
    setAccountPanel(false);
    setCartPanel(false);
    setMobileMenu(false);
  });

  item.addEventListener("mouseenter", () => {
    if (item.classList.contains("is-suppressed")) {
      return;
    }

    closeMegaMenus();
    item.classList.add("is-open");
    button.setAttribute("aria-expanded", "true");
    setLookupPanel(false);
    setSearchPreview(false);
    setAccountPanel(false);
    setCartPanel(false);
  });

  item.addEventListener("mouseleave", () => {
    item.classList.remove("is-suppressed");
  });
});

accountToggles.forEach((button) => {
  button.addEventListener("click", () => {
    setAccountPanel(!accountPanel.classList.contains("is-open"));
    setLookupPanel(false);
    setSearchPreview(false);
    setCartPanel(false);
    setMobileMenu(false);
    closeMegaMenus();
  });
});

cartToggles.forEach((button) => {
  button.addEventListener("click", () => {
    setCartPanel(!cartPanel.classList.contains("is-open"));
    setLookupPanel(false);
    setSearchPreview(false);
    setAccountPanel(false);
    setMobileMenu(false);
    closeMegaMenus();
  });
});

checkoutButton?.addEventListener("click", () => {
  if (!cartState.length) {
    return;
  }

  window.location.hash = "checkout";
});

if (accountForm) {
  accountForm.addEventListener("submit", (event) => {
    event.preventDefault();
  });
}

document.querySelectorAll("[data-quick-cart]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const skuInput = form.elements.sku;
    const quantity = Math.max(1, Number(form.elements.qty.value) || 1);
    const button = form.querySelector(".add-button");

    if (!skuInput.value.trim()) {
      skuInput.reportValidity();
      return;
    }

    window.clearTimeout(form.addedStateTimer);
    button.textContent = `Adicionado x${quantity}`;
    button.classList.add("is-added");
    addCartItem(productFromQuickCart(form));

    form.addedStateTimer = window.setTimeout(() => {
      button.textContent = button.dataset.label;
      button.classList.remove("is-added");
    }, 1800);
  });
});

document.querySelectorAll('form[role="search"]:not([data-products-search])').forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    performHeaderSearch(form);
    setMobileMenu(false);
  });
});

productsSearchForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  renderCatalogProducts();
});

productsSearchInput?.addEventListener("input", renderCatalogProducts);

productsModule?.addEventListener("change", (event) => {
  const input = event.target.closest("[data-catalog-filter]");

  if (!input) {
    return;
  }

  const selected = activeCatalogFilters[input.dataset.catalogFilter];

  if (input.checked) {
    selected.add(input.value);
  } else {
    selected.delete(input.value);
  }

  renderCatalogProducts();
});

catalogClearButton?.addEventListener("click", () => {
  Object.values(activeCatalogFilters).forEach((selected) => selected.clear());
  productsModule.querySelectorAll("[data-catalog-filter]").forEach((input) => {
    input.checked = false;
  });

  if (productsSearchInput) {
    productsSearchInput.value = "";
  }

  setActiveProductsFilter("Todos");
  renderCatalogProducts();
});

catalogSort?.addEventListener("change", () => {
  activeCatalogSort = catalogSort.value;
  renderCatalogProducts();
});

newsletterForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!newsletterForm.reportValidity()) {
    return;
  }

  newsletterButton.textContent = "Subscrito";
  newsletterButton.classList.add("is-complete");
  newsletterFeedback.textContent = "Obrigado. Vai receber as novidades Niposom no seu email.";
  newsletterForm.reset();

  window.setTimeout(() => {
    newsletterButton.textContent = "Subscrever";
    newsletterButton.classList.remove("is-complete");
  }, 2600);
});

productsFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveProductsFilter(button.dataset.productsFilter);
    renderCatalogProducts();
  });
});

productsFeedButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveProductsFeed(button.dataset.productsFeed);
    renderCatalogProducts();
  });
});

productsModule?.addEventListener("click", (event) => {
  const feedButton = event.target.closest("[data-products-feed]");

  if (!feedButton || !productsModule.contains(feedButton)) {
    return;
  }

  setActiveProductsFeed(feedButton.dataset.productsFeed);
  renderCatalogProducts();
});

productsViewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveProductsView(button.dataset.productsView);
    renderCatalogProducts();
  });
});

productsPeriod?.addEventListener("change", renderCatalogProducts);

productsExportButton?.addEventListener("click", exportVisibleCatalogProducts);

productsCollapseButton?.addEventListener("click", () => {
  const isCollapsed = productsCard?.classList.toggle("is-collapsed");
  productsCollapseButton.setAttribute("aria-expanded", String(!isCollapsed));
  productsCollapseButton.setAttribute("aria-label", isCollapsed ? "Expandir produtos" : "Recolher produtos");
});

document.addEventListener("click", (event) => {
  const clickedInsideHeader = event.target.closest("[data-site-header]");
  const clickedInsideLookup = event.target.closest("[data-lookup-form]");

  if (!clickedInsideHeader) {
    setLookupPanel(false);
    setSearchPreview(false);
    setAccountPanel(false);
    setCartPanel(false);
    closeMegaMenus();
    setMobileMenu(false);
    return;
  }

  if (!clickedInsideLookup) {
    setLookupPanel(false);
    setSearchPreview(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setLookupPanel(false);
    setSearchPreview(false);
    setAccountPanel(false);
    setCartPanel(false);
    closeMegaMenus();
    setMobileMenu(false);
  }
});

window.matchMedia("(min-width: 1041px)").addEventListener("change", (event) => {
  if (event.matches) {
    setMobileMenu(false);
  }
});
