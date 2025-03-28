document.addEventListener('DOMContentLoaded', function() {
    displayComplaints();
});

function displayComplaints() {
    const complaintsTableBody = document.getElementById('complaintsTableBody');
    let complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    
    // Sort complaints by ID in descending order (latest first)
    complaints.sort((a, b) => b.id - a.id);
    
    complaintsTableBody.innerHTML = '';

    if (complaints.length === 0) {
        complaintsTableBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center;">No complaints found</td>
            </tr>`;
        return;
    }

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