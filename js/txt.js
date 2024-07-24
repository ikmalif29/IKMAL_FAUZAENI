// fetch(`https://ikmal-sport-collection.vercel.app/api/product/get-all`)
//     .then((response) => response.json())
//     .then((res) => {
//         console.log(res)
//         let big = document.querySelector(".big-container")
// big.style.width = "100%"
// big.style.height = "100vh"
// big.style.gap = "10px"
// big.style.justifyContent = "center"
// big.style.alignItems = "center"
// big.style.display = "flex"
// big.style.flexWrap = "wrap"//         res.forEach((r) => {
//             let container = document.createElement("div")
// container.style.width = "380px"
// container.style.height = "480px"
// container.style.borderRadius = "10px"
// // container.style.border = "1px solid black"
// container.style.padding = "10px"
// container.style.display = "flex"
// container.style.flexDirection = "column"
// container.style.textAlign = "center"
// container.style.gap = "22px"
// // container.style.justifyContent = "center"

//             let h1 = document.createElement("p")
//             h1.textContent = r.name
//             h1.style.fontSize = "20px"
//             h1.style.fontFamily = "Sans"
//             let h2 = document.createElement("h3")
//             h2.textContent = `IDR ${parseInt(r.price.toLocaleString("id-ID"))}`
//             h2.style.fontFamily = "Helvetica, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji"
//             h2.style.fontSize = "18px"

//             let icon = document.createElement("i")
//             icon.classList.add("bx")
//             icon.classList.add("bxs-cart-alt")
//             icon.style.fontSize = "24px"

//             let divImage = document.createElement("div")
//             divImage.style.width = "inherit"
//             divImage.style.height = "300px"
//             divImage.style.display = "center"
//             divImage.style.justifyContent = "center"
//             let image = document.createElement("img")
//             image.style.width = "350px"
//             image.style.height = "370px"

//             let divCart = document.createElement("div")
//             divCart.style.width = "inherit"
//             divCart.style.height = "36px"
//             divCart.style.display = "flex"
//             divCart.style.justifyContent = "space-evenly"
//             divCart.style.alignItems = "center"
//             // divCart.style.border = "1px solid black"

//             icon.addEventListener("click", () => {
//                 alert(`Product ${r.name} has been successfully added to cart`)
//             })

//             divImage.addEventListener("mouseover", (event) => {
//                 image.setAttribute("src", `${r.image_2}`)
//             })

//             divImage.addEventListener("mouseout", (event) => {
//                 image.setAttribute("src", `${r.image_1}`)
//             })

//             divImage.addEventListener("click", (event) => {
//                 event.preventDefault()
//                 localStorage.setItem("image-product", r.image_1)
//                 localStorage.setItem("image-product2", r.image_2)
//                 localStorage.setItem("name-product", r.name)
//                 localStorage.setItem("price-product", r.price)
//                 window.location = "detail-product.html"
//             })


//             divImage.appendChild(image)
//             container.appendChild(divImage)
//             container.appendChild(h1)
//             divCart.appendChild(icon)
//             divCart.appendChild(h2)
//             container.appendChild(divCart)
//             big.appendChild(container)
//         });
//     })


const apiUrl = 'https://ikmal-sport-collection.vercel.app/api/product/get-all';
let products = [];

fetch(apiUrl)
    .then((response) => response.json())
    .then((res) => {
        products = res;
        displayProducts(products);
    });

const displayProducts = (productsToDisplay) => {
    const bigContainer = document.querySelector('.big-container');
    bigContainer.textContent = '';
    bigContainer.style.width = "100%"
    bigContainer.style.height = "100vh"
    bigContainer.style.marginTop = "130px"
    bigContainer.style.gap = "10px"
    bigContainer.style.justifyContent = "center"
    bigContainer.style.alignItems = "center"
    bigContainer.style.display = "flex"
    bigContainer.style.flexWrap = "wrap"

    productsToDisplay.forEach((r) => {
        let container = document.createElement('div');
        container.classList.add('product-item');
        container.style.width = "380px"
        container.style.height = "480px"
        container.style.borderRadius = "10px"
        // container.style.border = "1px solid black"
        container.style.padding = "10px"
        container.style.display = "flex"
        container.style.flexDirection = "column"
        container.style.textAlign = "center"
        container.style.gap = "22px"
        container.style.cursor = "pointer"
        // container.style.justifyContent = "center"

        let h1 = document.createElement('p');
        h1.textContent = r.name;
        h1.style.fontSize = '20px';
        h1.style.fontFamily = 'Sans';

        let h2 = document.createElement('h3');
        h2.textContent = `IDR ${parseInt(r.price).toLocaleString('id-ID')}`;
        h2.style.fontFamily = 'Helvetica, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji';
        h2.style.fontSize = '18px';

        let icon = document.createElement('i');
        icon.classList.add('bx', 'bxs-cart-alt');
        icon.style.fontSize = '24px';

        let divImage = document.createElement('div');
        divImage.style.width = 'inherit';
        divImage.style.height = '300px';
        divImage.style.display = 'center';
        divImage.style.justifyContent = 'center';

        let image = document.createElement('img');
        image.style.width = '350px';
        image.style.height = '370px';
        image.src = r.image_1;

        let divCart = document.createElement('div');
        divCart.style.width = 'inherit';
        divCart.style.height = '36px';
        divCart.style.display = 'flex';
        divCart.style.justifyContent = 'space-evenly';
        divCart.style.alignItems = 'center';

        divImage.addEventListener('mouseover', (event) => {
            image.setAttribute('src', r.image_2);
        });

        divImage.addEventListener('mouseout', (event) => {
            image.setAttribute('src', r.image_1);
        });

        divImage.addEventListener('click', (event) => {
            event.preventDefault();
            localStorage.setItem('image-product', r.image_1);
            localStorage.setItem('image-product2', r.image_2);
            localStorage.setItem('name-product', r.name);
            localStorage.setItem('price-product', r.price);
            window.location = 'detail-product.html';
        });

        divImage.appendChild(image);
        container.appendChild(divImage);
        container.appendChild(h1);
        divCart.appendChild(icon);
        divCart.appendChild(h2);
        container.appendChild(divCart);
        bigContainer.appendChild(container);
    });
};

