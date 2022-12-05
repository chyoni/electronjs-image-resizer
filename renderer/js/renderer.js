const form = document.getElementById("form");
const fileName = document.getElementById("file-name");
const fileInput = document.getElementById("file");
const width = document.getElementById("width");
const height = document.getElementById("height");
const fileOutput = document.getElementById("output-path");

fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!isImageFile(file)) {
    console.log("This type is not available.");
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

const isImageFile = (file) => {
  const acceptedImageTypes = ["image/gif", "image/png", "image/jpeg"];
  return file && acceptedImageTypes.includes(file["type"]);
};
