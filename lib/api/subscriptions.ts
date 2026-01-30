import { Subscription } from "@/lib/types";
import dbData from "@/db.json";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
const isProduction = process.env.NODE_ENV === "production";

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getSubscriptions(): Promise<Subscription[]> {
  if (isProduction) {
    await delay(300);
    return dbData.subscriptions as Subscription[];
  }

  const response = await fetch(`${API_BASE_URL}/subscriptions`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch subscriptions");
  }
  
  return response.json();
}

export async function createSubscription(data: Omit<Subscription, "id">): Promise<Subscription> {
  if (isProduction) {
    await delay(300);
    const newSubscription = {
      ...data,
      id: String(Date.now()),
    };
    dbData.subscriptions.push(newSubscription as any);
    return newSubscription as Subscription;
  }

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
  if (isProduction) {
    await delay(300);
    const index = dbData.subscriptions.findIndex((sub: any) => sub.id === id);
    if (index !== -1) {
      dbData.subscriptions[index] = { ...dbData.subscriptions[index], ...data } as any;
      return dbData.subscriptions[index] as Subscription;
    }
    throw new Error("Subscription not found");
  }

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
  if (isProduction) {
    await delay(300);
    const index = dbData.subscriptions.findIndex((sub: any) => sub.id === id);
    if (index !== -1) {
      dbData.subscriptions.splice(index, 1);
    }
    return;
  }

  const response = await fetch(`${API_BASE_URL}/subscriptions/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete subscription");
  }
}