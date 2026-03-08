// Agent status simulation
let isSimulationRunning = false;

function getTimestamp() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour12: false });
}

function addConsoleLine(message, type = 'info') {
    const console = document.getElementById('statusConsole');
    const line = document.createElement('div');
    line.className = `console-line ${type}`;

    const timestamp = document.createElement('span');
    timestamp.className = 'timestamp';
    timestamp.textContent = `[${getTimestamp()}]`;

    line.appendChild(timestamp);
    line.appendChild(document.createTextNode(message));

    console.appendChild(line);
    console.scrollTop = console.scrollHeight;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function startSimulation() {
    if (isSimulationRunning) {
        return;
    }

    isSimulationRunning = true;
    const console = document.getElementById('statusConsole');
    console.innerHTML = '';
    const button = document.querySelector('.simulate-btn');
    button.textContent = 'Running...';
    button.disabled = true;

    const steps = [
        { message: 'Harbor AI Agent Starting...', type: 'ready', delay: 800 },
        { message: 'Connecting to Azure DevOps...', type: 'info', delay: 1200 },
        { message: 'Authentication successful', type: 'success', delay: 600 },
        { message: 'Fetching Active Tasks (State = Active)...', type: 'info', delay: 1500 },
        { message: 'Found 3 active tasks', type: 'success', delay: 800 },
        { message: 'Selecting highest priority task: #12345', type: 'info', delay: 1000 },
        { message: 'Reading task details and requirements...', type: 'processing', delay: 1200 },
        { message: 'Starting Architecture Analysis...', type: 'info', delay: 1000 },
        { message: 'Analyzing service dependencies...', type: 'processing', delay: 1500 },
        { message: 'Identifying affected components...', type: 'processing', delay: 1200 },
        { message: 'Architecture analysis complete', type: 'success', delay: 600 },
        { message: 'Creating Implementation Plan...', type: 'info', delay: 1500 },
        { message: 'Planning database schema changes...', type: 'processing', delay: 1000 },
        { message: 'Planning API endpoints...', type: 'processing', delay: 1000 },
        { message: 'Planning validation logic...', type: 'processing', delay: 1000 },
        { message: 'Implementation plan created', type: 'success', delay: 800 },
        { message: 'Starting Code Implementation...', type: 'info', delay: 1000 },
        { message: 'Generating TypeScript models...', type: 'processing', delay: 1500 },
        { message: 'Creating repository layer...', type: 'processing', delay: 1500 },
        { message: 'Implementing service layer...', type: 'processing', delay: 1500 },
        { message: 'Adding API controllers...', type: 'processing', delay: 1500 },
        { message: 'Code implementation complete', type: 'success', delay: 800 },
        { message: 'Starting Testing & Validation...', type: 'info', delay: 1000 },
        { message: 'Running unit tests...', type: 'processing', delay: 2000 },
        { message: 'Running integration tests...', type: 'processing', delay: 2000 },
        { message: 'Validating API responses...', type: 'processing', delay: 1500 },
        { message: 'All tests passed ✓', type: 'success', delay: 800 },
        { message: 'Creating feature branch from dev...', type: 'info', delay: 1200 },
        { message: 'Branch feature/12345-implementation created', type: 'success', delay: 600 },
        { message: 'Committing changes to git...', type: 'info', delay: 1000 },
        { message: 'Pushing to remote repository...', type: 'processing', delay: 1500 },
        { message: 'Code pushed successfully', type: 'success', delay: 800 },
        { message: 'Generating Pull Request...', type: 'info', delay: 1200 },
        { message: 'Creating PR description...', type: 'processing', delay: 1000 },
        { message: 'Linking to Azure DevOps ticket...', type: 'processing', delay: 800 },
        { message: 'Pull Request created: #142', type: 'success', delay: 800 },
        { message: 'Updating Azure DevOps ticket...', type: 'info', delay: 1000 },
        { message: 'Adding PR link to ticket...', type: 'processing', delay: 800 },
        { message: 'Changing status to Closed...', type: 'processing', delay: 800 },
        { message: 'Ticket #12345 marked as Closed', type: 'success', delay: 800 },
        { message: '✓ Workflow complete!', type: 'success', delay: 600 },
        { message: 'Checking for additional tasks...', type: 'info', delay: 1000 },
        { message: '2 more active tasks found', type: 'info', delay: 800 },
        { message: 'Agent ready for next task', type: 'ready', delay: 600 }
    ];

    for (const step of steps) {
        addConsoleLine(step.message, step.type);
        await sleep(step.delay);
    }

    button.textContent = 'Start Simulation';
    button.disabled = false;
    isSimulationRunning = false;

    addConsoleLine('─'.repeat(50), 'ready');
    addConsoleLine('Simulation complete. Click Start Simulation to run again.', 'ready');
}

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add animation on scroll for workflow steps
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.workflow-step').forEach(step => {
    observer.observe(step);
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('Harbor AI Dashboard loaded');
    console.log('This is a presentation-only dashboard');
    console.log('No actual agent execution occurs');
});
