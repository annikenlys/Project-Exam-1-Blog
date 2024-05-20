import {getName} from "./utils.js";

export async function login(e) {
    e.preventDefault();

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    try {
        const response = await fetch("https://v2.api.noroff.dev/auth/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })

        if (response.ok) {
            const data = await response.json();
            sessionStorage.setItem("accessToken", data.data.accessToken);
            location.href = "../index.html";
        } else {
            console.log(`Error: ${response.status}`);
            //document.getElementById("error-msg").innerText = `Error: ${response.status}`;
        }
    } catch (error) {
        console.log(`Error: ${error.message}`);
        //document.getElementById("error-msg").innerText = `Error: ${error.message}`;
    }
}

export async function fetchCarouselData() {
    try {
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${getName}?sortOrder=desc&limit=3&page=1`, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
        })

        if (response.ok) {
            return response.json();
        } else {
            console.log(`Error: ${response.status}`);
            //document.getElementById("error-msg").innerText = `Error: ${response.status}`;
        }
    } catch (error) {
        console.log(`Error: ${error.message}`);
        //document.getElementById("error-msg").innerText = `Error: ${error.message}`;
    }
}

export async function fetchAllPosts() {
    try {
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${getName}?sortOrder=desc&limit=12&page=1`, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
        })

        if (response.ok) {
            return response.json();
        } else {
            console.log(`Error: ${response.status}`);
            //document.getElementById("error-msg").innerText = `Error: ${response.status}`;
        }
    } catch (error) {
        console.log(`Error: ${error.message}`);
        //document.getElementById("error-msg").innerText = `Error: ${error.message}`;
    }
}

export async function fetchPost(id) {
    try {
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${getName}/${id}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
        })

        if (response.ok) {
            return response.json();
        } else {
            console.log(`Error: ${response.status}`);
            //document.getElementById("error-msg").innerText = `Error: ${response.status}`;
        }
    } catch (error) {
        console.log(`Error: ${error.message}`);
        //document.getElementById("error-msg").innerText = `Error: ${error.message}`;
    }
}

export async function makePost(e) {
    e.preventDefault();

    const title = document.querySelector("#title").value;
    const body = document.querySelector("#body").value;
    const tagsString = document.querySelector("#tags").value;
    const tagsArray = tagsString.split(',').map(tag => tag.trim());
    const url = document.querySelector("#url").value;
    const alt = document.querySelector("#alt").value;

    try {
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${getName}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify({ title, body, tags: tagsArray, media: { url, alt } })
        });

        if (response.ok) {
            const id = await response.json().then(data => data.data.id);
            location.href = "../post/index.html?id=" + id;

        } else {
            document.getElementById("error-msg").innerText = `Error: ${response.status}`;
        }
    } catch (error) {
        document.getElementById("error-msg").innerText = `Error: ${error.message}`;
    }
}

export async function editPost(e, id) {
    e.preventDefault();

    const title = document.querySelector("#title").value;
    const body = document.querySelector("#body").value;
    const tagsString = document.querySelector("#tags").value;
    const tagsArray = tagsString.split(',').map(tag => tag.trim());
    const url = document.querySelector("#url").value;
    const alt = document.querySelector("#alt").value;

    try {
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${getName}/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`
            },
            body: JSON.stringify({ title, body, tags: tagsArray, media: { url, alt } })
        })

        if (response.ok) {
            location.href = "../post/index.html?id=" + id;
        } else {
            console.log(`Error: ${response.status}`);
            //document.getElementById("error-msg").innerText = `Error: ${response.status}`;
        }
    } catch (error) {
        console.log(`Error: ${error.message}`);
        //document.getElementById("error-msg").innerText = `Error: ${error.message}`;
    }
}

export async function deletePost(id) {
    try {
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${getName}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        })

        if (response.ok) {
            location.href = "../index.html";
        } else {
            console.log(`Error: ${response.status}`);
            //document.getElementById("error-msg").innerText = `Error: ${response.status}`;
        }
    } catch (error) {
        console.log(`Error: ${error.message}`);
        //document.getElementById("error-msg").innerText = `Error: ${error.message}`;
    }
}

/*async function registerNewUser(e) {
    e.preventDefault();

    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    try {
        const response = await fetch("https://v2.api.noroff.dev/auth/register", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        })

        if (response.ok) {
            location.href="../account/login.html";
        } else {
            document.getElementById("error-msg").innerText = `Error: ${response.status}`;
        }
    } catch (error) {
        document.getElementById("error-msg").innerText = `Error: ${error.message}`;
    }
}*/