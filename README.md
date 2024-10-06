SnabbDeal Backend Developer Guide

## Overview

SnabbDeal is a delivery service platform that helps buyers and sellers in used marketplace transactions (e.g., Facebook Marketplace, OfferUp) by providing reliable pick-up and delivery services. This document outlines the backend requirements and workflows for SnabbDeal, including payment processing, SMS notifications, database management, and hosting.

## Technology Stack

- **Payment Processing:** Square (squareup.com)
- **SMS Notifications:** Twilio (twilio.com)
- **Database:** MongoDB
- **Hosting:** Google Cloud

## Key Features

1. **Order Creation:** Buyers create an order on SnabbDeal, providing details about the item and the delivery/pick-up locations.
2. **Seller Form:** Sellers fill out a form to schedule the pick-up date and time and specify their payment method.
3. **Notifications:** Buyers receive SMS notifications at key stages (order completion, driver on route, delivery completion).
4. **Payment:** Buyers make payments through Square after the order is confirmed by the seller

### Order Creation

1. **Buyer Form:**
   - Buyer provides their information, delivery address, and item details.
   - Data is saved to the MongoDB database.
   - A pre-written message with a unique link is generated for the buyer to send to the seller via the marketplace platform.

### Seller Form

1. **Seller Scheduling:**
   - Seller clicks the link and fills out a form to schedule a pick-up date/time and select their payment method.
   - Data is saved to the MongoDB database.
   - Buyer receives an SMS notification via Twilio, informing them that the order is completed with a link to view the summary and make a payment.

### Notifications

1. **Order Completion:**
   - After the seller completes the form, Twilio sends an SMS to the buyer with the order summary link.
   
2. **Driver On Route:**
   - When a driver is en route to pick up the package, Twilio sends an SMS to the buyer.
   
3. **Delivery Completion:**
   - Once the package is delivered, Twilio sends an SMS to the buyer with an image of the delivered package.

### Payment Processing

1. **Payment Integration:**
   - Square's payment gateway is used for processing payments.
   - After viewing the order summary, the buyer can make a payment through the provided link.

## Backend Implementation

### API Endpoints

1. **Order Creation:**
   - Endpoint: `/api/createOrder`
   - Method: `POST`
   - Description: Saves buyer order details to the database.
   - Payload: `{ buyerName, buyerEmail, buyerPhone, pickupAddress, deliveryAddress, itemDescription, itemPrice, itemLink }`
   - Response: `{ success: true, orderId }`

2. **Seller Form:**
   - Endpoint: `/api/schedulePickup`
   - Method: `POST`
   - Description: Saves seller scheduling details to the database and triggers SMS to the buyer.
   - Payload: `{ orderId, sellerName, sellerEmail, sellerPhone, pickupDate, pickupTime, paymentMethod }`
   - Response: `{ success: true }`
   - Twilio SMS: Sends SMS to buyer with order summary link.

3. **Driver On Route Notification:**
   - Endpoint: `/api/driverOnRoute`
   - Method: `POST`
   - Description: Sends SMS to buyer when the driver is on route.
   - Payload: `{ orderId }`
   - Response: `{ success: true }`
   - Twilio SMS: Sends SMS to buyer.

4. **Delivery Completion Notification:**
   - Endpoint: `/api/deliveryComplete`
   - Method: `POST`
   - Description: Sends SMS to buyer with delivery confirmation and image.
   - Payload: `{ orderId, deliveryImage }`
   - Response: `{ success: true }`
   - Twilio SMS: Sends SMS to buyer with the image URL.

5. **Payment Processing:**
   - Endpoint: `/api/processPayment`
   - Method: `POST`
   - Description: Processes the payment using Square's API.
   - Payload: `{ orderId, paymentToken, amount }`
   - Response: `{ success: true, paymentId }`

### Database Schema (MongoDB)

1. **Orders Collection:**

### SMS Notifications (Twilio)

- **Setup Twilio Account:**
  - Create a Twilio account and get the API credentials.
  - Configure Twilio to send SMS messages.

- **Sending SMS Messages:**
  - Use Twilio's Node.js library to send SMS messages.

### Payment Integration (Square)

- **Setup Square Account:**
  - Create a Square account and get the API credentials.
  - Configure Square to handle payments.

- **Processing Payments:**
  - Use Square's Node.js library to process payments.

### Hosting (Google Cloud)

- **Setup Google Cloud Account:**
  - Create a Google Cloud account and configure the necessary services (e.g., Google Kubernetes Engine, Cloud Functions, etc.).
  - Deploy the backend services to Google Cloud.

- **Deployment:**
  - Use Docker to containerize the application.
  - Deploy the Docker containers to Google Kubernetes Engine (GKE).

