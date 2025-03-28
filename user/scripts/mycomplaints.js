document.addEventListener('DOMContentLoaded', function() {
    displayComplaints();
});

function displayComplaints() {
    const complaintsTableBody = document.getElementById('complaintsTableBody');
    const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    
    complaintsTableBody.innerHTML = '';

    complaints.forEach(complaint => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${complaint.id}</td>
            <td>${complaint.category}</td>
            <td>
                <span class="priority-badge ${complaint.priority.toLowerCase()}">
                    ${complaint.priority}
                </span>
            </td>
            <td>${complaint.description}</td>
            <td>${complaint.date}</td>
            <td>
                <span class="status-badge ${complaint.status.toLowerCase()}">
                    ${complaint.status}
                </span>
            </td>
        `;
        complaintsTableBody.appendChild(row);
    });
}