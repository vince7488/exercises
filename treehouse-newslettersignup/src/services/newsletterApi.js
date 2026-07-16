const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "");
const API_AUTH_KEY = import.meta.env.VITE_API_AUTH_KEY;

function assertConfiguration() {
  if (!API_BASE_URL || !API_AUTH_KEY) {
    throw new Error(
      "The newsletter API is not configured. Add the base URL and auth key to your local environment.",
    );
  }
}

async function request(path, options = {}) {
  assertConfiguration();

  // Keeps authentication and JSON error handling in one place instead of scattering fetch calls around the UI.
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      Authorization: API_AUTH_KEY,
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    let message = `The newsletter service returned ${response.status}.`;

    try {
      const errorBody = await response.json();
      message = errorBody.message || errorBody.error || message;
    } catch {
      // Some API errors have no JSON body, so the status message remains the useful fallback.
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  const body = await response.text();
  return body ? JSON.parse(body) : null;
}

export async function getSubscribers() {
  const response = await request("/newsletter");

  // Accepts the documented array and a few conventional wrappers without leaking transport quirks into the page.
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.subscribers)) return response.subscribers;
  if (Array.isArray(response?.newsletter)) return response.newsletter;
  return [];
}

export function createSubscriber(subscriber) {
  // Sends only the two API fields after the form has passed local validation.
  return request("/newsletter", {
    method: "POST",
    body: JSON.stringify({
      name: subscriber.name.trim(),
      email: subscriber.email.trim(),
    }),
  });
}

export function deleteSubscriber(id) {
  // Encodes the record ID before the destructive request reaches the newsletter API.
  return request(`/newsletter/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}
