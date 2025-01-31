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
interface Vehicle {
  _id: string;
  name: string;
}

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchVehicles = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        router.push("/login"); // Redirect to login if no token
        return;
      }

      try {
        const response = await fetch("/api/vehicles", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch vehicles");
        }

        const data = await response.json();
        setVehicles(data);
      } catch (err) {
        console.error(err);
        setError("Error loading vehicles.");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  if (loading) return <p>Loading vehicles...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Your Vehicles</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="mt-4">
        {vehicles.map((vehicle) => (
          <li key={vehicle._id} className="p-2 border-b">{vehicle.name}</li>
        ))}
      </ul>
    </div>
  );
}