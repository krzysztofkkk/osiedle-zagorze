const visualizationImages = [
  "./wizualizacje/1.png",
  "./wizualizacje/2j.png",
  "./wizualizacje/3.png",
  "./wizualizacje/4.png"
];

const projectDocuments = [
  "./Projekt/A01.pdf",
  "./Projekt/A02.pdf",
  "./Projekt/A03.pdf",
  "./Projekt/A04.pdf",
  "./Projekt/A05.pdf",
  "./Projekt/A06.pdf",
  "./Projekt/A07.pdf",
  "./Projekt/A08.pdf",
  "./Projekt/A09.pdf"
];

const galleryImage = document.getElementById("galleryImage");
const thumbsWrap = document.getElementById("thumbs");
const prevBtn = document.querySelector(".gallery-btn.prev");
const nextBtn = document.querySelector(".gallery-btn.next");
const projectGrid = document.getElementById("projectGrid");
const videoPlayer = document.querySelector(".video-player");

let currentIndex = 0;

function setImage(index) {
  if (!galleryImage || visualizationImages.length === 0) {
    return;
  }

  currentIndex = (index + visualizationImages.length) % visualizationImages.length;
  galleryImage.src = visualizationImages[currentIndex];
  galleryImage.alt = `Wizualizacja inwestycji ${currentIndex + 1}`;

  const thumbButtons = document.querySelectorAll(".thumb");
  thumbButtons.forEach((button, idx) => {
    button.classList.toggle("active", idx === currentIndex);
  });
}

function buildThumbs() {
  if (!thumbsWrap) {
    return;
  }

  visualizationImages.forEach((src, index) => {
    const button = document.createElement("button");
    button.className = "thumb";
    button.type = "button";
    button.setAttribute("aria-label", `Pokaz zdjecie ${index + 1}`);

    const img = document.createElement("img");
    img.src = src;
    img.alt = `Miniatura wizualizacji ${index + 1}`;

    button.appendChild(img);
    button.addEventListener("click", () => setImage(index));
    thumbsWrap.appendChild(button);
  });
}

function getFileName(path) {
  return path.split("/").pop() || "Dokument";
}

function buildProjectGrid() {
  if (!projectGrid) {
    return;
  }

  projectDocuments.forEach((file) => {
    const card = document.createElement("article");
    card.className = "doc-card";

    const preview = document.createElement("object");
    preview.data = file;
    preview.type = "application/pdf";
    preview.setAttribute("aria-label", `Podglad dokumentu ${getFileName(file)}`);

    const text = document.createElement("p");
    text.innerHTML = `<strong>${getFileName(file)}</strong><br/><a href="${file}" target="_blank" rel="noopener noreferrer">Otworz PDF</a>`;

    card.appendChild(preview);
    card.appendChild(text);
    projectGrid.appendChild(card);
  });
}

buildThumbs();
setImage(0);
buildProjectGrid();

if (prevBtn) {
  prevBtn.addEventListener("click", () => setImage(currentIndex - 1));
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => setImage(currentIndex + 1));
}

if (videoPlayer) {
  videoPlayer.playbackRate = 0.8;
}
