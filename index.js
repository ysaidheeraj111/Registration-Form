document.addEventListener('DOMContentLoaded', function () {
    loadStoredData(); // Load data from local storage when the page loads
});

document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Retrieve form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = new Date(document.getElementById('dob').value);
    const acceptTerms = document.getElementById('accept-terms').checked;

    // Validate date of birth (age between 18 and 55)
    const today = new Date();
    const minAge = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());
    const maxAge = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

    if (dob > maxAge || dob < minAge) {
        alert('Date of birth must be between 18 and 55 years ago.');
        return;
    }

    // Save data to local storage
    const newData = {
        name: name,
        email: email,
        password: password,
        dob: dob.toISOString().split('T')[0], // Format DOB as YYYY-MM-DD
        acceptTerms: acceptTerms
    };

    saveToLocalStorage(newData); // Save data to local storage
    appendDataToTable(newData);  // Immediately add data to the table

    // Clear the form after submission
    document.getElementById('registration-form').reset();
});

// Function to save data to local storage
function saveToLocalStorage(data) {
    let storedData = JSON.parse(localStorage.getItem('registrationData')) || [];
    storedData.push(data);
    localStorage.setItem('registrationData', JSON.stringify(storedData));
}

// Function to load stored data from local storage on page load
function loadStoredData() {
    const storedData = JSON.parse(localStorage.getItem('registrationData')) || [];
    storedData.forEach(data => {
        appendDataToTable(data);
    });
}

// Function to append data to the table
function appendDataToTable(data) {
    const table = document.querySelector('table tbody');
    const row = table.insertRow();
    row.insertCell(0).textContent = data.name;
    row.insertCell(1).textContent = data.email;
    row.insertCell(2).textContent = data.password;
    row.insertCell(3).textContent = data.dob;
    row.insertCell(4).textContent = data.acceptTerms ? 'Yes' : 'No';
}

