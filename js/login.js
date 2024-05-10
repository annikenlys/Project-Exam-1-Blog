const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", handleLogin)

async function handleLogin(e) {
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
            location.href="../post/index.html";
        } else {
            document.getElementById("error-msg").innerText = `Error: ${response.status}`;
        }
    } catch (error) {
        document.getElementById("error-msg").innerText = `Error: ${error.message}`;
    }
}