"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PageLayout from "@/app/components/PageLayout";
import { getAuthToken } from '@/app/utils/auth';

interface Vehicle {
  _id: string;
  make: string;
  model: string;
  // add other vehicle properties
}

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchVehicles = async () => {
      setError(null);
      
      try {
        const token = getAuthToken();

        if (!token) {
          window.location.href = '/login';
          return;
        }

        const response = await fetch('/api/vehicles', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            window.location.href = '/login';
            return;
          }
          throw new Error('Failed to fetch vehicles');
        }

        const data = await response.json();
        setVehicles(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <PageLayout>
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">My Vehicles</h1>
        
        {loading && (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#f26522]"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {!loading && !error && vehicles.length === 0 && (
          <div className="text-center text-white/60">
            <p>No vehicles found. Add your first vehicle!</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle._id}
              className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/10 hover:border-[#f26522]/30 transition-all"
            >
              <h2 className="text-xl font-semibold text-white mb-2">
                {vehicle.make} {vehicle.model}
              </h2>
              {/* Add more vehicle details here */}
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}