document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm)
    );
    displayProducts(filteredProducts);
});

window.addEventListener('scroll', function () {
    var header = document.querySelector('.main-header');
    var search = document.querySelector('.search');
    var user = document.querySelector('.user');
    var cart = document.querySelector('.cart');
    var nav = document.querySelector('.nav');
    var a1 = document.querySelector('.a1');
    var a2 = document.querySelector('.a2');
    var a3 = document.querySelector('.a3');
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


const fiturSearch = document.querySelector(".search")
fiturSearch.addEventListener("click", (event) => {
    let clikSearch = document.querySelector("#searchInput")
    clikSearch.style.display = "block"
})

const content = document.querySelector('.content')
const dashboard = document.querySelector('.dashboard')

dashboard.addEventListener('click', ()=> {
    content.style.display = "block"
    container.style.display = "none"
    users.style.display = "none"
})
const container = document.querySelector('.container')
const product = document.querySelector('.product')
product.addEventListener('click', ()=> {
    container.style.display = "block"
    content.style.display = "none"
    users.style.display = "none"
    displayProducts();
})
const users = document.querySelector('.users')
const custemer = document.querySelector('.custemer')
custemer.addEventListener('click', ()=> {
    users.style.display = "block"
    container.style.display = "none"
    content.style.display = "none"
    displayDataCustemer();
})


content.addEventListener('DOMContentLoaded', function () {
    var ctx1 = document.getElementById('salesChart').getContext('2d');
    var ctx2 = document.getElementById('stockChart').getContext('2d');

    var salesChart = new Chart(ctx1, {
        type: 'pie',
        data: {
            labels: ['Djarum Super 12', 'Voucher Pulsa 50000'],
            datasets: [{
                data: [70, 30],
                backgroundColor: ['#ff6384', '#36a2eb']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    var stockChart = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ['Djarum Super 12', 'Voucher Pulsa 50000'],
            datasets: [{
                label: 'Stok Produk',
                data: [15, 4],
                backgroundColor: ['#ff6384', '#36a2eb']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});

// const displayProducts = () => {
//     fetch('https://sepokat-store.vercel.app/api/product/get-all')
//         .then(response => response.json())
//         .then(data => {
//             let tableBody = document.querySelector('#productTable tbody');
//             data.forEach(products => {
//                 let row = document.createElement('tr');

//                 let idCell = document.createElement('td');
//                 let nameCell = document.createElement('td');
//                 let stockCell = document.createElement('td');
//                 let priceCell = document.createElement('td');

//                 idCell.textContent = products.id;
//                 nameCell.textContent = products.name;
//                 stockCell.textContent = products.stock;
//                 priceCell.textContent = products.price;

//                 row.appendChild(idCell);
//                 row.appendChild(nameCell);
//                 row.appendChild(stockCell);
//                 row.appendChild(priceCell);

//                 tableBody.appendChild(row);
//             });
//         })
//         .catch(error => console.error('Error fetching data:', error));
// };

const displayDataCustemer = () => {
    const usersList = document.getElementById('users-list');

    fetch('https://sepokat-store.vercel.app/api/user/get-all')
        .then(response => response.json())
        .then(res => {
            res.forEach(user => {
                const userCard = document.createElement('div');
                userCard.classList.add('user-card');

                const userName = document.createElement('h2');
                userName.textContent = user.username;
                userCard.appendChild(userName);

                const userEmail = document.createElement('p');
                userEmail.textContent = `Email: ${user.email}`;
                userCard.appendChild(userEmail);

                const userPhone = document.createElement('p');
                userPhone.textContent = `Phone: ${user.phone}`;
                userCard.appendChild(userPhone);

                usersList.appendChild(userCard);
            });
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
};



// tambahkan logika jika pemesanan berhasil maka data pemesanan akan otomatis tersimpan kedalam localstorage dengan menyimpan, nama-nama produk, id_user yang memesan, harga produk, gambar produk, jumlah produk, sub total, total harga pemesanan, gambar bukti pemesanan