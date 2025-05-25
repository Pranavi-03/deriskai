import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Dashboard() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAlerts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/alerts');
      setAlerts(res.data.alerts);
    } catch (err) {
      toast.error("Failed to load alerts");
    } finally {
      setLoading(false);
    }
  };

  const vote = async (id, type) => {
    try {
      await axios.post('http://localhost:5000/alerts/vote', { id, voteType: type });
      toast.success(`Vote ${type} submitted`);
      fetchAlerts();
    } catch (err) {
      toast.error("Voting failed");
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  return (
    <div className="container my-5 text-light">
      <ToastContainer position="bottom-right" />
      <h2>Risk Alerts Dashboard</h2>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-light" role="status" />
        </div>
      ) : alerts.length === 0 ? (
        <p className="mt-4">No alerts logged yet.</p>
      ) : (
        <table className="table table-dark mt-4">
          <thead>
            <tr>
              <th>Contract</th>
              <th>Score</th>
              <th>Description</th>
              <th>Status</th>
              <th>Vote</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map(alert => (
              <tr key={alert.id}>
                <td>{alert.contract}</td>
                <td>{alert.riskScore}</td>
                <td>{alert.description}</td>
                <td>
                  <span className={`badge ${
                    alert.status.includes("Approved") ? 'bg-success' :
                    alert.status.includes("Rejected") ? 'bg-danger' : 'bg-warning text-dark'
                  }`}>
                    {alert.status}
                  </span><br />
                  {alert.actionTaken && (
                    <span className="text-info">
                      Action: {alert.actionTaken === "pausePool" ? "Pool Paused" : "None"}
                    </span>
                  )}
                </td>
                <td>
                  <button className="btn btn-success btn-sm me-2" onClick={() => vote(alert.id, 'approve')}>Approve</button>
                  <button className="btn btn-danger btn-sm" onClick={() => vote(alert.id, 'reject')}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;
