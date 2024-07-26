// document.addEventListener('DOMContentLoaded', () => {
//     const aboutSection = document.querySelector('.about-section');
//     const aboutSectionPosition = aboutSection.getBoundingClientRect().top;

//     window.addEventListener('scroll', () => {
//         if (aboutSectionPosition < 50) {
//             aboutSection.classList.add('about-appear');
//         }
//     });
// });
// funtion sroll untuk header
window.addEventListener('scroll', function () {
    let header = document.querySelector('.main-header');
    let search = document.querySelector('.search');
    let user = document.querySelector('.user');
    let cart = document.querySelector('.cart');
    let nav = document.querySelector('.nav');
    let a1 = document.querySelector('.a1');
    let a2 = document.querySelector('.a2');
    let a3 = document.querySelector('.a3');
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(0, 0, 0)';
        search.style.color = '#fff';
        user.style.color = '#fff';
        cart.style.color = '#fff';
        nav.style.color = '#fff';
        a1.style.color = '#fff';
        a2.style.color = '#fff';
        a3.style.color = '#fff';
    } else {
        search.style.color = '#000';
        user.style.color = '#000';
        cart.style.color = '#000';
        nav.style.color = '#000';
        a1.style.color = '#000';
        a2.style.color = '#000';
        a3.style.color = '#000';
        header.style.backgroundColor = 'transparent';
    }
});
// funtion untuk ketika icon user di clik maka akan berpindah halaman ke profile user,namun dilakukan pengeckan login terlebih dahulu
document.querySelector(".user").addEventListener("click", () => {
    if (JSON.parse(localStorage.getItem('userLogin'))) {
        window.location.href = "../html/profile.html";
    } else {
        window.location.href = "../html/not-login.html";
    }
});
// funtion untuk ketika icon keranjang di clik maka akan berpindah halaman ke keranjang,namun dilakukan pengeckan login terlebih dahulu
const btnCart = document.querySelector(".cart");
btnCart.addEventListener("click", () => {
    if (JSON.parse(localStorage.getItem('userLogin'))?.id) {
        window.location.href = "./cart-product.html";
    } else {
        window.location.href = "./not-login.html";
    }
});
// funtion untuk mengupdate angka di keranjang,mengambil data keranjang sesuai id user
const updateCartCount = () => {
    const cartProducts = JSON.parse(localStorage.getItem('cart-products')) || [];
    const idUser = JSON.parse(localStorage.getItem('userLogin'))?.id;
    const cartByIdUser = cartProducts.filter(cart => cart.id_user == idUser);
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cartByIdUser.length;
};
// mengupdate otomatis angka di keranjang
window.onload = updateCartCount;