# GeoGrid-Healthcare-Mapper

This project is a web application that utilizes the Google Maps API to allow users to draw a polygon on a map and display a grid within that polygon. Additionally, it indicates places of a specified type (e.g., hospitals) within the marked area.

## Features

- Draw a polygon on the map.
- Display a grid within the drawn polygon.
- Indicate and count specific places (e.g., hospitals) within the polygon.
- Clear the polygon and grid.

## Getting Started

### Prerequisites

- A web browser with internet access.

### Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/polygon-grid-mapper.git
    cd polygon-grid-mapper
    ```

2. Obtain a Google Maps API key from the [Google Cloud Console](https://console.cloud.google.com/).

3. Replace the placeholder API key in the HTML file with your own API key:
    ```html
    <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY"></script>
    ```

4. Open the `index.html` file in a web browser.

## Usage

### Drawing a Polygon

- Click on the map to draw vertices of the polygon.
- The polygon will be displayed with a grid inside it.

### Indicating Places

1. Select the place type from the dropdown menu.
2. Click the "Show Hospitals" button to indicate and count hospitals within the polygon.

### Clearing the Polygon

- Click the "Clear" button to remove the polygon and grid.
