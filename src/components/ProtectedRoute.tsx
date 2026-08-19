import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ReactNode } from 'react';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Note: True role checking happens via Firestore rules.
  // We use email strictly as an additional UI safeguard.
  if (currentUser.email !== 'Usc31@auru.space') {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center font-black uppercase tracking-widest p-6 text-center">
        <div>
          <h1 className="text-4xl text-red-600 mb-4">ACCESS DENIED</h1>
          <p className="text-zinc-500">You do not have permission to view this sector.</p>
        </div>
      </div>
    );
  }

  return children;
}
