import { Subscription } from "@/lib/types";

const API_BASE_URL = "http://localhost:3001";

export async function getSubscriptions(): Promise<Subscription[]> {
  const response = await fetch(`${API_BASE_URL}/subscriptions`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch subscriptions");
  }
  
  return response.json();
}

export async function createSubscription(data: Omit<Subscription, "id">): Promise<Subscription> {
  const response = await fetch(`${API_BASE_URL}/subscriptions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create subscription");
  }

  return response.json();
}

export async function updateSubscription(id: string, data: Partial<Subscription>): Promise<Subscription> {
  const response = await fetch(`${API_BASE_URL}/subscriptions/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update subscription");
  }

  return response.json();
}

export async function deleteSubscription(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/subscriptions/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete subscription");
  }
}