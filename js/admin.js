document.addEventListener('DOMContentLoaded', () => {
    // Initial setup: display the dashboard section by default
    document.getElementById('dashboard').classList.add('active');

    // Handle sidebar navigation
    const sidebarMenuItems = document.querySelectorAll('.sidebar-menu li');
    sidebarMenuItems.forEach(item => {
        item.addEventListener('click', (event) => {
            // Remove 'active' class from all menu items
            sidebarMenuItems.forEach(menuItem => menuItem.classList.remove('active'));

            // Add 'active' class to the clicked menu item
            item.classList.add('active');

            // Get target content ID
            const targetContentId = item.getAttribute('data-target');

            // Hide all main content sections
            const mainContents = document.querySelectorAll('.main-content');
            mainContents.forEach(content => content.classList.remove('active'));

            // Show the target content section
            const targetContent = document.getElementById(targetContentId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    const totalUsersElem = document.getElementById('totalUsers');
    const totalProductsElem = document.getElementById('totalProducts');
    const totalOrdersElem = document.getElementById('totalOrders');

    const fetchData2 = async () => {
        try {
            // Fetch total users and products from APIs
            const usersResponse = await fetch('https://sepokat-store.vercel.app/api/user/get-all');
            const usersData = await usersResponse.json();
            totalUsersElem.textContent = usersData.length;

            const productsResponse = await fetch('https://sepokat-store.vercel.app/api/product/get-all');
            const productsData = await productsResponse.json();
            totalProductsElem.textContent = productsData.length;

            // Get total orders and their statuses from local storage
            const orders = JSON.parse(localStorage.getItem('orders')) || [];
            totalOrdersElem.textContent = orders.length;

            console.log(orders)

            // Count orders by status
            let statusCounts = {
                processed: 0,
                shipped: 0,
                finished: 0,
                canceled: 0
            };

            orders.forEach(order => {
                console.log(order.status)
                if (order.status == "Processed") {
                    statusCounts.processed++
                } else if (order.status == "Shipped") {
                    statusCounts.shipped++
                } else if (order.status == "Finished") {
                    statusCounts.finished++
                } else if (order.status == "Canceled") {
                    statusCounts.canceled++
                }
            });

            // Prepare data for charts
            const userCount = usersData.length;
            const productCount = productsData.length;
            const orderStatusCounts = Object.values(statusCounts);
            const salesData = new Array(12).fill(0); // For months January to December

            // Generate dummy sales data for demonstration
            for (let i = 0; i < salesData.length; i++) {
                salesData[i] = Math.floor(Math.random() * 100); // Replace with actual data
            }

            // Render charts
            renderCharts(orderStatusCounts, salesData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const renderCharts = (orderStatusCounts, salesData) => {
        // Donut Chart
        const ctxGender = document.getElementById('genderChart').getContext('2d');
        new Chart(ctxGender, {
            type: 'doughnut',
            data: {
                labels: ['Processed', 'Shipped', 'Finished', 'Canceled'],
                datasets: [{
                    data: orderStatusCounts,
                    backgroundColor: ['orange', 'grey', 'lime', 'red']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function (tooltipItem) {
                                return `${tooltipItem.label}: ${tooltipItem.raw}`;
                            }
                        }
                    }
                }
            }
        });

        // Bar Chart
        const ctxProjects = document.getElementById('projectsChart').getContext('2d');
        new Chart(ctxProjects, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Sales',
                    data: salesData,
                    backgroundColor: '#36A2EB',
                    borderColor: '#36A2EB',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        beginAtZero: true
                    },
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    };

    fetchData2();


    // Fetch and render user data
    const userTableBody = document.querySelector('#userTable tbody');
    const searchInput = document.getElementById('search');
    let currentPage = 1;
    const itemsPerPage = 10;

    const fetchData = async () => {
        try {
            const response = await fetch('https://sepokat-store.vercel.app/api/user/get-all');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching user data:', error);
            return [];
        }
    };

    const createUserRow = (user, index) => {
        const row = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.textContent = index + 1;
        row.appendChild(idCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = user.username;
        row.appendChild(nameCell);

        const roleCell = document.createElement('td');
        // roleCell.textContent = `${localStorage.getItem('userLogin').full_name}`;
        row.appendChild(roleCell);

        const emailCell = document.createElement('td');
        emailCell.textContent = user.email;
        row.appendChild(emailCell);

        const actionCell = document.createElement('td');

        const showButton = document.createElement('button');
        showButton.classList.add('show');
        showButton.textContent = 'Show';
        actionCell.appendChild(showButton);

        row.appendChild(actionCell);

        // Add event listener for show button
        showButton.addEventListener('click', () => {
            showUserPopup(user);
        });

        return row;
    };

    const showUserPopup = (user) => {
        const popupContainer = document.getElementById('popupContainer');
        document.getElementById('popupUsername').textContent = `Username: ${user.username}`;
        document.getElementById('popupFullName').textContent = `Full Name: ${user.full_name}`;
        document.getElementById('popupEmail').textContent = `Email: ${user.email}`;

        popupContainer.style.display = 'flex';

        document.getElementById('closePopupButton').addEventListener('click', () => {
            popupContainer.style.display = 'none';
        });
    };

    const renderTable = (data, page = 1) => {
        userTableBody.textContent = '';
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedData = data.slice(start, end);

        paginatedData.forEach((user, index) => {
            const row = createUserRow(user, index);
            userTableBody.appendChild(row);
        });
    };

    const setupPagination = (data) => {
        const totalPages = Math.ceil(data.length / itemsPerPage);
        document.getElementById('pageNumber').textContent = currentPage;

        document.getElementById('prevPage').addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderTable(data, currentPage);
                document.getElementById('pageNumber').textContent = currentPage;
            }
        })

        document.getElementById('nextPage').addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderTable(data, currentPage);
                document.getElementById('pageNumber').textContent = currentPage;
            }
        })
    };

    const filterData = (data, searchTerm) => {
        return data.filter(users =>
            users.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    searchInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value;
        fetchData().then(data => {
            const filteredData = filterData(data, searchTerm);
            currentPage = 1;
            renderTable(filteredData, currentPage);
            setupPagination(filteredData);
        });
    });

    fetchData().then(data => {
        renderTable(data, currentPage);
        setupPagination(data);
    });

    // Fetch and render product data
    const productTableBody = document.querySelector('#productTable tbody');
    const productSearchInput = document.getElementById('productSearch');
    let productCurrentPage = 1;
    const productItemsPerPage = 10;

    const fetchProductData = async () => {
        try {
            const response = await fetch('https://sepokat-store.vercel.app/api/product/get-all');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching product data:', error);
            return [];
        }
    };

    const createProductRow = (product, index) => {
        const row = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.textContent = index + 1;
        row.appendChild(idCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = product.name;
        row.appendChild(nameCell);

        const categoryCell = document.createElement('td');
        categoryCell.textContent = product.stock;
        row.appendChild(categoryCell);

        const priceCell = document.createElement('td');
        priceCell.textContent = product.price;
        row.appendChild(priceCell);

        const actionCell = document.createElement('td');
        const showButton = document.createElement('button');
        showButton.classList.add('product-show');
        showButton.textContent = 'Show';
        actionCell.appendChild(showButton);

        row.appendChild(actionCell);

        showButton.addEventListener('click', () => {
            showProductDetails(product);
        });

        return row;
    };


    const showProductDetails = (product) => {
        document.getElementById('detailsName').textContent = `Name: ${product.name}`;
        document.getElementById('detailsPrice').textContent = `Price: ${product.price}`;
        document.getElementById('detailsStock').textContent = `Stock: ${product.stock}`;
        document.getElementById('detailsImage').textContent = `Image 1: ${product.image1}`;

        detailsPopup.style.display = 'flex';
    };

    closeDetailsButton.addEventListener('click', () => {
        detailsPopup.style.display = 'none';
    });

    const renderProductTable = (data, page = 1) => {
        productTableBody.textContent = '';
        const start = (page - 1) * productItemsPerPage;
        const end = start + productItemsPerPage;
        const paginatedData = data.slice(start, end);

        paginatedData.forEach((product, index) => {
            const row = createProductRow(product, index);
            productTableBody.appendChild(row);
        });
    };

    const setupProductPagination = (data) => {
        const totalPages = Math.ceil(data.length / productItemsPerPage);
        document.getElementById('productPageNumber').textContent = productCurrentPage;

        document.getElementById('productPrevPage').addEventListener('click', () => {
            if (productCurrentPage > 1) {
                productCurrentPage--;
                renderProductTable(data, productCurrentPage);
                document.getElementById('productPageNumber').textContent = productCurrentPage;
            }
        })

        document.getElementById('productNextPage').addEventListener('click', () => {
            if (productCurrentPage < totalPages) {
                productCurrentPage++;
                renderProductTable(data, productCurrentPage);
                document.getElementById('productPageNumber').textContent = productCurrentPage;
            }

        });
    };

    const filterProductData = (data, searchTerm) => {
        return data.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.stock.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    productSearchInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value;
        fetchProductData().then(data => {
            const filteredData = filterProductData(data, searchTerm);
            productCurrentPage = 1;
            renderProductTable(filteredData, productCurrentPage);
            setupProductPagination(filteredData);
        });
    });

    fetchProductData().then(data => {
        renderProductTable(data, productCurrentPage);
        setupProductPagination(data);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Initial setup: display the dashboard section by default
    document.getElementById('dashboard').classList.add('active');

    // Handle sidebar navigation
    const sidebarMenuItems = document.querySelectorAll('.sidebar-menu li');
    sidebarMenuItems.forEach(item => {
        item.addEventListener('click', (event) => {
            // Remove 'active' class from all menu items
            sidebarMenuItems.forEach(menuItem => menuItem.classList.remove('active'));

            // Add 'active' class to the clicked menu item
            item.classList.add('active');

            // Get target content ID
            const targetContentId = item.getAttribute('data-target');

            // Hide all main content sections
            const mainContents = document.querySelectorAll('.main-content');
            mainContents.forEach(content => content.classList.remove('active'));

            // Show the target content section
            const targetContent = document.getElementById(targetContentId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // Fetch and render sales history data from local storage
    const salesTableBody = document.querySelector('#salesTable tbody');
    const salesSearchInput = document.getElementById('salesSearch');
    let salesCurrentPage = 1;
    const salesItemsPerPage = 10;

    const getSalesDataFromLocalStorage = () => {
        const data = localStorage.getItem('orders');
        return data ? JSON.parse(data) : [];
    };

    const popupContainer = document.getElementById('popup-container');
    const popupImage = document.getElementById('popup-image');
    const closeBtns = document.querySelectorAll('.close-btn');
    const editPopupContainer = document.getElementById('edit-popup-container');
    const editForm = document.getElementById('edit-form');
    const editStatusInput = document.getElementById('edit-status');
    let currentEditSaleIndex = null;

    const createSalesRow = (sale, index) => {
        const row = document.createElement('tr');

        const idUserCell = document.createElement('td');
        idUserCell.textContent = sale.id_user;
        row.appendChild(idUserCell);

        const productNameCell = document.createElement('td');
        productNameCell.textContent = sale.products.name;
        row.appendChild(productNameCell);

        const productPriceCell = document.createElement('td');
        productPriceCell.textContent = sale.products.price;
        row.appendChild(productPriceCell);


        const totalCostCell = document.createElement('td');
        totalCostCell.textContent = sale.subtotal;
        row.appendChild(totalCostCell);

        const paymentCell = document.createElement('td');
        const imgPayment = document.createElement('p');
        imgPayment.textContent = 'Bukti Pembayaran';
        imgPayment.classList.add('payment-link');
        imgPayment.dataset.imageSrc = sale.paymentProof; // Assume this is the path to the payment proof image
        paymentCell.appendChild(imgPayment);
        row.appendChild(paymentCell);

        const statusCell = document.createElement('td');
        statusCell.textContent = sale.status;
        row.appendChild(statusCell);

        const actionCell = document.createElement('td');

        const editButton = document.createElement('button');
        editButton.classList.add('edit');
        editButton.textContent = 'Edit';
        actionCell.appendChild(editButton);

        row.appendChild(actionCell)
        salesTableBody.appendChild(row);

        imgPayment.addEventListener('click', function () {
            const imageSrc = imgPayment.dataset.imageSrc;
            popupImage.src = imageSrc;
            popupContainer.classList.remove('popup-hidden');
            popupContainer.classList.add('popup-visible');
        });

        editButton.addEventListener('click', function () {
            currentEditSaleIndex = index;
            editStatusInput.value = sale.status;
            editPopupContainer.classList.remove('popup-hidden');
            editPopupContainer.classList.add('popup-visible');
        });
    };

    closeBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            popupContainer.classList.remove('popup-visible');
            popupContainer.classList.add('popup-hidden');
            editPopupContainer.classList.remove('popup-visible');
            editPopupContainer.classList.add('popup-hidden');
        });
    });

    popupContainer.addEventListener('click', function (event) {
        if (event.target === popupContainer) {
            popupContainer.classList.remove('popup-visible');
            popupContainer.classList.add('popup-hidden');
        }
    });

    editPopupContainer.addEventListener('click', function (event) {
        if (event.target === editPopupContainer) {
            editPopupContainer.classList.remove('popup-visible');
            editPopupContainer.classList.add('popup-hidden');
        }
    });

    editForm.addEventListener('submit', function (event) {
        event.preventDefault();
        if (currentEditSaleIndex !== null) {
            const salesData = getSalesDataFromLocalStorage();
            salesData[currentEditSaleIndex].status = editStatusInput.value;
            updateSalesDataInLocalStorage(salesData);
            renderSalesTable(getSalesDataFromLocalStorage(), salesCurrentPage);
            editPopupContainer.classList.remove('popup-visible');
            editPopupContainer.classList.add('popup-hidden');
        }
    });

    const updateSalesDataInLocalStorage = (data) => {
        localStorage.setItem('orders', JSON.stringify(data));
    };

    const renderSalesTable = (data, page = 1) => {
        salesTableBody.textContent = '';
        const start = (page - 1) * salesItemsPerPage;
        const end = start + salesItemsPerPage;
        const paginatedData = data.slice(start, end);

        paginatedData.forEach((sale, index) => {
            createSalesRow(sale, start + index);
        });
    };

    const setupSalesPagination = (data) => {
        const totalPages = Math.ceil(data.length / salesItemsPerPage);
        document.getElementById('salesPageNumber').textContent = salesCurrentPage;

        document.getElementById('salesPrevPage').addEventListener('click', () => {
            if (salesCurrentPage > 1) {
                salesCurrentPage--;
                renderSalesTable(data, salesCurrentPage);
                document.getElementById('salesPageNumber').textContent = salesCurrentPage;
            }
        });

        document.getElementById('salesNextPage').addEventListener('click', () => {
            if (salesCurrentPage < totalPages) {
                salesCurrentPage++;
                renderSalesTable(data, salesCurrentPage);
                document.getElementById('salesPageNumber').textContent = salesCurrentPage;
            }
        });
    };

    const filterSalesData = (data, searchTerm) => {
        return data.filter(sale =>
            sale.products.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    salesSearchInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value;
        const data = getSalesDataFromLocalStorage();
        const filteredData = filterSalesData(data, searchTerm);
        salesCurrentPage = 1;
        renderSalesTable(filteredData, salesCurrentPage);
        setupSalesPagination(filteredData);
    });

    const data = getSalesDataFromLocalStorage();
    renderSalesTable(data, salesCurrentPage);
    setupSalesPagination(data);
});

document.querySelector('.image').addEventListener('click', ()=>{
    window.location.href = "./profile-admin.html"
})

