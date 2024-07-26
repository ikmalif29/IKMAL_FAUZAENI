// Fungsi untuk memperbarui jumlah item di keranjang
const updateCartCount = () => {
    const cartProducts = JSON.parse(localStorage.getItem('cart-products')) || [];
    const idUser = JSON.parse(localStorage.getItem('userLogin')).id;
    const cartByIdUser = cartProducts.filter(cart => cart.id_user == idUser);
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cartByIdUser.length;
};

updateCartCount();

// Fungsi untuk memperbarui total harga dari produk yang dipilih
const updateTotalPrice = () => {
    const checkboxes = document.querySelectorAll('.cart-item input[type="checkbox"]');
    let totalPrice = 0;
    let anyChecked = false;
    let allChecked = true;

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const price = parseInt(checkbox.dataset.price);
            const quantity = parseInt(checkbox.dataset.quantity);
            totalPrice += price * quantity;
            anyChecked = true;
        } else {
            allChecked = false;
        }
    });

    document.getElementById('total-price').textContent = totalPrice.toLocaleString('id-ID');
    document.getElementById('checkout-btn').disabled = !anyChecked;
    document.getElementById('select-all').checked = allChecked;
};

// Fungsi untuk menampilkan produk di halaman keranjang
const displayCartProducts = () => {
    const cartContainer = document.querySelector('.cart-container');
    const cartProducts = JSON.parse(localStorage.getItem('cart-products')) || [];
    const selectedProducts = JSON.parse(localStorage.getItem('selected-products')) || {};
    cartContainer.textContent = '';

    const idUser = JSON.parse(localStorage.getItem('userLogin')).id;
    const cartByIdUser = cartProducts.filter(cart => cart.id_user == idUser);
    // jika data tidak ada maka akan menampilakna pesan
    if (cartByIdUser.length === 0) {
        const emptyMessage = document.createElement('h1');
        emptyMessage.textContent = 'Your basket is empty. Go to the shop';
        emptyMessage.style.textAlign = 'center';
        emptyMessage.style.fontSize = '20px';
        cartContainer.appendChild(emptyMessage);
        return;
    }

    cartByIdUser.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('cart-item');

        const productImage = document.createElement('img');
        productImage.setAttribute('src', product.image_1);
        productImage.alt = product.name;

        const productInfo = document.createElement('div');
        productInfo.classList.add('cart-item-info');

        const productName = document.createElement('p');
        productName.textContent = `Name Product: ${product.name}`;

        const productPrice = document.createElement('p');
        productPrice.textContent = `Price Product: IDR ${parseInt(product.price).toLocaleString('id-ID')}`;

        const productCategory = document.createElement('p');
        productCategory.textContent = `Category Product: ${product.category || 'Lifestyle'}`;

        productInfo.appendChild(productName);
        productInfo.appendChild(productPrice);
        productInfo.appendChild(productCategory);

        const productQuantity = document.createElement('div');
        productQuantity.classList.add('cart-item-quantity');

        const decreaseButton = document.createElement('button');
        decreaseButton.classList.add('decrease');
        decreaseButton.setAttribute('data-index', index);
        decreaseButton.textContent = '-';

        const quantitySpan = document.createElement('span');
        quantitySpan.textContent = product.quantity;

        const increaseButton = document.createElement('button');
        increaseButton.classList.add('increase');
        increaseButton.setAttribute('data-index', index);
        increaseButton.textContent = '+';

        productQuantity.appendChild(decreaseButton);
        productQuantity.appendChild(quantitySpan);
        productQuantity.appendChild(increaseButton);

        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('bx', 'bx-trash', 'delete');
        deleteIcon.setAttribute('data-index', index);

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.dataset.index = index; //Menyimpan nilai index pada atribut data index dari checkbox.
        checkbox.dataset.price = product.price; //Menyimpan nilai price dari product pada atribut data price dari checkbox.
        checkbox.dataset.quantity = product.quantity;
        checkbox.checked = !!selectedProducts[product.id];
        // bernilai truthy. Operator ganda not (!!) digunakan untuk mengkonversi nilai ke boolean (true atau false). 
        // Jika selectedProducts[product.id] ada (truthy), maka checkbox akan dicentang (true), 
        checkbox.addEventListener('change', (e) => {
            selectedProducts[product.id] = e.target.checked;
            // Memperbarui selectedProducts dengan nilai checked dari checkbox yang berubah.
            //  e.target.checked akan bernilai true jika checkbox dicentang dan false jika tidak.
            localStorage.setItem('selected-products', JSON.stringify(selectedProducts));
            // Menyimpan selectedProducts yang diperbarui ke localStorage. JSON.stringify 
            // digunakan untuk mengkonversi objek selectedProducts menjadi string JSON.
            updateTotalPrice();
        });

        productDiv.appendChild(checkbox);
        productDiv.appendChild(productImage);
        productDiv.appendChild(productInfo);
        productDiv.appendChild(productQuantity);
        productDiv.appendChild(deleteIcon);

        cartContainer.appendChild(productDiv);
    });
    //  menambah jumlah
    document.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index'); // digunakan untuk mendapatkan nilai dari atribut data data-index
            cartProducts[index].quantity++;
            localStorage.setItem('cart-products', JSON.stringify(cartProducts));
            displayCartProducts();
            updateTotalPrice();
        });
    });
    // megurangi jumlah
    document.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            cartProducts[index].quantity--;
            if (cartProducts[index].quantity <= 0) {
                cartProducts.splice(index, 1);
            }
            localStorage.setItem('cart-products', JSON.stringify(cartProducts));
            displayCartProducts();
            updateTotalPrice();
        });
    });
    // menghapus product dari cart
    document.querySelectorAll('.delete').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            const productId = cartProducts[index].id;
            delete selectedProducts[productId];
            cartProducts.splice(index, 1);
            localStorage.setItem('cart-products', JSON.stringify(cartProducts));
            localStorage.setItem('selected-products', JSON.stringify(selectedProducts));
            displayCartProducts();
            updateCartCount();
            updateTotalPrice();
        });
    });

    updateTotalPrice();
};

