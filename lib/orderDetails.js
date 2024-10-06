import axios from 'axios';

export async function fetchOrderDetails(searchParams) {
  try {
    const orderDetails = {
      buyerName: searchParams.buyerName,
      buyerEmail: searchParams.buyerEmail,
      buyerPhone: searchParams.buyerPhone,
      pickupAddress: searchParams.pickupAddress,
      deliveryAddress: searchParams.deliveryAddress,
      itemPrice: searchParams.itemPrice,
      itemDescription: searchParams.itemDescription,
    };

    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getDistance`, {
      params: {
        pickupAddress: orderDetails.pickupAddress,
        deliveryAddress: orderDetails.deliveryAddress,
      },
    });

    const distanceInMeters = response.data.distanceInMeters;
    const distanceInMiles = distanceInMeters / 1609.34;
    orderDetails.distance = distanceInMiles.toFixed(2);
    orderDetails.totalCost = (distanceInMiles * 1.50 + parseFloat(orderDetails.itemPrice)).toFixed(2);

    return orderDetails;
  } catch (error) {
    console.error('Error fetching order details:', error);
    throw new Error('Failed to fetch order details');
  }
}
