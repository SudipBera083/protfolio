document.getElementById('responseForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let subject = document.getElementById('subject').value;
    let msg = document.getElementById('msg').value;
    let responseMessage = document.getElementById('responseMessage');
    

    fetch('http://127.0.0.1:8000/api/submit/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            subject: subject,
            msg: msg
        })
    })
    .then(response => response.json())
    .then(data => {
        responseMessage.style.color = 'green';
        responseMessage.textContent = "Response submitted successfully!";
        document.getElementById('responseForm').reset();
    })
    .catch(error => {
        responseMessage.style.color = 'red';
        responseMessage.textContent = `Error submitting response!\n${error}`;
    });
});