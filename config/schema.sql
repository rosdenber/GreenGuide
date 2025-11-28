-- GreenGuide Database Schema

-- Create database
CREATE DATABASE IF NOT EXISTS greenguide;
USE greenguide;

-- Guides table
CREATE TABLE guides (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category ENUM('recyclable', 'biodegradable', 'non-biodegradable', 'green-waste', 'hazardous') NOT NULL,
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
('Non-Biodegradable Guide', 'Items that do not decompose naturally and require special disposal methods.', 'non-biodegradable'),
('Green Waste Guide', 'Organic waste from gardens and parks like grass clippings, leaves, and tree prunings.', 'green-waste'),
('Hazardous Waste Guide', 'Materials that can be harmful to human health or the environment and require special handling.', 'hazardous');

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
        "options": ["Recycle all plastic items", "Use reusable alternatives", "Dispose in residual waste", "Burn plastic items"],
        "correctAnswer": 1
    },
    {
        "question": "What should you do with old electronics like phones and computers?",
        "options": ["Dispose in residual waste", "Take them to an e-waste recycling center", "Put them in the recyclable bin", "Bury them in soil"],
        "correctAnswer": 1
    },
    {
        "question": "Which item belongs in the recyclable bin?",
        "options": ["Pizza box with grease stains", "Clean aluminum foil", "Used paper towel", "Plastic bag"],
        "correctAnswer": 1
    },
    {
        "question": "How should you prepare glass bottles for recycling?",
        "options": ["Remove labels only", "Rinse and remove caps", "Crush them completely", "Leave them dirty"],
        "correctAnswer": 1
    },
    {
        "question": "What is the purpose of separating waste at home?",
        "options": ["To make more work for yourself", "To help recycling facilities process materials efficiently", "To create more garbage trucks trips", "To increase landfill usage"],
        "correctAnswer": 1
    },
    {
        "question": "Which of these hazardous materials requires special disposal?",
        "options": ["Cardboard box", "Paint cans", "Newspaper", "Plastic bottles"],
        "correctAnswer": 1
    },
    {
        "question": "What percentage of waste can be recycled or composted in a typical household?",
        "options": ["10-20%", "30-40%", "50-60%", "70-80%"],
        "correctAnswer": 3
    },
    {
        "question": "Which of the following is biodegradable?",
        "options": ["Plastic bag", "Banana peel", "Glass bottle", "Tin can"],
        "correctAnswer": 1
    },
    {
        "question": "Which waste should go into the non-biodegradable bin?",
        "options": ["Apple core", "Plastic straw", "Food leftovers", "Dead leaves"],
        "correctAnswer": 1
    },
    {
        "question": "Which item is recyclable?",
        "options": ["Used tissue", "Candy wrapper", "Clean cardboard", "Diaper"],
        "correctAnswer": 2
    },
    {
        "question": "What type of waste is a diaper?",
        "options": ["Recyclable", "Hazardous", "Residual", "Biodegradable"],
        "correctAnswer": 2
    },
    {
        "question": "Which of the following is hazardous waste?",
        "options": ["Orange peel", "Battery", "Paper bag", "Plastic cup"],
        "correctAnswer": 1
    },
    {
        "question": "Which is an example of e-waste (electronic waste)?",
        "options": ["Shampoo sachet", "Old cellphone", "Glass jar", "Tin can"],
        "correctAnswer": 1
    },
    {
        "question": "Which waste belongs to the biodegradable category?",
        "options": ["Eggshell", "Aluminum can", "Styrofoam", "Broken glass"],
        "correctAnswer": 0
    },
    {
        "question": "Which of these should be placed in the recyclable bin?",
        "options": ["Metal can", "Leftover food", "Diaper", "Plastic spoon"],
        "correctAnswer": 0
    },
    {
        "question": "What type of waste is a candy wrapper?",
        "options": ["Hazardous", "Biodegradable", "Residual", "Recyclable"],
        "correctAnswer": 2
    },
    {
        "question": "Where should broken light bulbs be disposed?",
        "options": ["Biodegradable", "Hazardous", "Recyclable", "Residual"],
        "correctAnswer": 1
    },
    {
        "question": "Why is it important to segregate waste?",
        "options": ["To make garbage look colorful", "To reduce pollution and manage waste properly", "To increase trash in landfills", "To make waste heavier"],
        "correctAnswer": 1
    },
    {
        "question": "What happens when waste is not segregated properly?",
        "options": ["Waste becomes cleaner", "It may cause pollution and health problems", "Plants grow faster", "It reduces toxic chemicals"],
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