// frontend/pages/vote.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

const Vote = () => {
  const [elections, setElections] = useState([]);
  const [selectedElection, setSelectedElection] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [receipt, setReceipt] = useState(null);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const res = await axios.get('/api/vote/elections', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setElections(res.data);
      } catch {
        setError('Failed to load elections. Please login again.');
        router.push('/login');
      }
    };
    fetchElections();
  }, [router]);

  const selectElection = async (id) => {
    setSelectedElection(id);
    try {
      const res = await axios.get(`/api/vote/candidates?election_id=${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setCandidates(res.data);
      setError('');
    } catch {
      setError('Failed to load candidates.');
    }
  };

  const castVote = async () => {
    if (!selectedCandidate) {
      setError('Please select a candidate.');
      return;
    }
    try {
      const res = await axios.post(
        '/api/vote/cast',
        { candidate_id: selectedCandidate },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setReceipt(res.data.receipt);
    } catch {
      setError('Vote failed. Try again.');
    }
  };

  return (
    <Layout>
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Vote</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        {!selectedElection ? (
          <>
            <h3 className="text-lg font-semibold mb-3">Select an Election</h3>
            <ul className="space-y-2">
              {elections.map((e) => (
                <li key={e.id}>
                  <button
                    onClick={() => selectElection(e.id)}
                    className="w-full bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded-lg transition"
                  >
                    {e.name}
                  </button>
                </li>
              ))}
            </ul>
          </>
        ) : !receipt ? (
          <>
            <h3 className="text-lg font-semibold mb-3">Select a Candidate</h3>
            <ul className="space-y-2 mb-4">
              {candidates.map((c) => (
                <li key={c.id}>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="candidate"
                      value={c.id}
                      onChange={() => setSelectedCandidate(c.id)}
                      className="accent-blue-500"
                    />
                    <span>{c.name}</span>
                  </label>
                </li>
              ))}
            </ul>
            <button
              onClick={castVote}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition"
            >
              Submit Vote
            </button>
          </>
        ) : (
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold text-green-600">Vote Submitted!</h3>
            <p className="text-gray-700">Receipt:</p>
            <code className="bg-gray-100 px-4 py-2 inline-block rounded-lg">{receipt}</code>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Vote;
