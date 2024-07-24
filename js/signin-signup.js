import { apiFetch } from "./utils.js";

const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");
// fitur login untuk user,data akan di cek di api
const buttonLogin = document.querySelector("#button-sign-in");
buttonLogin.addEventListener("click", async (event) => {
    event.preventDefault();

    try {
        const users = await apiFetch(
            "https://sepokat-store.vercel.app/api/user/get-all"
        );

        const username = document.querySelector("#username").value
        const password = document.querySelector("#password").value
        // pengecekan username dan password
        const user = users.find(
            (user) => user.username === username && user.pasword === password
        );
        // jika username dan password benar makan akan berpindah ke halaman index atau home
        if (user) {
            localStorage.setItem("userLogin", JSON.stringify(user))
            alert("Login successful");
            window.location.href = "../html/index.html"
        } else { 
            // jika usename dan pasword salah maka akan menampilkan alert 
            alert("Gagal login");
        }
    } catch (error) {
        console.error("Error fetching users:", error);
        document.getElementById("error-message").textContent =
            "An error occurred. Please try again later.";
    }
});
//  sigin atau daftar
const buttonSignUp = document.querySelector("#button-sign-up");
buttonSignUp.addEventListener("click", (event) => {
    event.preventDefault();

    const dataName = document.querySelector("#input-name").value;
    const dataUsername = document.querySelector("#input-user").value;
    const dataPass = document.querySelector("#input-pass").value;
    // data akan di simpan di api
    let baru = {
        username: dataUsername,
        password: dataPass,
        name: dataName,
        status: "aktip",
    };
    console.log(baru);
    dataUser.push(baru);
    console.log(dataUser);

    // dataUser[dataUser.length+1].name=dataName
    // dataUser[dataUser.length+1].username=dataUsername
    // dataUser[dataUser.length+1].password=dataPass
    // dataUser[dataUser.length+1].status="aktif"
});

signUpButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
});