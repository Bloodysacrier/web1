document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    try {
        // Leer users.json
        const response = await fetch("users.json");
        const data = await response.json();

        // Usuarios del JSON
        let users = data.users;

        // Usuarios guardados en localStorage
        const localUsers = JSON.parse(localStorage.getItem("users")) || [];

        // Unimos ambos
        users = [...users, ...localUsers];

        // Validar usuario
        const userFound = users.find(user => 
            user.username === username && user.password === password
        );

        if (userFound) {
            message.textContent = "Cargando...";
            message.style.color = "green";

            localStorage.setItem("auth", "true");
            window.location.href = "preview.html";

        } else {
            message.textContent = "Usuario o contraseña incorrectos";
            message.style.color = "red";
        }

    } catch (error) {
        message.textContent = "Error cargando usuarios";
        message.style.color = "red";
    }
});