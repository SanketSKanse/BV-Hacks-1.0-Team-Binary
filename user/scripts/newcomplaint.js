document.addEventListener('DOMContentLoaded', function() {
    // Priority selection
    const priorityTags = document.querySelectorAll('.priority-tag');
    const priorityInput = document.getElementById('priority');

    priorityTags.forEach(tag => {
        tag.addEventListener('click', function() {
            priorityTags.forEach(t => t.classList.remove('selected'));
            this.classList.add('selected');
            priorityInput.value = this.dataset.priority;
        });
    });

    // Form submission
    const complaintForm = document.getElementById('complaintForm');

    complaintForm.addEventListener('submit', function(e) {
        e.preventDefault();

        if (!priorityInput.value) {
            alert('Please select a priority level');
            return;
        }

        // Get form data
        const formData = {
            category: document.getElementById('complaintCategory').value,
            description: document.getElementById('complaintDescription').value,
            priority: priorityInput.value,
            date: new Date().toISOString()
        };
