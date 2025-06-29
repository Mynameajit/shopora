export const statusColor = {
  Pending: "bg-red-100 text-yellow-700",
  Processing: "bg-yellow-100 text-yellow-700",
  Shipped: "bg-blue-100 text-blue-700",
  "Out for Delivery": "bg-purple-100 text-purple-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-gray-200 text-gray-700 line-through",
};

export const trackingStage = {
  Pending: 1,
  Processing: 25,
  Shipped: 50,
  "Out for Delivery": 75,
  Delivered: 100,
  Cancelled: 0,
};