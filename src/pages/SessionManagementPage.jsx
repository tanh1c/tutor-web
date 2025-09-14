import { useState } from 'react';
import Layout from '../components/layout/Layout';
import SessionDashboard from '../components/session/SessionDashboard';
import SessionDetails from '../components/session/SessionDetails';
import { useUser } from '../context/UserContext';

const SessionManagementPage = () => {
  const { user } = useUser();
  const [selectedSessionId, setSelectedSessionId] = useState(null);

  const handleSelectSession = (sessionId) => {
    setSelectedSessionId(sessionId);
  };

  const handleBackToDashboard = () => {
    setSelectedSessionId(null);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {selectedSessionId ? (
            <SessionDetails 
              sessionId={selectedSessionId}
              onBack={handleBackToDashboard}
            />
          ) : (
            <SessionDashboard onSelectSession={handleSelectSession} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SessionManagementPage;
