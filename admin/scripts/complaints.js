document.addEventListener('DOMContentLoaded', () => {
    const complaintsData = [
        {
            id: '#1245',
            studentName: 'Alice Johnson',
            department: 'Hostel',
            description: 'Bathroom water leakage',
            status: 'in-progress',
            details: 'Water is continuously leaking from the bathroom ceiling. Need immediate repair.',
            dateReported: '2024-03-15',
            priority: 'High'
        },
        {
            id: '#1246',
            studentName: 'Bob Smith',
            department: 'IT',
            description: 'Wifi connectivity issues',
            status: 'pending',
            details: 'Intermittent wifi connection in dormitory block A.',
            dateReported: '2024-03-16',
            priority: 'Medium'
        },
        {
            id: '#1247',
            studentName: 'Charlie Brown',
            department: 'Electrical',
            description: 'Power outlet not working',
            status: 'resolved',
            details: 'Power outlet in study room 204 is not functioning.',
            dateReported: '2024-03-10',
            priority: 'Low'
        }
    ];

    const tableBody = document.getElementById('complaintsTableBody');
    const departmentFilter = document.getElementById('departmentFilter');
    const statusFilter = document.getElementById('statusFilter');
    const createComplaintBtn = document.getElementById('createComplaintBtn');
    const modal = document.getElementById('complaintModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const closeModalBtns = document.querySelectorAll('.close-modal, #closeModalBtn');
    const updateStatusBtn = document.getElementById('updateStatusBtn');

    // Render complaints table
    function renderComplaints(complaints) {
        tableBody.innerHTML = '';
        complaints.forEach(complaint => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${complaint.id}</td>
                <td>${complaint.studentName}</td>
                <td>${complaint.department}</td>
                <td>${complaint.description}</td>
                <td>
                    <span class="status-badge status-${complaint.status}">
                        ${complaint.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                </td>
                <td>
                    <button class="btn view-complaint" data-id="${complaint.id}">View</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Add event listeners to view buttons
        document.querySelectorAll('.view-complaint').forEach(btn => {
            btn.addEventListener('click', () => {
                const complaintId = btn.dataset.id;
                showComplaintDetails(complaintId);
            });
        });
    }

    // Show complaint details in modal
    function showComplaintDetails(complaintId) {
        const complaint = complaintsData.find(c => c.id === complaintId);
        if (complaint) {
            modalTitle.textContent = `Complaint ${complaint.id}`;
            modalBody.innerHTML = `
                <p><strong>Student:</strong> ${complaint.studentName}</p>
                <p><strong>Department:</strong> ${complaint.department}</p>
                <p><strong>Description:</strong> ${complaint.description}</p>
                <p><strong>Details:</strong> ${complaint.details}</p>
                <p><strong>Date Reported:</strong> ${complaint.dateReported}</p>
                <p><strong>Priority:</strong> ${complaint.priority}</p>
                <p><strong>Current Status:</strong> 
                    <span class="status-badge status-${complaint.status}">
                        ${complaint.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                </p>
            `;
            modal.style.display = 'block';
        }
    }

    // Filter complaints
    function filterComplaints() {
        const selectedDepartment = departmentFilter.value.toLowerCase();
        const selectedStatus = statusFilter.value.toLowerCase();

        const filteredComplaints = complaintsData.filter(complaint => {
            const departmentMatch = !selectedDepartment || 
                complaint.department.toLowerCase() === selectedDepartment;
            const statusMatch = !selectedStatus || 
                complaint.status.toLowerCase() === selectedStatus;
            return departmentMatch && statusMatch;
        });

        renderComplaints(filteredComplaints);
    }

    // Initial render
    renderComplaints(complaintsData);

    // Filter event listeners
    departmentFilter.addEventListener('change', filterComplaints);
    statusFilter.addEventListener('change', filterComplaints);

    // Modal close functionality
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    });

    // Create complaint (placeholder)
    createComplaintBtn.addEventListener('click', () => {
        alert('Create Complaint functionality to be implemented');
    });

    // Update status (placeholder)
    updateStatusBtn.addEventListener('click', () => {
        alert('Update Status functionality to be implemented');
    });

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});