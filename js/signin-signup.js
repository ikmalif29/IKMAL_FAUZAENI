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

    console.log(users);

    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    if (username == "" || password == "") {
      return alert("Username atau password harus diisi !!!");
    }
    // pengecekan username dan password
    const user = users.find(
      (user) => user.username === username && user.pasword === password
    );
    // jika username dan password benar makan akan berpindah ke halaman index atau home
    if (user) {
      localStorage.setItem("userLogin", JSON.stringify(user));
      alert("Login successful");
      window.location.href = "../html/index.html";
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
document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const dataName = document.querySelector("#input-name").value;
    const dataUsername = document.querySelector("#input-user").value;
    const dataPass = document.querySelector("#input-pass").value;
    // data akan di simpan di api
    console.log(dataName);
    let baru = {
      username: dataUsername,
      password: dataPass,
      full_name: dataName,
    };
    console.log(baru);
    try {
      const data = await apiFetch(
        "https://sepokat-store.vercel.app/api/user/register",
        "POST",
        baru
      );
      console.log("Data fetched successfully:", data);
      alert(`Sign Up Sucsesfuly`);
      window.location.reload();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});