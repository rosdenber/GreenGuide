-- GreenGuide Database Schema

-- Create database
CREATE DATABASE IF NOT EXISTS greenguide;
USE greenguide;

-- Guides table
CREATE TABLE guides (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category ENUM('recyclable', 'biodegradable', 'general') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tips table
CREATE TABLE tips (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quizzes table
CREATE TABLE quizzes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    questions JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Leaderboard table
CREATE TABLE leaderboard (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nickname VARCHAR(50) NOT NULL,
    score INT NOT NULL,
    quiz_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
);

-- Insert sample data for guides
INSERT INTO guides (title, content, category) VALUES
('Recycling Guide', 'How to recycle properly: Rinse containers, remove caps, flatten cardboard boxes, and check local guidelines.', 'recyclable'),
('Composting Guide', 'How to compost organic waste: Balance greens and browns, chop materials, turn regularly, and keep moist.', 'biodegradable'),
('General Waste Guide', 'What items go to general waste: Plastic wrap, used tissues, cigarette butts, broken ceramics, and disposable diapers.', 'general');

-- Insert sample data for tips
INSERT INTO tips (title, content) VALUES
('Reduce Plastic Use', 'Bring reusable bags when shopping, use refillable water bottles, choose products with minimal packaging, and buy in bulk.'),
('Repurpose Glass Jars', 'Glass jars can be transformed into storage containers, vases, candle holders, and organizers for small items.'),
('Proper Recycling Preparation', 'Rinse containers, remove caps and lids, flatten cardboard boxes, and check local guidelines for accepted materials.');

-- Insert sample data for quizzes
INSERT INTO quizzes (title, questions) VALUES
('Waste Segregation Basics', '[
    {
        "question": "Which of the following is biodegradable?",
        "options": ["Plastic bottle", "Apple core", "Aluminum can", "Glass bottle"],
        "correctAnswer": 1
    },
    {
        "question": "Where should you put used batteries?",
        "options": ["Recyclable bin", "Biodegradable bin", "General waste bin", "Special collection point"],
        "correctAnswer": 3
    },
    {
        "question": "Which of these items should NOT be composted?",
        "options": ["Vegetable peels", "Coffee grounds", "Meat scraps", "Eggshells"],
        "correctAnswer": 2
    },
    {
        "question": "What is the best way to reduce plastic waste?",
        "options": ["Recycle all plastic items", "Use reusable alternatives", "Throw in general waste", "Burn plastic items"],
        "correctAnswer": 1
    }
]');

-- Insert sample data for leaderboard
INSERT INTO leaderboard (nickname, score, quiz_id) VALUES
('EcoWarrior', 10, 1),
('GreenGuru', 8, 1),
('RecycleRex', 7, 1),
('SustainableSam', 6, 1),
('EcoEllie', 5, 1);