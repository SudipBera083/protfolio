function toggleChat() {
  let chatPopup = document.getElementById("chatPopup");
  chatPopup.style.display = (chatPopup.style.display === "block") ? "none" : "block";
}

function sendMessage() {
  let userInput = document.getElementById("userInput").value.trim();
  if (userInput === "") return;

  let chatBody = document.getElementById("chatBody");

  // Display user message
  let userMessage = document.createElement("div");
  userMessage.className = "message user-message";
  userMessage.textContent = userInput;
  chatBody.appendChild(userMessage);
  chatBody.scrollTop = chatBody.scrollHeight;

  // Send message to Django API
  fetch('http://127.0.0.1:8000/chat/chat/', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: userInput })
  })
  .then(response => response.json())
  .then(data => {
      // Display bot response
      let botMessage = document.createElement("div");
      botMessage.className = "message bot-message";
      botMessage.textContent = data.reply;
      chatBody.appendChild(botMessage);
      chatBody.scrollTop = chatBody.scrollHeight;
  })
  .catch(error => {
      console.error("Error:", error);
  });

  document.getElementById("userInput").value = "";
}