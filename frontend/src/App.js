import React, { useState } from 'react';
import { sendDataToBackend } from './api';
import './styles.css';

function App() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async () => {
        try {
            const parsedInput = JSON.parse(input);
            const result = await sendDataToBackend(parsedInput);
            setResponse(result);
            setError('');
        } catch (e) {
            setError('Invalid JSON input');
            setResponse(null);
        }
    };

    const handleOptionChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedOptions([...selectedOptions, value]);
        } else {
            setSelectedOptions(selectedOptions.filter(option => option !== value));
        }
    };

    const displayResponse = () => {
        if (!response) return null;

        return (
            <div className="response-output">
                <h3>Selected Output:</h3>
                {selectedOptions.includes("Alphabets") && (
                    <div className="output-section">
                        <h4>Alphabets:</h4>
                        <p>{JSON.stringify(response.alphabets || [])}</p>
                    </div>
                )}
                {selectedOptions.includes("Numbers") && (
                    <div className="output-section">
                        <h4>Numbers:</h4>
                        <p>{JSON.stringify(response.numbers || [])}</p>
                    </div>
                )}
                {selectedOptions.includes("Highest Lowercase Alphabet") && (
                    <div className="output-section">
                        <h4>Highest Lowercase Alphabet:</h4>
                        <p>{JSON.stringify(response.highest_lowercase_alphabet || [])}</p>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="App">
            <h1 className="title">Data Processor</h1>
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter JSON data"
                className="input-box"
            />
            <div className="selection-box">
                <h3>Select Output Fields:</h3>
                <label>
                    <input type="checkbox" value="Alphabets" onChange={handleOptionChange} />
                    Alphabets
                </label>
                <label>
                    <input type="checkbox" value="Numbers" onChange={handleOptionChange} />
                    Numbers
                </label>
                <label>
                    <input type="checkbox" value="Highest Lowercase Alphabet" onChange={handleOptionChange} />
                    Highest Lowercase Alphabet
                </label>
            </div>
            <button onClick={handleSubmit} className="submit-button">Submit</button>
            {error && <p className="error">{error}</p>}
            
            {response && displayResponse()}
        </div>
    );
}

export default App;
