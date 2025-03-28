document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const complaintModal = document.getElementById('complaintModal');
    const viewModal = document.getElementById('viewModal');
    const newComplaintBtn = document.getElementById('newComplaintBtn');
    const closeBtns = document.querySelectorAll('.close-btn');
    const cancelComplaint = document.getElementById('cancelComplaint');
    const submitComplaint = document.getElementById('submitComplaint');
    const closeViewModal = document.getElementById('closeViewModal');
    const viewBtns = document.querySelectorAll('.view-btn');
    const deleteBtns = document.querySelectorAll('.delete-btn');
    const priorityTags = document.querySelectorAll('.priority-tag');
    const priorityInput = document.getElementById('priority');
    
    // Navigation Links
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Show New Complaint Modal
    newComplaintBtn.addEventListener('click', function() {
        complaintModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
    
    // Close Modals
    function closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    cancelComplaint.addEventListener('click', function() {
        closeModal(complaintModal);
    });
    
    closeViewModal.addEventListener('click', function() {
        closeModal(viewModal);
    });
    
    // Click outside modal to close
    window.addEventListener('click', function(e) {
        if (e.target === complaintModal) {
            closeModal(complaintModal);
        }
        if (e.target === viewModal) {
            closeModal(viewModal);
        }
    });
    
    // Priority Selection
    priorityTags.forEach(tag => {
        tag.addEventListener('click', function() {
            priorityTags.forEach(t => t.classList.remove('selected'));
            this.classList.add('selected');
            priorityInput.value = this.dataset.priority;
        });
    });
    
    // Submit Complaint
    submitComplaint.addEventListener('click', function() {
        const category = document.getElementById('complaintCategory').value;
        const priority = priorityInput.value;
        const description = document.getElementById('complaintDescription').value;
        
        if (!category || !priority || !description) {
            alert('Please fill all required fields');
            return;
        }
        
        console.log('New complaint submitted:', {
            category,
            priority,
            description
        });
        
        closeModal(complaintModal);
        alert('Your complaint has been submitted successfully!');
        
        document.getElementById('complaintForm').reset();
        priorityTags.forEach(t => t.classList.remove('selected'));
        priorityInput.value = '';
    });
    
    // View Complaint Details
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const complaintId = this.dataset.id;
            const row = this.closest('tr');
            const cells = row.querySelectorAll('td');
            
            document.getElementById('complaintId').textContent = complaintId;
            document.getElementById('viewCategory').textContent = cells[1].textContent;
            document.getElementById('viewPriority').textContent = cells[3].textContent.trim();
            document.getElementById('viewStatus').textContent = cells[4].querySelector('.status').textContent;
            document.getElementById('viewDate').textContent = cells[5].textContent;
            document.getElementById('viewDescription').textContent = cells[2].textContent;
            
            viewModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Delete Complaint
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const complaintId = this.dataset.id;
            if (confirm(`Are you sure you want to delete complaint #${complaintId}?`)) {
                console.log('Deleting complaint:', complaintId);
                alert('Complaint deleted successfully!');
            }
        });
    });
    
    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            const linkId = this.id;
            console.log('Navigating to:', linkId.replace('Link', ''));
        });
    });
});