class ButtonClickCounter {
  constructor() {
    this.counter = 0;
    this.sessionClicks = 0;
    this.totalClicks = this.getTotalClicks();

    this.counterDisplay = document.getElementById("counter");
    this.sessionDisplay = document.getElementById("sessionClicks");
    this.totalDisplay = document.getElementById("totalClicks");
    this.incrementBtn = document.getElementById("incrementBtn");
    this.resetBtn = document.getElementById("resetBtn");

    this.init();
  }

  init() {
    this.updateDisplay();
    this.attachEventListeners();
    this.addClickAnimation();
  }

  attachEventListeners() {
    this.incrementBtn.addEventListener("click", () => this.increment());
    this.resetBtn.addEventListener("click", () => this.reset());
  }

  increment() {
    this.counter++;
    this.sessionClicks++;
    this.totalClicks++;
    this.saveTotalClicks();
    this.updateDisplay();
    this.animateCounter();
    this.createClickEffect();
  }

  reset() {
    this.counter = 0;
    this.updateDisplay();
    this.animateReset();
  }

  updateDisplay() {
    this.counterDisplay.textContent = this.counter;
    this.sessionDisplay.textContent = this.sessionClicks;
    this.totalDisplay.textContent = this.totalClicks;
  }

  animateCounter() {
    this.counterDisplay.style.transform = "scale(1.2)";
    setTimeout(() => {
      this.counterDisplay.style.transform = "scale(1)";
    }, 150);
  }

  animateReset() {
    this.counterDisplay.style.transform = "rotateY(360deg)";
    setTimeout(() => {
      this.counterDisplay.style.transform = "rotateY(0deg)";
    }, 300);
  }

  createClickEffect() {
    // Create a small animation effect
    const effect = document.createElement("div");
    effect.textContent = "+1";
    effect.style.cssText = `
            position: absolute;
            color: #00b894;
            font-weight: bold;
            font-size: 1.5rem;
            pointer-events: none;
            animation: floatUp 1s ease-out forwards;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        `;

    document.body.appendChild(effect);

    setTimeout(() => {
      document.body.removeChild(effect);
    }, 1000);
  }

  addClickAnimation() {
    const style = document.createElement("style");
    style.textContent = `
            @keyframes floatUp {
                0% {
                    opacity: 1;
                    transform: translate(-50%, -50%);
                }
                100% {
                    opacity: 0;
                    transform: translate(-50%, -150%);
                }
            }
        `;
    document.head.appendChild(style);
  }

  getTotalClicks() {
    return parseInt(localStorage.getItem("totalClicks") || "0");
  }

  saveTotalClicks() {
    localStorage.setItem("totalClicks", this.totalClicks.toString());
  }
}

// Initialize the app when the page loads
document.addEventListener("DOMContentLoaded", () => {
  new ButtonClickCounter();
});

// Add some console fun
console.log("🎯 Button Click Counter loaded!");
console.log("Open DevTools and try: app.counter to see current count");
