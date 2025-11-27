# GreenGuide

GreenGuide is a web application designed to educate users on proper waste segregation, promote sustainability, and support environmental conservation. The app provides comprehensive guides, disposal instructions, eco-friendly tips, and interactive quizzes to help users make informed decisions about waste management.

## Features

### 1. Waste Segregation Guides
- Easy-to-understand instructions on identifying recyclable, biodegradable, and general waste
- Visual guides with examples for better comprehension
- Do's and Don'ts for each waste category

### 2. Proper Disposal Instructions
- Step-by-step instructions for disposing of common items properly
- Categorized browsing for easy access
- Special handling instructions for hazardous materials

### 3. Eco-Friendly Tips
- Daily rotating tips on reusing materials and reducing trash
- Practical advice for living a more sustainable lifestyle
- Filtering options by category (Reduce, Reuse, Recycle, Compost)

### 4. Interactive Quizzes
- Knowledge-testing quizzes on waste management
- Scoring system to track user progress
- Weekly leaderboard with nickname display

### 5. Trash Classification (Extended Feature)
- Image upload functionality for waste items
- Machine learning-powered classification
- Integration with disposal guides based on classification results

## Technology Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js with Express.js
- **Database**: MySQL
- **Machine Learning Service**: Python with Flask/FastAPI
- **Image Handling**: Multer for file uploads

## Project Structure

```
GreenGuide/
├── controllers/
├── models/
├── public/
│   ├── styles.css
│   └── script.js
├── routes/
├── views/
│   ├── index.html
│   ├── guide.html
│   ├── disposal.html
│   ├── tips.html
│   └── quiz.html
├── ml-service/
├── uploads/
├── server.js
├── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MySQL database
- Python (for ML service)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   - Create a MySQL database
   - Update connection details in the configuration

4. Start the server:
   ```bash
   npm start
   ```

5. Access the application at `http://localhost:3000`

## Development

To run the application in development mode with auto-restart:

```bash
npm run dev
```

## Database Schema

The application uses the following tables:
- `guides` - Waste segregation guides
- `tips` - Eco-friendly tips
- `quizzes` - Quiz questions and answers
- `leaderboard` - Quiz scores and rankings

## Machine Learning Service

The ML service is built with Python and provides:
- Image classification for waste items
- REST API integration with the Node.js backend
- Pre-trained model for waste categorization

### Roboflow Integration

The ML service integrates with Roboflow's inference API for real waste classification:

1. Install dependencies: `pip install -r ml-service/requirements.txt`
2. Set your Roboflow API key and model ID as environment variables
3. The service will automatically use the Roboflow model when available

For detailed instructions, see [ml-service/README.md](ml-service/README.md).

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License.

## Contact

For questions or feedback, please contact the development team.