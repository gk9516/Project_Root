export async function sendDataToBackend(data) {
    const response = await fetch('https://projectroot-production.up.railway.app/bfhl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Unknown error occurred');
    }
    return response.json();
}
