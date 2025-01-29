'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    router.push('/login');
    return null;
  }

  return <div>Welcome, {session.user?.name}!</div>;
}

//Middleware for restricting view of vehicles to users that are logged in only.
export default function VehiclesPage() {
    const [vehicles, setVehicles] = useState([]);
  
    useEffect(() => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        window.location.href = '/login';
        return;
      }
  
      fetch('/api/vehicles', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then(setVehicles);
    }, []);
  
    return (
      <div>
        <h1>Your Vehicles</h1>
        <ul>
          {vehicles.map((vehicle) => (
            <li key={vehicle.id}>{vehicle.name}</li>
          ))}
        </ul>
      </div>
    );
  }