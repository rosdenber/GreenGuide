const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

// Load environment variables
require('dotenv').config();

// ML Service URL
const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:5000';

/**
 * Classify waste image using the ML service
 * @param {string} imagePath - Path to the image file
 * @returns {Promise<Object>} Classification result
 */
async function classifyWaste(imagePath) {
  try {
    // Create FormData
    const formData = new FormData();
    formData.append('image', fs.createReadStream(imagePath));
    
    // Send request to ML service
    const response = await axios.post(`${ML_SERVICE_URL}/classify`, formData, {
      headers: {
        ...formData.getHeaders()
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('ML Service error:', error.message);
    throw new Error(`ML Service error: ${error.message}`);
  }
}

module.exports = {
  classifyWaste
};