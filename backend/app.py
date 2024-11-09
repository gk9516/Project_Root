from flask import Flask, request, jsonify
import base64

app = Flask(__name__)

@app.route('/bfhl', methods=['POST'])
def process_data():
    # Validate input JSON format
    try:
        data = request.json.get("data", [])
        file_b64 = request.json.get("file_b64", None)
    except (TypeError, KeyError):
        return jsonify({"is_success": False, "error": "Invalid JSON format"}), 400

    # Example user details
    user_id = "your_fullname_ddmmyyyy"  # Replace with actual user ID format
    response = {
        "is_success": True,
        "user_id": user_id,
        "email": "your_email@example.com",
        "roll_number": "ABCD123",
    }

    # Separate numbers and alphabets
    numbers, alphabets = [], []
    highest_lowercase_alphabet = []

    for item in data:
        if isinstance(item, str):
            if item.isdigit():
                numbers.append(item)
            elif item.isalpha():
                alphabets.append(item)
                if item.islower() and (not highest_lowercase_alphabet or item > highest_lowercase_alphabet[0]):
                    highest_lowercase_alphabet = [item]

    response["numbers"] = numbers
    response["alphabets"] = alphabets
    response["highest_lowercase_alphabet"] = highest_lowercase_alphabet

    # Handle file if provided
    if file_b64:
        try:
            file_data = base64.b64decode(file_b64)
            response["file_valid"] = True
            response["file_mime_type"] = "unknown"  # Replace with actual MIME detection if needed
            response["file_size_kb"] = len(file_data) / 1024
        except Exception:
            response["file_valid"] = False
    else:
        response["file_valid"] = False

    return jsonify(response)

@app.route('/bfhl', methods=['GET'])
def get_operation_code():
    return jsonify({"operation_code": 1})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
