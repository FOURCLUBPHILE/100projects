const btnEl = document.getElementById("btn");
const emojiNameEl = document.getElementById("emoji-name");

const emoji = [];

const emojiHistory = [];
const historyEl = document.getElementById("emoji-history");


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

  btnEl.innerText = emoji[randomNum].emojiName;
  emojiNameEl.innerText = emoji[randomNum].emojiCode;

const selectedEmoji = emoji[randomNum];

  



 emojiHistory.push(selectedEmoji.emojiName);


  if (emojiHistory.length > 5) {
    emojiHistory.shift(); // 
  }


    historyEl.innerHTML = "";
  emojiHistory.forEach((emo) => {
    const span = document.createElement("span");
    span.innerText = emo;
    span.style.fontSize = "24px";
    span.style.marginRight = "5px";
    historyEl.appendChild(span);
  });

});




