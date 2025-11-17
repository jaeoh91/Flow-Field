# Flow Field Generator

A generative art tool built with p5.js that creates flow field patterns using Perlin noise. Perfect for generating desktop wallpapers.

## Description

This sketch generates dynamic flow field visualizations by simulating particles moving through a noise-based vector field. Each particle follows the flow direction determined by Perlin noise, creating beautiful, river-like patterns that develop over time. The animation automatically stops after 500 frames to maintain optimal performance.

## Features

- Responsive design that scales density based on screen size
- Customizable color gradients with diagonal direction variation
- Automatic frame limiting to prevent performance degradation
- High pixel density (defaults to 2x screen resolution) for crisp, high-resolution outputs
- Click on the drawing to save to downloads

## Setup

1. Make sure you have the p5.js libraries in the `libraries/` folder:
   - `p5.min.js`
   - `p5.sound.min.js`

2. Start a local web server in the project directory:
   ```bash
   python3 -m http.server 8000
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

4. Click anywhere on the canvas to save the current design as a PNG file.

## Customization

Edit `sketch.js` to customize:

- **Colors**: Change the hex values in the `define_colors` section
- **Branching**: Adjust the `mult` value (smaller = more branches, larger = smoother flow)
- **Density**: Modify `baseDensity` to change particle count
- **Frame limit**: Change `maxFrames` to control render duration

## Demo Images

![Demo 1](demos/flowfield-60.png)

![Demo 2](demos/flowfield-63.png)

![Demo 3](demos/flowfield-35.png)

![Demo 4](demos/flowfield-43.png)






