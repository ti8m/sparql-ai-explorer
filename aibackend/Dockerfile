# Base Image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy requirements file
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the app code (server.py)
COPY server.py .
COPY query_generator.py .
COPY query_optimizer.py .
COPY fine_tuning_material/example_commands.txt /app/example_commands.txt
COPY fine_tuning_material/ontology.txt /app/ontology.txt
COPY fine_tuning_material/prefixes.txt /app/prefixes.txt
COPY model /app/model

# Expose the port the app runs on
EXPOSE 8091

# Command to run the application
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8091"]