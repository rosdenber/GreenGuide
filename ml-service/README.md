# ML Service for Waste Classification

This directory contains the machine learning service for classifying waste images.

## Current Implementation

The service currently uses a mock classifier for demonstration purposes. However, it's designed to integrate with Roboflow's inference API for real waste classification.

## Roboflow Integration

To use the Roboflow inference service:

1. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Set Environment Variables**:
   ```bash
   export ROBOFLOW_API_KEY=your_api_key_here
   export ROBOFLOW_MODEL_ID=your_model_id_here
   ```

3. **Run the Service**:
   ```bash
   python app.py
   ```

The service will automatically use the Roboflow model for classification when the inference-sdk is properly installed.

## API Endpoints

- `POST /classify` - Upload an image file to classify the waste type
- `GET /health` - Health check endpoint

## File Structure

- `app.py` - Main Flask application
- `roboflow_classifier.py` - Roboflow classifier implementation
- `requirements.txt` - Python dependencies including inference-sdk

## Usage Notes

The service automatically uses the Roboflow model for classification when the inference-sdk is properly installed. Environment variables for the API key and model ID must be set for the Roboflow integration to work.