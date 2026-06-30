const quests = [
  { code: "CREATOR", title: "The Creator", message: "Some people play music. You build worlds. KamiSama is not just a name — it is something you created, and I am proud of you for that.", reward: "KamiSama Patch", desc: "Official Wolf God crest added to inventory.", clue: "Next objective: seek the place where the day’s armor waits." },
  { code: "COLLECTOR", title: "The Collector", message: "You always notice the tiny things: tiny jars, tiny books, tiny bags, tiny treasures. I love that you still find wonder in small things.", reward: "Mystery Berry Jar", desc: "A tiny jar filled with sweet loot.", clue: "Next objective: where lost tools would return to the maker." },
  { code: "MAKER", title: "The Maker", message: "This year we became beginners together. You made beanies and a snood. I made bikini tops and chaos. Different vibes, same adventure.", reward: "Crochet Recovery Kit", desc: "Crafting inventory restored.", clue: "Next objective: find the shadow waiting for its new tiny bag adventure." },
  { code: "ADVENTURER", title: "The Adventurer", message: "Errands become side quests with you. Ordinary days become stories. Thank you for making life feel like there is always something to discover.", reward: "Gengar Fanny Pack", desc: "Tiny bag energy upgraded.", clue: "Next objective: where the Wolf God’s mark waits to be worn." },
  { code: "WOLFGOD", title: "The Wolf God", message: "Strong. Focused. Curious. Weird in the best way. Always working, always growing, always doing your lil guy best.", reward: "KamiSama Shirt", desc: "Level 33 streetwear unlocked.", clue: "Final objective: recovery protocol is ready." },
  { code: "FULLRESTORE", title: "HP Restore", message: "You spend so much time taking care of everyone and becoming better. Today, you do not need to earn rest. You already deserve it.", reward: "Full Restore", desc: "Redeemable for one massage and one guilt-free moment to simply exist.", clue: "Quest complete. Save file updated: loved, seen, celebrated." }
];

let unlocked = Number(localStorage.getItem("kamisamaProgress") || "0");

const startScreen = document.getElementById("startScreen");
const questScreen = document.getElementById("questScreen");
const beginBtn = document.getElementById("beginBtn");
const unlockBtn = document.getElementById("unlockBtn");
const resetBtn = document.getElementById("resetBtn");
const codeInput = document.getElementById("codeInput");
const errorText = document.getElementById("errorText");

function updateUI() {
  const q = quests[Math.max(0, unlocked - 1)];
  document.getElementById("questBar").style.width = `${(unlocked / quests.length) * 100}%`;
  document.getElementById("progressText").textContent = `${unlocked}/${quests.length}`;
  const hp = Math.min(99, 68 + unlocked * 5);
  document.getElementById("hpBar").style.width = `${hp}%`;
  document.getElementById("hpText").textContent = `${hp}/99`;

  const rewardBox = document.getElementById("rewardBox");
  const nextClueBox = document.getElementById("nextClueBox");

  if (unlocked === 0) {
    document.getElementById("questTitle").textContent = "Side Quest Accepted";
    document.getElementById("questMessage").textContent = "Enter the first access code to begin Level 33.";
    rewardBox.classList.add("hidden");
    nextClueBox.classList.add("hidden");
  } else {
    document.getElementById("questTitle").textContent = `Quest Complete: ${q.title}`;
    document.getElementById("questMessage").textContent = q.message;
    document.getElementById("rewardName").textContent = q.reward;
    document.getElementById("rewardDesc").textContent = q.desc;
    document.getElementById("nextClue").textContent = q.clue;
    rewardBox.classList.remove("hidden");
    nextClueBox.classList.remove("hidden");
  }

  const inv = document.getElementById("inventoryList");
  inv.innerHTML = "";
  quests.slice(0, unlocked).forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.reward;
    inv.appendChild(li);
  });

  if (unlocked >= quests.length) {
    document.querySelector(".code-box").classList.add("hidden");
  } else {
    document.querySelector(".code-box").classList.remove("hidden");
    codeInput.placeholder = `CODE FOR QUEST ${unlocked + 1}`;
  }
}

beginBtn.addEventListener("click", () => {
  startScreen.classList.remove("active");
  questScreen.classList.add("active");
  updateUI();
});

unlockBtn.addEventListener("click", () => {
  const entered = codeInput.value.trim().toUpperCase().replace(/\s+/g, "");
  const expected = quests[unlocked]?.code;
  if (entered === expected) {
    unlocked += 1;
    localStorage.setItem("kamisamaProgress", unlocked);
    codeInput.value = "";
    errorText.textContent = "";
    updateUI();
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    errorText.textContent = "ACCESS DENIED. Try again, Wolf God.";
  }
});

resetBtn.addEventListener("click", () => {
  if (confirm("Reset KamiSama OS progress?")) {
    unlocked = 0;
    localStorage.setItem("kamisamaProgress", "0");
    updateUI();
  }
});

updateUI();
