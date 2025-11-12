import { FoodItem } from "@/type/food";
import { NextRequest, NextResponse } from "next/server";

const MOCK_API = "https://6852821e0594059b23cdd834.mockapi.io/Food";


function normalizeItem(x: any): FoodItem {
  return {
    id: String(x.id ?? crypto.randomUUID()),
    name: x.name ?? x.food_name ?? "Untitled",
    image: x.image ?? x.food_image ?? x.avatar ?? "/placeholder.svg",
    price: x.price ?? x.amount ?? x.priceLabel ?? undefined,
    rating: typeof x.rating === "number" ? x.rating : Number(x.food_rating ?? 0) || undefined,
    restaurant: x.restaurant ?? {
      name: x.restaurant_name,
      logo: x.restaurant_logo,
      status: x.restaurant_status,
    },
  };
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const name = searchParams.get("name");
    
    const url = name 
      ? `${MOCK_API}?name=${encodeURIComponent(name)}` 
      : MOCK_API;
    
    const res = await fetch(url, {
      cache: "no-store", 
    });
    
    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch food items" },
        { status: res.status }
      );
    }
    
    const data = await res.json();
    const normalized = Array.isArray(data) 
      ? data.map(normalizeItem) 
      : [];
    
    return NextResponse.json({ items: normalized });
  } catch (error) {
    console.error("GET /api/food error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const payload = {
      name: body.food_name || body.name,
      image: body.food_image || body.image,
      rating: body.food_rating || body.rating,
      restaurant: body.restaurant || {
        name: body.restaurant_name,
        logo: body.restaurant_logo,
        status: body.restaurant_status,
      },
    };
    
    const res = await fetch(MOCK_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    
    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to create food item" },
        { status: res.status }
      );
    }
    
    const data = await res.json();
    const normalized = normalizeItem(data);
    
    return NextResponse.json(normalized, { status: 201 });
  } catch (error) {
    console.error("POST /api/food error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
export async function PUT(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json(
        { error: "Missing id parameter" },
        { status: 400 }
      );
    }
    
    const body = await request.json();
    
    const payload = {
      name: body.food_name || body.name,
      image: body.food_image || body.image,
      rating: body.food_rating || body.rating,
      restaurant: body.restaurant || {
        name: body.restaurant_name,
        logo: body.restaurant_logo,
        status: body.restaurant_status,
      },
    };
    
    const res = await fetch(`${MOCK_API}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    
    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to update food item" },
        { status: res.status }
      );
    }
    
    const data = await res.json();
    const normalized = normalizeItem(data);
    
    return NextResponse.json(normalized);
  } catch (error) {
    console.error("PUT /api/food error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json(
        { error: "Missing id parameter" },
        { status: 400 }
      );
    }
    
    const res = await fetch(`${MOCK_API}/${id}`, {
      method: "DELETE",
    });
    
    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to delete food item" },
        { status: res.status }
      );
    }
    
    const data = await res.json();
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("DELETE /api/food error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
