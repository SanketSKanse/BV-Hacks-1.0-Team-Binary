document.addEventListener('DOMContentLoaded', function() {
    displayComplaints();
    updateMetrics();
    updateChartData();
});

function displayComplaints() {
    const complaintsTableBody = document.getElementById('complaintsTableBody');
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
            <td>#${complaint.id}</td>
            <td>${complaint.category}</td>
            <td><span class="priority-badge priority-${complaint.priority.toLowerCase()}">${complaint.priority}</span></td>
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
                <button class="btn" onclick="viewDetails(${complaint.id})">View Details</button>
            </td>
        `;
        complaintsTableBody.appendChild(row);
    });
}

function updateMetrics() {
    const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    
    const metrics = {
        total: complaints.length,
        resolved: complaints.filter(c => c.status === 'Resolved').length,
        pending: complaints.filter(c => c.status === 'Pending').length,
        inProgress: complaints.filter(c => c.status === 'In Progress').length
    };

    // Calculate response rate
    const responseRate = complaints.length > 0 
        ? Math.round((metrics.resolved / metrics.total) * 100) 
        : 0;

    // Update metric cards
    document.querySelector('.card-metric:nth-child(1) .metric-value').textContent = metrics.total;
    document.querySelector('.card-metric:nth-child(2) .metric-value').textContent = metrics.resolved;
    document.querySelector('.card-metric:nth-child(3) .metric-value').textContent = metrics.pending;
    document.querySelector('.card-metric:nth-child(4) .metric-value').textContent = `${responseRate}%`;
}

function updateStatus(id, newStatus) {
    let complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    const complaint = complaints.find(c => c.id === id);
    
    if (complaint) {
        complaint.status = newStatus;
        localStorage.setItem('complaints', JSON.stringify(complaints));
        updateMetrics();
        updateChartData();
    }
}

function viewDetails(id) {
    // Implement view details functionality
    alert('View details functionality coming soon!');
}

function updateChartData() {
    const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    
    // Update department distribution chart
    const departmentData = {};
    complaints.forEach(complaint => {
        departmentData[complaint.category] = (departmentData[complaint.category] || 0) + 1;
    });

    // Update status chart
    const statusData = {
        'Pending': complaints.filter(c => c.status === 'Pending').length,
        'In Progress': complaints.filter(c => c.status === 'In Progress').length,
        'Resolved': complaints.filter(c => c.status === 'Resolved').length
    };

    // Re-initialize charts with new data
    initCharts(departmentData, statusData);
}