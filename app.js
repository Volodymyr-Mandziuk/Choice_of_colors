const cols = document.querySelectorAll(".col");

document.addEventListener("keydown", (event) => {
  event.preventDefault();
  if (event.code.toLowerCase() === "space") {
    setRandomColors();
  }
});

document.addEventListener("click", (event) => {
  const type = event.target.dataset.type;
  if (type === "lock") {
    const node =
      event.target.tagName.toLowerCase() === "i"
        ? event.target
        : event.target.children[0];
    node.classList.toggle("fa-lock-open");
    node.classList.toggle("fa-lock");
  } else if (type === "copy") {
    copyToClickboard(event.target.textContent);
  }
});
// function generateRandomColor() {
//   const hexCode = "0123456789ABCDEF";
//   let color = "";
//   for (let i = 0; i < 6; i++) {
//     color += hexCode[Math.floor(Math.random() * hexCode.length)];
//   }
//   return "#" + color;
// }

function copyToClickboard(text) {
  return navigator.clipboard.writeText(text);
}

function setRandomColors(isItitial) {
  const colors = isItitial ? getColorsFromHash() : [];
  cols.forEach((col, index) => {
    const isLocked = col.querySelector("i").classList.contains("fa-lock");
    const text = col.querySelector("h2");
    const button = col.querySelector("button");
    // const color = generateRandomColor();
    // can use the chroma library

    if (isLocked) {
      colors.push(text.textContent);
      return;
    }

    const color = isItitial
     ? colors[index]
      ? colors[index]
      : chroma.random()
     : chroma.random();

    if (!isItitial) {
      colors.push(color);
    }

    text.textContent = color;
    col.style.background = color;
    setTextColor(text, color);
    setTextColor(button, color);
  });

  updateColorsHash(colors);
}

function setTextColor(text, color) {
  const shade = chroma(color).luminance();
  text.style.color = shade > 0.5 ? "black" : "white";
}

function updateColorsHash(colors = []) {
  document.location.hash = colors
    .map((col) => {
      return col.toString().substring(1);
    })
    .join("-");
}

function getColorsFromHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split("-")
      .map((color) => "#" + color);
  }
  return [];
}

setRandomColors(true);
