const fileInput = document.querySelector("#file-input");
const editorCanvas = document.querySelector("#editor-canvas");
const canvasShell = document.querySelector("#canvas-shell");
const canvasStage = document.querySelector("#canvas-stage");
const brushCursor = document.querySelector("#brush-cursor");
const fileName = document.querySelector("#file-name");
const statusText = document.querySelector("#status-text");
const brushSizeInput = document.querySelector("#brush-size");
const zoomLevelInput = document.querySelector("#zoom-level");
const islandThresholdInput = document.querySelector("#island-threshold");
const brushSizeValue = document.querySelector("#brush-size-value");
const zoomLevelValue = document.querySelector("#zoom-level-value");
const islandThresholdValue = document.querySelector("#island-threshold-value");
const modeRestoreButton = document.querySelector("#mode-restore");
const modeWhiteButton = document.querySelector("#mode-white");
const modeSampleButton = document.querySelector("#mode-sample");
const modeEraseButton = document.querySelector("#mode-erase");
const sampleColorValue = document.querySelector("#sample-color-value");
const viewNormalButton = document.querySelector("#view-normal");
const viewAlphaButton = document.querySelector("#view-alpha");
const undoButton = document.querySelector("#undo-button");
const redoButton = document.querySelector("#redo-button");
const resetButton = document.querySelector("#reset-button");
const removeIslandsButton = document.querySelector("#remove-islands-button");
const downloadButton = document.querySelector("#download-button");

const ctx = editorCanvas.getContext("2d", { willReadFrequently: true });

const state = {
  imageName: "",
  originalImageData: null,
  currentImageData: null,
  undoStack: [],
  redoStack: [],
  isDrawing: false,
  brushMode: "restore",
  viewMode: "artwork",
  brushSize: Number(brushSizeInput.value),
  zoom: Number(zoomLevelInput.value) / 100,
  islandThreshold: Number(islandThresholdInput.value),
  sampledColor: { r: 255, g: 255, b: 255 },
  cursorVisible: false,
};

function setStatus(message) {
  statusText.textContent = message;
}

function updateButtonState() {
  const hasImage = Boolean(state.currentImageData);
  undoButton.disabled = !hasImage || state.undoStack.length === 0;
  redoButton.disabled = !hasImage || state.redoStack.length === 0;
  resetButton.disabled = !hasImage;
  removeIslandsButton.disabled = !hasImage;
  downloadButton.disabled = !hasImage;
}

function updateBrushCursor() {
  const size = state.brushSize * state.zoom;
  brushCursor.style.width = `${size}px`;
  brushCursor.style.height = `${size}px`;
  brushCursor.style.display = state.cursorVisible ? "block" : "none";
}

function updateScale() {
  if (!state.currentImageData) {
    return;
  }
  const previousZoom = Number(canvasStage.dataset.zoom || state.zoom);
  const centerX = (canvasShell.scrollLeft + (canvasShell.clientWidth / 2)) / previousZoom;
  const centerY = (canvasShell.scrollTop + (canvasShell.clientHeight / 2)) / previousZoom;
  canvasStage.style.transform = `scale(${state.zoom})`;
  canvasStage.dataset.zoom = String(state.zoom);
  const nextScrollLeft = Math.max(0, (centerX * state.zoom) - (canvasShell.clientWidth / 2));
  const nextScrollTop = Math.max(0, (centerY * state.zoom) - (canvasShell.clientHeight / 2));
  canvasShell.scrollLeft = nextScrollLeft;
  canvasShell.scrollTop = nextScrollTop;
  updateBrushCursor();
}

function cloneImageData(imageData) {
  return new ImageData(new Uint8ClampedArray(imageData.data), imageData.width, imageData.height);
}

function removeSmallAlphaIslands(imageData, threshold) {
  const result = cloneImageData(imageData);
  const { width, height, data } = result;
  const visited = new Uint8Array(width * height);
  const queueX = [];
  const queueY = [];
  let removedPixels = 0;
  let removedIslands = 0;

  function indexFor(x, y) {
    return y * width + x;
  }

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const flatIndex = indexFor(x, y);
      if (visited[flatIndex]) {
        continue;
      }
      const pixelIndex = flatIndex * 4;
      if (data[pixelIndex + 3] === 0) {
        visited[flatIndex] = 1;
        continue;
      }

      const component = [];
      queueX.length = 0;
      queueY.length = 0;
      queueX.push(x);
      queueY.push(y);
      visited[flatIndex] = 1;

      while (queueX.length > 0) {
        const cx = queueX.pop();
        const cy = queueY.pop();
        component.push(indexFor(cx, cy));

        const neighbors = [
          [cx - 1, cy],
          [cx + 1, cy],
          [cx, cy - 1],
          [cx, cy + 1],
        ];

        for (const [nx, ny] of neighbors) {
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
            continue;
          }
          const neighborFlatIndex = indexFor(nx, ny);
          if (visited[neighborFlatIndex]) {
            continue;
          }
          const neighborPixelIndex = neighborFlatIndex * 4;
          visited[neighborFlatIndex] = 1;
          if (data[neighborPixelIndex + 3] === 0) {
            continue;
          }
          queueX.push(nx);
          queueY.push(ny);
        }
      }

      if (component.length >= threshold) {
        continue;
      }

      removedIslands += 1;
      removedPixels += component.length;
      for (const componentIndex of component) {
        data[(componentIndex * 4) + 3] = 0;
      }
    }
  }

  return { imageData: result, removedPixels, removedIslands };
}

