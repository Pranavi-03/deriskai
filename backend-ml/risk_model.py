from flask import Flask, request, jsonify
from sklearn.ensemble import IsolationForest
import numpy as np

app = Flask(__name__)

# Mock training data (DeFi tx features)
X_train = np.random.rand(100, 5)
model = IsolationForest(contamination=0.1)
model.fit(X_train)

@app.route("/api/score", methods=["POST"])
def score_contract():
    data = request.json
    tx_features = np.array(data["features"]).reshape(1, -1)
    score = model.decision_function(tx_features)[0]
    result = model.predict(tx_features)[0]

    return jsonify({
        "anomaly": bool(result == -1),
        "score": round((1 - score) * 100, 2)  # Simulated risk %
    })

if __name__ == "__main__":
    app.run(port=8001)
