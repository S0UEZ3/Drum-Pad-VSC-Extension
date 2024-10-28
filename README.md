# Drum Pad VS Code Extension

**Drum Pad** is an interactive drum pad trainer extension for Visual Studio Code that allows users to practice rhythm through finger drumming and train their timing with a metronome. This extension features four drum sounds (Kick, Snare, Hi-Hat, Clap) and a customizable metronome for rhythm practice.

## Features

- **Interactive Drum Pads**: Play Kick, Snare, Hi-Hat, and Clap sounds by pressing corresponding keys on your keyboard or clicking the pads.
- **Metronome with BPM Control**: Start or stop a metronome with adjustable BPM to practice timing.

## Usage

### Opening the Drum Pad

1. Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS).
2. Search for and run the command `Drum Pad: Open`.
3. The drum pad will open in a new VS Code panel.

### Using the Drum Pads

- **Keyboard Controls**:
  - Press `K` for Kick, `S` for Snare, `H` for Hi-Hat, and `C` for Clap.
  - The corresponding sound will play, and the pad will briefly light up.
- **Mouse Controls**:
  - Click on each pad to play its sound.

### Metronome Controls

1. **Start/Stop Metronome**: Click the **Start Metronome** button to start and **Stop Metronome** to stop it.
2. **Adjust BPM**: Set your desired BPM (40–240) in the input box next to the button. The metronome interval will adjust accordingly.

## Extension Structure

- **Main File**: `extension.js` - Handles command registration and webview setup.
- **Sounds Folder**: Stores audio files (`kick.mp3`, `snare.mp3`, `hihat.mp3`, `clap.mp3`, `metronome.mp3`).
- **Webview Content**: Defined in `getWebviewContent()` function, setting up the HTML, CSS, and JavaScript for the drum pad interface and functionality.

## Development

### Requirements

- **Node.js**: Required for developing VS Code extensions.
- **VS Code**: For testing and running the extension.

### Commands

- **`Drum Pad: Open`**: Opens the drum pad interface in a webview panel.

### Running Locally

1. Clone the extension repository.
2. Open the folder in VS Code.
3. Run the extension by pressing `F5` to open a new VS Code window with the extension loaded.
