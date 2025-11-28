from flask import Flask, request, jsonify
from PIL import Image
import numpy as np
import tensorflow as tf
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
print("Loaded environment variables:")
print(f"ROBOFLOW_API_KEY: {os.getenv('ROBOFLOW_API_KEY')}")
print(f"ROBOFLOW_MODEL_ID: {os.getenv('ROBOFLOW_MODEL_ID')}")

# Try to import Roboflow classifier
try:
    from roboflow_classifier import RoboflowWasteClassifier
    ROBOFLOW_AVAILABLE = True
except ImportError:
    ROBOFLOW_AVAILABLE = False
    print("Roboflow classifier not available. Using mock classifier.")

app = Flask(__name__)

# Load the pre-trained model (this is a placeholder)
# In a real implementation, you would load your actual trained model
def load_model():
    # For demonstration purposes, we'll create a mock model
    # model = tf.keras.models.load_model('path/to/your/model.h5')
    # return model
    return None

# Initialize Roboflow classifier if available
if ROBOFLOW_AVAILABLE:
    # TODO: Replace with your actual API key and model ID
    # You should store these in environment variables for security
    API_KEY = os.environ.get('ROBOFLOW_API_KEY', 'YOUR_API_KEY')
    MODEL_ID = os.environ.get('ROBOFLOW_MODEL_ID', 'waste_data/1')
    print(f"Initializing Roboflow classifier with API key: {API_KEY[:10]}... and model ID: {MODEL_ID}")
    
    try:
        roboflow_classifier = RoboflowWasteClassifier(API_KEY, MODEL_ID)
        print("Roboflow classifier initialized successfully")
    except Exception as e:
        print(f"Failed to initialize Roboflow classifier: {e}")
        roboflow_classifier = None
else:
    roboflow_classifier = None
    print("Roboflow classifier not available")

# Placeholder for the actual model
model = load_model()

# Define waste categories
CATEGORIES = ['biodegradable', 'non-biodegradable', 'recyclable', 'green-waste', 'hazardous']

def preprocess_image(image_path):
    """Preprocess the image for model prediction"""
    try:
        # Open and preprocess the image
        image = Image.open(image_path)
        image = image.resize((224, 224))  # Resize to match model input
        image = np.array(image) / 255.0   # Normalize pixel values
        image = np.expand_dims(image, axis=0)  # Add batch dimension
        return image
    except Exception as e:
        print(f"Error preprocessing image: {e}")
        return None

def classify_waste(image_path):
    """Classify the waste category using the ML model"""
    print(f"Classifying image: {image_path}")
    
    # Use Roboflow classifier if available
    if roboflow_classifier is not None:
        print("Using Roboflow classifier")
        result = roboflow_classifier.classify_waste(image_path)
        
        # If Roboflow returns no predictions, return a special response
        # that indicates the classifier is working but didn't find anything
        if result.get('success') == False and 'No predictions found' in result.get('error', ''):
            return {
                'success': True,
                'result': {
                    'category': 'unclassified',
                    'confidence': 0.0,
                    'message': 'No waste items detected in the image'
                }
            }
        
        return result
    else:
        # If Roboflow is not available, return an error
        return {
            'success': False,
            'error': 'Roboflow classifier not available'
        }

@app.route('/classify', methods=['POST'])
def classify():
    """API endpoint for classifying waste images"""
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400
        
        image_file = request.files['image']
        
        if image_file.filename == '':
            return jsonify({'error': 'No image selected'}), 400
        
        # Save the uploaded image temporarily
        image_path = f"temp_{image_file.filename}"
        image_file.save(image_path)
        
        # Classify the image
        result = classify_waste(image_path)
        
        # Remove the temporary image file
        os.remove(image_path)
        
        if result is None:
            return jsonify({'error': 'Failed to process image'}), 500
        
        # Check if classification was successful
        if not result.get('success', False):
            return jsonify({
                'success': False,
                'error': result.get('error', 'Classification failed')
            }), 500
        
        # For the unclassified case, we still want to return success
        if result.get('result', {}).get('category') == 'unclassified':
            return jsonify({
                'success': True,
                'result': result.get('result')
            })
        
        # If this is a direct result from Roboflow (not our unclassified wrapper)
        # then reformat it to match our expected structure
        if 'category' in result and 'confidence' in result:
            return jsonify({
                'success': True,
                'result': {
                    'category': result['category'],
                    'confidence': result['confidence']
                }
            })
        
        # Ensure the result has the required fields (for our wrapper format)
        result_data = result.get('result', {})
        if 'category' not in result_data or 'confidence' not in result_data:
            return jsonify({'error': 'Invalid result format from classifier'}), 500
        
        return jsonify({
            'success': True,
            'result': result_data
        })
    
    except Exception as e:
        # Log the error for debugging
        print(f"Classification error: {str(e)}")
        return jsonify({'error': f'Classification failed: {str(e)}'}), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)