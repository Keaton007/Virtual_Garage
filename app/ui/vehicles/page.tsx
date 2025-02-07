"use client";

import { useEffect, useState } from 'react';
import { getAuthToken } from '@/app/utils/auth';
import PageLayout from "@/app/components/PageLayout";

interface Vehicle {
  _id: string;
  make: string;
  model: string;
  color: string;
  doorCount: number;
  isConvertible: boolean;
  engineSize: string;
  imageUrl: string; // Make this required instead of optional
}

// Example data
const EXAMPLE_VEHICLES: Vehicle[] = [
  {
    _id: '1',
    make: 'Toyota',
    model: 'Supra MK4',
    color: 'Black',
    doorCount: 2,
    isConvertible: false,
    engineSize: '3.0L Twin-Turbo',
    imageUrl: '/1982-toyota-supra.jpg'
  },
  {
    _id: '2',
    make: 'Toyota',
    model: 'Supra MK5',
    color: 'Red',
    doorCount: 2,
    isConvertible: false,
    engineSize: '3.0L Turbo',
    imageUrl: '/1982-toyota-supra.jpg'
  },
  {
    _id: '3',
    make: 'Toyota',
    model: 'Supra MK3',
    color: 'White',
    doorCount: 2,
    isConvertible: true,
    engineSize: '3.0L Turbo',
    imageUrl: '/1982-toyota-supra.jpg'
  },
  {
    _id: '4',
    make: 'Toyota',
    model: 'Supra MK2',
    color: 'Silver',
    doorCount: 2,
    isConvertible: false,
    engineSize: '2.8L',
    imageUrl: '/1982-toyota-supra.jpg'
  },
  {
    _id: '5',
    make: 'Toyota',
    model: 'Supra MK1',
    color: 'Blue',
    doorCount: 2,
    isConvertible: false,
    engineSize: '2.6L',
    imageUrl: '/1982-toyota-supra.jpg'
  }
];

// Get unique values for dropdowns
const getUniqueValues = (key: keyof Vehicle) => {
  return Array.from(new Set(EXAMPLE_VEHICLES.map(vehicle => String(vehicle[key]))));
};

// Update the className for all select elements to include styling for the options
const selectClassName = `
  w-full 
  bg-white/10 
  border 
  border-white/20 
  rounded-lg 
  px-3 
  py-2 
  text-white 
  focus:outline-none 
  focus:border-[#f26522]/50
  [&>option]:bg-gray-900
  [&>option]:text-white
`;

