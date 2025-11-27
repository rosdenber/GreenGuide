// Common JavaScript functionality for GreenGuide

document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const mobileToggle = document.createElement('div');
    mobileToggle.className = 'mobile-toggle';
    mobileToggle.innerHTML = '☰';
    mobileToggle.style.cssText = `
        display: none;
        position: absolute;
        top: 1rem;
        right: 1rem;
        font-size: 1.5rem;
        cursor: pointer;
        color: white;
    `;
    
    const nav = document.querySelector('nav');
    const navList = nav.querySelector('ul');
    
    // Add mobile toggle to navigation
    nav.style.position = 'relative';
    nav.appendChild(mobileToggle);
    
    // Handle mobile toggle click
    mobileToggle.addEventListener('click', function() {
        if (navList.style.display === 'flex') {
            navList.style.display = 'none';
        } else {
            navList.style.display = 'flex';
            navList.style.flexDirection = 'column';
            navList.style.position = 'absolute';
            navList.style.top = '100%';
            navList.style.left = '0';
            navList.style.width = '100%';
            navList.style.backgroundColor = '#388e3c';
            navList.style.zIndex = '1000';
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navList.style.display = 'flex';
            navList.style.flexDirection = 'row';
            navList.style.position = 'static';
            navList.style.width = 'auto';
            navList.style.backgroundColor = 'transparent';
        } else {
            navList.style.display = 'none';
        }
    });
    
    // Classify trash link handler
    const classifyLinks = document.querySelectorAll('#classify-link');
    classifyLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Trash classification feature will be available soon! Upload your image to identify the correct waste category.');
        });
    });
    
    // Form validation for nickname input
    const nicknameInput = document.getElementById('nickname');
    if (nicknameInput) {
        nicknameInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^a-zA-Z0-9_\- ]/g, '');
        });
    }
});

// Function to show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 10000;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        animation: slideIn 0.3s, fadeOut 0.5s 2.5s;
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.backgroundColor = '#4CAF50';
            break;
        case 'error':
            notification.style.backgroundColor = '#f44336';
            break;
        case 'warning':
            notification.style.backgroundColor = '#ff9800';
            break;
        default:
            notification.style.backgroundColor = '#2196F3';
    }
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Add to document
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

// Function to validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Function to validate phone number
function validatePhone(phone) {
    const re = /^[0-9]{10,15}$/;
    return re.test(phone);
}