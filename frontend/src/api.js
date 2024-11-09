export async function sendDataToBackend(data) {
    const response = await fetch('http://localhost:5000/bfhl', {
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
