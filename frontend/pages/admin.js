// frontend/pages/admin.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

const Admin = () => {
  const [elections, setElections] = useState([]);
  const [newElectionName, setNewElectionName] = useState('');
  const [selectedElection, setSelectedElection] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [newCandidateName, setNewCandidateName] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const tokenHeader = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  };

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const res = await axios.get('/api/admin/elections', tokenHeader);
        setElections(res.data);
      } catch {
        setError('Failed to load elections. You might not be admin.');
      }
    };
    fetchElections();
  }, []);

  const createElection = async () => {
    try {
      await axios.post('/api/admin/elections', { name: newElectionName }, tokenHeader);
      const res = await axios.get('/api/admin/elections', tokenHeader);
      setElections(res.data);
      setNewElectionName('');
    } catch {
      setError('Could not create election.');
    }
  };

  const selectElection = async (id) => {
    setSelectedElection(id);
    try {
      const [candRes, resRes] = await Promise.all([
        axios.get(`/api/admin/candidates?election_id=${id}`, tokenHeader),
        axios.get(`/api/admin/results?election_id=${id}`, tokenHeader),
      ]);
      setCandidates(candRes.data);
      setResults(resRes.data);
    } catch {
      setError('Failed to load data.');
    }
  };

  const addCandidate = async () => {
    try {
      await axios.post(
        '/api/admin/candidates',
        { name: newCandidateName, election_id: selectedElection },
        tokenHeader
      );
      const candRes = await axios.get(`/api/admin/candidates?election_id=${selectedElection}`, tokenHeader);
      setCandidates(candRes.data);
      setNewCandidateName('');
    } catch {
      setError('Error adding candidate.');
    }
  };

  return (
    <Layout>
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto space-y-8">
        <h2 className="text-2xl font-bold text-center">🛠️ Admin Dashboard</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Create Election */}
        <section>
          <h3 className="text-lg font-semibold mb-2">Create New Election</h3>
          <div className="flex gap-4">
            <input
              type="text"
              className="flex-grow border px-4 py-2 rounded-lg focus:ring-2 ring-blue-300"
              value={newElectionName}
              onChange={(e) => setNewElectionName(e.target.value)}
              placeholder="Election name"
            />
            <button
              onClick={createElection}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Create
            </button>
          </div>
        </section>

        {/* Select Election */}
        <section>
          <h3 className="text-lg font-semibold mb-2">Available Elections</h3>
          <div className="grid grid-cols-2 gap-4">
            {elections.map((e) => (
              <button
                key={e.id}
                onClick={() => selectElection(e.id)}
                className={`bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition ${
                  selectedElection === e.id ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                {e.name}
              </button>
            ))}
          </div>
        </section>

        {/* Candidate + Results */}
        {selectedElection && (
          <>
            {/* Add Candidate */}
            <section>
              <h3 className="text-lg font-semibold mb-2">Add Candidate</h3>
              <div className="flex gap-4">
                <input
                  type="text"
                  className="flex-grow border px-4 py-2 rounded-lg focus:ring-2 ring-green-300"
                  value={newCandidateName}
                  onChange={(e) => setNewCandidateName(e.target.value)}
                  placeholder="Candidate name"
                />
                <button
                  onClick={addCandidate}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                >
                  Add
                </button>
              </div>
            </section>

            {/* Candidate List */}
            <section>
              <h3 className="text-lg font-semibold mb-2">Candidates</h3>
              <ul className="list-disc pl-6 space-y-1">
                {candidates.map((c) => (
                  <li key={c.id}>{c.name}</li>
                ))}
              </ul>
            </section>

            {/* Election Results */}
            <section>
              <h3 className="text-lg font-semibold mb-2">Election Results</h3>
              <ul className="list-disc pl-6 space-y-1">
                {results.map((r, i) => (
                  <li key={i}>
                    {r.candidate}: <strong>{r.votes}</strong> votes
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Admin;
