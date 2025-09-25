import {getName, getAccessToken} from "./utils.js";

export async function registerNewUser(e) {
    e.preventDefault();

    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    const errorMsg = document.getElementById("error-msg");
    errorMsg.innerText = "";

    const noroffPattern = /^[^@]+@stud.noroff.no$/;

    if(name === "" || email === "" || password === "") {
        errorMsg.innterText = "Some required fields are missing";
        return;
    } else if (!noroffPattern.test(email)) {
        errorMsg.innterText = "Email must be a @stud.noroff.no adress";
        return;
    }
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
}

export async function login(e) {
    e.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    const errorMsg = document.getElementById("error-msg");
    errorMsg.innerText = "";
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
            sessionStorage.setItem("user", JSON.stringify(data.data));
            location.href = "../index.html";
        } else {
            errorMsg.innerText = `Error: ${response.status}`;
        }
    } catch (error) {
        errorMsg.innerText = `Error: ${error.message}`;
    }
}

export async function fetchCarouselData() {
    const errorMsg = document.getElementById("error-msg");
    errorMsg.innerText = "";
    try {
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${getName()}?sortOrder=desc&limit=3&page=1`, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
        })

        if (response.ok) {
            return response.json();
        } else {
            errorMsg.innerText = `Error: ${response.status}`;
        }
    } catch (error) {
        errorMsg.innerText = `Error: ${error.message}`;
    }
}

export async function fetchAllPosts(page) {
    const errorMsg = document.getElementById("error-msg");
    errorMsg.innerText = "";
    try {
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${getName()}?sortOrder=desc&limit=12&page=${page}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
        })

        if (response.ok) {
            return response.json();
        } else {
            errorMsg.innerText = `Error: ${response.status}`;
        }
    } catch (error) {
        errorMsg.innerText = `Error: ${error.message}`;
    }
}

export async function fetchPost(id) {
    const errorMsg = document.getElementById("error-msg");
    errorMsg.innerText = "";
    try {
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${getName()}/${id}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
        })

        if (response.ok) {
            return response.json();
        } else {
            errorMsg.innerText = `Error: ${response.status}`;
        }
    } catch (error) {
        errorMsg.innerText = `Error: ${error.message}`;
    }
}

export async function makePost(e) {
    e.preventDefault();

    const title = document.querySelector("#title").value;
    const body = document.querySelector("#body").value;
    const tagsString = document.querySelector("#tags").value;
    const tagsArray = tagsString.split("","").map(tag => tag.trim());
    const url = document.querySelector("#url").value;
    const alt = document.querySelector("#alt").value;
    const errorMsg = document.getElementById("error-msg");
    const infoMsg = document.getElementById("info-msg");

    errorMsg.innerText = "";
    infoMsg.innerText = "";

    if (title === "" || body === "" || url === "" || alt === "") {
        errorMsg.innerText = "Some required fields are missing";
        infoMsg.innerText = "*Required fields: Title, Text, URL and Media Description";
        return;
    }

    if (!url.includes("https://")) {
        errorMsg.innerText = "Please enter a valid URL";
        return;
    }

    try {
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${getName()}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${getAccessToken()}`,
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
    const tagsArray = tagsString.split("","").map(tag => tag.trim());
    const url = document.querySelector("#url").value;
    const alt = document.querySelector("#alt").value;
    const errorMsg = document.getElementById("error-msg");
    const infoMsg = document.getElementById("info-msg");

    errorMsg.innerText = "";
    infoMsg.innerText = "";

    if (title === "" || body === "" || url === "" || alt === "") {
        errorMsg.innerText = "Some required fields are missing";
        infoMsg.innerText = "*Required fields: Title, Text, URL and Media Description";
        return;
    }

    if (!url.includes("https://")) {
        errorMsg.innerText = "Please enter a valid URL";
        return;
    }

    try {
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${getName()}/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${getAccessToken()}`
            },
            body: JSON.stringify({ title, body, tags: tagsArray, media: { url, alt } })
        })

        if (response.ok) {
            location.href = "../post/index.html?id=" + id;
        } else {
            document.getElementById("error-msg").innerText = `Error: ${response.status}`;
        }
    } catch (error) {
        document.getElementById("error-msg").innerText = `Error: ${error.message}`;
    }
}

export async function deletePost(id) {
    const errorMsg = document.getElementById("error-msg");
    errorMsg.innerText = "";
    try {
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${getName()}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${getAccessToken()}`
            }
        })

        if (response.ok) {
            location.href = "../index.html";
        } else {
            errorMsg.innerText = `Error: ${response.status}`;
        }
    } catch (error) {
        errorMsg.innerText = `Error: ${error.message}`;
    }
}