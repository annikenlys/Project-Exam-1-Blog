const newPostForm = document.querySelector("#new-post-form");
newPostForm.addEventListener("submit", handleNewPost)

async function handleNewPost(e) {
    e.preventDefault();

    const getValue = (id) => document.querySelector(`#${id}`).value;

    const title = getValue("title");
    const body = getValue("body");
    const tagsArray = getValue("tags").split(",");
    const url = getValue("url");
    const alt = getValue("alt");

    const name = sessionStorage.getItem("name");
    const accessToken = sessionStorage.getItem("accessToken");

    try {
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${name}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ title, body, tags: tagsArray, media: { url, alt } })
        });

        if (response.ok) {
            console.log("hei")
        } else {
            document.getElementById("error-msg").innerText = `Error: ${response.status}`;
        }
    } catch (error) {
        document.getElementById("error-msg").innerText = `Error: ${error.message}`;
    }
}
