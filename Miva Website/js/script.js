// COS 106 - JavaScript functionality for Academic Planner and Contact Form

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Academic Planner (Task Management)
    // ==========================================
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    
    // Array to store tasks
    let tasks = [];

    // Function to render tasks to the DOM
    function renderTasks() {
        if (!taskList) return; // Exit if not on the planner page
        
        taskList.innerHTML = ''; // Clear current list
        
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            
            const span = document.createElement('span');
            span.className = 'task-text';
            span.textContent = task.text;
            
            const actionDiv = document.createElement('div');
            actionDiv.className = 'task-actions';
            
            // Complete Button
            const completeBtn = document.createElement('button');
            completeBtn.className = 'btn-complete';
            completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
            completeBtn.addEventListener('click', () => toggleTask(index));
            
            // Delete Button
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn-delete';
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => deleteTask(index));
            
            actionDiv.appendChild(completeBtn);
            actionDiv.appendChild(deleteBtn);
            
            li.appendChild(span);
            li.appendChild(actionDiv);
            
            taskList.appendChild(li);
        });
    }

    // Function to add a task
    function addTask() {
        const text = taskInput.value.trim();
        if (text !== '') {
            tasks.push({ text: text, completed: false });
            taskInput.value = '';
            renderTasks();
        } else {
            alert('Please enter a task.');
        }
    }

    // Function to toggle completion status
    function toggleTask(index) {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    }

    // Function to delete a task
    function deleteTask(index) {
        tasks.splice(index, 1);
        renderTasks();
    }

    // Event Listeners for Planner
    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', addTask);
    }
    
    if (taskInput) {
        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addTask();
        });
    }

    // ==========================================
    // 2. Contact Form Validation
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default submission
            
            let isValid = true;
            
            // Get form fields
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const message = document.getElementById('message');
            
            // Error display elements
            const nameError = document.getElementById('nameError');
            const emailError = document.getElementById('emailError');
            const phoneError = document.getElementById('phoneError');
            const messageError = document.getElementById('messageError');
            
            // Reset errors
            nameError.style.display = 'none';
            emailError.style.display = 'none';
            phoneError.style.display = 'none';
            messageError.style.display = 'none';
            
            // Validation: Not empty
            if (name.value.trim() === '') {
                nameError.textContent = 'Name is required';
                nameError.style.display = 'block';
                isValid = false;
            }
            
            // Validation: Email format
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email.value.trim() === '') {
                emailError.textContent = 'Email is required';
                emailError.style.display = 'block';
                isValid = false;
            } else if (!emailPattern.test(email.value.trim())) {
                emailError.textContent = 'Please enter a valid email address';
                emailError.style.display = 'block';
                isValid = false;
            }
            
            // Validation: Phone format (digits only)
            const phonePattern = /^\d+$/;
            if (phone.value.trim() === '') {
                phoneError.textContent = 'Phone number is required';
                phoneError.style.display = 'block';
                isValid = false;
            } else if (!phonePattern.test(phone.value.trim())) {
                phoneError.textContent = 'Phone number must contain only digits';
                phoneError.style.display = 'block';
                isValid = false;
            }
            
            // Validation: Message not empty
            if (message.value.trim() === '') {
                messageError.textContent = 'Message is required';
                messageError.style.display = 'block';
                isValid = false;
            }
            
            // Final check before simulated submission
            if (isValid) {
                alert('Thank you! Your message has been sent successfully.');
                contactForm.reset();
            }
        });
    }

});
