document.addEventListener('DOMContentLoaded', function () {
    loadStoredData(); 
});

document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();
    

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = new Date(document.getElementById('dob').value);
    const acceptTerms = document.getElementById('accept-terms').checked;

 
    const today = new Date();
    const minAge = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());
    const maxAge = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

    if (dob > maxAge || dob < minAge) {
        alert('Date of birth must be between 18 and 55 years ago.');
        return;
    }

  
    const newData = {
        name: name,
        email: email,
        password: password,
        dob: dob.toISOString().split('T')[0], // Format DOB as YYYY-MM-DD
        acceptTerms: acceptTerms
    };


    saveToLocalStorage(newData);
    appendDataToTable(newData);


    document.getElementById('registration-form').reset();
});


function saveToLocalStorage(data) {
    let storedData = JSON.parse(localStorage.getItem('registrationData')) || [];
    storedData.push(data);
    localStorage.setItem('registrationData', JSON.stringify(storedData));
    console.log('Data saved to local storage:', storedData); 
}


function loadStoredData() {
    const storedData = JSON.parse(localStorage.getItem('registrationData')) || [];
    console.log('Data loaded from local storage:', storedData); 
    storedData.forEach(data => {
        appendDataToTable(data);
    });
}


function appendDataToTable(data) {
    const table = document.querySelector('table tbody');
    const row = table.insertRow();
    row.insertCell(0).textContent = data.name;
    row.insertCell(1).textContent = data.email;
    row.insertCell(2).textContent = data.password;
    row.insertCell(3).textContent = data.dob;
    row.insertCell(4).textContent = data.acceptTerms ? 'Yes' : 'No';
    console.log('New row added to table:', data); // Debugging line
}
