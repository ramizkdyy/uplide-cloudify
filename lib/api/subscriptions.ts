import { Subscription } from "@/lib/types";

const API_BASE_URL = "http://localhost:3001";

export async function getSubscriptions(): Promise<Subscription[]> {
  const response = await fetch(`${API_BASE_URL}/subscriptions`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch subscriptions");
  }
  
  return response.json();
}