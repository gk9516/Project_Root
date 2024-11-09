from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import base64

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/bfhl', methods=['POST'])
def process_data():
    try:
        data = request.json.get("data", [])
        file_b64 = request.json.get("file_b64", None)
    except (TypeError, KeyError):
        return jsonify({"is_success": False, "error": "Invalid JSON format"}), 400

    user_id = "ganeshk_02042004"
    response = {
        "is_success": True,
        "user_id": user_id,
        "email": "ganeshrajan2.00@gmail.com",
        "roll_number": "RA2111003010298",
    }

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

    if file_b64:
        try:
            file_data = base64.b64decode(file_b64)
            response["file_valid"] = True
            response["file_mime_type"] = "unknown"
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
