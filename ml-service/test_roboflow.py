import requests
from PIL import Image
import io
import os
from dotenv import load_dotenv
load_dotenv()

# Create a simple test image
print("Creating test image...")
img = Image.new('RGB', (100, 100), color='green')
img_bytes = io.BytesIO()
img.save(img_bytes, format='JPEG')
img_bytes.seek(0)
print("Test image created.")

# Test the classification endpoint
try:
    files = {'image': ('test.jpg', img_bytes, 'image/jpeg')}
    response = requests.post('http://localhost:5000/classify', files=files)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")
except Exception as e:
    print(f"Error: {e}")

# Clean up
try:
    if os.path.exists('temp_test.jpg'):
        os.remove('temp_test.jpg')
except:
    pass