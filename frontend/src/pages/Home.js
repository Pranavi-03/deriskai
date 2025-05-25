import { useNavigate } from 'react-router-dom';
import heroImage from '../assets/home.jpg'; // place this in /src/assets/

function Home() {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <h1 className="display-4">Welcome to DeRiskAI</h1>
      <img src={heroImage} className="img-fluid my-3" alt="DeFi Security" />
      <p className="lead">Your AI-powered guardian against DeFi vulnerabilities</p>
      <button className="btn btn-primary mt-3" onClick={() => navigate('/login')}>Get Started</button>
    </div>
  );
}

export default Home;
