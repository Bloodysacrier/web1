document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const username = email; // Usaremos el correo como username

    const newUser = {
        username: username,
        password: password
    };

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find(user => user.username === username);

    if (exists) {
        alert("El usuario ya existe");
        return;
    }

 
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Cuenta creada correctamente");

    window.location.href = "index1.html"; // regresar al login
});