const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const pickRandom = (array) =>
  array[Math.floor(Math.random() * array.length)];

const fortunes = [
  "You will debug it in 5 minutes... after 55 minutes of panic.",
  "Your next commit will be clean and meaningful.",
  "A bug will disappear when you add one console.log().",
  "You passed the vibe check today. 😎",
  "Stack Overflow will save you today.",
];

const jokes = [
  "Why did the developer go broke? Because they used up all their cache.",
  "My code has two moods: works or why-is-this-happening.",
  "I told my program a joke... it just threw an exception.",
  "99 little bugs in the code... take one down, 127 left.",
];

const vibeMap = {
  happy: {
    emoji: "😄",
    message: "Keep going — you're shipping greatness!",
  },
  tired: {
    emoji: "🥱",
    message: "Hydrate. Stretch. Then commit.",
  },
  stressed: {
    emoji: "😵‍💫",
    message: "Breathe. One bug at a time.",
  },
};

let smashes = 0;

app.get("/api/fortune", (req, res) => {
  res.json({
    fortune: pickRandom(fortunes),
    vibe: "mystical ✨",
  });
});

app.get("/api/joke", (req, res) => {
  res.json({
    joke: pickRandom(jokes),
    laughterLevel: "😂😂😂",
  });
});

app.get("/api/vibe", (req, res) => {
  const mood = (req.query.mood || "").toLowerCase();
  const vibe = vibeMap[mood];

  if (!vibe) {
    return res.json({
      mood: mood || "unknown",
      emoji: "🤔",
      message: "Try mood=happy, tired, or stressed.",
      tip: "Yes, your code has feelings.",
    });
  }

  res.json({
    mood,
    ...vibe,
    status: "vibe-verified ✅",
  });
});

app.post("/api/smash", (req, res) => {
  smashes++;
  res.json({
    smashes,
    message: "SMASH registered 💥",
  });
});

app.get("/api/smashes", (req, res) => {
  res.json({
    smashes,
    intensity: smashes > 10 ? "🔥🔥🔥" : "🙂",
  });
});

app.get("/api/secret", (req, res) => {
  if (req.query.code === "411L") {
    return res.json({
      message: "🎉 Secret unlocked!",
      reward: "+10 luck on your next merge",
    });
  }

  res.status(403).json({
    message: "Access denied 😄",
    hint: "Try code=411L",
  });
});

app.listen(PORT, () => {
  console.log(``);
});