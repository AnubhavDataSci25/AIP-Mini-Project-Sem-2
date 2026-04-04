const JOB_API = 'http://localhost:5000/api/jobs';
const APP_API = 'http://localhost:5000/api/applications';
const token = localStorage.getItem('token');

// For Users
async function fetchAllJobs() {
    const res = await fetch(JOB_API);
    const jobs = await res.json();
    const container = document.getElementById('jobListing');
    if (!container) return;
    
    container.innerHTML = jobs.map(job => `
        <div class="col-md-4 mb-3">
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">${job.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${job.company}</h6>
                    <p class="mb-1">📍 ${job.location}</p>
                    <p class="mb-1">💰 ${job.salary}</p>
                    <p class="card-text small text-truncate">${job.description}</p>
                    <button onclick="goToApply('${job._id}', '${job.title}')" class="btn btn-primary btn-sm">Apply Now</button>
                </div>
            </div>
        </div>
    `).join('');
}

function goToApply(id, title) {
    if (!token) return window.location.href = 'login.html';
    localStorage.setItem('applyingFor', JSON.stringify({ id, title }));
    window.location.href = 'apply.html';
}

async function fetchUserApplications() {
    const res = await fetch(`${APP_API}/my`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const apps = await res.json();
    const container = document.getElementById('myApps');
    if (!container) return;

    container.innerHTML = apps.map(app => `
        <div class="col-md-6 mb-2">
            <div class="card p-2">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <strong>${app.job.title}</strong> at ${app.job.company}
                    </div>
                    <span class="badge ${app.status === 'Applied' ? 'bg-secondary' : app.status === 'Selected' ? 'bg-success' : 'bg-danger'}">
                        ${app.status}
                    </span>
                </div>
            </div>
        </div>
    `).join('');
}

// For Admins
const addJobForm = document.getElementById('addJobForm');
if (addJobForm) {
    addJobForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const payload = {
            title: document.getElementById('jobTitle').value,
            company: document.getElementById('jobCompany').value,
            location: document.getElementById('jobLoc').value,
            salary: document.getElementById('jobSal').value,
            description: document.getElementById('jobDesc').value
        };
        const res = await fetch(JOB_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(payload)
        });
        if (res.ok) {
            alert('Job Added');
            location.reload();
        }
    });
}

async function fetchAdminJobs() {
    const res = await fetch(JOB_API);
    const jobs = await res.json();
    const container = document.getElementById('adminJobList');
    if (!container) return;

    container.innerHTML = jobs.map(job => `
        <div class="list-group-item d-flex justify-content-between align-items-center">
            <div>
                <strong>${job.title}</strong> (${job.company})
            </div>
            <button onclick="deleteJob('${job._id}')" class="btn btn-sm btn-danger">Delete</button>
        </div>
    `).join('');
}

async function deleteJob(id) {
    if (!confirm('Are you sure?')) return;
    await fetch(`${JOB_API}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    location.reload();
}

async function fetchAdminApplications() {
    const res = await fetch(APP_API, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const apps = await res.json();
    const tbody = document.getElementById('appTableBody');
    if (!tbody) return;

    tbody.innerHTML = apps.map(app => `
        <tr>
            <td>${app.user.name}<br><small>${app.user.email}</small></td>
            <td>${app.job.title}</td>
            <td><a href="${app.resumeLink}" target="_blank">View Resume</a></td>
            <td>${app.status}</td>
            <td>
                <select onchange="updateStatus('${app._id}', this.value)" class="form-select form-select-sm">
                    <option value="Applied" ${app.status === 'Applied' ? 'selected' : ''}>Applied</option>
                    <option value="Selected" ${app.status === 'Selected' ? 'selected' : ''}>Select</option>
                    <option value="Rejected" ${app.status === 'Rejected' ? 'selected' : ''}>Reject</option>
                </select>
            </td>
        </tr>
    `).join('');
}

async function updateStatus(id, status) {
    await fetch(`${APP_API}/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status })
    });
    alert('Status updated');
}