const inputField = document.getElementById("sendmessage");

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#sendmessage").addEventListener("keydown", function (e) {
        if (e.code === "Enter") {
            let input = inputField.value;
            inputField.value = "";
            answerQuestion(input);
        }
    });
});


function answerQuestion(input) {
    const messagesContainer = document.getElementById("messages");

    let userDiv = document.createElement("div");
    userDiv.id = "user";
    userDiv.className = "user response";
    userDiv.innerHTML = `${input}`;
    messagesContainer.appendChild(userDiv);

    let botDiv = document.createElement("div");
    let botText = document.createElement("span");
    botDiv.id = "bot";
    botDiv.className = "bot response";
    //botText.innerText = retrieveAnswer(input);
    botText.innerText = "The phrase \"and away we go\" is also famously associated with the late-night television show \"The Tonight Show Starring Johnny Carson.\" Johnny Carson, who hosted the show from 1962 to 1992, would often say \"and away we go\" as he began the show's opening monologue.";
    botDiv.appendChild(botText);
    messagesContainer.appendChild(botDiv);
}

function retrieveAnswer(input) {
    const response = fetch('https://openai-workspace-copilot.australiaeast.inference.ml.azure.com/score', {
        Method: 'POST',
        redirect: 'follow', 
        mode: 'no-cors',
        Headers: {
            Accept: 'application.json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer WzcYSPZN1ugw7VXDiEJpYcQ0KfHR0VWI',
            'azureml-model-deployment': 'openai-workspace-copilot-1'
        },
        Body: JSON.stringify({
            inputs: {
                question: input
            }
        })
    });

    console.log(response);

    return data.answer[0];
}