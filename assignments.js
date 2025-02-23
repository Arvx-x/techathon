document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('file-input');
    const uploadBox = document.getElementById('upload-box');
    const fileInfo = document.getElementById('file-info');
    const gradeBtn = document.getElementById('grade-btn');
    const assignmentsWindow = document.getElementById('assignments-window');
    const assignmentForm = document.getElementById('assignment-form');

    // Handle drag and drop
    uploadBox.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadBox.style.borderColor = '#9b59b6';
        uploadBox.style.background = 'rgba(142, 68, 173, 0.1)';
    });

    uploadBox.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadBox.style.borderColor = '#8e44ad';
        uploadBox.style.background = 'transparent';
    });

    uploadBox.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadBox.style.borderColor = '#8e44ad';
        uploadBox.style.background = 'transparent';
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    });

    // Handle file selection
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    });

    function handleFile(file) {
        fileInfo.textContent = `Selected file: ${file.name}`;
        gradeBtn.disabled = false;
    }

    // Handle form submission
    assignmentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const file = fileInput.files[0] || null;
        if (!file) return;

        // Simulate grading process
        gradeBtn.textContent = 'Grading...';
        gradeBtn.disabled = true;

        // Simulate API call delay
        setTimeout(() => {
            const grade = Math.floor(Math.random() * 31) + 70; // Random grade between 70-100
            displayAssignment(file.name, grade);
            
            // Reset form
            fileInput.value = '';
            fileInfo.textContent = 'Supported formats: PDF, DOC, DOCX, TXT, JPG, PNG';
            gradeBtn.textContent = 'Grade Assignment';
            gradeBtn.disabled = true;
        }, 2000);
    });

    function displayAssignment(fileName, grade) {
        const assignmentItem = document.createElement('div');
        assignmentItem.className = 'assignment-item';
        assignmentItem.innerHTML = `
            <div class="assignment-info">
                <i class="fas fa-file-alt assignment-icon"></i>
                <div class="assignment-details">
                    <h4>${fileName}</h4>
                    <p>Submitted ${new Date().toLocaleDateString()}</p>
                </div>
            </div>
            <div class="assignment-grade">
                Grade: ${grade}%
            </div>
        `;
        assignmentsWindow.insertBefore(assignmentItem, assignmentsWindow.firstChild);
    }
}); 