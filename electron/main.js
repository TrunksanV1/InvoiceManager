const {app, BrowserWindow} = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let backend;

function createWindow() {
    const window = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences:{
            contextIsolation: true,
        },
    });

    window.loadURL("http://localhost:3000");

    //window.loadFile(path.join(__dirname, 'index.html'));
}

function startBackend() {
    backend = spawn('java', ['-jar', '../backend/build/libs/backend-0.0.1-SNAPSHOT.jar'], {
        cwd: path.join(__dirname, '../backend'),        
        detached: true, //false for prod
        stdio: 'ignore',
        //shell: false,
        //windowHide: true,
    });
    backend.unref();
}

function stopBackend() {
    if (backend) {
        backend.kill();
        backend = null;
    }
}

app.whenReady().then(()=>{
   /* startBackend();*/
    createWindow();
})

app.on('window-all-closed',()=>{
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('before-quit',()=>{
    stopBackend();
});

