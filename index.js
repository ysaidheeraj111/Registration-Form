document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Retrieve form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = new Date(document.getElementById('dob').value);
    const acceptTerms = document.getElementById('accept-terms').checked;

    // Validate date of birth
    const today = new Date();
    const minAge = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());
    const maxAge = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

    if (dob > maxAge || dob < minAge) {
        alert('Date of birth must be between 18 and 55 years ago.');
        return;
    }

    // Save data to local storage
    localStorage.setItem('registrationData', JSON.stringify({
        name,
        email,
        password,
        dob: dob.toISOString().split('T')[0],
        acceptTerms
    }));

    // Append data to table
    const table = document.querySelector('table tbody');
    const row = table.insertRow();
    row.insertCell(0).textContent = name;
    row.insertCell(1).textContent = email;
    row.insertCell(2).textContent = password;
    row.insertCell(3).textContent = dob.toISOString().split('T')[0];
    row.insertCell(4).textContent = acceptTerms ? 'Yes' : 'No';
});