function pushUndoSnapshot() {
  state.undoStack.push(cloneImageData(state.currentImageData));
  if (state.undoStack.length > 40) {
    state.undoStack.shift();
  }
  state.redoStack.length = 0;
  updateButtonState();
}

function redrawCanvas() {
  if (!state.currentImageData) {
    ctx.clearRect(0, 0, editorCanvas.width, editorCanvas.height);
    return;
  }

  if (state.viewMode === "artwork") {
    ctx.putImageData(state.currentImageData, 0, 0);
    return;
  }

  const maskData = cloneImageData(state.currentImageData);
  const { data } = maskData;
  for (let index = 0; index < data.length; index += 4) {
    const alpha = data[index + 3];
    data[index] = alpha;
    data[index + 1] = alpha;
    data[index + 2] = alpha;
    data[index + 3] = 255;
  }
  ctx.putImageData(maskData, 0, 0);
}

function updateSampleColorLabel() {
  const { r, g, b } = state.sampledColor;
  sampleColorValue.textContent = `Sampled color: rgb(${r}, ${g}, ${b})`;
  sampleColorValue.style.color = `rgb(${r}, ${g}, ${b})`;
}

function sampleColorAt(centerX, centerY) {
  if (!state.currentImageData) {
    return;
  }
  const x = Math.max(0, Math.min(editorCanvas.width - 1, Math.round(centerX)));
  const y = Math.max(0, Math.min(editorCanvas.height - 1, Math.round(centerY)));
  const pixelIndex = ((y * editorCanvas.width) + x) * 4;
  const data = state.currentImageData.data;
  state.sampledColor = {
    r: data[pixelIndex],
    g: data[pixelIndex + 1],
    b: data[pixelIndex + 2],
  };
  updateSampleColorLabel();
  setStatus(`Sampled rgb(${state.sampledColor.r}, ${state.sampledColor.g}, ${state.sampledColor.b}).`);
}

function applyBrush(centerX, centerY) {
  if (!state.currentImageData) {
    return;
  }

  const radius = state.brushSize / 2;
  const radiusSquared = radius * radius;
  const minX = Math.max(0, Math.floor(centerX - radius - 1));
  const maxX = Math.min(editorCanvas.width - 1, Math.ceil(centerX + radius + 1));
  const minY = Math.max(0, Math.floor(centerY - radius - 1));
  const maxY = Math.min(editorCanvas.height - 1, Math.ceil(centerY + radius + 1));
  const data = state.currentImageData.data;

  for (let y = minY; y <= maxY; y += 1) {
    for (let x = minX; x <= maxX; x += 1) {
      const dx = x - centerX;
      const dy = y - centerY;
      if ((dx * dx) + (dy * dy) > radiusSquared) {
        continue;
      }
      const pixelIndex = ((y * editorCanvas.width) + x) * 4;
      if (state.brushMode === "erase") {
        data[pixelIndex + 3] = 0;
        continue;
      }
      data[pixelIndex + 3] = 255;
      if (state.brushMode === "white") {
        data[pixelIndex] = 255;
        data[pixelIndex + 1] = 255;
        data[pixelIndex + 2] = 255;
      } else if (state.brushMode === "sample") {
        data[pixelIndex] = state.sampledColor.r;
        data[pixelIndex + 1] = state.sampledColor.g;
        data[pixelIndex + 2] = state.sampledColor.b;
      }
    }
  }

  redrawCanvas();
}

function getCanvasPoint(event) {
  const rect = canvasStage.getBoundingClientRect();
  const scaleX = editorCanvas.width / rect.width;
  const scaleY = editorCanvas.height / rect.height;
  return {
    x: (event.clientX - rect.left) * scaleX,
    y: (event.clientY - rect.top) * scaleY,
  };
}

