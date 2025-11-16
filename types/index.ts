/**
 * Type definitions for the vision-based testing platform
 */

// ============================================================================
// Vision Detection Types
// ============================================================================

export interface BoundingBox {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface DetectedElement {
  class_name: string;
  confidence: number;
  bbox: [number, number, number, number]; // [x1, y1, x2, y2]
  center: [number, number]; // [x, y]
  text?: string;
  screenshot_path?: string;
}

export interface DetectionResponse {
  elements: DetectedElement[];
  total_detected: number;
  screenshot_path: string;
  processing_time: number;
}

// ============================================================================
// Action Types
// ============================================================================

export type ActionType = 
  | 'click'
  | 'double_click'
  | 'right_click'
  | 'type_text'
  | 'hover'
  | 'scroll'
  | 'wait'
  | 'verify';

export interface VisionAction {
  type: ActionType;
  element_class?: string;
  text_to_find?: string;
  coordinates?: [number, number];
  input_text?: string;
  description: string;
  timeout?: number;
}

// ============================================================================
// Test Scenario Types
// ============================================================================

export interface TestScenario {
  name: string;
  description: string;
  start_state?: string;
  end_state?: string;
  actions: VisionAction[];
  validations: string[];
  tags: string[];
}

export interface TestExecutionResult {
  scenario_name: string;
  success: boolean;
  duration: number;
  actions_executed: number;
  actions_failed: number;
  screenshots: string[];
  error_message?: string;
  timestamp: string;
}

// ============================================================================
// YOLO Training Types
// ============================================================================

export interface TrainingDataset {
  name: string;
  description: string;
  num_images: number;
  num_annotations: number;
  classes: string[];
  split: {
    train: number;
    val: number;
    test: number;
  };
  created_at: string;
}

export interface TrainingRequest {
  dataset_path: string;
  epochs: number;
  batch_size: number;
  image_size: number;
  model_name: string;
  pretrained: boolean;
}

export interface TrainingStatus {
  model_name: string;
  status: 'training' | 'completed' | 'failed';
  current_epoch: number;
  total_epochs: number;
  metrics: {
    precision?: number;
    recall?: number;
    mAP50?: number;
    mAP50_95?: number;
    loss?: number;
  };
  started_at: string;
  completed_at?: string;
}

// ============================================================================
// Quantum Optimization Types
// ============================================================================

export interface OptimizationRequest {
  start_state: string;
  target_states: string[];
  use_quantum: boolean;
  quantum_backend: 'simulator' | 'dwave' | 'ibm';
}

export interface OptimizationResponse {
  path: string[];
  total_cost: number;
  coverage: number;
  optimization_method: 'classical' | 'quantum';
  computation_time: number;
}

export interface QuantumMetrics {
  problem_size: number;
  classical_time_estimate: number;
  quantum_time_estimate: number;
  estimated_speedup: number;
  backend_used: string;
}

// ============================================================================
// UI State Graph Types
// ============================================================================

export interface UIState {
  id: string;
  screenshot_path: string;
  detected_elements: DetectedElement[];
  timestamp: string;
  metadata: Record<string, unknown>;
}

export interface StateTransition {
  from_state: string;
  to_state: string;
  action: VisionAction;
  success: boolean;
  execution_time: number;
}

export interface GraphNode {
  id: string;
  label: string;
  screenshot?: string;
  elements: number;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label: string;
  action: string;
}

// ============================================================================
// API Response Types
// ============================================================================

export interface APIResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface HealthCheck {
  status: 'healthy' | 'unhealthy';
  components: {
    screen_capture: string;
    yolo_detector: string;
    vision_executor: string;
    quantum_optimizer: string;
  };
}

// ============================================================================
// Component Props Types
// ============================================================================

export interface DetectionVisualizerProps {
  elements: DetectedElement[];
  screenshot: string;
  onElementClick?: (element: DetectedElement) => void;
}

export interface ActionBuilderProps {
  onActionCreate: (action: VisionAction) => void;
  availableElements?: DetectedElement[];
}

export interface ScenarioEditorProps {
  scenario?: TestScenario;
  onSave: (scenario: TestScenario) => void;
  onCancel: () => void;
}

export interface GraphVisualizerProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  onNodeClick?: (node: GraphNode) => void;
}

// ============================================================================
// Utility Types
// ============================================================================

export type ElementClass = 
  | 'button'
  | 'input_text'
  | 'input_password'
  | 'input_email'
  | 'link'
  | 'checkbox'
  | 'radio_button'
  | 'dropdown'
  | 'textarea'
  | 'submit_button'
  | 'menu'
  | 'menu_item'
  | 'tab'
  | 'modal'
  | 'dialog';

export type TrainingPhase = 'idle' | 'training' | 'validating' | 'completed' | 'failed';

export type OptimizationBackend = 'simulator' | 'dwave' | 'ibm';
