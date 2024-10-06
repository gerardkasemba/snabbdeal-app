"use client";
import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { CSSTransition } from "react-transition-group";
import usaMap from '../data/states-10m.json'; // Ensure this is a valid TopoJSON file

const serviceAreas = [
  {
    state: 'Massachusetts',
    cities: [
      'Abington', 'Acton', 'Acushnet', 'Adams', 'Agawam', 'Alford', 'Amesbury',
      'Amherst', 'Andover', 'Aquinnah', 'Arlington', 'Ashburnham', 'Ashby',
      'Ashfield', 'Ashland', 'Athol', 'Attleboro', 'Auburn', 'Avon', 'Ayer',
      'Barnstable', 'Barre', 'Becket', 'Bedford', 'Belchertown', 'Bellingham',
      'Belmont', 'Berkley', 'Berlin', 'Bernardston', 'Beverly', 'Billerica',
      'Blackstone', 'Blandford', 'Bolton', 'Boston', 'Bourne', 'Boxborough',
      'Boxford', 'Boylston', 'Braintree', 'Brewster', 'Bridgewater', 'Brimfield',
      'Brockton', 'Brookfield', 'Brookline', 'Buckland', 'Burlington', 'Cambridge',
      'Canton', 'Carlisle', 'Carver', 'Charlemont', 'Charlton', 'Chatham',
      'Chelmsford', 'Chelsea', 'Cheshire', 'Chester', 'Chesterfield', 'Chicopee',
      'Chilmark', 'Clarksburg', 'Clinton', 'Cohasset', 'Colrain', 'Concord',
      'Conway', 'Cummington', 'Dalton', 'Danvers', 'Dartmouth', 'Dedham', 'Deerfield',
      'Dennis', 'Dighton', 'Douglas', 'Dover', 'Dracut', 'Dudley', 'Dunstable',
      'Duxbury', 'East Bridgewater', 'East Brookfield', 'East Longmeadow',
      'Eastham', 'Easthampton', 'Easton', 'Edgartown', 'Egremont', 'Erving',
      'Essex', 'Everett', 'Fairhaven', 'Fall River', 'Falmouth', 'Fitchburg',
      'Foxborough', 'Framingham', 'Franklin', 'Freetown', 'Gardner', 'Georgetown',
      'Gill', 'Gloucester', 'Goshen', 'Gosnold', 'Grafton', 'Granby', 'Granville',
      'Great Barrington', 'Greenfield', 'Groton', 'Groveland', 'Hadley', 'Halifax',
      'Hamilton', 'Hampden', 'Hancock', 'Hanover', 'Hanson', 'Hardwick', 'Harvard',
      'Harwich', 'Hatfield', 'Haverhill', 'Hawley', 'Heath', 'Hingham', 'Hinsdale',
      'Holbrook', 'Holden', 'Holland', 'Holliston', 'Holyoke', 'Hopedale',
      'Hopkinton', 'Hubbardston', 'Hudson', 'Hull', 'Huntington', 'Ipswich',
      'Kingston', 'Lakeville', 'Lancaster', 'Lanesborough', 'Lawrence', 'Lee',
      'Leicester', 'Lenox', 'Leominster', 'Lexington', 'Leyden', 'Lincoln',
      'Littleton', 'Longmeadow', 'Lowell', 'Ludlow', 'Lunenburg', 'Lynn', 'Lynnfield',
      'Malden', 'Manchester-by-the-Sea', 'Mansfield', 'Marblehead', 'Marion',
      'Marlborough', 'Marshfield', 'Mashpee', 'Mattapoisett', 'Maynard', 'Medfield',
      'Medford', 'Medway', 'Melrose', 'Mendon', 'Merrimac', 'Methuen', 'Middleborough',
      'Middlefield', 'Middleton', 'Milford', 'Millbury', 'Millis', 'Millville',
      'Milton', 'Monroe', 'Monson', 'Montague', 'Monterey', 'Montgomery', 'Nahant',
      'Nantucket', 'Natick', 'Needham', 'New Ashford', 'New Bedford', 'New Braintree',
      'New Marlborough', 'New Salem', 'Newbury', 'Newburyport', 'Newton', 'Norfolk',
      'North Adams', 'North Andover', 'North Attleborough', 'North Brookfield',
      'North Reading', 'Northampton', 'Northborough', 'Northbridge', 'Northfield',
      'Norton', 'Norwell', 'Norwood', 'Oak Bluffs', 'Oakham', 'Orange', 'Orleans',
      'Otis', 'Oxford', 'Palmer', 'Paxton', 'Peabody', 'Pelham', 'Pembroke',
      'Pepperell', 'Peru', 'Petersham', 'Phillipston', 'Pittsfield', 'Plainfield',
      'Plainville', 'Plymouth', 'Plympton', 'Princeton', 'Provincetown', 'Quincy',
      'Randolph', 'Raynham', 'Reading', 'Rehoboth', 'Revere', 'Richmond',
      'Rochester', 'Rockland', 'Rockport', 'Rowe', 'Rowley', 'Royalston',
      'Russell', 'Rutland', 'Salem', 'Salisbury', 'Sandisfield', 'Sandwich',
      'Saugus', 'Savoy', 'Scituate', 'Seekonk', 'Sharon', 'Sheffield', 'Shelburne',
      'Sherborn', 'Shirley', 'Shrewsbury', 'Somerset', 'Somerville', 'South Hadley',
      'Southampton', 'Southborough', 'Southbridge', 'Southwick', 'Spencer',
      'Springfield', 'Sterling', 'Stockbridge', 'Stoneham', 'Stoughton', 'Stow',
      'Sturbridge', 'Sudbury', 'Sunderland', 'Sutton', 'Swampscott', 'Swansea',
      'Taunton', 'Templeton', 'Tewksbury', 'Tisbury', 'Tolland', 'Topsfield',
      'Townsend', 'Truro', 'Tyngsborough', 'Tyringham', 'Upton', 'Uxbridge',
      'Wakefield', 'Wales', 'Walpole', 'Waltham', 'Ware', 'Wareham', 'Warren',
      'Warwick', 'Washington', 'Watertown', 'Wayland', 'Webster', 'Wellesley',
      'Wellfleet', 'Wendell', 'Wenham', 'West Boylston', 'West Bridgewater',
      'West Brookfield', 'West Newbury', 'West Springfield', 'West Stockbridge',
      'West Tisbury', 'Westborough', 'Westfield', 'Westford', 'Westhampton',
      'Westminster', 'Weston', 'Westport', 'Westwood', 'Weymouth', 'Whately',
      'Whitman', 'Wilbraham', 'Williamsburg', 'Williamstown', 'Wilmington',
      'Winchendon', 'Winchester', 'Windsor', 'Winthrop', 'Woburn', 'Worcester',
      'Worthington', 'Wrentham', 'Yarmouth',
    ],
  },
  // Add more states and cities as needed
];

