// import { apiFetch } from "./utils.js";

const container = document.getElementById("container");
// fitur login untuk user,data akan di cek di api
const buttonLogin = document.querySelector("#button-sign-in");
buttonLogin.addEventListener("click", async (event) => {
    event.preventDefault();

    const username = document.querySelector("#username").value
    const password = document.querySelector("#password").value
    // pengecekan username dan password

    // jika username dan password benar makan akan berpindah ke halaman index atau home
    if (localStorage.getItem("data-admin")) {
        const dataAdmin = JSON.parse(localStorage.getItem("data-admin"))
        if (dataAdmin.username == username && dataAdmin.password == password) {
            alert("Login successful");
            window.location.href = "../html/admin.html"
        } else {
            console.log(username)
            console.log(password)
            // jika usename dan pasword salah maka akan menampilkan alert 
            alert("Gagal login");
        }
    } else {
        if (username == 'ikmalfauzaeni' && password == '123') {
            alert("Login successful");
            const dataAdmin = {
                fullname: "",
                username: "ikmalfauzaeni",
                password: "123",
                email: ""
            }

            console.log("masuk")
            localStorage.setItem("data-admin", JSON.stringify(dataAdmin))
            window.location.href = "../html/admin.html"
        } else {
            console.log(username)
            console.log(password)
            // jika usename dan pasword salah maka akan menampilkan alert 
            alert("Gagal login");
        }
    }
});
