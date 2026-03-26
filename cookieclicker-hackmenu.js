// ============================================================
//  COOKIE CLICKER HACK MENU
//  How to use: Open Cookie Clicker, press F12, paste this
//  into the Console tab, hit Enter. Press H to toggle menu.
// ============================================================

(function () {
  // ============================================================
  //  CONFIG — tweak these values to your liking
  // ============================================================
  const CONFIG = {
    cookiesPerClick: 1000000,       // cookies added per auto-click
    autoClickInterval: 100,           // ms between auto-clicks (lower = faster)
    cookieAddAmount: 1000000000,   // cookies added by "Add Cookies" button
    goldenCookieForce: true,          // force golden cookies to always be on screen
  };
  // ============================================================

  let autoClickActive = false;
  let autoClickTimer = null;
  let menuVisible = true;

  // --- Core hacks ---

  function addCookies(amount = CONFIG.cookieAddAmount) {
    Game.cookies += amount;
    Game.cookiesEarned += amount;
    Game.Notify("Hacked!", `+${amount.toLocaleString()} cookies`, [10, 0]);
  }

  function maxAllBuildings() {
    for (let b in Game.Objects) {
      Game.Objects[b].amount += 500;
      Game.Objects[b].bought += 500;
    }
    Game.recalculateGains = 1;
    Game.Notify("Buildings maxed!", "All buildings +500", [5, 0]);
  }

  function unlockAllUpgrades() {
    Game.UpgradesById.forEach(u => {
      u.unlocked = 1;
      u.bought = 1;
    });
    Game.recalculateGains = 1;
    Game.Notify("Upgrades unlocked!", "All upgrades bought", [5, 0]);
  }

  function unlockAllAchievements() {
    Game.AchievementsById.forEach(a => a.won = 1);
    Game.Notify("Achievements!", "All achievements unlocked", [5, 0]);
  }

  function toggleAutoClick() {
    autoClickActive = !autoClickActive;
    if (autoClickActive) {
      autoClickTimer = setInterval(() => {
        Game.ClickCookie();
        Game.cookies += CONFIG.cookiesPerClick;
        Game.cookiesEarned += CONFIG.cookiesPerClick;
      }, CONFIG.autoClickInterval);
    } else {
      clearInterval(autoClickTimer);
    }
    updateMenu();
  }

  function resetGame() {
    if (confirm("fr reset everything?")) Game.HardReset(2);
  }

  // --- UI ---

  const style = document.createElement("style");
  style.textContent = `
    #hackMenu {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 99999;
      background: #111;
      border: 2px solid #0f0;
      border-radius: 10px;
      padding: 14px 18px;
      font-family: monospace;
      font-size: 13px;
      color: #0f0;
      min-width: 220px;
      box-shadow: 0 0 20px #0f08;
      user-select: none;
    }
    #hackMenu h3 {
      margin: 0 0 10px 0;
      font-size: 15px;
      text-align: center;
      letter-spacing: 2px;
      text-transform: uppercase;
    }
    #hackMenu button {
      display: block;
      width: 100%;
      margin: 5px 0;
      padding: 6px 10px;
      background: #0a0;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-family: monospace;
      font-size: 12px;
      text-align: left;
      transition: background 0.15s;
    }
    #hackMenu button:hover { background: #0d0; }
    #hackMenu button.active { background: #a00; }
    #hackMenu .hint {
      margin-top: 10px;
      font-size: 10px;
      color: #0a0;
      text-align: center;
    }
  `;
  document.head.appendChild(style);

  const menu = document.createElement("div");
  menu.id = "hackMenu";
  document.body.appendChild(menu);

  function updateMenu() {
    menu.innerHTML = `
      <h3>🍪 Hack Menu</h3>
      <button id="hm-add">💰 Add ${CONFIG.cookieAddAmount.toLocaleString()} Cookies</button>
      <button id="hm-buildings">🏗️ Max All Buildings</button>
      <button id="hm-upgrades">⬆️ Unlock All Upgrades</button>
      <button id="hm-achieve">🏆 Unlock All Achievements</button>
      <button id="hm-autoclk" class="${autoClickActive ? "active" : ""}">
        🖱️ Auto Click: ${autoClickActive ? "ON  (click to stop)" : "OFF (click to start)"}
      </button>
      <button id="hm-reset">💀 Hard Reset</button>
      <div class="hint">Press H to hide/show</div>
    `;
    document.getElementById("hm-add").onclick = () => addCookies();
    document.getElementById("hm-buildings").onclick = () => maxAllBuildings();
    document.getElementById("hm-upgrades").onclick = () => unlockAllUpgrades();
    document.getElementById("hm-achieve").onclick = () => unlockAllAchievements();
    document.getElementById("hm-autoclk").onclick = () => toggleAutoClick();
    document.getElementById("hm-reset").onclick = () => resetGame();
  }

  // Toggle menu with H key
  document.addEventListener("keydown", (e) => {
    if (e.key === "h" || e.key === "H") {
      menuVisible = !menuVisible;
      menu.style.display = menuVisible ? "block" : "none";
    }
  });

  updateMenu();
  console.log("%c🍪 Hack Menu loaded! Press H to toggle.", "color: lime; font-size: 14px;");
})();
