const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn, exec } = require('child_process');
const http = require('http');
const isDev = !app.isPackaged;

const javaPath = isDev
  ? path.join(__dirname, 'jdk-17.0.15.6-hotspot', 'bin', 'java.exe')
  : path.join(process.resourcesPath, 'jdk-17.0.15.6-hotspot', 'bin', 'java.exe');

  
const backendJarPath = isDev
  ? path.join(__dirname, 'java', 'backend-0.0.1-SNAPSHOT.jar')
  : path.join(process.resourcesPath, 'java', 'backend-0.0.1-SNAPSHOT.jar');

let backend;
let mainWindow;

function startBackend() {
  const additionalConfigPath = isDev
    ? path.resolve(__dirname, './config/company.yml')
    : path.join(process.resourcesPath, 'config', 'company.yml');

  if (process.platform === 'win32') {
    const cmd = javaPath;
    const args = [
    '-jar',
    backendJarPath,
    `--spring.config.additional-location=file:${additionalConfigPath}`
    ];

    backend = spawn(cmd, args, {
    cwd: path.dirname(backendJarPath),
    detached: true,
    stdio: 'ignore'
    });
  } else {
    backend = spawn(javaPath, [
      '-jar',
      backendJarPath,
      `--spring.config.additional-location=file:${additionalConfigPath}`
    ], {
      cwd: path.dirname(backendJarPath),
      detached: true,
      stdio: 'ignore',
    });
  }

  backend.on('error', (err) => {
    console.error('Failed to start backend process:', err);
  });
}


function stopBackend() {
    if (backend) {
        console.log('Killing backend process...');
        exec(`taskkill /PID ${backend.pid} /T /F`, (err) => {
            if (err) {
                console.error(`Failed to kill backend: ${err.message}`);
            } else {
                console.log('Backend process killed successfully.');
            }
        });
        backend = null;
    }
}

function waitForBackendReady(url = 'http://localhost:8080/health', timeout = 30000, interval = 500) {
    return new Promise((resolve, reject) => {
        const start = Date.now();

        const check = () => {
            const req = http.get(url, (res) => {
                if (res.statusCode === 200 || res.statusCode === 404) {
                    resolve();
                } else {
                    retry();
                }
            });

            req.on('error', retry);
            req.setTimeout(1000, () => {
                req.abort();
                retry();
            });
        };

        const retry = () => {
            if (Date.now() - start > timeout) {
                reject(new Error('Backend did not start in time.'));
            } else {
                setTimeout(check, interval);
            }
        };

        check();
    });
}

function createLoadingWindow() {
    mainWindow = new BrowserWindow({
        width: 500,
        height: 300,
        icon: path.join(__dirname, 'assets', 'logo.ico'),
        webPreferences: {
            contextIsolation: true,
        },
    });

    mainWindow.loadFile(path.join(__dirname, 'loading.html'));
}

function loadMainApp() {
    mainWindow.setSize(1200, 800);
    mainWindow.center();
    mainWindow.setResizable(true);
    mainWindow.setAlwaysOnTop(false);
    mainWindow.loadFile(path.join(__dirname, 'react/build/index.html'));
}

app.whenReady().then(() => {
    startBackend();
    createLoadingWindow();

    waitForBackendReady()
        .then(() => {
            console.log('Backend is ready. Loading app...');
            loadMainApp();
        })
        .catch((err) => {
            console.error(err.message);
            stopBackend();
            app.quit();
        });
});

app.on('window-all-closed', () => {
    stopBackend();
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('before-quit', () => {
    stopBackend();
});
