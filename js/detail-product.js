// Fungsi untuk memperbarui jumlah item di keranjang
const updateCartCount = () => {
    const cartProducts = JSON.parse(localStorage.getItem('cart-products')) || [];
    const idUser = JSON.parse(localStorage.getItem('userLogin')).id
    const cartByIdUser = cartProducts.filter(cart => cart.id_user == idUser)
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cartByIdUser.length;
};

document.addEventListener('DOMContentLoaded', () => {
    const image = document.querySelector(".img-product");

    const slideImg = document.createElement("div");
    slideImg.classList.add("slide-img");

    const btnBack = document.createElement("i");
    btnBack.classList.add("bx");
    btnBack.classList.add("bxs-left-arrow-circle");
    image.appendChild(btnBack);

    const btnSlide1 = document.createElement("i");
    btnSlide1.classList.add("bx");
    btnSlide1.classList.add("bxs-chevrons-left");
    btnSlide1.style.display = "none";
    image.appendChild(btnSlide1);

    const btnSlide2 = document.createElement("i");
    btnSlide2.classList.add("bx");
    btnSlide2.classList.add("bxs-chevrons-right");
    btnSlide2.style.display = "none";
    image.appendChild(btnSlide2);

    const slideImg1 = document.createElement("img");
    slideImg1.setAttribute("src", localStorage.getItem("image-product"));
    slideImg1.classList.add("slide-img1")
    const slideImg2 = document.createElement("img");
    slideImg2.setAttribute("src", localStorage.getItem("image-product2"));
    slideImg2.classList.add("slide-img2");

    slideImg.appendChild(slideImg1);
    slideImg.appendChild(slideImg2);
    image.appendChild(slideImg);

    const imageProduct = document.querySelector(".image");
    imageProduct.setAttribute("src", localStorage.getItem("image-product"));

    const descProduct = document.querySelector(".description-product");
    const nameDesc = document.querySelector('.name-desc').textContent = `${localStorage.getItem('name-product')}`

    const nameProduct = document.querySelector(".name");
    nameProduct.textContent = localStorage.getItem("name-product");

    const priceProduct = document.querySelector(".price");
    priceProduct.textContent = `IDR ${parseInt(localStorage.getItem("price-product")).toLocaleString('id-ID')}`;


    const stockProduct = document.querySelector('.stock')
    stockProduct.textContent = `Stock Product : Evailebel`;

    const addToCartButton = document.querySelector(".add-to-cart");
    addToCartButton.addEventListener('click', (event) => {
        event.preventDefault();
        // mengecek apakah sudah login atau belum
        if (!JSON.parse(localStorage.getItem('userLogin'))) {
            window.location.href = "../html/not-login.html";
        } else {
            let cartProducts = JSON.parse(localStorage.getItem('cart-products')) || [];
            const existingProductIndex = cartProducts.findIndex(product => product.id === localStorage.getItem('id-product'));
            const user = JSON.parse(localStorage.getItem('userLogin'));
            // mengecek apakah product sudah terdapat di localstorage
            // juka udah maka hanya jumlah nya saja yang berubah,cart count tidak berubah
            if (existingProductIndex !== -1) {
                cartProducts[existingProductIndex].quantity++;
            } else {//jika product belum ada maka data product akan masuk local storage
                cartProducts.push({
                    id: localStorage.getItem('id-product'),
                    id_user: user.id,
                    name: localStorage.getItem('name-product'),
                    price: localStorage.getItem('price-product'),
                    image_1: localStorage.getItem('image-product'),
                    category: localStorage.getItem('categary-product'),
                    stock: localStorage.getItem('stock-product'),
                    quantity: 1
                });
            }
            localStorage.setItem('cart-products', JSON.stringify(cartProducts));
            alert(`${localStorage.getItem('name-product')} telah ditambahkan ke keranjang!`);
            updateCartCount();
        }
    });

    let index = 1;

    slideImg1.addEventListener("click", () => {
        imageProduct.setAttribute("src", localStorage.getItem("image-product"));
        index = 1;
    });

    slideImg2.addEventListener("click", () => {
        imageProduct.setAttribute("src", localStorage.getItem("image-product2"));
        index = 2;
    });

    image.addEventListener("mouseover", () => {
        btnSlide1.style.display = "block";
        btnSlide2.style.display = "block";
        if (index === 1) {
            btnSlide1.style.cursor = "no-drop";
            btnSlide2.style.cursor = "pointer";
        } else {
            btnSlide1.style.cursor = "pointer";
            btnSlide2.style.cursor = "no-drop";
        }
    });

    image.addEventListener("mouseout", () => {
        btnSlide1.style.display = "none";
        btnSlide2.style.display = "none";
    });

    btnSlide1.addEventListener("click", () => {
        imageProduct.setAttribute("src", localStorage.getItem("image-product"));
        index = 1;
    });

    btnSlide2.addEventListener("click", () => {
        index = 2;
        imageProduct.setAttribute("src", localStorage.getItem("image-product2"));
    });

    btnBack.addEventListener("click", () => {
        window.location = 'shop.html';
    });

    // Load other products
    loadOtherProducts();
    updateCartCount();

});


document.addEventListener('DOMContentLoaded', () => {

    const checkoutButton = document.querySelector('.checkout');
    checkoutButton.addEventListener('click', () => {
        if (JSON.parse(localStorage.getItem('userLogin'))) {
            displayCheckoutProducts();
            showPopup('checkout-popup');
        } else {
            window.location.href = "../html/not-login.html";
        }
    });

    loadOtherProducts();
});

// Fungsi untuk menampilkan popup
const showPopup = (popupId) => {
    document.getElementById(popupId).style.display = 'flex';
};

