import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  if (!lat || !lon) {
    return NextResponse.json({ error: 'Latitude and longitude are required' }, { status: 400 });
  }

  try {
    // Create a larger bounding box (roughly 100-mile radius)
    const boundingBox = {
      north: parseFloat(lat) + 1,
      south: parseFloat(lat) - 1,
      east: parseFloat(lon) + 1,
      west: parseFloat(lon) - 1
    };

    // Try different search terms to find dealerships
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?` + 
      `format=json&q=car+dealer+OR+auto+sales+OR+automotive` +
      `&viewbox=${boundingBox.west},${boundingBox.south},${boundingBox.east},${boundingBox.north}` +
      `&bounded=1`,  // Restrict to bounding box
      {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Virtual_Garage/1.0'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Raw API response:', data); // Debug log

    // Filter results by distance (within 100 miles)
    const filteredData = data.filter((place: any) => {
      const distance = calculateDistance(
        parseFloat(lat),
        parseFloat(lon),
        parseFloat(place.lat),
        parseFloat(place.lon)
      );
      return parseFloat(distance) <= 100; // Increased radius to 100 miles
    });

    console.log('Filtered dealerships:', filteredData); // Debug log
    return NextResponse.json(filteredData);
    
  } catch (error: any) {
    console.error('Error fetching dealerships:', error);
    return NextResponse.json(
      { error: `Failed to fetch dealerships: ${error.message}` },
      { status: 500 }
    );
  }
}

// Helper function to calculate distance, found on stack overflow
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return (R * c).toFixed(1);
} 