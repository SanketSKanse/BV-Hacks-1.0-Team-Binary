// Dynamic Category Selection
document.querySelectorAll('.category-list button').forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        document.querySelectorAll('.category-list button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        this.classList.add('active');

        // Update category title and workers based on selection.
        const category = this.getAttribute('data-category');
        updateWorkerDetails(category);
    });
});

function updateWorkerDetails(category) {
    const categoryTitle = document.getElementById('category-title');
    const workersContainer = document.getElementById('workers-container');

    const categoryData = {
        'it': {
            title: 'IT Department Contacts',
            workers: [
                {
                    initials: 'RK',
                    name: 'Rahul Kumar',
                    role: 'Network Administrator',
                    email: 'rahul.kumar@college.edu',
                    phone: '+91 9876543210'
                },
                {
                    initials: 'SP',
                    name: 'Sneha Patel',
                    role: 'IT Support Specialist',
                    email: 'sneha.patel@college.edu',
                    phone: '+91 9988776655'
                }
            ]
        },
        'academics': {
            title: 'Academics Department Contacts',
            workers: [
                {
                    initials: 'AJ',
                    name: 'Anjali Joshi',
                    role: 'Academic Coordinator',
                    email: 'anjali.joshi@college.edu',
                    phone: '+91 9765432198'
                }
            ]
        },
        'infrastructure': {
            title: 'Infrastructure Department Contacts',
            workers: [
                {
                    initials: 'VK',
                    name: 'Vikram Singh',
                    role: 'Infrastructure Manager',
                    email: 'vikram.singh@college.edu',
                    phone: '+91 9234567890'
                }
            ]
        },
        'maintenance': {
            title: 'Maintenance Department Contacts',
            workers: [
                {
                    initials: 'RN',
                    name: 'Rajesh Naik',
                    role: 'Maintenance Supervisor',
                    email: 'rajesh.naik@college.edu',
                    phone: '+91 9456789012'
                }
            ]
        },
        'security': {
            title: 'Security Department Contacts',
            workers: [
                {
                    initials: 'SK',
                    name: 'Suresh Kumar',
                    role: 'Security Chief',
                    email: 'suresh.kumar@college.edu',
                    phone: '+91 9345678901'
                }
            ]
        },
        'hostel': {
            title: 'Hostel Management Contacts',
            workers: [
                {
                    initials: 'MP',
                    name: 'Meera Patel',
                    role: 'Hostel Warden',
                    email: 'meera.patel@college.edu',
                    phone: '+91 9567890123'
                }
            ]
        }
    };

    // Update title
    categoryTitle.textContent = categoryData[category].title;

    // Update workers
    workersContainer.innerHTML = categoryData[category].workers.map(worker => `
        <div class="worker-card">
            <div class="worker-avatar">${worker.initials}</div>
            <div class="worker-info">
                <h3>${worker.name}</h3>
                <p>${worker.role}</p>
                <p>Email: ${worker.email}</p>
                <p>Phone: ${worker.phone}</p>
            </div>
        </div>
    `).join('');
}

// Add this at the end of your body
document.addEventListener('DOMContentLoaded', () => {
    // Check for saved theme
    const savedTheme = localStorage.getItem('dashboard-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
});