import {deletePost, editPost, fetchAllPosts, fetchCarouselData, fetchPost, login, makePost} from "./api.js";
import {updateCarousel, updateEditPost, updatePost, updatePosts} from "./ui.js";
import {initializeCarouselControls, showSlides, slideIndex} from "./carousel.js";
import {getAccessToken, getIdParamFromUrl, getName, redirectToMakePost} from "./utils.js";

(function ensureIndexPath() {
    const currentPath = window.location.pathname;
    const indexPath = "/index.html";

    if (currentPath === "/" || currentPath === "/index" || currentPath === "") {
        window.location.replace(indexPath);
    }
})();

let currentPageNumber = 1;

function updateAuthLink(currentPage) {
    const username = document.getElementById("username");
    const authLink = document.getElementById("auth-link");
    if (!username || !authLink) return;

    const name = getName();
    const accessToken = getAccessToken();

    if (name && accessToken) {
        username.innerText = `Hi, ${name}`;
        authLink.textContent = "Sign Out";
        if (currentPage === "/index.html") {
            document.getElementById("tools").setAttribute("logged-in", "true");
            document.getElementById("make-post").addEventListener("click", () => {
                redirectToMakePost();
            });
        }
        if (currentPage === "/post/index.html") {
            document.getElementById("tools").setAttribute("logged-in", "true");
        }
        authLink.addEventListener("click", function(event) {
            event.preventDefault();
            logOut(authLink, currentPage);
        });
    } else {
        authLink.textContent = "Sign In";
        authLink.href = "../account/login.html";
    }
}

function logOut(authLink, currentPage) {
    sessionStorage.removeItem("user");
    authLink.textContent = "Sign In";
    if (currentPage === "/index.html") {
        document.getElementById("tools").setAttribute("logged-in", "false");
    }

    if (currentPage === "/post/index.html") {
        document.getElementById("tools").setAttribute("logged-in", "false");
    }
    location.href = "../index.html";
}

async function handleLogin() {
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            login(e);
        });
    }
}

async function initializeCarousel() {
    const carousel = document.getElementById("carousel");
    if (carousel) {
        const carouselData = await fetchCarouselData();
        if (carouselData.data.length > 0) {
            carousel.setAttribute("show", "true");
            await updateCarousel(carouselData);
            showSlides(slideIndex);
            initializeCarouselControls();
        }
    }
}

async function initializeThumbnailGrid(page = currentPageNumber) {
    const posts = document.getElementById("posts");
    const pagination = document.getElementById("pagination");
    if (posts) {
        const allPostsData = await fetchAllPosts(page);
        if (allPostsData.data.length > 0) {
            pagination.setAttribute("show", "true");
            await updatePosts(allPostsData);
        }
    }
}

async function initializePost() {
    const post = document.getElementById("post-wrapper");
    if (post) {
        const postId = getIdParamFromUrl();
        const postData = await fetchPost(postId);
        await updatePost(postData);
    }
}

async function initializeMakePost() {
    const post = document.getElementById("new-post-form");
    if (post) {
        post.addEventListener("submit", (e) => {
            makePost(e);
        });
    }
}

async function initializeEditPost() {
    const post = document.getElementById("edit-post-form");
    if (post) {
        const postId = getIdParamFromUrl();
        const postData = await fetchPost(postId);
        await updateEditPost(postData);
        post.addEventListener("submit", (e) => {
            editPost(e, postId);
        });
        document.getElementById("delete-btn").addEventListener("click", async () => {
            await deletePost(postId);
        });
    }
}

function getCurrentPage() {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    return url.pathname;
}

const pageInitializers = {
    "/index.html": [initializeCarousel, initializeThumbnailGrid],
    "/post/index.html": [initializePost],
    "/post/make.html": [initializeMakePost],
    "/post/edit.html": [initializeEditPost],
    "/account/login.html": [handleLogin],
}

async function initializePage() {
    const errorMsg = document.getElementById("error-msg");
    errorMsg.innerText = "";
    try {
        const currentPage = getCurrentPage();
        const initializers = pageInitializers[currentPage];

        if (initializers) {
            for (const initializer of initializers) {
                await initializer();
            }
        }
        updateAuthLink(currentPage);
    } catch (error) {
        errorMsg.innerText = `Initialization error: ${error.message}`;
    }

    const prevPageButton = document.getElementById("prev-page");
    const nextPageButton = document.getElementById("next-page");

    if (prevPageButton && nextPageButton) {
        prevPageButton.addEventListener("click", async () => {
            if (currentPageNumber > 1) {
                currentPageNumber--;
                await initializeThumbnailGrid(currentPageNumber);
            }
        });

        nextPageButton.addEventListener("click", async () => {
            currentPageNumber++;
            await initializeThumbnailGrid(currentPageNumber);
        });
    }
}

window.onload = initializePage;