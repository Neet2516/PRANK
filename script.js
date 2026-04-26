
function moveRandomEl(elm) {
  elm.style.position = "absolute";
  elm.style.top = Math.floor(Math.random() * 68 + 16) + "%";
  elm.style.left = Math.floor(Math.random() * 68 + 8) + "%";
}

const moveRandom = document.querySelector("#move-random");

if (moveRandom) {
  moveRandom.addEventListener("mouseenter", function (e) {
    moveRandomEl(e.target);
  });

  moveRandom.addEventListener("focus", function (e) {
    moveRandomEl(e.target);
  });
}
