document.addEventListener('DOMContentLoaded', () => {
    // Comprehensive complaint history data
    const complaintHistoryData = [
        {
            id: '#1001',
            studentName: 'Emily Johnson',
            department: 'Hostel',
            description: 'Broken water heater',
            dateReported: '2024-01-15',
            resolutionDate: '2024-01-18',
            status: 'resolved',
            details: 'Water heater in room 305 was replaced with a new unit.'
        },
        {
            id: '#1002',
            studentName: 'Michael Chen',
            department: 'IT',
            description: 'Laptop repair',
            dateReported: '2024-02-02',
            resolutionDate: '2024-02-07',
            status: 'resolved',
            details: 'Laptop motherboard replaced under warranty.'
        },
        {
            id: '#1003',
            studentName: 'Sarah Williams',
            department: 'Electrical',
            description: 'Faulty power outlet',
            dateReported: '2024-02-20',
            resolutionDate: null,
            status: 'in-progress',
            details: 'Electrician scheduled to inspect and repair outlet.'
        },
        {
            id: '#1004',
            studentName: 'David Rodriguez',
            department: 'Cafeteria',
            description: 'Food quality complaint',
            dateReported: '2024-03-05',
            resolutionDate: '2024-03-10',
            status: 'resolved',
            details: 'Meeting held with cafeteria management to address concerns.'
        },
        {
            id: '#1005',
            studentName: 'Olivia Thompson',
            department: 'Hostel',
            description: 'Room cleaning issue',
            dateReported: '2024-03-15',
            resolutionDate: null,
            status: 'pending',
            details: 'Awaiting response from hostel management.'
        }
    ];

    const tableBody = document.getElementById('complaintsHistoryBody');
    const departmentFilter = document.getElementById('departmentFilter');
    const statusFilter = document.getElementById('statusFilter');
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const filterBtn = document.getElementById('filterBtn');
    const exportPDFBtn = document.getElementById('exportPDFBtn');
    const exportExcelBtn = document.getElementById('exportExcelBtn');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const pageInfo = document.getElementById('pageInfo');

    // Pagination variables
    let currentPage = 1;
    const itemsPerPage = 5;

    // Render complaints history table
    function renderComplaints(complaints) {
        tableBody.innerHTML = '';
        complaints.forEach(complaint => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${complaint.id}</td>
                <td>${complaint.studentName}</td>
                <td>${complaint.department}</td>
                <td>${complaint.description}</td>
                <td>${complaint.dateReported}</td>
                <td>${complaint.resolutionDate || 'N/A'}</td>
                <td>
                    <span class="status-badge status-${complaint.status}">
                        ${complaint.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                </td>
                <td>
                    <button class="btn view-details" data-id="${complaint.id}">View</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Filter complaints
    function filterComplaints() {
        const selectedDepartment = departmentFilter.value.toLowerCase();
        const selectedStatus = statusFilter.value.toLowerCase();
        const startDate = startDateInput.value;
        const endDate = endDateInput.value;

        const filteredComplaints = complaintHistoryData.filter(complaint => {
            const departmentMatch = !selectedDepartment || 
                complaint.department.toLowerCase() === selectedDepartment;
            const statusMatch = !selectedStatus || 
                complaint.status.toLowerCase() === selectedStatus;
            const dateMatch = (!startDate || complaint.dateReported >= startDate) &&
                (!endDate || complaint.dateReported <= endDate);
            return departmentMatch && statusMatch && dateMatch;
        });

        // Reset pagination
        currentPage = 1;
        renderPaginatedComplaints(filteredComplaints);
    }

    // Render paginated complaints
    function renderPaginatedComplaints(complaints) {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedComplaints = complaints.slice(startIndex, endIndex);

        renderComplaints(paginatedComplaints);

        // Update page info
        const totalPages = Math.ceil(complaints.length / itemsPerPage);
        pageInfo.textContent = Page ${currentPage} of ${totalPages};

        // Enable/disable pagination buttons
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages;
    }

    // Pagination event listeners
    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            filterComplaints();
        }
    });

    nextPageBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(complaintHistoryData.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            filterComplaints();
        }
    });

    // Filter event listeners
    filterBtn.addEventListener('click', filterComplaints);
    departmentFilter.addEventListener('change', filterComplaints);
    statusFilter.addEventListener('change', filterComplaints);

    // Export functionality (placeholder)
    exportPDFBtn.addEventListener('click', () => {
        alert('Export to PDF functionality to be implemented');
    });

    exportExcelBtn.addEventListener('click', () => {
        alert('Export to Excel functionality to be implemented');
    });

    // Initial render
    renderPaginatedComplaints(complaintHistoryData);
});
