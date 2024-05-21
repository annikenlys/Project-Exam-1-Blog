import {redirectToEditPost, redirectToMakePost, redirectToPost} from "./utils.js";
import {deletePost} from "./api.js";

export async function updateCarousel(data) {
    const carousel = document.getElementById("slides");
    data.data.map((post, index) => {
        const div = document.createElement('div');
        div.setAttribute("class", "mySlides fade");
        div.setAttribute('post-id', post.id);
        div.innerHTML =
            `<div class="numbertext">${index + 1} / 3</div>
            <img src="${post.media.url}" alt="${post.media.alt}">
            <div class="text">${post.title}</div>
            <button class="button" onclick="redirectToPost(${post.id})">Read more</button>`;
        div.addEventListener('click', () => {
            redirectToPost(post.id);
        });
        carousel.appendChild(div);
    });
}

export async function updatePosts(data) {
    const posts = document.getElementById("posts");
    data.data.map((post, index) => {
        const div = document.createElement('div');
        div.setAttribute('class', 'post');
        div.setAttribute('post-id', post.id);
        div.innerHTML = `<h4>${post.title}</h4>`;
        div.addEventListener('click', () => {
            redirectToPost(post.id);
        });
        posts.appendChild(div);
    });
}

export async function updatePost(data) {
    const post = data.data;
    const postContainer = document.getElementById("postWrapper");
    const div = document.createElement('div');
    div.setAttribute('class', 'post');
    div.setAttribute('post-id', post.id);
    div.innerHTML = `
        <h1>${post.title}</h1>
        <img src="${post.media.url}" alt="${post.media.alt}">
    `;
    postContainer.appendChild(div);

    document.getElementById("make").addEventListener("click", () => {
        redirectToMakePost();
    });
    document.getElementById("edit").addEventListener("click", () => {
        redirectToEditPost(post.id);
    });
}

export async function updateEditPost(data) {
    const post = data.data;
    document.getElementById("title").value = post.title;
    document.getElementById("body").value = post.body;
    document.getElementById("tags").value = post.tags;
    document.getElementById("url").value = post.media.url;
    document.getElementById("alt").value = post.media.alt;
}

/*
document.addEventListener("DOMContentLoaded", function() {
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
        document.getElementById("tools").setAttribute("logged-in", "true");
    }
});*/