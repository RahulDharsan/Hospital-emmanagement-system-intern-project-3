// Fetch and display doctors from localStorage or a server

function displayDoctors() {
    const doctors = JSON.parse(localStorage.getItem('doctors')) || [];
    const doctorTable = document.querySelector('#doctors tbody');
    doctorTable.innerHTML = '';

    doctors.forEach(doctor => {
        const row = document.createElement('tr');
        row.id = `doctor-${doctor.id}`;

        row.innerHTML = `
            <td>${doctor.id}</td>
            <td>${doctor.name}</td>
            <td>${doctor.specialization}</td>
            <td>${doctor.contact}</td>
            <td>
                <button class="delete-doctor-btn" data-id="${doctor.id}">Delete</button>
            </td>
        `;

        doctorTable.appendChild(row);
    });

    attachDoctorEventListeners();
}

// Fetch and display messages from localStorage or a server
function displayMessages() {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    const messageTable = document.querySelector('#messages tbody');
    messageTable.innerHTML = '';

    messages.forEach(message => {
        const row = document.createElement('tr');
        row.id = `message-${message.id}`;

        row.innerHTML = `
            <td>${message.id}</td>
            <td>${message.username}</td>
            <td>${message.email}</td>
            <td>${message.message}</td>
            <td>${message.date}</td>
        `;

        messageTable.appendChild(row);
    });
}

// Attach event listeners for deleting doctors
function attachDoctorEventListeners() {
    const deleteDoctorButtons = document.querySelectorAll(".delete-doctor-btn");

    deleteDoctorButtons.forEach(button => {
        button.addEventListener('click', function () {
            const doctorId = this.dataset.id;
            deleteDoctor(doctorId);
        });
    });
}

// Add a new doctor
function addDoctor() {
    const doctorName = document.getElementById('doctor-name').value;
    const doctorSpecialization = document.getElementById('doctor-specialization').value;
    const doctorContact = document.getElementById('doctor-contact').value;

    const doctors = JSON.parse(localStorage.getItem('doctors')) || [];

    const newDoctor = {
        id: Date.now(), // Unique ID based on timestamp
        name: doctorName,
        specialization: doctorSpecialization,
        contact: doctorContact
    };

    doctors.push(newDoctor);
    localStorage.setItem('doctors', JSON.stringify(doctors));

    displayDoctors(); // Refresh the doctors table
}

// Delete a doctor
function deleteDoctor(doctorId) {
    let doctors = JSON.parse(localStorage.getItem('doctors')) || [];
    doctors = doctors.filter(doctor => doctor.id != doctorId);
    localStorage.setItem('doctors', JSON.stringify(doctors));

    displayDoctors(); // Refresh the doctors table
}

// Add a new admin
function addAdmin() {
    const adminName = document.getElementById('admin-name').value;
    const adminEmail = document.getElementById('admin-email').value;
    const adminPassword = document.getElementById('admin-password').value;

    const admins = JSON.parse(localStorage.getItem('admins')) || [];

    const newAdmin = {
        id: Date.now(), // Unique ID based on timestamp
        name: adminName,
        email: adminEmail,
        password: adminPassword
    };

    admins.push(newAdmin);
    localStorage.setItem('admins', JSON.stringify(admins));
    
    alert('Admin added successfully!');
}

// Event listeners for form submissions
document.getElementById('add-doctor-form').addEventListener('submit', function (e) {
    e.preventDefault();
    addDoctor();
});

document.getElementById('add-admin-form').addEventListener('submit', function (e) {
    e.preventDefault();
    addAdmin();
});

// Load doctors and messages when the page is ready
document.addEventListener('DOMContentLoaded', () => {
    displayDoctors();
    displayMessages();
});
