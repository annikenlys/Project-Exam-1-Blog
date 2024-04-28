const registerForm = document.querySelector('#register-form');
registerForm.addEventListener("submit", handleNewUser)

async function handleNewUser(e) {
    e.preventDefault();

    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
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
            location.href="/login";
        } else {
            document.getElementById('error-msg').innerText = `Error: ${response.status}`;
        }
    } catch (error) {
        document.getElementById('error-msg').innerText = `Error: ${error.message}`;
    }
}