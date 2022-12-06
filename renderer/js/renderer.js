const form = document.getElementById("form");
const fileName = document.getElementById("file-name");
const fileInput = document.getElementById("file");
const width = document.getElementById("width");
const height = document.getElementById("height");
const fileOutput = document.getElementById("output-path");

fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!isImageFile(file)) {
    alertError("This type is not available.");
    return;
  }

  const image = new Image();
  image.src = URL.createObjectURL(file);
  image.onload = () => {
    width.value = image.width;
    height.value = image.height;
  };

  form.style.display = "flex";
  fileName.innerText = file.name;
  fileOutput.innerText = path.join(
    os.homeDir(),
    "electron/image-resizing-app",
    "imageresizer"
  );
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!fileInput.files[0]) {
    alertError("Please upload an image");
    return;
  }

  const filledWidth = width.value;
  const filledHeight = height.value;

  if (filledWidth === "" || filledHeight === "") {
    alertError("Please fill in a width and height");
    return;
  }

  const imgPath = fileInput.files[0].path;
  ipcRenderer.send("image:resize", {
    imgPath,
    filledWidth,
    filledHeight,
  });
});

ipcRenderer.on("image:done", () => {
  alertSuccess(`Image resized to ${width.value} x ${height.value}`);
});

const isImageFile = (file) => {
  const acceptedImageTypes = ["image/gif", "image/png", "image/jpeg"];
  return file && acceptedImageTypes.includes(file["type"]);
};

const alertError = (message) => {
  Toastify.toast({
    text: message,
    duration: 3000,
    close: false,
    style: {
      background: "red",
      color: "white",
      textAlign: "center",
      padding: "5px",
    },
  });
};

const alertSuccess = (message) => {
  Toastify.toast({
    text: message,
    duration: 3000,
    close: false,
    style: {
      background: "green",
      color: "white",
      textAlign: "center",
    },
  });
};
