document.addEventListener('DOMContentLoaded', function() {
    const complaintsTableBody = document.getElementById('complaintsTableBody');

    function populateTable() {
        complaintsTableBody.innerHTML = ''; // Clear existing rows

        let complaints = JSON.parse(localStorage.getItem('complaints') || '[]');

        console.log('Complaints from localStorage:', complaints);

        complaints.forEach(complaint => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${complaint.id}</td>
                <td>${complaint.category}</td>
                <td>${complaint.priority}</td>
                <td>${complaint.description}</td>
                <td>${new Date(complaint.date).toLocaleDateString()}</td>
                <td>${complaint.status}</td>
            `;
            complaintsTableBody.appendChild(row);
        });
    }

    populateTable();
});