function moveBrushCursor(event) {
  if (!state.currentImageData) {
    state.cursorVisible = false;
    updateBrushCursor();
    return;
  }
  const stageRect = canvasStage.getBoundingClientRect();
  const insideStage = (
    event.clientX >= stageRect.left &&
    event.clientX <= stageRect.right &&
    event.clientY >= stageRect.top &&
    event.clientY <= stageRect.bottom
  );
  state.cursorVisible = insideStage;
  if (!insideStage) {
    updateBrushCursor();
    return;
  }
  const shellRect = canvasShell.getBoundingClientRect();
  brushCursor.style.left = `${event.clientX - shellRect.left + canvasShell.scrollLeft}px`;
  brushCursor.style.top = `${event.clientY - shellRect.top + canvasShell.scrollTop}px`;
  updateBrushCursor();
}

function syncZoomUi() {
  zoomLevelInput.value = Math.round(state.zoom * 100);
  zoomLevelValue.textContent = `${Math.round(state.zoom * 100)}%`;
}

function fitImageToViewport() {
  if (!state.currentImageData) {
    return;
  }
  const shellWidth = Math.max(1, canvasShell.clientWidth - 24);
  const shellHeight = Math.max(1, canvasShell.clientHeight - 24);
  const fitZoom = Math.min(
    1,
    shellWidth / state.currentImageData.width,
    shellHeight / state.currentImageData.height,
  );
  state.zoom = Math.max(0.25, Math.min(4, fitZoom));
  syncZoomUi();
}

function setBrushMode(mode) {
  state.brushMode = mode;
  modeRestoreButton.classList.toggle("is-active", mode === "restore");
  modeWhiteButton.classList.toggle("is-active", mode === "white");
  modeSampleButton.classList.toggle("is-active", mode === "sample");
  modeEraseButton.classList.toggle("is-active", mode === "erase");
  if (mode === "restore") {
    setStatus("Restore mode: paint alpha back in.");
    return;
  }
  if (mode === "white") {
    setStatus("White Paint mode: paint opaque white pixels back in.");
    return;
  }
  if (mode === "sample") {
    setStatus("Sample Color mode: paint with the sampled color. Hold Alt/Option to pick from the image.");
    return;
  }
  setStatus("Erase mode: remove unwanted alpha.");
}

function setViewMode(mode) {
  state.viewMode = mode;
  viewNormalButton.classList.toggle("is-secondary-active", mode === "artwork");
  viewAlphaButton.classList.toggle("is-secondary-active", mode === "alpha");
  redrawCanvas();
}

function resetEditor() {
  if (!state.originalImageData) {
    return;
  }
  state.currentImageData = cloneImageData(state.originalImageData);
  state.undoStack.length = 0;
  state.redoStack.length = 0;
  redrawCanvas();
  updateButtonState();
  setStatus("Reset to the loaded PNG.");
}

function handleUndo() {
  if (state.undoStack.length === 0) {
    return;
  }
  state.redoStack.push(cloneImageData(state.currentImageData));
  state.currentImageData = state.undoStack.pop();
  redrawCanvas();
  updateButtonState();
}

function handleRedo() {
  if (state.redoStack.length === 0) {
    return;
  }
  state.undoStack.push(cloneImageData(state.currentImageData));
  state.currentImageData = state.redoStack.pop();
  redrawCanvas();
  updateButtonState();
}

function handleRemoveIslands() {
  if (!state.currentImageData) {
    return;
  }
  pushUndoSnapshot();
  const { imageData, removedPixels, removedIslands } = removeSmallAlphaIslands(
    state.currentImageData,
    state.islandThreshold,
  );
  state.currentImageData = imageData;
  redrawCanvas();
  updateButtonState();
  if (removedIslands === 0) {
    setStatus("No disconnected alpha islands found below the current cutoff.");
    return;
  }
  setStatus(`Removed ${removedIslands} island(s), clearing ${removedPixels} px of disconnected alpha.`);
}

function downloadCurrentPng() {
  if (!state.currentImageData) {
    return;
  }
  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = state.currentImageData.width;
  tempCanvas.height = state.currentImageData.height;
  tempCanvas.getContext("2d").putImageData(state.currentImageData, 0, 0);
  const link = document.createElement("a");
  const basename = (state.imageName || "touchup").replace(/\.[^.]+$/, "");
  link.download = `${basename}__touched-up.png`;
  link.href = tempCanvas.toDataURL("image/png");
  link.click();
  setStatus("Downloaded touched-up PNG.");
}

