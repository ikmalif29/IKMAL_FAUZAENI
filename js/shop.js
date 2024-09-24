const apiUrl = 'https://sepokat-store.vercel.app/api/product/get-all';
let products = [];
let currentPage = 1;
const itemsPerPage = 15;
const footer = document.querySelector('.footer')
// funtion untuk menampikan div loading
const showLoading = () => {
    const loading = document.getElementById('loading');
    loading.style.display = 'flex';
    loading.style.flexDirection = "column";
    footer.style.display = 'none'
};
//  funtion untuk meng hide atau menghilangkan div loading jika data product sudah muncul
const hideLoading = () => {
    const loading = document.getElementById('loading');
    loading.style.display = 'none';
};
//  memanggil funtion showloading
showLoading();
//  pengambilan data menggunakan fetch
fetch(apiUrl) // Mengambil data dari URL API yang diberikan
    .then((response) => response.json()) // Mengonversi respons dari API ke format JSON
    .then((res) => {
        // Jika data produk sudah muncul maka loading akan hilang
        hideLoading(); // Fungsi untuk menyembunyikan elemen loading
        footer.style.display = 'block'; // Menampilkan elemen footer
        products = res; // Menyimpan data produk yang diterima dari API ke variabel 'products'
        displayProducts(products, currentPage); // Menampilkan produk pada halaman saat ini
        setupPagination(products); // Mengatur pagination berdasarkan jumlah produk
    });
