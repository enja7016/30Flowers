const memories = {
  1: { text: "Your first memory here ❤️", img: "" },
  2: { text: "Another special moment", img: "" },
  // Fill up to 30
};

const garden = document.getElementById('garden');
const modal = document.getElementById('modal');
const memoryText = document.getElementById('memoryText');
const memoryImg = document.getElementById('memoryImg');
const progress = document.getElementById('progress');

let opened = new Set();

// Start button
document.getElementById('startBtn').onclick = () => {
  document.getElementById('intro').style.display = 'none';
  garden.style.display = 'block';
  generateFlowers();
};

// Create flowers
function generateFlowers() {
  for (let i = 1; i <= 30; i++) {
    const flower = document.createElement('div');
    flower.className = 'flower';
    flower.innerText = '🌸';

    flower.style.top = Math.random() * 90 + '%';
    flower.style.left = Math.random() * 90 + '%';

    flower.onclick = () => openMemory(i);

    garden.appendChild(flower);
  }
}

// Open memory
function openMemory(id) {
  const memory = memories[id] || { text: "A beautiful memory 💖", img: "" };

  memoryText.innerText = memory.text;

  if (memory.img) {
    memoryImg.src = memory.img;
    memoryImg.style.display = 'block';
  } else {
    memoryImg.style.display = 'none';
  }

  modal.style.display = 'flex';

  opened.add(id);
  progress.innerText = `${opened.size} / 30`;

  if (opened.size === 30) {
    setTimeout(() => {
      alert("Final message unlocked 💌\n\nYou mean everything to me.");
    }, 500);
  }
}

// Close modal
document.getElementById('closeBtn').onclick = () => {
  modal.style.display = 'none';
};

modal.addEventListener('click', (e) => {
  // if you clicked the dark background (not the white box), close it
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});