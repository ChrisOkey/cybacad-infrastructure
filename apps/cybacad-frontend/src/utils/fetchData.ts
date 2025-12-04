// apps/cybacad-frontend/src/utils/fetchData.ts

export const fetchData = async (url: string, options?: RequestInit) => {
  const controller = new AbortController();
  // 15 second timeout to prevent hanging requests
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(url, { 
        ...options, 
        mode: "cors", 
        signal: controller.signal 
    });
    clearTimeout(timeoutId);

    const result = await response.json();

    // Check both HTTP status and API-specific status
    if (!response.ok || (result.status && result.status !== "success")) {
      throw new Error(result.message || `HTTP Error ${response.status}`);
    }
    
    // If your API returns { status: "success", data: [...] }, return .data
    // If it returns raw array, return result directly.
    return result.data || result;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};