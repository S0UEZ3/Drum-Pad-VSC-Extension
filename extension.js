const vscode = require('vscode');
const path = require('path');

function activate(context) {
  let disposable = vscode.commands.registerCommand('drumPad.open', function () {
    const panel = vscode.window.createWebviewPanel(
      'drumPadView',
      'Drum Pad',
      vscode.ViewColumn.One,
      {
        enableScripts: true,
      }
    );

    // Resolve audio file paths to URIs accessible in the webview
    const kickUri = panel.webview.asWebviewUri(
      vscode.Uri.file(path.join(context.extensionPath, 'sounds', 'kick.mp3'))
    );
    const snareUri = panel.webview.asWebviewUri(
      vscode.Uri.file(path.join(context.extensionPath, 'sounds', 'snare.mp3'))
    );
    const hihatUri = panel.webview.asWebviewUri(
      vscode.Uri.file(path.join(context.extensionPath, 'sounds', 'hihat.mp3'))
    );
    const clapUri = panel.webview.asWebviewUri(
      vscode.Uri.file(path.join(context.extensionPath, 'sounds', 'clap.mp3'))
    );
    const metronomeUri = panel.webview.asWebviewUri(
      vscode.Uri.file(path.join(context.extensionPath, 'sounds', 'metronome.mp3'))
    );

    // Pass the URIs to the HTML content
    panel.webview.html = getWebviewContent(kickUri, snareUri, hihatUri, clapUri, metronomeUri);
  });

  context.subscriptions.push(disposable);
}

function getWebviewContent(kickUri, snareUri, hihatUri, clapUri, metronomeUri) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Drum Pad</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          margin: 0;
        }
        .pad-container {
          display: grid;
          grid-template-columns: repeat(2, 150px);
          gap: 20px;
          margin-bottom: 20px;
        }
        .pad {
          width: 150px;
          height: 150px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #444;
          color: white;
          font-size: 24px;
          cursor: pointer;
          border-radius: 10px;
          transition: background-color 0.1s;
        }
        .pad.active {
          background-color: #ffa500;
        }
        #metronome-controls {
          display: flex;
          align-items: center;
          gap: 10px;
        }
      </style>
    </head>
    <body>
      <div class="pad-container">
        <div class="pad" data-sound="kick" id="pad1">K</div>
        <div class="pad" data-sound="snare" id="pad2">S</div>
        <div class="pad" data-sound="hihat" id="pad3">H</div>
        <div class="pad" data-sound="clap" id="pad4">C</div>
      </div>

      <div id="metronome-controls">
        <button id="metronome-toggle">Start Metronome</button>
        <label for="bpm">BPM:</label>
        <input type="number" id="bpm" value="120" min="40" max="240">
      </div>

      <audio id="kick" src="${kickUri}"></audio>
      <audio id="snare" src="${snareUri}"></audio>
      <audio id="hihat" src="${hihatUri}"></audio>
      <audio id="clap" src="${clapUri}"></audio>
      <audio id="metronome-sound" src="${metronomeUri}"></audio>

      <script>
        const pads = document.querySelectorAll('.pad');
        const sounds = {
          K: 'kick',
          S: 'snare',
          H: 'hihat',
          C: 'clap'
        };

        function playSound(key) {
          const soundId = sounds[key.toUpperCase()];
          const audio = document.getElementById(soundId);
          const pad = document.querySelector(\`.pad[data-sound="\${soundId}"]\`);

          if (audio && pad) {
            audio.currentTime = 0;
            audio.play();
            pad.classList.add('active');
            setTimeout(() => pad.classList.remove('active'), 100);
          }
        }

        document.addEventListener('keydown', (event) => {
          playSound(event.key);
        });

        pads.forEach(pad => {
          pad.addEventListener('click', () => {
            playSound(pad.innerText);
          });
        });

        // Metronome functionality
        let metronomeInterval;
        const metronomeSound = document.getElementById('metronome-sound');
        const bpmInput = document.getElementById('bpm');
        const metronomeToggle = document.getElementById('metronome-toggle');

        metronomeToggle.addEventListener('click', () => {
          if (metronomeInterval) {
            clearInterval(metronomeInterval);
            metronomeInterval = null;
            metronomeToggle.innerText = 'Start Metronome';
          } else {
            startMetronome();
            metronomeToggle.innerText = 'Stop Metronome';
          }
        });

        function startMetronome() {
          const bpm = parseInt(bpmInput.value, 10);
          const interval = 60000 / bpm; // Calculate interval in milliseconds

          if (metronomeInterval) clearInterval(metronomeInterval); // Clear any existing interval

          metronomeInterval = setInterval(() => {
            metronomeSound.currentTime = 0;
            metronomeSound.play();
          }, interval);
        }
      </script>
    </body>
    </html>
  `;
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
