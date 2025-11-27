import requests

# Test the ML service
try:
    with open('test_image.jpg', 'rb') as f:
        files = {'image': f}
        response = requests.post('http://localhost:5000/classify', files=files)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
except FileNotFoundError:
    print("Test image not found. Creating a simple test image...")
    # Create a simple test image
    from PIL import Image, ImageDraw
    import io
    
    # Create a simple red square image
    img = Image.new('RGB', (100, 100), color='red')
    img_bytes = io.BytesIO()
    img.save(img_bytes, format='JPEG')
    img_bytes.seek(0)
    
    files = {'image': ('test.jpg', img_bytes, 'image/jpeg')}
    response = requests.post('http://localhost:5000/classify', files=files)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")
except Exception as e:
    print(f"Error: {e}")