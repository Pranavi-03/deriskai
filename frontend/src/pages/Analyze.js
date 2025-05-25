import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Analyze() {
  const [address, setAddress] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    setResult(null);
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/analyze', {
        contractAddress: address
      });
      setResult(response.data);
      toast.success("Analysis complete");
    } catch (err) {
      setError("Error analyzing contract. Please try again.");
      toast.error("Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5 text-light">
      <ToastContainer position="bottom-right" />
      <h2 className="mb-4">Analyze Smart Contract</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Smart Contract Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <button className="btn btn-primary mb-4" onClick={analyze} disabled={loading}>
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>

      {error && <p className="text-danger">{error}</p>}

      {result && (
        <div
          className="p-4 rounded"
          style={{
            backgroundColor:
              result.riskScore > 70
                ? '#dc3545'
                : result.riskScore > 40
                ? '#ffc107'
                : '#28a745',
            color: '#fff',
            maxWidth: '600px'
          }}
        >
          <h5 className="mb-3">📊 Analysis Report</h5>
          <p><strong>📌 Address:</strong> {result.contract}</p>
          <p><strong>📈 Risk Score:</strong> {result.riskScore}/100</p>
          <p><strong>📝 Summary:</strong> {result.description}</p>
        </div>
      )}
    </div>
  );
}

export default Analyze;
