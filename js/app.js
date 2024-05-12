import {getName} from "./config.js";

async function fetchPost(id) {
    try {
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${getName}/${id}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
        })

        if (response.ok) {
            const data = await response.json();
            return data.data;
        } else {
            console.log(`Error: ${response.status}`);
            //document.getElementById("error-msg").innerText = `Error: ${response.status}`;
        }
    } catch (error) {
        console.log(`Error: ${error.message}`);
        //document.getElementById("error-msg").innerText = `Error: ${error.message}`;
    }
}

async function fetchData() {
    try {
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${getName}?sortOrder=desc&limit=12&page=1`, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
        })

        if (response.ok) {
            const data = await response.json();
            updateCarousel(data.data);
            updatePosts(data.data);
        } else {
            console.log(`Error: ${response.status}`);
            //document.getElementById("error-msg").innerText = `Error: ${response.status}`;
        }
    } catch (error) {
        console.log(`Error: ${error.message}`);
        //document.getElementById("error-msg").innerText = `Error: ${error.message}`;
    }
}

function updateCarousel(data) {
    const carousel = document.getElementById("carousel");
    const firstThreePosts = data.slice(0, 3);
    firstThreePosts.forEach(post => {
        const div = document.createElement('div');
        div.innerHTML = `<h3>${post.title}</h3>`;
        div.setAttribute('data-post-id', post.id); // Set the post ID as a data attribute
        carousel.appendChild(div);
    });
}

function updatePosts(data) {
    const posts = document.getElementById("posts");
    posts.innerHTML = data.map(post =>
        `<div>
            <h3>${post.title}</h3>
        </div>`).join('');
}


window.onload = fetchData;