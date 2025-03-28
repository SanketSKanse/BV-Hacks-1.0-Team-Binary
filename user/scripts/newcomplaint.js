document.addEventListener('DOMContentLoaded', function() {
    const complaintForm = document.getElementById('complaintForm');
    const priorityTags = document.querySelectorAll('.priority-tag');
    const priorityInput = document.getElementById('priority');

    // Priority tag selection
    priorityTags.forEach(tag => {
        tag.addEventListener('click', () => {
            // Remove active class from all tags
            priorityTags.forEach(t => t.classList.remove('active'));
            // Add active class to selected tag
            tag.classList.add('active');
            // Set the hidden input value
            priorityInput.value = tag.dataset.priority;
        });
    });

    complaintForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const complaint = {
            id: Date.now(),
            category: document.getElementById('complaintCategory').value,
            priority: priorityInput.value,
            description: document.getElementById('complaintDescription').value,
            date: new Date().toLocaleDateString(),
            status: 'Pending'
        };

        // Validate form
        if (!complaint.category || !complaint.priority || !complaint.description) {
            alert('Please fill in all fields');
            return;
        }

        // Get existing complaints from localStorage
        let complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
        
        // Add new complaint
        complaints.push(complaint);
        
        // Save to localStorage
        localStorage.setItem('complaints', JSON.stringify(complaints));

        // Reset form
        complaintForm.reset();
        priorityTags.forEach(tag => tag.classList.remove('active'));
        
        alert('Complaint submitted successfully!');
        
        // Redirect to my complaints page
        window.location.href = 'mycomplaints.html';
    });
});
