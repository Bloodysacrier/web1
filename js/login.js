document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Credenciales hardcodeadas
    const validUser = "bloodysacrier";
    const validPass = "Draven55";

    if (username === validUser && password === validPass) {
        alert("Login exitoso");
        window.location.href = "../preview.html";
    } else {
        alert("Usuario o contraseña incorrectos");
    }
});
