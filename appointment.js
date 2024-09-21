document.addEventListener('DOMContentLoaded', () => {
    // Fetch and display appointments on the admin page
    function displayAppointments() {
        const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        const appointmentTable = document.querySelector('#appointments tbody');
        appointmentTable.innerHTML = '';

        appointments.forEach(appointment => {
            const row = document.createElement('tr');
            row.id = `appointment-${appointment.id}`;

            row.innerHTML = `
                <td>${appointment.id}</td>
                <td>${appointment.username}</td>
                <td>${appointment.doctor}</td>
                <td>${appointment.date}</td>
                <td class="status">${appointment.status}</td>
                <td>
                    <button class="accept-btn" data-id="${appointment.id}" ${appointment.status === 'Accepted' ? 'disabled' : ''}>Accept</button>
                    <button class="reject-btn" data-id="${appointment.id}" ${appointment.status === 'Rejected' ? 'disabled' : ''}>Reject</button>
                </td>
            `;

            appointmentTable.appendChild(row);
        });

        attachEventListeners();
    }

    // Attach event listeners to dynamically added buttons
    function attachEventListeners() {
        const acceptButtons = document.querySelectorAll(".accept-btn");
        const rejectButtons = document.querySelectorAll(".reject-btn");

        acceptButtons.forEach(button => {
            button.addEventListener('click', function () {
                const appointmentId = this.dataset.id;
                acceptAppointment(appointmentId);
            });
        });

        rejectButtons.forEach(button => {
            button.addEventListener('click', function () {
                const appointmentId = this.dataset.id;
                rejectAppointment(appointmentId);
            });
        });
    }

    // Accept an appointment
    function acceptAppointment(appointmentId) {
        const row = document.querySelector(`#appointment-${appointmentId}`);
        const statusCell = row.querySelector(".status");
        statusCell.textContent = "Accepted";

        row.querySelector(".accept-btn").disabled = true;
        row.querySelector(".reject-btn").disabled = true;

        updateAppointmentStatus(appointmentId, 'Accepted');
        showAllAppointmentStatuses(); // Log the statuses after accepting
    }

    // Reject an appointment
    function rejectAppointment(appointmentId) {
        const row = document.querySelector(`#appointment-${appointmentId}`);
        const statusCell = row.querySelector(".status");
        statusCell.textContent = "Rejected";

        row.querySelector(".accept-btn").disabled = true;
        row.querySelector(".reject-btn").disabled = true;

        updateAppointmentStatus(appointmentId, 'Rejected');
        showAllAppointmentStatuses(); // Log the statuses after rejecting
    }

    // Function to update the appointment status in localStorage
    function updateAppointmentStatus(appointmentId, status) {
        const appointments = JSON.parse(localStorage.getItem('appointments')) || [];

        // Find the appointment by ID and update its status
        const appointment = appointments.find(appointment => appointment.id == appointmentId);
        if (appointment) {
            appointment.status = status;
            localStorage.setItem('appointments', JSON.stringify(appointments));
        }
    }

    // Function to accept all appointments
    function acceptAllAppointments() {
        const appointments = JSON.parse(localStorage.getItem('appointments')) || [];

        appointments.forEach(appointment => {
            appointment.status = "Accepted";
        });

        localStorage.setItem('appointments', JSON.stringify(appointments));
        displayAppointments();
        showAllAppointmentStatuses(); // Log all statuses after accepting all
    }

    // Function to show all appointment statuses
    function showAllAppointmentStatuses() {
        const appointments = JSON.parse(localStorage.getItem('appointments')) || [];

        appointments.forEach(appointment => {
            console.log(`Appointment ID: ${appointment.id}, Status: ${appointment.status}`);
        });
    }

    // Event listener for the "Accept All" button
    document.getElementById('acceptAllBtn').addEventListener('click', acceptAllAppointments);

    // Handle form submissions for adding an appointment
    document.getElementById('appointmentForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get form values
        const username = document.getElementById('username').value;
        const doctor = document.getElementById('doctor').value;
        const date = document.getElementById('date').value;

        // Validate form values
        if (!username || !doctor || !date) {
            console.error("Please fill all the fields.");
            return;
        }

        // Get existing appointments from local storage or initialize empty array
        const appointments = JSON.parse(localStorage.getItem('appointments')) || [];

        // Create new appointment object
        const newAppointment = {
            id: appointments.length ? appointments[appointments.length - 1].id + 1 : 1,
            username,
            doctor,
            date,
            status: 'Pending'
        };

        // Add new appointment to the list
        appointments.push(newAppointment);

        // Save updated appointments back to local storage
        localStorage.setItem('appointments', JSON.stringify(appointments));

        // Clear form fields
        document.getElementById('username').value = '';
        document.getElementById('doctor').value = '';
        document.getElementById('date').value = '';

        // Refresh the appointments display
        displayAppointments();
    });

    // Load appointments when the page is ready
    displayAppointments();
});
