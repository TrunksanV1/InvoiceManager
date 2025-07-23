const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn, exec } = require('child_process');
const http = require('http');
const javaPath = path.join(__dirname, 'jdk-17.0.15.6-hotspot', 'bin', 'java.exe');

let backend;
let mainWindow;

function startBackend() {
    backend = spawn(javaPath, ['-jar', 'build/libs/backend-0.0.1-SNAPSHOT.jar'], {
        cwd: path.join(__dirname, '../backend'),
        detached: false,
        stdio: 'inherit',
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
    mainWindow.loadURL('http://localhost:3000');
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
