let currentTotal = 0;
let selectedBox = null;

document.querySelectorAll(".box-container").forEach((container) => {
  container.addEventListener("click", function (e) {
    if (e.target.tagName === "SELECT") return;

    // Toggle expansion
    const wasExpanded = this.classList.contains("expanded");
    document.querySelectorAll(".box-container").forEach((b) => {
      b.classList.remove("expanded");
      b.querySelector(".circle").classList.remove("selected-circle");
    });

    this.classList.toggle("expanded", !wasExpanded);

    if (!wasExpanded) {
      this.querySelector(".circle").classList.add("selected-circle");
    }

    // Update options visibility
    document
      .querySelectorAll(".options-container")
      .forEach((o) => o.classList.remove("visible"));
    const options = this.querySelector(".options-container");
    options.classList.toggle("visible", !wasExpanded);

    // Update pricing
    if (!wasExpanded) {
      selectedBox = this;
      currentTotal = parseInt(this.dataset.price);
    } else {
      selectedBox = null;
      currentTotal = 0;
    }
    updateTotal();

    // Create options
    const units = parseInt(this.dataset.units);
    if (options.children.length === 0) {
      const labelRow = document.createElement("div");
      labelRow.className = "select-header";
      labelRow.innerHTML = `
        <span></span>
        <div class="option-label">Size</div>
        <div class="option-label">Color</div>
      `;
      options.appendChild(labelRow);

      for (let i = 0; i < units; i++) {
        const optionGroup = document.createElement("div");
        optionGroup.className = "option-group";
        optionGroup.innerHTML = `
          <div class="select-row">
            <span class="option-label">#${i + 1}</span>
            <select class="size-select">
              <option value="">Select Size</option>
              <option value="s">S</option>
              <option value="m">M</option>
              <option value="l">L</option>
            </select>
            <select class="color-select">
              <option value="">Select Color</option>
              <option value="black">Black</option>
              <option value="blue">Blue</option>
              <option value="white">White</option>
            </select>
          </div>
        `;
        options.appendChild(optionGroup);
      }
    }
  });
});

function updateTotal() {
  document.querySelector(
    ".total-price"
  ).textContent = `Total: $${currentTotal.toFixed(2)} USD`;
}
