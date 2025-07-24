document.addEventListener('DOMContentLoaded', () => {
    // button shop now
    const primaryButton = document.querySelector('.btn-primary');
    // membuat hover di js
    primaryButton.addEventListener('mouseover', () => {
        primaryButton.style.backgroundColor = '#FFD700';
    });
    // membuat hover di js
    primaryButton.addEventListener('mouseout', () => {
        primaryButton.style.backgroundColor = '#FFA500';
    });

});
// array object untuk menampilkan slide image
const images = [
    {
        id: 1,
        img: 'https://cdn.shopify.com/s/files/1/0712/0397/9503/files/a840c48e-feac-4510-92fb-4dbfbcc5842a.png?v=1726903075&width=1000&height=1000&crop=center'
    },
    {
        id: 2,
        img: 'https://cdn.shopify.com/s/files/1/0712/0397/9503/files/whatsapp_image_2024-10-07_at_16.32.31.jpg?v=1728378438&width=1000&height=1000&crop=center',

    },
    {
        id: 3,
        img: 'https://cdn.shopify.com/s/files/1/0712/0397/9503/files/Tribune-RedGum1.jpg?v=1729075946&width=1000&height=1000&crop=center',

    },
    {
        id: 4,
        img: 'https://cdn.shopify.com/s/files/1/0712/0397/9503/files/product_tribune_darbotz_online__1.png?v=1730656067&width=1000&height=1000&crop=center',

    }
];
// index untuk mengganti gambgar
let currentIndex = 0;
const imagesSlide = document.querySelector('.image-slide');
//  funtion untuk mengganti image sesuai index,gambar akan berganti 4 detik sekali
function changeImages() {
    imagesSlide.setAttribute('src', images[currentIndex].img);
    currentIndex = (currentIndex + 1) % images.length;
}
setInterval(changeImages, 4000);
changeImages();
// funtion scroll untuk mengganti warna bacground header ketika di scroll
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

document.addEventListener('DOMContentLoaded', () => {
    // Get the popup elements
    const popup = document.getElementById('popup');
    const popupClose = document.querySelector('.popup-close');
    const popupImage = document.getElementById('popup-image');

    // menambahkan event clik pada figure dan menampilkan popup image
    document.querySelectorAll('.figure img').forEach(image => {
        image.addEventListener('click', () => {
            popupImage.setAttribute('src',  image.src); 
            popup.style.display = 'block'; // Show the popup
        });
    });

    // menambhakan event clik pada icon clode untuk menutup popup
    popupClose.addEventListener('click', () => {
        popup.style.display = 'none'; // Hide the popup
    });
    
    // menambhakan event clik pada icon clode untuk menutup popup
    window.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.style.display = 'none'; // Hide the popup
        }
    });
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