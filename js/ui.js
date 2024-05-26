import {redirectToEditPost, redirectToMakePost, redirectToPost, refactorDate} from "./utils.js";
import {deletePost} from "./api.js";

export async function updateCarousel(data) {
    const carousel = document.getElementById("slides");
    data.data.map((post, index) => {
        const div = document.createElement("div");
        div.setAttribute("class", "mySlides fade");
        div.setAttribute("post-id", post.id);
        div.innerHTML =
            `<div class="numbertext">${index + 1} / 3</div>
            <img src="${post.media.url}" alt="${post.media.alt}">
            <div class="text">${post.title}</div>
            <button class="button" onclick="redirectToPost(${post.id})">Read more</button>`;
        div.addEventListener("click", () => {
            redirectToPost(post.id);
        });
        carousel.appendChild(div);
    });
}

export async function updatePosts(data) {
    const posts = document.getElementById("posts");
    data.data.map((post, index) => {
        const div = document.createElement("div");
        div.setAttribute("class", "post-card");
        div.setAttribute("post-id", post.id);
        div.innerHTML = `
           <img class="post-card-img" src="${post.media.url}" alt="${post.media.alt}">
           <h2>${post.title}</h2>
           <h3>By:  ${post.author.name}</h3>
            <p class="small-paragraph">Last Updated: ${refactorDate(post.updated)}</p>
        `;
        div.addEventListener("click", () => {
            redirectToPost(post.id);
        });
        posts.appendChild(div);
    });
}

export async function updatePost(data) {
    const post = data.data;
    const postContainer = document.getElementById("post-wrapper");
    const div = document.createElement("div");
    div.setAttribute("class", "post");
    div.setAttribute("post-id", post.id);
    div.innerHTML = `
        <div class="post-banner">
            <img src="${post.media.url}" alt="${post.media.alt}">
            <div class="text-content">
                <h1>${post.title}</h1>
                <h2>By:  ${post.author.name}</h2>
                <p class="small-paragraph">Last Updated: ${refactorDate(post.updated)}</p>
            </div>
        </div>
        <div class="paragraph-container">
            <p>${post.body}</p>
        </div>
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