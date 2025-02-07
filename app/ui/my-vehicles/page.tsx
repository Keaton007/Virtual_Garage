"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import PageLayout from "@/app/components/PageLayout";

interface Vehicle {
  _id: string;
  make: string;
  model: string;
  color: string;
  doorCount: number;
  isConvertible: boolean;
  engineSize: string;
  imageUrl: string;
}

/* Example saved vehicles (replace with actual data later
const SAVED_VEHICLES: Vehicle[] = [
  {
    _id: '1',
    make: 'Toyota',
    model: 'Supra MK4',
    color: 'Black',
    doorCount: 2,
    isConvertible: false,
    engineSize: '3.0L Twin-Turbo',
    imageUrl: '/placeholder-supra.jpg'
  }
];
*/

export default function MyVehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    // Load saved vehicles from localStorage
    const savedVehicles = JSON.parse(localStorage.getItem('savedVehicles') || '[]');
    setVehicles(savedVehicles);
  }, []);

  const handleDelete = (id: string) => {
    const updatedVehicles = vehicles.filter(v => v._id !== id);
    setVehicles(updatedVehicles);
    localStorage.setItem('savedVehicles', JSON.stringify(updatedVehicles));
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="p-8">
          <h1 className="text-3xl font-semibold text-white mb-8 text-center">My Vehicles</h1>
          
          {vehicles.length === 0 ? (
            <div className="text-center text-white/70">
              <p>No vehicles saved yet. Go to Craft a Vehicle to create one!</p>
            </div>
          ) : (
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              {vehicles.map((vehicle) => (
                <div
                  key={vehicle._id}
                  className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-[#f26522]/30 transition-all"
                >
                  <div className="p-8 space-y-8">
                    {/* Vehicle Title */}
                    <h3 className="text-2xl font-semibold text-white text-center">
                      {vehicle.make} {vehicle.model}
                    </h3>
                    
                    {/* Main Image Area */}
                    <div className="aspect-[16/9] relative rounded-xl overflow-hidden">
                      <Image
                        src={vehicle.imageUrl}
                        alt="Vehicle Preview"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Vehicle Specs */}
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-black/30 rounded-lg p-3">
                        <p className="text-white/50 text-sm">Color</p>
                        <p className="text-white font-medium">{vehicle.color}</p>
                      </div>
                      <div className="bg-black/30 rounded-lg p-3">
                        <p className="text-white/50 text-sm">Doors</p>
                        <p className="text-white font-medium">{vehicle.doorCount}</p>
                      </div>
                      <div className="bg-black/30 rounded-lg p-3">
                        <p className="text-white/50 text-sm">Convertible</p>
                        <p className="text-white font-medium">{vehicle.isConvertible ? 'Yes' : 'No'}</p>
                      </div>
                      <div className="bg-black/30 rounded-lg p-3">
                        <p className="text-white/50 text-sm">Engine</p>
                        <p className="text-white font-medium">{vehicle.engineSize}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-4">
                      <button 
                        onClick={() => {
                          // Store the current vehicle in localStorage for editing
                          localStorage.setItem('editingVehicle', JSON.stringify(vehicle));
                          
                          // Remove this vehicle from saved vehicles
                          const savedVehicles = JSON.parse(localStorage.getItem('savedVehicles') || '[]');
                          const updatedVehicles = savedVehicles.filter((v: Vehicle) => v._id !== vehicle._id);
                          localStorage.setItem('savedVehicles', JSON.stringify(updatedVehicles));
                          
                          // Navigate to vehicles page
                          window.location.href = '/vehicles';
                        }}
                        className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all font-medium"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(vehicle._id)}
                        className="px-6 py-2 bg-red-500/80 hover:bg-red-500 text-white rounded-full transition-all font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
} 