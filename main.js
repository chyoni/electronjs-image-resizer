const { app, BrowserWindow, ipcMain, shell } = require("electron");
const path = require("path");
const os = require("os");
const fs = require("fs");
const resizeImg = require("resize-img");

const isDev = process.env.NODE_ENV !== "production";
const isMac = process.platform === "darwin";
let win;
const createMainWindow = () => {
  win = new BrowserWindow({
    title: "Image Resizer",
    width: isDev ? 1000 : 500,
    height: 700,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (isDev) win.webContents.openDevTools();

  win.loadFile(path.join(__dirname, "./renderer/index.html"));
};

app.whenReady().then(() => {
  createMainWindow();

  win.on("closed", () => (win = null));

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

ipcMain.on("image:resize", (_, options) => {
  options.dest = path.join(
    os.homedir(),
    "electron/image-resizing-app",
    "imageresizer"
  );
  doResizeImage(options);
});

const doResizeImage = async ({ imgPath, filledWidth, filledHeight, dest }) => {
  try {
    const newPath = await resizeImg(fs.readFileSync(imgPath), {
      width: +filledWidth,
      height: +filledHeight,
    });

    const filename = path.basename(imgPath);

    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest);
    }

    fs.writeFileSync(path.join(dest, filename), newPath);

    win.webContents.send("image:done");
    // Open dest folder
    shell.openPath(dest);
  } catch (e) {
    console.log(e);
  }
};

app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});
