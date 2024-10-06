export default function calculateDistance(source, dest){
    // Radius of the Earth in miles
    const R = 3958.8;
  
    // Convert degrees to radians
    const toRadians = (degree) => (degree * Math.PI) / 180;
  
    // Extract longitude and latitude from source and destination
    const { lng: lng1, lat: lat1 } = source;
    const { lng: lng2, lat: lat2 } = dest;
  
    // Compute differences
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lng2 - lng1);
  
    // Haversine formula
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    // Distance in miles
    const distance = R * c;
  
    return distance.toFixed(2);
  };
  