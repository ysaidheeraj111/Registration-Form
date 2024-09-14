document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Collect form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const termsAccepted = document.getElementById('terms').checked;

    // Validate DOB
    if (!validateDob(dob)) {
        alert("Date of birth must be for ages between 18 and 55.");
        return;
    }

    // Create user object and store it in localStorage
    const user = { name, email, password, dob, termsAccepted };
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    // Display the updated user list
    displayUsers();

    // Reset form
    document.getElementById('registrationForm').reset();
});

// Function to validate the age based on DOB
function validateDob(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }

    return age >= 18 && age <= 55;
}

// Function to display users from localStorage in the table
function displayUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const tableBody = document.querySelector('#userTable tbody');
    tableBody.innerHTML = '';  // Clear the existing table rows

    users.forEach(user => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td>${user.dob}</td>
            <td>${user.termsAccepted ? 'Yes' : 'No'}</td>
        `;

        tableBody.appendChild(row);
    });
}

// Load users when the page is loaded
window.onload = displayUsers;
