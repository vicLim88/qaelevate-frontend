# Discovery & Exploration Feature

## Overview

The Discovery & Exploration tab is the heart of QA Elevate's autonomous testing capabilities. It allows AI agents to automatically crawl and map your entire web application, discovering all pages, interactions, and user flows without any manual configuration.

## Key Features

### 🌳 Hierarchical Graph Visualization

- **Top-Down Layout**: Pages are arranged in a tree structure based on navigation depth
- **Interactive Nodes**: Click on any page node to view detailed interactions
- **Connection Lines**: Visual representation of page relationships and navigation paths
- **Generous Spacing**: 500px horizontal spacing for clear readability
- **Depth Indicators**: Each level represents one navigation layer deep

### 📊 Real-Time Metrics

Monitor the exploration process with live metrics:

- **Total Pages**: Number of unique pages discovered
- **Exploration Depth**: Maximum navigation depth reached
- **Pages Per Minute**: Crawling speed
- **Coverage**: Percentage of estimated site coverage

### 🎯 Visual Element Detection

See all interactive elements discovered on each page:

- **Buttons**: Primary actions users can take
- **Links**: Navigation elements and external references
- **Forms**: Data collection points
- **Inputs**: Individual form fields and search boxes

### 🖼️ Screenshot Visualization

- **Visual AI Detection**: Computer vision-based bounding boxes on page screenshots
- **Click-to-Expand**: Full-size screenshot viewing
- **Hover Highlights**: Hover over elements to see corresponding bounding boxes
- **Color Coding**: Different colors for different element types

## How It Works

### 1. Autonomous Crawling

```typescript
// AI agents start from the home page
const startUrl = 'https://your-app.com';

// Discover all linked pages automatically
// - Follows navigation links
// - Detects dynamic routes
// - Maps user flows
```

### 2. Visual Detection

Using advanced computer vision AI:

```typescript
interface BoundingBox {
  x: number;      // X position as percentage (0-100)
  y: number;      // Y position as percentage (0-100)
  width: number;  // Width as percentage
  height: number; // Height as percentage
}

// Example: Button detected at top-right
{
  label: 'Sign In',
  boundingBox: { x: 75, y: 3, width: 7, height: 4 }
}
```

### 3. Page Analysis

For each discovered page, the system captures:

- **URL**: Full page address
- **Title**: Page title for identification
- **Depth**: Navigation depth from home page
- **Connections**: Links to other discovered pages
- **Interactions**: Count of interactive elements
- **Screenshot**: Visual representation
- **Detection Data**: All discovered elements with positions

## Graph Visualization

### View Modes

1. **Graph View** (Default)
   - Interactive ReactFlow network diagram
   - Hierarchical top-down layout
   - Pan and zoom controls
   - MiniMap for navigation

2. **Grid View**
   - Card-based layout
   - Quick overview of all pages
   - Filter and search capabilities

### Node Structure

Each node in the graph represents a discovered page:

```typescript
{
  id: 'page-001',
  url: 'https://ecommerce-demo.com',
  title: 'Home Page',
  depth: 0,
  connections: ['page-002', 'page-003', 'page-004'],
  interactions: 12,
  type: 'landing'
}
```

### Node Colors by Type

- **🔵 Blue (landing)**: Entry points and home pages
- **🟢 Green (content)**: Content and product pages
- **🟡 Yellow (form)**: Pages with forms
- **🔴 Red (checkout)**: Checkout and payment flows
- **🟣 Purple (auth)**: Login and authentication pages

## Details Panel

Click on any page to see:

### Button Detection

```
Shop Now
Detected at (42%, 35%)

View Cart
Detected at (85%, 3%)
```

### Link Detection

```
Products → /products
Detected at (15%, 3%)

Cart → /cart
Detected at (85%, 3%)
```

### Form Detection

```
newsletter-form (1 field)
Detected at (30%, 85%)
```

### Input Detection

```
search (type: search, name: q)
Detected at (45%, 8%)

email (type: email, name: email)
Detected at (32%, 86%)
```

## Screenshot Features

### Bounding Box Overlay

When viewing a screenshot, you'll see:

- **SVG Overlay**: Precise bounding boxes drawn on the image
- **Labels**: Element names/text above each box
- **Color-Coded**: Blue (buttons), Purple (links), Green (forms), Orange (inputs)
- **Percentage-Based**: Responsive to any screen size

### Click-to-Expand Modal

Click the "Expand" button or the screenshot to:

- View full-size screenshot
- See all bounding boxes in detail
- Close with ESC key, X button, or click outside

### Hover Effects

- Hover over an element in the details panel
- Corresponding bounding box highlights on screenshot
- Makes it easy to locate elements visually

## Technical Implementation

### Component Structure

```typescript
<DiscoveryExplorationTab
  discoveredPages={pages}
  isExploring={true}
  explorationMetrics={{
    totalPages: 8,
    explorationDepth: 3,
    pagesPerMinute: 2.5,
    coverage: 87
  }}
/>
```

### Data Flow

1. **Agent Discovers Page** → Screenshot captured
2. **Visual Detection Runs** → Bounding boxes calculated
3. **Data Stored** → Page added to discovered pages array
4. **Graph Updates** → New node and connections added
5. **Metrics Update** → Real-time statistics recalculated

## Use Cases

### 1. Initial Application Mapping

- Upload your application URL
- Let agents discover all pages automatically
- Review the generated site map
- Identify missing or broken links

### 2. User Flow Analysis

- See how pages connect to each other
- Identify critical user paths
- Discover dead-end pages
- Optimize navigation structure

### 3. Test Planning

- Review all interactive elements
- Identify test-worthy interactions
- Prioritize high-traffic flows
- Generate test scenarios

### 4. Regression Testing

- Compare current vs. previous discoveries
- Detect new pages or removed pages
- Identify changed interactions
- Validate navigation consistency

## Benefits

✅ **No Manual Configuration** - Just provide a URL  
✅ **Visual Detection** - No need for CSS selectors or XPath  
✅ **Comprehensive Coverage** - Finds all pages automatically  
✅ **Real-Time Monitoring** - Watch exploration progress live  
✅ **Interactive Visualization** - Easy to understand site structure  
✅ **Screenshot Evidence** - Visual proof of discoveries  
✅ **Scalable** - Works for sites of any size  

## Next Steps

After discovery is complete:

1. Review the generated site map
2. Click on pages to see detailed interactions
3. Move to **AI Test Generation** tab to create test cases
4. Execute tests in **Test Jobs** tab

---

**Autonomous discovery means less manual work and more comprehensive testing coverage!** 🚀
