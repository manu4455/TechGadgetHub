import axios from "axios";
import React from "react";
import { cookies } from "next/headers";
import queryString from "query-string";
import Orders from "@/components/admin/Orders";

const getOrders = async (searchParams) => {
  const nextCookies = cookies();
  const nextAuthSessionToken = nextCookies.get("next-auth.session-token");

  const urlParams = {
    page: searchParams.page || 1,
  };

  const searchQuery = queryString.stringify(urlParams);

  try {
    const { data } = await axios.get(
      `${process.env.API_URL}/api/admin/orders?${searchQuery}`,
      {
        headers: {
          Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    if (error.response) {
      // Server responded with a status other than 200 range
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    } else if (error.request) {
      // Request was made but no response received
      console.error("Request data:", error.request);
    } else {
      // Something else happened in setting up the request
      console.error("Error message:", error.message);
    }
    throw new Error("Failed to fetch orders. Please try again later.");
  }
};

const AdminOrdersPage = async ({ searchParams }) => {
  try {
    const orders = await getOrders(searchParams);
    return <Orders orders={orders} />;
  } catch (error) {
    return <div>Error loading orders: {error.message}</div>;
  }
};

export default AdminOrdersPage;
