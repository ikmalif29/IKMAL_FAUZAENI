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

const btnCart = document.querySelector(".cart");
btnCart.addEventListener("click", () => {
    if (JSON.parse(localStorage.getItem('userLogin'))?.id) {
        window.location.href = "./cart-product.html";
    } else {
        window.location.href = "./not-login.html";
    }
});


document.getElementById('logout-btn').addEventListener('click', () => {
    // Menghapus data pengguna dari localStorage
    localStorage.removeItem('userLogin');

    // Memberi tahu pengguna bahwa mereka telah logout
    alert('You have been logged out');

    // Mengarahkan pengguna ke halaman login atau homepage
    window.location.href = './index.html'; // Ganti dengan URL halaman login jika ada
});

// Mengatur informasi profil dari localStorage saat halaman dimuat
let data = JSON.parse(localStorage.getItem('userLogin'));
if (data) {
    const userName = document.querySelector('#username');
    const userPassword = document.querySelector('#password');
    const userEmail = document.querySelector('#email')
    const userFullName = document.querySelector('#full-name')

    userName.value = data.username || ''; // Pastikan data.username ada
    // userPassword.value = data.pasword || ''; // Pastikan data.password ada
    userEmail.value = data.email || '';
    userFullName.value = data.full_name || '';
}

// Mengatur form submit
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Profile information updated');
    // Implementasikan fungsi update profil di sini
});

// JavaScript untuk mengisi riwayat pembelian
document.addEventListener('DOMContentLoaded', () => {
    // history pembelian sesuai id user
    const purchaseHistoryElement = document.getElementById('purchase-history');
    const purchases = JSON.parse(localStorage.getItem('orders')) || [];

    const idUser = JSON.parse(localStorage.getItem('userLogin')).id;
    const purchaseByidUser = purchases.filter(purchase => purchase.id_user == idUser);
    // jika user tidak pernah membeli makan akan menampilkan pesan kosong
    if (purchaseByidUser.length === 0) {
        const noDataMessage = document.createElement('p');
        noDataMessage.textContent = 'No purchase history available.';
        purchaseHistoryElement.appendChild(noDataMessage);
        return;
    }

    purchaseByidUser.forEach(purchase => {
        // Membuat elemen div untuk item pembelian
        const purchaseItemDiv = document.createElement('div');
        purchaseItemDiv.className = 'purchase-item';

        // Membuat elemen gambar
        const image = document.createElement('img');
        image.src = purchase.products.image;

        // Membuat elemen untuk detail
        const detailsDiv = document.createElement('div');

        const productName = document.createElement('h3');
        productName.textContent = purchase.products.name;
        productName.classList.add('name')
        
        const price = document.createElement('p');
        price.classList.add('price')
        price.textContent = `Price: $${purchase.products.price}`;
        
        // const quantity = document.createElement('p');
        // quantity.classList.add('quantity')
        // quantity.textContent = `Quantity: ${purchase.subtotal}`;

        const status = document.createElement('div')
        const statusProduct = document.createElement('h2')
        statusProduct.classList.add("status")
        statusProduct.textContent = purchase.status;

        if (purchase.status === "Canceled") {
            statusProduct.style.color = "red"
        }
        else if (purchase.status === "Shipped") {
            statusProduct.style.color = "grey"
        }
        else if (purchase.status === "Processed") {
            statusProduct.style.color = "orange"
        }
        else if (purchase.status === "Finished") {
            statusProduct.style.color = "lime"
        }

        status.appendChild(statusProduct);

        // Menggabungkan detail ke dalam elemen detailsDiv
        detailsDiv.className = 'details';
        detailsDiv.appendChild(productName);
        detailsDiv.appendChild(price);
        // detailsDiv.appendChild(quantity);

        // Menggabungkan elemen gambar dan detail ke dalam item pembelian
        purchaseItemDiv.appendChild(image);
        purchaseItemDiv.appendChild(detailsDiv);
        purchaseItemDiv.appendChild(status)

        // Menambahkan item pembelian ke dalam elemen utama
        purchaseHistoryElement.appendChild(purchaseItemDiv);
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


document.querySelector('.btn-update-information').addEventListener('click', () => {
    const userLogin = JSON.parse(localStorage.getItem("userLogin"))
    const inpUsername = document.querySelector(".inp-username")
    userLogin.username = inpUsername.value;
    const inpEmail = document.querySelector(".inp-email")
    userLogin.email = inpEmail.value;
    const inpFullName = document.querySelector(".inp-full-name")
    userLogin.full_name = inpFullName.value;

    localStorage.setItem("userLogin", JSON.stringify(userLogin))
})