export async function sendDataToBackend(data) {
    const response = await fetch('http://127.0.0.1:5000/bfhl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return response.json();
}
