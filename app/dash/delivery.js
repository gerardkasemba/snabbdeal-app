import { useState } from 'react';
import NavBar from '../../components/NavBar2';
import Footer from '../../components/Footer';

const DeliveryArea = () => {
  const [deliveries, setDeliveries] = useState([
    // Example delivery data
    {
      id: 1,
      date: '2023-06-25',
      time: '10:00 AM',
      location: 'New York, NY',
      distance: '100 miles',
      amount: '$50',
      status: 'Pending',
    },
    {
      id: 2,
      date: '2023-06-25',
      time: '12:00 PM',
      location: 'Philadelphia, PA',
      distance: '80 miles',
      amount: '$40',
      status: 'Pending',
    },
    {
      id: 3,
      date: '2023-06-25',
      time: '03:00 PM',
      location: 'Washington, DC',
      distance: '120 miles',
      amount: '$60',
      status: 'Pending',
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setDeliveries((prevDeliveries) =>
      prevDeliveries.map((delivery) =>
        delivery.id === id ? { ...delivery, status: newStatus } : delivery
      )
    );
  };

  const today = new Date().toISOString().split('T')[0];

  const todayDeliveries = deliveries.filter(
    (delivery) => delivery.date === today
  );

  return (
    <div>
      <NavBar />
      <div className="min-h-screen p-8 pt-16 bg-gray-100">
        <div className="container mx-auto">
          <h1 className="mb-8 text-3xl font-bold text-center">Today&apos;s Deliveries</h1>
          <div className="p-6 bg-white rounded shadow-md">
            <h2 className="mb-4 text-2xl font-semibold">Deliveries for {today}</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-2 border">ID</th>
                  <th className="p-2 border">Time</th>
                  <th className="p-2 border">Location</th>
                  <th className="p-2 border">Distance</th>
                  <th className="p-2 border">Amount</th>
                  <th className="p-2 border">Status</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {todayDeliveries.map((delivery) => (
                  <tr key={delivery.id}>
                    <td className="p-2 text-center border">{delivery.id}</td>
                    <td className="p-2 text-center border">{delivery.time}</td>
                    <td className="p-2 text-center border">{delivery.location}</td>
                    <td className="p-2 text-center border">{delivery.distance}</td>
                    <td className="p-2 text-center border">{delivery.amount}</td>
                    <td className="p-2 text-center border">{delivery.status}</td>
                    <td className="p-2 text-center border">
                      <select
                        value={delivery.status}
                        onChange={(e) =>
                          handleStatusChange(delivery.id, e.target.value)
                        }
                        className="p-2 border border-gray-300 rounded"
                      >
                        <option value="Pending">Pending</option>
                        <option value="On Route">On Route</option>
                        <option value="Picked Up">Picked Up</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DeliveryArea;
