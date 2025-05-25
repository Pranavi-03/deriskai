# 🚀 DeRiskAI – AI-Powered Risk Detection for DeFi Protocols

DeRiskAI is a decentralized AI-based platform that analyzes DeFi smart contracts, assigns risk scores, and allows the community to vote on them using a Telegram Mini App. It helps prevent hacks, rug pulls, and smart contract exploits in the Web3 space.

---

## 🧠 Problem Statement

In DeFi protocols, vulnerabilities like flash loan attacks or oracle manipulation can lead to major losses. There's a need for an automated, intelligent, and decentralized system to detect and mitigate risks before damage occurs.

---

## 🎯 Objective

- Analyze smart contracts using AI
- Score their risk level (Low / Medium / High)
- Log risky contracts in a dashboard
- Let users vote via DApp or Telegram Mini App
- Simulate DAO governance and smart contract control

---

## ⚙️ Tech Stack

| Layer        | Tech                                |
|--------------|--------------------------------------|
| 🔐 Auth      | Firebase Authentication              |
| 🌐 Frontend  | React.js + Bootstrap + Vercel        |
| 🧠 AI Engine | Python Flask (IsolationForest model) |
| 🔁 Backend   | Node.js (Express + Axios)            |
| 🗳 Voting     | DAO-style logic with Nano Contracts  |
| 📲 Telegram  | Telegram Mini App Web Integration    |

---

## 🔍 Features

- 🔐 User auth with Firebase (login, signup, delete, logout)
- 🧠 Real-time smart contract analysis with AI
- 📊 Dashboard to track all alerts
- ✅ Community voting on alerts (Approve / Reject)
- 📲 Vote inside Telegram Mini App
- 🚀 Simulated Nano Contract triggers ("pause pool")

---


## 🛠️ Run Locally

### 1. Backend (Node.js)
```bash
cd backend
npm install
node index.js
