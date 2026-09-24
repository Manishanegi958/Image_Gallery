// ================================
// Select Elements
// ================================

const galleryItems = document.querySelectorAll(".gallery-item");
const filterButtons = document.querySelectorAll(".filter-btn");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxTitle = document.getElementById("lightbox-title");

const closeBtn = document.getElementById("close");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");


// ================================
// Gallery Array
// ================================

let visibleItems = [];
let currentIndex = 0;


// ================================
// Update Visible Images
// ================================

function updateVisibleItems() {

    visibleItems = Array.from(galleryItems).filter(item => {
        return item.style.display !== "none";
    });
}


// ================================
// Open Lightbox
// ================================

function openLightbox(index) {

    updateVisibleItems();

    currentIndex = index;

    const item = visibleItems[currentIndex];
    const image = item.querySelector("img");

    lightboxImg.src = image.src;
    lightboxImg.alt = image.alt;

    lightboxTitle.textContent = image.dataset.title;

    lightbox.classList.add("show");

    document.body.style.overflow = "hidden";
}


// ================================
// Close Lightbox
// ================================

function closeLightbox() {

    lightbox.classList.remove("show");

    document.body.style.overflow = "auto";
}


// ================================
// Next Image
// ================================

function showNext() {

    updateVisibleItems();

    if (visibleItems.length === 0) return;

    currentIndex++;

    if (currentIndex >= visibleItems.length) {
        currentIndex = 0;
    }

    const image = visibleItems[currentIndex].querySelector("img");

    lightboxImg.src = image.src;
    lightboxImg.alt = image.alt;

    lightboxTitle.textContent = image.dataset.title;
}


// ================================
// Previous Image
// ================================

function showPrevious() {

    updateVisibleItems();

    if (visibleItems.length === 0) return;

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = visibleItems.length - 1;
    }

    const image = visibleItems[currentIndex].querySelector("img");

    lightboxImg.src = image.src;
    lightboxImg.alt = image.alt;

    lightboxTitle.textContent = image.dataset.title;
}


// ================================
// Gallery Click
// ================================

galleryItems.forEach(item => {

    item.addEventListener("click", function () {

        updateVisibleItems();

        const index = visibleItems.indexOf(this);

        openLightbox(index);

    });

});


// ================================
// Filter Gallery
// ================================

filterButtons.forEach(button => {

    button.addEventListener("click", function () {

        // Remove active class
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Add active class
        this.classList.add("active");

        const filter = this.dataset.filter;

        galleryItems.forEach(item => {

            const category = item.dataset.category;

            if (filter === "all" || category === filter) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }

        });

    });

});


// ================================
// Button Events
// ================================

closeBtn.addEventListener("click", closeLightbox);

nextBtn.addEventListener("click", showNext);

prevBtn.addEventListener("click", showPrevious);


// ================================
// Close on Background Click
// ================================

lightbox.addEventListener("click", function (event) {

    if (event.target === lightbox) {
        closeLightbox();
    }

});


// ================================
// Keyboard Navigation
// ================================

document.addEventListener("keydown", function (event) {

    if (!lightbox.classList.contains("show")) return;

    if (event.key === "ArrowRight") {
        showNext();
    }

    if (event.key === "ArrowLeft") {
        showPrevious();
    }

    if (event.key === "Escape") {
        closeLightbox();
    }

});
// ================================
// Change Background by Category
// ================================

filterButtons.forEach(button => {

    button.addEventListener("click", function () {

        const filter = this.dataset.filter;

        if (filter === "nature") {
            document.body.style.backgroundImage =
                "url('image/nature-bg.jpg')";
        }

        else if (filter === "food") {
            document.body.style.backgroundImage =
                "url('image/food-bg.jpg')";
        }

        else if (filter === "city") {
            document.body.style.backgroundImage =
                "url('image/city-bg.jpg')";
        }

        else if (filter === "travel") {
            document.body.style.backgroundImage =
                "url('image/travel-bg.jpg')";
        }

        else if (filter === "all") {
            document.body.style.backgroundImage =
                "url('image/image.png')";
        }

    });

});