// Fungsi untuk menyembunyikan popup
const hidePopup = (popupId) => {
    document.getElementById(popupId).style.display = 'none';
};


// Fungsi untuk menampilkan produk di popup checkout
const displayCheckoutProducts = () => {
    const checkoutProductsContainer = document.getElementById('checkout-products');

    checkoutProductsContainer.textContent = '';

    const productDiv = document.createElement('div');
    productDiv.classList.add('checkout-product');

    const nameProduct = document.createElement('p');
    nameProduct.textContent = `${localStorage.getItem('name-product')}`;

    productDiv.appendChild(nameProduct);
    checkoutProductsContainer.appendChild(productDiv);
};

// Fungsi untuk mengatur timer
const startTimer = (duration, display) => {
    let timer = duration, minutes, seconds;
    const intervalId = setInterval(() => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = `${minutes}:${seconds}`;

        if (--timer < 0) {
            clearInterval(intervalId);
            alert('Order has been canceled due to timeout.');
            // Redirect to cart page
            window.location.href = 'detail-product.html'; //Sesuaikan URL ini berdasarkan halaman keranjang Anda yang sebenarnya
        }
    }, 1000);
};

// Event listener untuk tombol batal pesan
document.getElementById('cancel-order').addEventListener('click', () => {
    hidePopup('checkout-popup');
});

// Event listener untuk tombol pesan sekarang
document.getElementById('place-order').addEventListener('click', () => {
    hidePopup('checkout-popup');
    showPopup('payment-popup');
    startTimer(1 * 60, document.getElementById('payment-timer'));
});

// Event listener untuk input bukti pembayaran
document.getElementById('payment-proof').addEventListener('change', (e) => {
    document.getElementById('complete-order').disabled = !e.target.files.length;
});

// Fungsi untuk menyimpan data pemesanan ke localStorage
const saveOrderToLocalStorage = (orderDetails) => {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    console.log(orderDetails)
    orders.push(orderDetails);
    localStorage.setItem('orders', JSON.stringify(orders));
};

// Fungsi untuk menyimpan gambar bukti pembayaran ke localStorage
const savePaymentProof = (file) => {
    const reader = new FileReader();
    reader.onload = function (e) {
        localStorage.setItem('paymentProof', e.target.result);
    };
    reader.readAsDataURL(file);
};

// Event listener untuk input bukti pembayaran
document.getElementById('payment-proof').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        savePaymentProof(file);
        document.getElementById('complete-order').disabled = false;
    } else {
        document.getElementById('complete-order').disabled = true;
    }
});

// Event listener untuk tombol selesaikan pesanan
document.getElementById('complete-order').addEventListener('click', () => {
    // Gather order details
    const idUser = JSON.parse(localStorage.getItem('userLogin')).id;

    const orderDetails = {
        id_user: idUser,
        products: {
            name: localStorage.getItem('name-product'),
            price: parseInt(localStorage.getItem('price-product')),
            image: localStorage.getItem('image-product2'),
            quantity: 1
        },
        subtotal: parseInt(localStorage.getItem('price-product')),
        total: parseInt(localStorage.getItem('price-product')),
        paymentProof: localStorage.getItem('paymentProof'),
        status: "Processed"
    };

    // Save order details to localStorage
    saveOrderToLocalStorage(orderDetails)

    // Notify user and redirect to profile page
    alert('Order completed successfully!');
    hidePopup('payment-popup');
    window.location.href = 'profile.html'; // Adjust this URL based on your actual profile page
});
// menampilkan prooduct yang mungkin di sukai
function loadOtherProducts() {
    fetch('https://sepokat-store.vercel.app/api/product/get-all')
        .then(response => response.json())
        .then(products => {
            const otherProductsGrid = document.getElementById('other-products-grid');
            const currentProductId = localStorage.getItem('id-product');
            const filteredProducts = products.filter(product => product.id !== currentProductId);
            let currentIndex = 0;
            // menampilkan product lain nya
            function renderProducts(startIndex) {
                otherProductsGrid.textContent = '';
                const endIndex = Math.min(startIndex + 4, filteredProducts.length);
                for (let i = startIndex; i < endIndex; i++) {
                    const product = filteredProducts[i];
                    const productCard = document.createElement('div');
                    productCard.classList.add('product-card');

                    const productImage = document.createElement('img');
                    productImage.setAttribute('src', product.image_1);
                    productImage.alt = product.name;

                    const productName = document.createElement('h3');
                    productName.classList.add('product-name');
                    productName.textContent = product.name;

                    const productPrice = document.createElement('p');
                    productPrice.classList.add('product-price');
                    productPrice.textContent = `IDR ${parseInt(product.price).toLocaleString('id-ID')}`;

                    productCard.appendChild(productImage);
                    productCard.appendChild(productName);
                    productCard.appendChild(productPrice);

                    productCard.addEventListener('click', () => {
                        localStorage.setItem('id-product', product.id);
                        localStorage.setItem('name-product', product.name);
                        localStorage.setItem('price-product', product.price);
                        localStorage.setItem('image-product', product.image_1);
                        localStorage.setItem('image-product2', product.image_2);
                        window.location.reload();
                    });

                    otherProductsGrid.appendChild(productCard);
                }
            }

            renderProducts(currentIndex);
        })
    // .catch(error => console.error('Error loading other products:', error));
    updateCartCount();
}
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
// funtion untuk ketika icon keranjang di clik maka akan berpindah halaman ke keranjang,namun dilakukan pengeckan login terlebih dahulu
const btnCart = document.querySelector(".cart");
btnCart.addEventListener("click", () => {
    if (JSON.parse(localStorage.getItem('userLogin'))?.id) {
        window.location.href = "./cart-product.html";
    } else {
        window.location.href = "./not-login.html";
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
