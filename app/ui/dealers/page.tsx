"use client";

import { useState } from 'react';
import PageLayout from "@/app/components/PageLayout";

interface Dealership {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  website: string;
  brands: string[];
  distance: number;
}

const EXAMPLE_DEALERS: Dealership[] = [
  {
    id: '1',
    name: 'Ken Garff Toyota Downtown',
    address: '525 S State St',
    city: 'Salt Lake City',
    state: 'UT',
    zip: '84111',
    phone: '(801) 532-1261',
    website: 'https://www.kengarff.com/toyota',
    brands: ['Toyota', 'Scion'],
    distance: 1.2
  },
  {
    id: '2',
    name: 'Larry H. Miller Honda',
    address: '5808 S State St',
    city: 'Murray',
    state: 'UT',
    zip: '84107',
    phone: '(801) 262-3331',
    website: 'https://www.lhm.com/honda',
    brands: ['Honda'],
    distance: 3.5
  },
  {
    id: '3',
    name: 'Strong Volkswagen',
    address: '1070 S Main St',
    city: 'Salt Lake City',
    state: 'UT',
    zip: '84111',
    phone: '(801) 596-2200',
    website: 'https://www.strongvw.com',
    brands: ['Volkswagen'],
    distance: 2.1
  },
  {
    id: '4',
    name: 'Mark Miller Subaru',
    address: '3734 S State St',
    city: 'Salt Lake City',
    state: 'UT',
    zip: '84115',
    phone: '(801) 266-8833',
    website: 'https://www.markmiller.com',
    brands: ['Subaru'],
    distance: 4.3
  }
];

export default function DealersPage() {
  const [dealers] = useState<Dealership[]>(EXAMPLE_DEALERS);

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-semibold text-white">Local Dealerships</h1>
            <div className="text-white/70">
              Found {dealers.length} dealerships nearby
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dealers.map((dealer) => (
              <div
                key={dealer.id}
                className="bg-white/10 backdrop-blur-md rounded-lg overflow-hidden border border-white/10 hover:border-[#f26522]/30 transition-all"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-white">
                      {dealer.name}
                    </h3>
                    <span className="text-sm text-[#f26522]">
                      {dealer.distance} miles
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm text-white/70 mb-4">
                    <p>{dealer.address}</p>
                    <p>{dealer.city}, {dealer.state} {dealer.zip}</p>
                    <p>{dealer.phone}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {dealer.brands.map((brand) => (
                      <span
                        key={brand}
                        className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/70"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col space-y-2">
                    <a
                      href={dealer.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#f26522]/90 hover:bg-[#f26522] text-white rounded-lg transition-all text-center"
                    >
                      Visit Website
                    </a>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        `${dealer.name} ${dealer.address} ${dealer.city} ${dealer.state}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all text-center"
                    >
                      Open in Maps
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

