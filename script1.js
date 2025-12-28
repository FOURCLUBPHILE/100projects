const btnEl = document.getElementById("btn");
const emojiNameEl = document.getElementById("emoji-name");
const clearBtn = document.getElementById("delete-btn");



const historyEl = document.getElementById("emoji-history");


const emoji = [];
const emojiHistory = [];



async function getEmoji() {



  btnEl.disabled = true;
  btnEl.innerText = "Loading...";


  let response = await fetch(
    "https://emoji-api.com/emojis?access_key=773b58f681fb786fafdb8392e8b8a75ddc177fd1"
  );

  const data = await response.json();

  for (let i = 0; i < 1500; i++) {
    emoji.push({
      emojiName: data[i].character,
      emojiCode: data[i].unicodeName,
    });
  }



 // enabling  button sfter async work is done
  btnEl.disabled = false;
  btnEl.innerText = "Get Emoji";

}

getEmoji();

btnEl.addEventListener("click", () => {
  const randomNum = Math.floor(Math.random() * emoji.length);
  const selectedEmoji = emoji[randomNum];
  btnEl.innerText = emoji[randomNum].emojiName;
  emojiNameEl.innerText = emoji[randomNum].emojiCode;



  



 emojiHistory.push(selectedEmoji.emojiName);


  if (emojiHistory.length > 5) {
    emojiHistory.shift(); // 
  }

  localStorage.setItem("emojiHistory", JSON.stringify(emojiHistory));
  renderHistory();
});







 clearBtn.addEventListener("click", () =>{

  emojiHistory.length = 0;  //clear array
  historyEl.innerHTML ="";  //clear ui
  
});





  // for getting  saved history
  function renderHistory() {
  historyEl.innerHTML = "";
  emojiHistory.forEach((emo) => {
    const span = document.createElement("span");
    span.innerText = emo;
    span.style.fontSize = "24px";
    span.style.marginRight = "5px";
    historyEl.appendChild(span);
  });

  }

  const savedHistory = localStorage.getItem("emojiHistory");

if (savedHistory) {
  emojiHistory.push(...JSON.parse(savedHistory));
  renderHistory();
}






clearBtn.addEventListener("click", () => {
  emojiHistory.length = 0;
  historyEl.innerHTML = "";
  localStorage.removeItem("emojiHistory");
});


