document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    const validUser = "bloodysacrier";
    const validPass = "Draven55";

    if (username === validUser && password === validPass) {
        message.textContent = "Cargando";
        message.style.color = "green";

        window.location.href = "../preview.html";

    } else {
        message.textContent = "Usuario o contraseña incorrectos";
        message.style.color = "red";
    }
});
