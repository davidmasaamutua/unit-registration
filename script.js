// script.js

// Sample units data
const units = [
    { id: 1, name: 'Introduction to Computer Science', credits: 3 },
    { id: 2, name: 'Data Structures and Algorithms', credits: 4 },
    { id: 3, name: 'Database Systems', credits: 3 },
    { id: 4, name: 'Web Development', credits: 3 },
    { id: 5, name: 'Software Engineering', credits: 4 },
    { id: 6, name: 'Artificial Intelligence', credits: 3 },
    { id: 7, name: 'Computer Networks', credits: 3 },
    { id: 8, name: 'Operating Systems', credits: 4 }
];

const maxCredits = 18; // Example max credits

// Populate units list
function populateUnits() {
    const unitsList = document.getElementById('unitsList');
    if (unitsList) {
        units.forEach(unit => {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `unit${unit.id}`;
            checkbox.name = 'units';
            checkbox.value = unit.id;
            checkbox.addEventListener('change', updateCreditCount);

            const label = document.createElement('label');
            label.htmlFor = `unit${unit.id}`;
            label.textContent = `${unit.name} (${unit.credits} credits)`;

            const div = document.createElement('div');
            div.appendChild(checkbox);
            div.appendChild(label);
            unitsList.appendChild(div);
        });
    }
}

// Update credit count
function updateCreditCount() {
    const selectedUnits = document.querySelectorAll('input[name="units"]:checked');
    let totalCredits = 0;
    selectedUnits.forEach(checkbox => {
        const unit = units.find(u => u.id == checkbox.value);
        if (unit) totalCredits += unit.credits;
    });

    // Display total credits (you can add a display element for this)
    console.log(`Total credits: ${totalCredits}`);
    if (totalCredits > maxCredits) {
        alert(`You have exceeded the maximum credit hours (${maxCredits}). Please adjust your selection.`);
    }
}

// Clear selection
function clearSelection() {
    const checkboxes = document.querySelectorAll('input[name="units"]');
    checkboxes.forEach(checkbox => checkbox.checked = false);
    updateCreditCount();
}

// Logout
function logout() {
    // In a real app, this would clear session, etc.
    alert('Logged out successfully.');
    window.location.href = 'index.html';
}

// Form validations
document.addEventListener('DOMContentLoaded', function() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const regNumber = document.getElementById('regNumber').value;
            const password = document.getElementById('password').value;
            // Simple validation - in real app, check against database
            if (regNumber && password) {
                alert('Login successful! Redirecting to unit registration.');
                window.location.href = 'units.html';
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // Register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }
            // In real app, send data to server
            alert('Account created successfully! Please log in.');
            window.location.href = 'index.html';
        });
    }

    // Unit form
    const unitForm = document.getElementById('unitForm');
    if (unitForm) {
        populateUnits();
        unitForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const selectedUnits = document.querySelectorAll('input[name="units"]:checked');
            if (selectedUnits.length === 0) {
                alert('Please select at least one unit.');
                return;
            }
            let totalCredits = 0;
            selectedUnits.forEach(checkbox => {
                const unit = units.find(u => u.id == checkbox.value);
                if (unit) totalCredits += unit.credits;
            });
            if (totalCredits > maxCredits) {
                alert(`Total credits (${totalCredits}) exceed the maximum (${maxCredits}). Please adjust your selection.`);
                return;
            }
            alert('Units registered successfully!');
            // In real app, submit to server
        });
    }
});