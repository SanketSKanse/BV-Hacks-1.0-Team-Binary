document.addEventListener('DOMContentLoaded', function() {
    displayComplaints();
    updateComplaintStats();
});

function displayComplaints() {
    const complaintsTableBody = document.getElementById('adminComplaintsTable').querySelector('tbody');
    let complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    
    // Sort complaints by date (newest first)
    complaints.sort((a, b) => b.id - a.id);
    
    complaintsTableBody.innerHTML = '';

    if (complaints.length === 0) {
        complaintsTableBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center;">No complaints found</td>
            </tr>`;
        return;
    }

    complaints.forEach(complaint => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${complaint.id}</td>
            <td>${complaint.category}</td>
            <td>
                <span class="priority-badge ${complaint.priority.toLowerCase()}">${complaint.priority}</span>
            </td>
            <td>${complaint.description}</td>
            <td>${complaint.date}</td>
            <td>
                <select class="status-select" onchange="updateStatus(${complaint.id}, this.value)">
                    <option value="Pending" ${complaint.status === 'Pending' ? 'selected' : ''}>Pending</option>
                    <option value="In Progress" ${complaint.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                    <option value="Resolved" ${complaint.status === 'Resolved' ? 'selected' : ''}>Resolved</option>
                </select>
            </td>
            <td>
                <button onclick="deleteComplaint(${complaint.id})" class="delete-btn">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        complaintsTableBody.appendChild(row);
    });
}

function updateComplaintStats() {
    const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    
    const stats = {
        total: complaints.length,
        pending: complaints.filter(c => c.status === 'Pending').length,
        inProgress: complaints.filter(c => c.status === 'In Progress').length,
        resolved: complaints.filter(c => c.status === 'Resolved').length
    };

    // Update dashboard statistics
    document.getElementById('totalComplaints').textContent = stats.total;
    document.getElementById('pendingComplaints').textContent = stats.pending;
    document.getElementById('inProgressComplaints').textContent = stats.inProgress;
    document.getElementById('resolvedComplaints').textContent = stats.resolved;
}

function updateStatus(id, newStatus) {
    let complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    const index = complaints.findIndex(c => c.id === id);
    
    if (index !== -1) {
        complaints[index].status = newStatus;
        localStorage.setItem('complaints', JSON.stringify(complaints));
        updateComplaintStats();
    }
}

function deleteComplaint(id) {
    if (confirm('Are you sure you want to delete this complaint?')) {
        let complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
        complaints = complaints.filter(c => c.id !== id);
        localStorage.setItem('complaints', JSON.stringify(complaints));
        displayComplaints();
        updateComplaintStats();
    }
}