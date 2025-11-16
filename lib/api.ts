/**
 * API client for vision-based testing backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: unknown
  ) {
    super(message);
    this.name = 'APIError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
    throw new APIError(
      error.detail || `HTTP ${response.status}`,
      response.status,
      error
    );
  }
  return response.json();
}

// ============================================================================
// Vision Detection API
// ============================================================================

export async function captureScreen(monitor = 1, savePath?: string) {
  const response = await fetch(`${API_BASE_URL}/api/capture`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ monitor, save_path: savePath }),
  });
  return handleResponse(response);
}

export async function detectElements(params: {
  image_path?: string;
  screenshot?: string;
  confidence_threshold?: number;
  element_classes?: string[];
}) {
  const response = await fetch(`${API_BASE_URL}/api/detect`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  return handleResponse(response);
}

// ============================================================================
// Action Execution API
// ============================================================================

export async function executeClick(elementClass?: string, text?: string) {
  const params = new URLSearchParams();
  if (elementClass) params.append('element_class', elementClass);
  if (text) params.append('text', text);
  
  const response = await fetch(`${API_BASE_URL}/api/execute/click?${params}`, {
    method: 'POST',
  });
  return handleResponse(response);
}

export async function executeType(text: string, inputIdentifier?: string) {
  const params = new URLSearchParams({ text });
  if (inputIdentifier) params.append('input_identifier', inputIdentifier);
  
  const response = await fetch(`${API_BASE_URL}/api/execute/type?${params}`, {
    method: 'POST',
  });
  return handleResponse(response);
}

export async function executeScenario(scenario: unknown) {
  const response = await fetch(`${API_BASE_URL}/api/execute/scenario`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(scenario),
  });
  return handleResponse(response);
}

// ============================================================================
// Training API
// ============================================================================

export async function startTraining(request: unknown) {
  const response = await fetch(`${API_BASE_URL}/api/train/start`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });
  return handleResponse(response);
}

export async function listModels() {
  const response = await fetch(`${API_BASE_URL}/api/models`);
  return handleResponse(response);
}

// ============================================================================
// Quantum Optimization API
// ============================================================================

export async function getQuantumMetrics(request: unknown) {
  const response = await fetch(`${API_BASE_URL}/api/optimize/quantum`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });
  return handleResponse(response);
}

// ============================================================================
// Health Check API
// ============================================================================

export async function healthCheck() {
  const response = await fetch(`${API_BASE_URL}/health`);
  return handleResponse(response);
}

export { APIError };
