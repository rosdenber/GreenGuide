const axios = require('axios');

async function testAPI() {
  try {
    // Test getting all guides
    console.log('Testing GET /api/guides');
    const guidesResponse = await axios.get('http://localhost:3000/api/guides');
    console.log('Guides:', guidesResponse.data);
    
    // Test getting all tips
    console.log('\nTesting GET /api/tips');
    const tipsResponse = await axios.get('http://localhost:3000/api/tips');
    console.log('Tips:', tipsResponse.data);
    
    // Test getting all quizzes
    console.log('\nTesting GET /api/quizzes');
    const quizzesResponse = await axios.get('http://localhost:3000/api/quizzes');
    console.log('Quizzes:', quizzesResponse.data);
    
    // Test submitting a quiz
    console.log('\nTesting POST /api/quizzes/submit');
    const submitResponse = await axios.post('http://localhost:3000/api/quizzes/submit', {
      quizId: 1,
      answers: [1, 3, 2, 1],
      nickname: 'TestUser'
    });
    console.log('Submit result:', submitResponse.data);
    
    // Test getting leaderboard
    console.log('\nTesting GET /api/quizzes/leaderboard');
    const leaderboardResponse = await axios.get('http://localhost:3000/api/quizzes/leaderboard');
    console.log('Leaderboard:', leaderboardResponse.data);
    
    console.log('\nAll tests passed!');
  } catch (error) {
    console.error('Test failed:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
}

testAPI();