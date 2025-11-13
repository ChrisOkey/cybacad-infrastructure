export const fetchData = async (url: string, options?: RequestInit) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  const response = await fetch(url, { ...options, mode: "cors", signal: controller.signal });
  clearTimeout(timeoutId);

  const result = await response.json();
  if (!response.ok || result.status !== "success") {
    throw new Error(result.message || `HTTP Error ${response.status}`);
  }
  return result.data;
};
