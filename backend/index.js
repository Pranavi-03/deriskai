const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

//const admin = require("firebase-admin");
//const serviceAccount = require("./serviceAccount.json");

//const TelegramBot = require('node-telegram-bot-api');
//const BOT_TOKEN = '7590929468:AAGH9kP6ytq7iopI9pGvvzu-0Cl__AhpQX0';
//const TEST_CHAT_ID = '5049471654'; // TEMP for testing

//const bot = new TelegramBot(BOT_TOKEN, { polling: false });
//admin.initializeApp({
 // credential: admin.credential.cert(serviceAccount)
//});

//const db = admin.firestore();


app.use(cors());
app.use(express.json());

// In-memory alert list (demo only)
let alerts = [];

// Utility: Convert contract address to numerical features (0–1 scaled)
function addressToFeatures(address) {
  return address
    .replace(/^0x/, '')                          // remove '0x' if exists
    .padEnd(10, '0')                             // pad to at least 10 characters
    .slice(0, 10)                                // take first 10 chars
    .split('')
    .slice(0, 5)                                 // we want 5 features
    .map(char => {
      const hex = parseInt(char, 16);           // convert hex char to number
      return isNaN(hex) ? 0.1 : (hex % 10) / 10; // normalize to 0–1
    });
}

// Analyze Smart Contract Risk
app.post('/api/analyze', async (req, res) => {
  const { contractAddress } = req.body;

  const features = addressToFeatures(contractAddress);

  try {
    const response = await axios.post('http://localhost:8001/api/score', {
      features
    });

    const riskScore = response.data.score;

    let description = '';
    if (riskScore > 70) {
      description = '🚨 High Risk: Critical vulnerability detected';
    } else if (riskScore > 40) {
      description = '⚠️ Medium Risk: Suspicious patterns observed';
    } else {
      description = '✅ Low Risk: Contract appears healthy';
    }

    // Log alert to in-memory list
    const alert = {
      id: Date.now(),
      contract: contractAddress,
      riskScore,
      description,
      votes: { approve: 0, reject: 0 },
      status: "Pending"
    };

    alerts.push(alert);
        // ✅ Send Telegram bot message
    //await bot.sendMessage(
      //TEST_CHAT_ID,
      //`🚨 *New Risk Alert!*\n\n*Contract:* ${contractAddress}\n*Risk:* ${description}`,
     // { parse_mode: 'Markdown' }
   // );

    //await db.collection("alerts").doc(`${alert.id}`).set(alert);


    res.json({
      success: true,
      contract: contractAddress,
      riskScore,
      description
    });

  } catch (err) {
    console.error("Error in /api/analyze:", err.message);
    res.status(500).json({ success: false, message: "Error scoring contract" });
  }
});

// Get all alerts
app.get('/alerts', (req, res) => {
  res.json({ success: true, alerts });
});

// Vote on alert
app.post('/alerts/vote', (req, res) => {
  const { id, voteType } = req.body;
  const alert = alerts.find(a => a.id === id);
  if (!alert) {
    return res.status(404).json({ success: false, message: "Alert not found" });
  }

  alert.votes[voteType]++;

  const { approve, reject } = alert.votes;

  // Simulated Nano Contract Logic
  if (approve >= 3 && alert.status === "Pending") {
    alert.status = "Approved 🚀 (Auto Action: Pool Paused)";
    alert.actionTaken = "pausePool";
  } else if (reject >= 3 && alert.status === "Pending") {
    alert.status = "Rejected ❌ (No action taken)";
    alert.actionTaken = "none";
  }

  res.json({ success: true, updated: alert });
});

// Start server
app.listen(PORT, () => {
  console.log(`Node backend running on http://localhost:${PORT}`);
});
