const sheetId = "1xTcPDdVx_rRufZHUjKnZCTnGgLtP58LBfUoLBe4Tyk8"; // Replace with the actual ID of your Google Sheet
let score = 0;
let correct = 0;
let incorrect = 0;

// Fetch the data from the Google Sheet
async function getData() {
  const response = await fetch(
    `https://spreadsheets.google.com/feeds/list/${sheetId}/od6/public/values?alt=json`
    );
  const data = await response.json();
  return data.feed.entry;
}

// Select a random row from the data
function selectRandomRow(data) {
  const randomIndex = Math.floor(Math.random() * data.length);
  return data[randomIndex];
}

  // Display the image and text from the selected row
function displayRow(row) {
    document.getElementById("image").src = row.gsx$image.$a;
    document.getElementById("correct-answer").value = row.gsx$text.$b;
    document.getElementById("TESTANSWER").value = row.gsx$text.$b;
  }
  
  // Check the user's answer
  function checkAnswer() {
    const userAnswer = document.getElementById("user-answer").value;
    const correctAnswer = document.getElementById("correct-answer").value;
    if (userAnswer === correctAnswer) {
      score++;
      correct++;
      document.getElementById("result").innerText = "Correct!";
    } else {
      score--;
      incorrect++;
      document.getElementById("result").innerText =
        "Incorrect. The correct answer is: " + correctAnswer;
    }
    document.getElementById("score").innerText = score;
    document.getElementById("correct").innerText = correct;
    document.getElementById("incorrect").innerText = incorrect;
  }
  
  // Reset the score
  function resetScore() {
    score = 0;
    correct = 0;
    incorrect = 0;
    document.getElementById("score").innerText = score;
    document.getElementById("correct").innerText = correct;
    document.getElementById("incorrect").innerText = incorrect;
  }
  
  // Run the program
  async function run() {
    const data = await getData();
    const randomRow = selectRandomRow(data);
    displayRow(randomRow);
  }

run();