import os
import sys
sys.path.append('.')
from dotenv import load_dotenv
load_dotenv()

from roboflow_classifier import RoboflowWasteClassifier
from PIL import Image
import numpy as np

# Create a simple test image
print("Creating test image...")
img = Image.new('RGB', (100, 100), color='red')
img.save('test_image.jpg')
print("Test image created.")

# Test the Roboflow classifier directly
try:
    API_KEY = os.environ.get('ROBOFLOW_API_KEY', 'YOUR_API_KEY')
    MODEL_ID = os.environ.get('ROBOFLOW_MODEL_ID', 'waste_data/1')
    
    print(f"Initializing classifier with API key: {API_KEY[:10]}... and model ID: {MODEL_ID}")
    classifier = RoboflowWasteClassifier(API_KEY, MODEL_ID)
    print("Classifier initialized.")
    
    print("Classifying test image...")
    result = classifier.classify_waste('test_image.jpg')
    print(f"Classification result: {result}")
    
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()

# Clean up
try:
    os.remove('test_image.jpg')
    print("Cleaned up test image.")
except:
    pass