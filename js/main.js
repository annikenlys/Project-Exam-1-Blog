import {login, fetchCarouselData, fetchAllPosts, fetchPost, editPost, makePost, deletePost} from "./api.js";
import {updateCarousel, updateEditPost, updatePost, updatePosts} from "./ui.js";
import {initializeCarouselControls, showSlides, slideIndex} from "./carousel.js";
import {getIdParamFromUrl} from "./utils.js";

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
        await updateCarousel(carouselData);
        showSlides(slideIndex);
        initializeCarouselControls();
    }
}

async function initializeThumbnailGrid() {
    const posts = document.getElementById("posts");
    if (posts) {
        const allPostsData = await fetchAllPosts();
        await updatePosts(allPostsData);
    }
}

async function initializePost() {
    const post = document.getElementById("postWrapper");
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

window.onload = () => {
    initializeCarousel().then(() =>  console.log('Carousel initialized'));
    initializeThumbnailGrid().then(() => console.log('Thumbnail grid initialized'));
    initializePost().then(() => console.log('Post initialized'));
    initializeMakePost().then(() => console.log('Make post initialized'));
    initializeEditPost().then(() => console.log('Edit post initialized'));
    handleLogin().then(() => console.log('Login initialized'));
}