// funtion untuk mengupdate angka di keranjang,mengambil data keranjang sesuai id user
const updateCartCount = () => {
    const cartProducts = JSON.parse(localStorage.getItem('cart-products')) || [];
    const idUser = JSON.parse(localStorage.getItem('userLogin'))?.id;
    const cartByIdUser = cartProducts.filter(cart => cart.id_user == idUser);
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cartByIdUser.length;
};
// funtion untuk ketika icon keranjang di clik maka akan berpindah halaman ke keranjang,namun dilakukan pengeckan login terlebih dahulu
const btnCart = document.querySelector(".cart");
btnCart.addEventListener("click", () => {
    if (JSON.parse(localStorage.getItem('userLogin'))?.id) {
        window.location.href = "./cart-product.html";
    } else {
        window.location.href = "./not-login.html";
    }
});
//  funtion mrnampilkan product
const displayProducts = (productsToDisplay, page) => {
    const productsContainer = document.getElementById('products-container');
    productsContainer.textContent = '';
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedProducts = productsToDisplay.slice(start, end);

    //  perulangan untuk  menampilkan product
    paginatedProducts.forEach((r) => {
        let container = document.createElement('div');
        container.classList.add('product-item');

        let h1 = document.createElement('p');
        h1.classList.add("name-product");
        h1.textContent = r.name;

        let h2 = document.createElement('h3');
        h2.classList.add("price-product");
        h2.textContent = `IDR ${parseInt(r.price).toLocaleString('id-ID')}`;
        h2.style.fontFamily = 'Helvetica, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji';

        let icon = document.createElement('i');
        icon.classList.add('bx', 'bxs-cart-alt');

        let divImage = document.createElement('div');
        divImage.classList.add("div-image");
        // loading div kecil image 
        let loadingGif = document.createElement('img');
        loadingGif.classList.add("loading-gif");
        loadingGif.setAttribute("src", "https://loading.io/assets/mod/spinner/double-ring/lg.gif");

        let image = document.createElement('img');
        image.classList.add("image-product");
        image.setAttribute('src', r.image_1);

        let divCart = document.createElement('div');
        divCart.classList.add("div-cart");
        // mengatur waktu loading kecil
        setTimeout(() => {
            loadingGif.style.display = 'none';
            image.style.display = 'block';
        }, 1000);
        //  event hover
        divImage.addEventListener('mouseover', (event) => {
            image.setAttribute('src', r.image_2);
        });

        divImage.addEventListener('mouseout', (event) => {
            image.setAttribute('src', r.image_1);
        });
        //  event clik,setip div image yang di clik maka data nya di simpan di localstorage
        // dan berpindah ke halaman detail product
        divImage.addEventListener('click', (event) => {
            event.preventDefault();
            localStorage.setItem('id-product', r.id);
            localStorage.setItem('image-product', r.image_1);
            localStorage.setItem('image-product2', r.image_2);
            localStorage.setItem('name-product', r.name);
            localStorage.setItem('price-product', r.price);
            localStorage.setItem('stock-product', r.stock);
            localStorage.setItem('category-product', r.category);
            window.location = 'detail-product.html';
        });
        // even clik untuk icon keranjang
        icon.addEventListener('click', (event) => {
            event.preventDefault();
            if (!localStorage.getItem("userLogin")) {
                window.location.href = "not-login.html"
            } else {
                let cartProducts = JSON.parse(localStorage.getItem('cart-products')) || []; // mengambil data dari local storage
                const existingProductIndex = cartProducts.findIndex(product => product.id === r.id);
                const user = JSON.parse(localStorage.getItem('userLogin'));

                if (existingProductIndex !== -1) {
                    cartProducts[existingProductIndex].quantity++;
                    //  jika barang yang di tambahkan sudah berada di keranjang maka hanya quantity nya saja yang bertambah
                } else {
                    // jika barang belum ada maka akan di masuka ke dalam local storage
                    cartProducts.push({
                        id: r.id,
                        id_user: user.id,
                        name: r.name,
                        price: r.price,
                        image_1: r.image_1,
                        image_2: r.image_2,
                        category: r.category,
                        quantity: 1
                    });
                }

                localStorage.setItem('cart-products', JSON.stringify(cartProducts));
                updateCartCount();
                alert(`${r.name} telah ditambahkan ke keranjang!`);
            }
        });

        divImage.appendChild(image);
        divImage.appendChild(loadingGif);
        container.appendChild(divImage);
        container.appendChild(h1);
        divCart.appendChild(icon);
        divCart.appendChild(h2);
        container.appendChild(divCart);
        productsContainer.appendChild(container);
    });
    updateCartCount();
};
//  funtion untuk pagnation
const setupPagination = (products) => {
    const pagination = document.getElementById('pagination');
    pagination.textContent = '';
    const pageCount = Math.ceil(products.length / itemsPerPage);//membandingkan jumlah data dibagi item per page

    for (let i = 1; i <= pageCount; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        if (i === currentPage) button.classList.add('active');
        button.addEventListener('click', () => {
            currentPage = i;
            displayProducts(products, currentPage);
            setupPagination(products);
        });
        pagination.appendChild(button);
    }
};
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
//  funtion search product
document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm)
    );
    displayProducts(filteredProducts, 1);
    setupPagination(filteredProducts);
});
//  icon close pada fitur seacrh
let x = document.querySelector(".x");
let section = document.querySelector("section");
section.style.display = 'none';
const fiturSearch = document.querySelector(".search");
fiturSearch.addEventListener("click", (event) => {
    let clikSearch = document.querySelector("#searchInput");
    clikSearch.style.display = "block";
    x.style.display = 'block';
    section.style.display = 'flex';

    x.addEventListener("click", (event) => {
        x.style.display = 'none';
        clikSearch.style.display = "none";
        section.style.display = 'none';
        displayProducts(products, 1);
        setupPagination(products);
    });
});
// funtion untuk mengupdate angka di keranjang,mengambil data keranjang sesuai id user
document.querySelector(".user").addEventListener("click", () => {
    if (JSON.parse(localStorage.getItem('userLogin'))) {
        window.location.href = "../html/profile.html";
    } else {
        window.location.href = "../html/not-login.html";
    }
});
// mengupdate otomatis angka di keranjang
window.onload = updateCartCount;
