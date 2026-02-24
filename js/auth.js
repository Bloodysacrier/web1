const isAuth = localStorage.getItem("auth");

if (isAuth !== "true") {
    window.location.href = "index1.html";
}