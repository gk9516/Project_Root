import React, { useState } from 'react';
import { sendDataToBackend } from './api';

function App() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        try {
            const parsedInput = JSON.parse(input);
            const result = await sendDataToBackend(parsedInput);
            setResponse(result);
            setError('');
        } catch (e) {
            setError('Invalid JSON input');
        }
    };

    return (
        <div className="App">
            <h1>Data Processor</h1>
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter JSON data"
            />
            <button onClick={handleSubmit}>Submit</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {response && (
                <div>
                    <h3>Response:</h3>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default App;
