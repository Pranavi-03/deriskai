import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TelegramMini() {
  const [alerts, setAlerts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAlerts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/alerts');
      const pending = res.data.alerts.filter(a => a.status.includes("Pending"));
      setAlerts(pending);
    } catch (err) {
      toast.error("Failed to fetch alerts");
    } finally {
      setLoading(false);
    }
  };

  const vote = async (id, type) => {
    try {
      await axios.post('http://localhost:5000/alerts/vote', {
        id,
        voteType: type
      });
      toast.success("Vote submitted");
      fetchAlerts();
    } catch (err) {
      toast.error("Voting failed");
    }
  };

  useEffect(() => {
    try {
      if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.ready();
        const tgUser = window.Telegram.WebApp.initDataUnsafe?.user;
        if (tgUser) setUser(tgUser);
      }
    } catch (err) {
      console.warn("Telegram SDK not available", err);
    }
    fetchAlerts();
  }, []);

  return (
    <div className="container text-light">
      <ToastContainer position="bottom-right" />
      <h2 className="mt-4 mb-3">🛡️ DeRiskAI - Telegram Voting</h2>
      {user && <p>Hello, {user.first_name} 👋</p>}

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-light" role="status" />
        </div>
      ) : alerts.length === 0 ? (
        <p>No pending alerts</p>
      ) : (
        alerts.map(alert => (
          <div key={alert.id} className="mb-4 p-3 border border-light rounded">
            <p><strong>Contract:</strong> {alert.contract}</p>
            <p><strong>Score:</strong> {alert.riskScore}</p>
            <p><strong>Description:</strong> {alert.description}</p>
            <button className="btn btn-success btn-sm me-2" onClick={() => vote(alert.id, 'approve')}>✅ Approve</button>
            <button className="btn btn-danger btn-sm" onClick={() => vote(alert.id, 'reject')}>❌ Reject</button>
          </div>
        ))
      )}
    </div>
  );
}

export default TelegramMini;
