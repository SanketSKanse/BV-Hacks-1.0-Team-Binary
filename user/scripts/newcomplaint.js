document.addEventListener('DOMContentLoaded', function() {
    const complaintForm = document.getElementById('complaintForm');
    const priorityTags = document.querySelectorAll('.priority-tag');
    const priorityInput = document.getElementById('priority');

    // Handle priority tag selection
    priorityTags.forEach(tag => {
        tag.addEventListener('click', function() {
            priorityTags.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            priorityInput.value = this.getAttribute('data-priority');
        });
    });

    // Handle form submission
    complaintForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const category = document.getElementById('complaintCategory').value;
        const description = document.getElementById('complaintDescription').value;
        const priority = priorityInput.value;

        // Form validation
        if (!category || !description || !priority) {
            alert('Please fill in all fields');
            return;
        }

        // Create complaint object
        const complaint = {
            id: Date.now(),
            category: category,
            description: description,
            priority: priority,
            status: 'Pending',
            date: new Date().toLocaleDateString()
        };

        // Get existing complaints or initialize empty array
        let complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
        
        // Add new complaint
        complaints.push(complaint);
        
        // Save to localStorage
        localStorage.setItem('complaints', JSON.stringify(complaints));

        alert('Complaint submitted successfully!');
        
        // Reset form
        complaintForm.reset();
        priorityTags.forEach(tag => tag.classList.remove('active'));
        
        // Redirect to my complaints page
        window.location.href = 'mycomplaints.html';
    });
});

// Update the form submission handler to ensure proper data structure
document.getElementById('complaintForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const category = document.getElementById('complaintCategory').value;
    const description = document.getElementById('complaintDescription').value;
    const priority = document.getElementById('priority').value;

    if (!category || !description || !priority) {
        alert('Please fill in all fields');
        return;
    }

    const complaint = {
        id: Date.now(),
        category: category,
        description: description,
        priority: priority,
        date: new Date().toLocaleDateString(),
        status: 'Pending'
    };

    // Get existing complaints or initialize empty array
    let complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    
    // Add new complaint
    complaints.push(complaint);
    
    // Save to localStorage
    localStorage.setItem('complaints', JSON.stringify(complaints));

    alert('Complaint submitted successfully!');
    
    // Reset form
    this.reset();
    document.querySelectorAll('.priority-tag').forEach(tag => tag.classList.remove('active'));
    
    // Redirect to my complaints page
    window.location.href = 'mycomplaints.html';
});

// Priority tag selection
document.querySelectorAll('.priority-tag').forEach(tag => {
    tag.addEventListener('click', function() {
        document.querySelectorAll('.priority-tag').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        document.getElementById('priority').value = this.getAttribute('data-priority');
    });
});
