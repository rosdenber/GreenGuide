from inference_sdk import InferenceHTTPClient
import os

class RoboflowWasteClassifier:
    def __init__(self, api_key, model_id):
        """
        Initialize the Roboflow waste classifier
        
        Args:
            api_key (str): Your Roboflow API key
            model_id (str): Your model ID in the format "project_name/version"
        """
        # Validate API key
        if not api_key or api_key == 'YOUR_API_KEY':
            raise ValueError("Invalid Roboflow API key provided")
        
        self.api_key = api_key
        self.model_id = model_id
        self.client = None
    
    def classify_waste(self, image_path):
        """
        Classify waste in an image using the Roboflow model
        
        Args:
            image_path (str): Path to the image file
            
        Returns:
            dict: Classification results including category and confidence
        """
        try:
            # Initialize the client for each request to ensure fresh connection
            self.client = InferenceHTTPClient(
                api_url="https://serverless.roboflow.com",
                api_key=self.api_key
            )
            
            # Perform inference
            print(f"Performing inference on {image_path} with model {self.model_id}")
            result = self.client.infer(image_path, model_id=self.model_id)
            print(f"Inference result: {result}")
            
            # Extract the most confident prediction
            if 'predictions' in result and len(result['predictions']) > 0:
                # Sort predictions by confidence (highest first)
                sorted_predictions = sorted(result['predictions'], key=lambda x: x['confidence'], reverse=True)
                top_prediction = sorted_predictions[0]
                
                return {
                    'success': True,
                    'category': top_prediction['class'],
                    'confidence': top_prediction['confidence'],
                    'predictions': result['predictions']
                }
            else:
                return {
                    'success': False,
                    'error': 'No predictions found'
                }
                
        except Exception as e:
            print(f"Classification error: {str(e)}")
            return {
                'success': False,
                'error': f'Classification failed: {str(e)}'
            }

# Example usage:
# classifier = RoboflowWasteClassifier("YOUR_API_KEY", "waste_data/1")
# result = classifier.classify_waste("path/to/your/image.jpg")
# print(result)

if __name__ == "__main__":
    # This is just for testing purposes
    # You would replace "YOUR_API_KEY" with your actual Roboflow API key
    # and "waste_data/1" with your actual model ID
    print("Roboflow Waste Classifier Module")
    print("To use this module, import it in your application:")
    print("from roboflow_classifier import RoboflowWasteClassifier")