// Fungsi untuk menambah produk ke keranjang
const addToCart = (product) => {
    const cartProducts = JSON.parse(localStorage.getItem('cart-products')) || [];
    const existingProductIndex = cartProducts.findIndex(p => p.id === product.id);

    if (existingProductIndex !== -1) {
        cartProducts[existingProductIndex].quantity++;
    } else {
        product.quantity = 1;
        cartProducts.push(product);
    }

    localStorage.setItem('cart-products', JSON.stringify(cartProducts));
    updateCartCount();
};

// Fungsi untuk checkout produk yang dipilih
const checkoutSelected = () => {
    const cartProducts = JSON.parse(localStorage.getItem('cart-products')) || [];
    const idUser = JSON.parse(localStorage.getItem('userLogin')).id;
    const cartByIdUser = cartProducts.filter(cart => cart.id_user == idUser);

    const selectedProducts = [];
    document.querySelectorAll('.cart-item input[type="checkbox"]:checked').forEach(checkbox => {
        const index = parseInt(checkbox.dataset.index);
        selectedProducts.push(cartByIdUser[index]);
    });
};

// Panggil fungsi untuk menampilkan produk saat halaman dimuat
window.onload = displayCartProducts;

// Tambahkan event listener untuk tombol checkout
document.getElementById('checkout-btn').addEventListener('click', checkoutSelected);

// Tambahkan event listener untuk checkbox select all
document.getElementById('select-all').addEventListener('change', (e) => {
    const cartProducts = JSON.parse(localStorage.getItem('cart-products')) || [];
    const idUser = JSON.parse(localStorage.getItem('userLogin')).id;
    const cartByIdUser = cartProducts.filter(cart => cart.id_user == idUser);

    const checkboxes = document.querySelectorAll('.cart-item input[type="checkbox"]');
    const selectedProducts = JSON.parse(localStorage.getItem('selected-products')) || {};
    checkboxes.forEach(checkbox => {
        checkbox.checked = e.target.checked;
        const index = checkbox.dataset.index;
        const productId = cartByIdUser[index].id;
        selectedProducts[productId] = e.target.checked;
    });
    localStorage.setItem('selected-products', JSON.stringify(selectedProducts));
    updateTotalPrice();
});

// Event untuk scroll
// Ketika layar di scroll maka si header akan berubah warna
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
    const cartProducts = JSON.parse(localStorage.getItem('cart-products')) || [];
    const selectedProducts = JSON.parse(localStorage.getItem('selected-products')) || {};

    checkoutProductsContainer.textContent = '';

    Object.keys(selectedProducts).forEach(productId => {
        if (selectedProducts[productId]) {
            const product = cartProducts.find(p => p.id === productId);
            if (product) {
                const productDiv = document.createElement('div');
                productDiv.classList.add('checkout-product');

                const productInfo = document.createElement('p');
                productInfo.textContent = `${product.name} - IDR ${parseInt(product.price).toLocaleString('id-ID')} x ${product.quantity}`;

                productDiv.appendChild(productInfo);
                checkoutProductsContainer.appendChild(productDiv);
            }
        }
    });
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
            window.location.href = 'cart-product.html';
        }
    }, 1000);
};

// Event listener untuk tombol checkout
document.getElementById('checkout-btn').addEventListener('click', () => {
    displayCheckoutProducts();
    showPopup('checkout-popup');
});

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
    //  order details
    const cartProducts = JSON.parse(localStorage.getItem('cart-products')) || [];
    const selectedProducts = JSON.parse(localStorage.getItem('selected-products')) || {};
    const idUser = JSON.parse(localStorage.getItem('userLogin')).id;

    // const orderDetails = {
    //     id_user: idUser,
    //     products: [],
    //     subtotal: 0,
    //     total: 0,
    //     paymentProof: localStorage.getItem('paymentProof')
    // };

    const orderDetails = {
        id_user: idUser,
        products: {
            name: "",
            price: "",
            image: "",
            quantity: 1
        },
        subtotal: 0,
        total: 0,
        paymentProof: "",
        status: ""
    };

    Object.keys(selectedProducts).forEach(productId => {
        if (selectedProducts[productId]) {
            const product = cartProducts.find(p => p.id === productId);
            if (product) {
                orderDetails.id_user = idUser
                orderDetails.products.name = product.name
                orderDetails.products.price = product.price
                orderDetails.products.image = product.image_1
                orderDetails.products.quantity = product.quantity
                orderDetails.status = "Processed"
                orderDetails.subtotal = product.price;
                orderDetails.total = product.price * product.price
                orderDetails.paymentProof = localStorage.getItem('paymentProof')

                saveOrderToLocalStorage(orderDetails);
            }
        }
    });

    localStorage.removeItem('selected-products');
    localStorage.removeItem('cart-products');
    localStorage.removeItem('paymentProof');

    updateCartCount();
    updateTotalPrice();

    alert('Order completed successfully!');
    hidePopup('payment-popup');
    window.location.href = 'profile.html';
});
// funtion untuk ketika icon user di clik maka akan berpindah halaman ke profile user,namun dilakukan pengeckan login terlebih dahulu
document.querySelector(".user").addEventListener("click", () => {
    if (JSON.parse(localStorage.getItem('userLogin'))) {
        window.location.href = "../html/profile.html";
    } else {
        window.location.href = "../html/not-login.html";
    }
});