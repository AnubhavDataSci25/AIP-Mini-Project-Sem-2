const applyData = JSON.parse(localStorage.getItem('applyingFor'));
const token = localStorage.getItem('token');

if (!applyData || !token) {
    window.location.href = 'jobs.html';
}

document.getElementById('jobInfo').innerText = `Applying for: ${applyData.title}`;

document.getElementById('applyForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const resumeLink = document.getElementById('resumeLink').value;

    const res = await fetch('http://localhost:5000/api/applications/apply', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            jobId: applyData.id,
            resumeLink
        })
    });

    const data = await res.json();
    if (res.ok) {
        alert('Application submitted successfully!');
        localStorage.removeItem('applyingFor');
        window.location.href = 'jobs.html';
    } else {
        alert(data.message);
    }
});