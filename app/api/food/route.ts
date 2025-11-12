import { FoodItem, FoodItemInput, FoodItemUpdateInput, PaginatedFoodItems } from "@/type/food";
import { NextRequest, NextResponse } from "next/server";

const MOCK_API = "https://6852821e0594059b23cdd834.mockapi.io/Food";

function normalizeItem(x: any): any {
  return {
    id: String(x.id ?? crypto.randomUUID()),
    name: x.name ?? x.food_name ?? "Untitled",
    image: x.image ?? x.avatar ?? x.food_image ?? "/placeholder.svg",
    rating: typeof x.rating === "number" ? x.rating : Number(x.food_rating ?? 0) || undefined,
    restaurant: {
      name: x.restaurant?.name ?? x.restaurant_name ?? "Unknown",
      logo: x.restaurant?.logo ?? x.logo ?? x.restaurant_logo ?? "/placeholder.svg",
      status: x.restaurant?.status ?? (x.open ? "Open Now" : "Closed"),
    },
    createdAt: x.createdAt,
  };
}

function toApiPayload(input: any) {
  return {
    name: input.food_name || input.name,
    avatar: input.food_image || input.image || input.avatar,
    rating: input.food_rating || input.rating,
    open: input.restaurant_status === "Open Now" || input.restaurant?.status === "Open Now",
    logo: input.restaurant_logo || input.restaurant?.logo || input.logo,
  };
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const name = searchParams.get("name");
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");
    const sort = searchParams.get("sort");
    const filter = searchParams.get("filter");
    
    let url = MOCK_API;
    const params = new URLSearchParams();
    
    if (name) params.append("name", name);
    if (filter) params.append("filter", filter);
    if (sort) params.append("sort", sort);
    if (page) params.append("page", page.toString());
    if (pageSize) params.append("limit", pageSize.toString());
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
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
    
    const totalCount = normalized.length;
    const totalPages = Math.ceil(totalCount / pageSize);
    
    const response: PaginatedFoodItems = {
      items: normalized,
      totalCount,
    };
    
    return NextResponse.json(response);
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
    const body: FoodItemInput = await request.json();
    
    const payload = toApiPayload(body);
    
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
    
    const body: FoodItemUpdateInput = await request.json();
    
    const payload = toApiPayload(body);
    
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
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/food error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
