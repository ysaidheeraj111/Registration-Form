const fs = require('fs');
const readline = require('readline');

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

// Function to load users from a file
function loadUsers() {
    if (fs.existsSync('users.json')) {
        const data = fs.readFileSync('users.json');
        return JSON.parse(data);
    }
    return [];
}

// Function to save users to a file
function saveUsers(users) {
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
}

// Function to display users
function displayUsers() {
    const users = loadUsers();
    console.log("\nRegistered Users:");
    console.log("-----------------");
    users.forEach(user => {
        console.log(`Name: ${user.name}, Email: ${user.email}, Password: ${user.password}, DOB: ${user.dob}, Accepted terms? ${user.termsAccepted}`);
    });
}

// Command line input handling
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Start the prompt to collect form data
function registerUser() {
    rl.question('Name: ', (name) => {
        rl.question('Email: ', (email) => {
            rl.question('Password: ', (password) => {
                rl.question('Date of Birth (YYYY-MM-DD): ', (dob) => {
                    // Validate DOB
                    if (!validateDob(dob)) {
                        console.log("Date of birth must be for ages between 18 and 55.");
                        rl.close();
                        return;
                    }

                    rl.question('Accept terms? (yes/no): ', (termsAnswer) => {
                        const termsAccepted = termsAnswer.toLowerCase() === 'yes';

                        // Collect user data
                        const user = { name, email, password, dob, termsAccepted };
                        let users = loadUsers();
                        users.push(user);
                        saveUsers(users);

                        console.log("\nUser registered successfully!");
                        displayUsers();
                        rl.close();
                    });
                });
            });
        });
    });
}

// Run the registration process
registerUser();