export default function VehiclesPage() {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(EXAMPLE_VEHICLES[0]);
  const [filters, setFilters] = useState({
    make: 'Toyota',
    model: 'Supra MK4',
    color: 'Black',
    doorCount: '2',
    isConvertible: '',
    engineSize: '3.0L Twin-Turbo'
  });

  // Load editing vehicle on client side only
  useEffect(() => {
    const editingVehicle = JSON.parse(localStorage.getItem('editingVehicle') || 'null');
    if (editingVehicle) {
      setSelectedVehicle(editingVehicle);
      setFilters({
        make: editingVehicle.make,
        model: editingVehicle.model,
        color: editingVehicle.color,
        doorCount: editingVehicle.doorCount.toString(),
        isConvertible: editingVehicle.isConvertible ? 'true' : '',
        engineSize: editingVehicle.engineSize
      });
      localStorage.removeItem('editingVehicle');
    }
  }, []);

  // Update the selected vehicle when filters change
  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    
    // Create a new vehicle based on current selection
    const updatedVehicle = {
      ...selectedVehicle,
      [key]: key === 'isConvertible' ? value === 'true' : 
             key === 'doorCount' ? parseInt(value) : 
             value
    };
    
    setSelectedVehicle(updatedVehicle);
  };

  return (
    <PageLayout>
      <div className="flex min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        {/* Sidebar */}
        <div className="w-64 bg-black/30 backdrop-blur-md p-6 border-r border-white/10">
          <h2 className="text-xl font-semibold text-white mb-6">Filters</h2>
          
          <div className="space-y-4">
            {/* Make Filter */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Make
              </label>
              <select
                value={filters.make}
                onChange={(e) => handleFilterChange('make', e.target.value)}
                className={selectClassName}
              >
                <option value="">All Makes</option>
                {getUniqueValues('make').map((make) => (
                  <option key={make} value={make}>{make}</option>
                ))}
              </select>
            </div>

            {/* Model Filter */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Model
              </label>
              <select
                value={filters.model}
                onChange={(e) => handleFilterChange('model', e.target.value)}
                className={selectClassName}
              >
                <option value="">All Models</option>
                {getUniqueValues('model').map((model) => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </div>

            {/* Color Filter */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Color
              </label>
              <select
                value={filters.color}
                onChange={(e) => handleFilterChange('color', e.target.value)}
                className={selectClassName}
              >
                <option value="">All Colors</option>
                {getUniqueValues('color').map((color) => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
            </div>

            {/* Door Count Filter */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Door Count
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleFilterChange('doorCount', '2')}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    filters.doorCount === '2'
                      ? 'bg-[#f26522] text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  2 Doors
                </button>
                <button
                  onClick={() => handleFilterChange('doorCount', '4')}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    filters.doorCount === '4'
                      ? 'bg-[#f26522] text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  4 Doors
                </button>
              </div>
              {filters.doorCount && (
                <button
                  onClick={() => handleFilterChange('doorCount', '')}
                  className="mt-2 text-sm text-white/50 hover:text-white/70 transition-colors"
                >
                  Clear Selection
                </button>
              )}
            </div>

            {/* Convertible Filter */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Convertible
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.isConvertible === 'true'}
                  onChange={(e) => handleFilterChange('isConvertible', e.target.checked ? 'true' : '')}
                  className="w-4 h-4 rounded border-white/20 bg-white/10 text-[#f26522] focus:ring-[#f26522] focus:ring-offset-0 focus:ring-offset-transparent"
                />
                <span className="text-white/70">Convertible</span>
              </div>
            </div>

            {/* Engine Size Filter */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Engine Size
              </label>
              <select
                value={filters.engineSize}
                onChange={(e) => handleFilterChange('engineSize', e.target.value)}
                className={selectClassName}
              >
                <option value="">All Engine Sizes</option>
                {getUniqueValues('engineSize').map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Main Content - Image Centered with Details Frame */}
        <div className="flex-1 p-8 flex items-center justify-center">
          <div className="max-w-5xl w-full">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-[#f26522]/30 transition-all">
              <div className="p-8 space-y-8">
                {/* Vehicle Title */}
                <h3 className="text-3xl font-semibold text-white text-center">
                  {selectedVehicle.make} {selectedVehicle.model}
                </h3>
                
                {/* Main Image Area */}
                <div className="aspect-[16/9] relative rounded-xl overflow-hidden">
                  <img 
                    src={selectedVehicle.imageUrl}
                    alt="Vehicle Preview"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                
                {/* Vehicle Specs Bar */}
                <div className="grid grid-cols-5 gap-4 text-center">
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-white/50 text-sm">Color</p>
                    <p className="text-white font-medium">{selectedVehicle.color}</p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-white/50 text-sm">Doors</p>
                    <p className="text-white font-medium">{selectedVehicle.doorCount}</p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-white/50 text-sm">Convertible</p>
                    <p className="text-white font-medium">{selectedVehicle.isConvertible ? 'Yes' : 'No'}</p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-white/50 text-sm">Engine</p>
                    <p className="text-white font-medium">{selectedVehicle.engineSize}</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <button 
                      onClick={() => {
                        const savedVehicles = JSON.parse(localStorage.getItem('savedVehicles') || '[]');
                        const newVehicle = {
                          ...selectedVehicle,
                          _id: Date.now().toString(),
                          imageUrl: '/1982-toyota-supra.jpg'
                        };
                        savedVehicles.push(newVehicle);
                        localStorage.setItem('savedVehicles', JSON.stringify(savedVehicles));
                        window.location.href = '/my-vehicles';
                      }}
                      className="px-6 py-3 bg-[#f26522]/90 hover:bg-[#f26522] text-white rounded-full transition-all font-medium backdrop-blur-sm hover:shadow-lg hover:shadow-[#f26522]/20"
                    >
                      Save Vehicle
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}