# Backend Dockerfile
FROM python:3.9-slim

WORKDIR /app

# Copy the application code
COPY . /app

# Install dependencies
RUN pip install -r requirements.txt

# Expose port 5000
EXPOSE 5000

# Run the Flask application
CMD ["python", "app.py"]