const AreaServices = () => {
  const [selectedState, setSelectedState] = useState(null);
  const [showCities, setShowCities] = useState(false);
  const [hoveredState, setHoveredState] = useState(null); // State for hovered geography
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);

  const isStateServiced = (state) => {
    return serviceAreas.some(area => area.state === state);
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const selectedArea = serviceAreas.find(area => area.state === selectedState);
    const cities = selectedArea ? selectedArea.cities : [];
    const filtered = cities.filter(city => city.toLowerCase().includes(query));
    setFilteredCities(filtered);
  };

  const handleStateClick = (state) => {
    setSelectedState(state);
    setShowCities(true);
    setSearchQuery('');
  };

  const handleCloseModal = () => {
    setShowCities(false);
    setSelectedState(null);
  };

  const selectedArea = serviceAreas.find(area => area.state === selectedState);

  return (
    <div className="min-h-screen p-12 bg-white-100 text-black">
      <section className="container mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-[#024BBE] mb-6">Areas We Service</h2>
        <p className="text-lg text-gray-600 mb-12">Click on a state to view all cities we cover!</p>

        {/* USA Map */}
        <div className="w-full h-auto max-w-4xl mx-auto">
          <ComposableMap projection="geoAlbersUsa" width={800} height={500}>
            <Geographies geography={usaMap}>
              {({ geographies }) =>
                geographies.map(geo => {
                  const stateName = geo.properties.name;
                  const isServiced = isStateServiced(stateName);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => handleStateClick(stateName)}
                      onMouseEnter={() => setHoveredState(stateName)}
                      onMouseLeave={() => setHoveredState(null)}
                      style={{
                        default: {
                          fill: isServiced ? "#FBB040" : "#D6D6DA",
                          outline: "none",
                          transition: "fill 0.3s ease"
                        },
                        hover: {
                          fill: "#FFDD67",
                          outline: "none"
                        },
                        pressed: {
                          fill: "#E42",
                          outline: "none"
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>

          {/* Display hovered state name */}
          <div className="h-10 b-blue-500 p-8">
            {hoveredState && (
              <div className="text-lg font-bold text-[#024BBE]">
                {hoveredState}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Modal for Cities */}
      <CSSTransition in={showCities} timeout={300} classNames="modal" unmountOnExit>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white rounded-lg shadow-lg p-8 w-[90%] max-w-2xl transform transition-all duration-300 ease-in-out">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={handleCloseModal}
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Cities We Service in {selectedState}</h3>

            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search for a city..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring hover:border-blue-400 transition duration-300"
            />

            {/* City List */}
            <ul className="mt-4 max-h-60 overflow-y-auto text-left">
              {(searchQuery ? filteredCities : (selectedArea ? selectedArea.cities : [])).map((city, index) => (
                <li key={index} className="text-gray-700 text-sm py-2 border-b">
                  {city}
                </li>
              ))}
              {searchQuery && filteredCities.length === 0 && (
                <li className="text-red-500 text-sm py-2">Oops! Service not available in this city.</li>
              )}
            </ul>
          </div>
        </div>
      </CSSTransition>

      {/* CSS for Modal Animation */}
      <style jsx>{`
        .modal-enter {
          opacity: 0;
        }
        .modal-enter-active {
          opacity: 1;
          transition: opacity 300ms;
        }
        .modal-exit {
          opacity: 1;
        }
        .modal-exit-active {
          opacity: 0;
          transition: opacity 300ms;
        }
      `}</style>
    </div>
  );
};

export default AreaServices;
