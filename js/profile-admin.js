document.addEventListener('DOMContentLoaded', () => {
    const fullNameInput = document.getElementById('fullName');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Retrieve admin profile data from localStorage
    const adminProfile = JSON.parse(localStorage.getItem('data-admin'));

    if (adminProfile) {
        // Populate form fields with existing data
        fullNameInput.value = adminProfile.fullname || '';
        usernameInput.value = adminProfile.username || '';
        emailInput.value = adminProfile.email || '';
        passwordInput.value = adminProfile.password || '';
    }

    document.getElementById('updateProfile').addEventListener('click', function () {
        const fullName = fullNameInput.value;
        const username = usernameInput.value;
        const email = emailInput.value;
        const password = passwordInput.value;

        // Update the admin profile data in localStorage
        const updatedAdminProfile = {
            fullname: fullName,
            username: username,
            email: email,
            password: password
        };

        // Save updated profile to localStorage
        localStorage.setItem('data-admin', JSON.stringify(updatedAdminProfile));

        alert('Profile Updated:\n' +
            'Full Name: ' + fullName + '\n' +
            'Username: ' + username + '\n' +
            'Email: ' + email + '\n' +
            'Password: ' + password
        );

        window.location.reload()
    });

    document.getElementById('logoutButton').addEventListener('click', function () {
        alert('Logged out');
        window.location.href = "./sigin-admin.html";
    });
});