function loadFile(file) {
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    const image = new Image();
    image.onload = () => {
      editorCanvas.width = image.width;
      editorCanvas.height = image.height;
      canvasStage.style.width = `${image.width}px`;
      canvasStage.style.height = `${image.height}px`;
      ctx.clearRect(0, 0, image.width, image.height);
      ctx.drawImage(image, 0, 0);
      state.originalImageData = ctx.getImageData(0, 0, image.width, image.height);
      state.currentImageData = cloneImageData(state.originalImageData);
      state.undoStack.length = 0;
      state.redoStack.length = 0;
      state.imageName = file.name;
      fileName.textContent = file.name;
      redrawCanvas();
      updateButtonState();
      fitImageToViewport();
      updateScale();
      setStatus("Brush the alpha by hand, then download the result.");
    };
    image.src = reader.result;
  };
  reader.readAsDataURL(file);
}

fileInput.addEventListener("change", (event) => {
  const [file] = event.target.files;
  loadFile(file);
});

brushSizeInput.addEventListener("input", () => {
  state.brushSize = Number(brushSizeInput.value);
  brushSizeValue.textContent = `${state.brushSize}px`;
  updateBrushCursor();
});

zoomLevelInput.addEventListener("input", () => {
  state.zoom = Number(zoomLevelInput.value) / 100;
  syncZoomUi();
  updateScale();
});

islandThresholdInput.addEventListener("input", () => {
  state.islandThreshold = Number(islandThresholdInput.value);
  islandThresholdValue.textContent = `${state.islandThreshold}px`;
});

modeRestoreButton.addEventListener("click", () => setBrushMode("restore"));
modeWhiteButton.addEventListener("click", () => setBrushMode("white"));
modeSampleButton.addEventListener("click", () => setBrushMode("sample"));
modeEraseButton.addEventListener("click", () => setBrushMode("erase"));
viewNormalButton.addEventListener("click", () => setViewMode("artwork"));
viewAlphaButton.addEventListener("click", () => setViewMode("alpha"));
undoButton.addEventListener("click", handleUndo);
redoButton.addEventListener("click", handleRedo);
resetButton.addEventListener("click", resetEditor);
removeIslandsButton.addEventListener("click", handleRemoveIslands);
downloadButton.addEventListener("click", downloadCurrentPng);

editorCanvas.addEventListener("pointerdown", (event) => {
  if (!state.currentImageData) {
    return;
  }
  event.preventDefault();
  const point = getCanvasPoint(event);
  if (event.altKey) {
    sampleColorAt(point.x, point.y);
    return;
  }
  pushUndoSnapshot();
  state.isDrawing = true;
  applyBrush(point.x, point.y);
  editorCanvas.setPointerCapture(event.pointerId);
});

editorCanvas.addEventListener("pointermove", (event) => {
  moveBrushCursor(event);
  if (!state.isDrawing) {
    return;
  }
  const point = getCanvasPoint(event);
  applyBrush(point.x, point.y);
});

editorCanvas.addEventListener("pointerup", (event) => {
  state.isDrawing = false;
  editorCanvas.releasePointerCapture(event.pointerId);
});

editorCanvas.addEventListener("pointerleave", () => {
  if (!state.isDrawing) {
    state.cursorVisible = false;
    updateBrushCursor();
  }
});

canvasShell.addEventListener("pointermove", moveBrushCursor);
canvasShell.addEventListener("pointerleave", () => {
  state.cursorVisible = false;
  updateBrushCursor();
});

editorCanvas.addEventListener("lostpointercapture", () => {
  state.isDrawing = false;
});

window.addEventListener("resize", () => {
  if (!state.currentImageData) {
    return;
  }
  fitImageToViewport();
  updateScale();
});

window.addEventListener("keydown", (event) => {
  const commandKey = event.metaKey || event.ctrlKey;
  if (commandKey && event.key.toLowerCase() === "z" && !event.shiftKey) {
    event.preventDefault();
    handleUndo();
  }
  if (commandKey && (event.key.toLowerCase() === "y" || (event.key.toLowerCase() === "z" && event.shiftKey))) {
    event.preventDefault();
    handleRedo();
  }
  if (event.key === "[") {
    state.brushSize = Math.max(2, state.brushSize - 2);
    brushSizeInput.value = state.brushSize;
    brushSizeValue.textContent = `${state.brushSize}px`;
    updateBrushCursor();
  }
  if (event.key === "]") {
    state.brushSize = Math.min(120, state.brushSize + 2);
    brushSizeInput.value = state.brushSize;
    brushSizeValue.textContent = `${state.brushSize}px`;
    updateBrushCursor();
  }
});

updateBrushCursor();
updateSampleColorLabel();
islandThresholdValue.textContent = `${state.islandThreshold}px`;
syncZoomUi();
updateButtonState();
