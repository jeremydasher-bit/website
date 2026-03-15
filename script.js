(function () {
  "use strict";

  const FOLDER_PATHS = {
    Photos: "C:\\Jeremy\\Photos",
    Blogs: "C:\\Jeremy\\Blogs",
    Documents: "C:\\Jeremy\\Documents",
    ProjectsFolder: "C:\\Jeremy\\Projects"
  };

  const FOLDER_DISPLAY_NAMES = {
    ProjectsFolder: "Projects"
  };

  const PHOTO_SUBFOLDERS = ["Projects", "People", "Clients", "For fun!"];

  const DEFAULT_MANIFEST = {
    Photos: {
      files: [
        { name: "Landscape_01.jpg", type: "image", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80" },
        { name: "Mountain_View.jpg", type: "image", url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80" }
      ],
      subfolders: PHOTO_SUBFOLDERS
    },
    Projects: [],
    People: [],
    Clients: [],
    "For fun!": [],
    Blogs: [{ name: "Welcome.txt", type: "doc", url: "./assets/welcome.txt" }],
    Documents: [{ name: "About me.txt", type: "doc", url: "./assets/about.txt" }],
    ProjectsFolder: [{ name: "Immiguard", type: "application", url: "./immiguard/" }]
  };

  let contentManifest = JSON.parse(JSON.stringify(DEFAULT_MANIFEST));
  let nextZ = 1000;
  const isTouch = "ontouchstart" in window || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);
  const windowsContainer = document.getElementById("windows-container");
  const taskbarItems = document.getElementById("taskbar-items");
  const startMenu = document.getElementById("start-menu");
  const startBtn = document.getElementById("start-btn");
  const clockEl = document.getElementById("clock");

  function getTaskbarHeight() {
    const tb = document.getElementById("taskbar");
    return tb ? tb.offsetHeight : 28;
  }

  function centerWindow(el, w, h) {
    if (window.innerWidth <= 768) return;
    const th = getTaskbarHeight();
    const vw = window.innerWidth;
    const vh = window.innerHeight - th;
    const width = w != null ? w : (el.offsetWidth || 380);
    const height = h != null ? h : (el.offsetHeight || 300);
    el.style.left = Math.max(0, (vw - width) / 2) + "px";
    el.style.top = Math.max(0, (vh - height) / 2) + "px";
  }

  // Load content manifest (use content.json if available, else keep default)
  function loadContent() {
    return fetch("content.json")
      .then(function (r) { return r.json(); })
      .then(function (data) {
        contentManifest = data;
        normalizePhotosManifest();
      })
      .catch(function () {
        contentManifest = JSON.parse(JSON.stringify(DEFAULT_MANIFEST));
        normalizePhotosManifest();
      });
  }

  function normalizePhotosManifest() {
    const p = contentManifest.Photos;
    if (Array.isArray(p)) {
      contentManifest.Photos = { files: p, subfolders: PHOTO_SUBFOLDERS.slice() };
    }
    if (!contentManifest.Projects) contentManifest.Projects = [];
    if (!contentManifest.People) contentManifest.People = [];
    if (!contentManifest.Clients) contentManifest.Clients = [];
    if (!contentManifest["For fun!"]) contentManifest["For fun!"] = [];
    if (!contentManifest.ProjectsFolder) contentManifest.ProjectsFolder = DEFAULT_MANIFEST.ProjectsFolder;
  }

  // Clock
  function updateClock() {
    const now = new Date();
    const h = now.getHours();
    const m = String(now.getMinutes()).padStart(2, "0");
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 || 12;
    clockEl.textContent = h12 + ":" + m + " " + ampm;
  }
  updateClock();
  setInterval(updateClock, 1000);

  // Start menu
  startBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    startMenu.classList.toggle("hidden");
  });
  document.addEventListener("click", function () {
    startMenu.classList.add("hidden");
  });
  startMenu.addEventListener("click", function (e) {
    e.stopPropagation();
  });

  startMenu.querySelectorAll(".start-menu-item").forEach(function (item) {
    item.addEventListener("click", function () {
      const action = this.getAttribute("data-action");
      startMenu.classList.add("hidden");
      if (action === "photos" || action === "blogs" || action === "documents" || action === "documents-folder" || action === "projects-folder") {
        const folder = (action === "documents" || action === "documents-folder") ? "Documents" : (action === "projects-folder") ? "ProjectsFolder" : action.charAt(0).toUpperCase() + action.slice(1);
        openFolder(folder);
      } else if (action === "minesweeper") {
        openMinesweeper();
      } else if (action === "sticky-note") {
        createStickyNote();
      } else if (action === "shutdown") {
        if (confirm("Are you sure you want to shut down?")) {
          showShutdownAnimation();
        }
      }
    });
  });

  function showShutdownAnimation() {
    var overlay = document.getElementById("win98-shutdown-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "win98-shutdown-overlay";
      overlay.className = "win98-shutdown-overlay";
      overlay.innerHTML =
        "<div class='win98-shutdown-screen'>" +
        "<div class='win98-shutdown-message' id='win98-shutdown-msg'>Windows is shutting down...</div>" +
        "<div class='win98-shutdown-sub' id='win98-shutdown-sub'></div>" +
        "</div>";
      document.body.appendChild(overlay);
    }
    var msg = document.getElementById("win98-shutdown-msg");
    var sub = document.getElementById("win98-shutdown-sub");
    overlay.classList.remove("hidden");
    msg.textContent = "Windows is shutting down...";
    sub.textContent = "Please wait while your computer shuts down.";
    setTimeout(function () {
      msg.textContent = "It's now safe to turn off your computer.";
      sub.textContent = "";
    }, 2500);
    setTimeout(function () {
      window.location.href = "404.html";
    }, 4500);
  }

  // Desktop icons: double-click (or single tap on touch) opens folder or launches app
  document.querySelectorAll(".desktop-icon").forEach(function (el) {
    var openAction = function () {
      const folder = el.getAttribute("data-folder");
      const action = el.getAttribute("data-action");
      if (folder) openFolder(folder);
      else if (action === "minesweeper") openMinesweeper();
      else if (action === "sticky-note") createStickyNote();
    };
    el.addEventListener(isTouch ? "click" : "dblclick", openAction);
  });

  function openFolder(folderName) {
    const path = FOLDER_PATHS[folderName] || "C:\\";
    let files = contentManifest[folderName];
    let subfolders = [];
    let parentFolderName = null;
    if (folderName === "Photos" && contentManifest.Photos) {
      const photoData = contentManifest.Photos;
      if (Array.isArray(photoData)) {
        files = photoData;
      } else {
        files = photoData.files || [];
        subfolders = photoData.subfolders || [];
        parentFolderName = "Photos";
      }
    } else {
      files = Array.isArray(files) ? files : [];
    }
    const displayName = FOLDER_DISPLAY_NAMES[folderName] || folderName;
    const win = createExplorerWindow(folderName, path, files, { subfolders: subfolders, parentFolderName: parentFolderName, displayName: displayName });
    windowsContainer.appendChild(win.el);
    centerWindow(win.el, 380, 300);
    bringToFront(win.el);
    addTaskbarEntry(win);
  }

  function openSubfolder(parentFolderName, subfolderName) {
    const basePath = FOLDER_PATHS[parentFolderName] || "C:\\";
    const path = basePath + "\\" + subfolderName;
    const files = contentManifest[subfolderName] || [];
    const win = createExplorerWindow(subfolderName, path, files);
    windowsContainer.appendChild(win.el);
    centerWindow(win.el, 380, 300);
    bringToFront(win.el);
    addTaskbarEntry(win);
  }

  function createExplorerWindow(folderName, path, files, options) {
    options = options || {};
    const subfolders = options.subfolders || [];
    const parentFolderName = options.parentFolderName || null;
    const displayName = options.displayName || folderName;

    const id = "win-" + Date.now() + "-" + Math.random().toString(36).slice(2);
    const el = document.createElement("div");
    el.className = "win98-window";
    el.id = id;
    el.dataset.folder = folderName;
    el.style.left = (80 + (windowsContainer.children.length % 5) * 24) + "px";
    el.style.top = (60 + (windowsContainer.children.length % 5) * 24) + "px";
    el.style.width = "380px";
    el.style.height = "300px";
    el.style.zIndex = nextZ++;

    const folderIconSvg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='%23ffcc00' d='M2 4h6l1 2h7v8H2z'/%3E%3C/svg%3E";

    el.innerHTML =
      "<div class='win98-titlebar'>" +
      "<span class='win98-titlebar-icon' style='background-image:url(" + folderIconSvg + ")'></span>" +
      "<span class='win98-titlebar-title'>" + displayName + " - " + path + "</span>" +
      "<div class='win98-titlebar-buttons'>" +
      "<button type='button' class='win98-titlebar-btn minimize' aria-label='Minimize'>—</button>" +
      "<button type='button' class='win98-titlebar-btn maximize' aria-label='Maximize'>□</button>" +
      "<button type='button' class='win98-titlebar-btn close' aria-label='Close'>×</button>" +
      "</div></div>" +
      "<div class='win98-client'></div>";

    const client = el.querySelector(".win98-client");

    if (subfolders.length === 0 && files.length === 0) {
      client.innerHTML = "<div class='win98-empty'>This folder is empty.</div>";
    } else {
      const table = document.createElement("table");
      table.className = "win98-file-list";
      table.innerHTML =
        "<thead><tr><th>Name</th><th>Type</th></tr></thead><tbody></tbody>";
      const tbody = table.querySelector("tbody");
      subfolders.forEach(function (subName) {
        const tr = document.createElement("tr");
        tr.dataset.subfolder = subName;
        tr.dataset.parentFolder = parentFolderName || "";
        tr.innerHTML =
          "<td><span class='file-icon file-icon-folder'></span>" + escapeHtml(subName) + "</td>" +
          "<td>File Folder</td>";
        tbody.appendChild(tr);
        tr.addEventListener(isTouch ? "click" : "dblclick", function () {
          openSubfolder(parentFolderName, subName);
        });
      });
      files.forEach(function (f) {
        const tr = document.createElement("tr");
        tr.dataset.url = f.url;
        tr.dataset.type = f.type || "doc";
        tr.dataset.name = f.name;
        const typeLabel = f.type === "application" ? "Application" : (f.type === "image" ? "JPEG Image" : f.type === "video" ? "Video" : "Document");
        const iconClass = "file-icon-" + (f.type === "application" ? "application" : f.type === "video" ? "video" : f.type === "image" ? "image" : "doc");
        tr.innerHTML =
          "<td><span class='file-icon " + iconClass + "'></span>" + escapeHtml(f.name) + "</td>" +
          "<td>" + typeLabel + "</td>";
        tbody.appendChild(tr);
        if (f.type === "application") {
          tr.addEventListener(isTouch ? "click" : "dblclick", function () {
            window.open(f.url, "_blank");
          });
        } else {
          const imageFiles = files.filter(function (file) { return file.type === "image"; });
          const imageIndex = imageFiles.indexOf(f);
          tr.addEventListener(isTouch ? "click" : "dblclick", function () {
            openFile(f.url, f.type, f.name, imageFiles, imageIndex);
          });
        }
      });
      client.appendChild(table);
    }

    // Title bar drag (skip when maximized)
    const titleBar = el.querySelector(".win98-titlebar");
    function startDragIfAllowed(ev) {
      if (ev.target.closest(".win98-titlebar-btn")) return;
      if (el.classList.contains("win98-maximized")) return;
      if (ev.type === "touchstart") ev.preventDefault();
      startDrag(el, ev);
    }
    titleBar.addEventListener("mousedown", startDragIfAllowed);
    titleBar.addEventListener("touchstart", startDragIfAllowed, { passive: false });

    el.addEventListener("mousedown", function () {
      bringToFront(el);
      const taskbarBtn = taskbarItems.querySelector("[data-window-id='" + id + "']");
      if (taskbarBtn) {
        taskbarItems.querySelectorAll(".taskbar-item").forEach(function (b) { b.classList.remove("active"); });
        taskbarBtn.classList.add("active");
      }
    });

    titleBar.querySelector(".minimize").addEventListener("click", function () {
      minimizeWindow(el);
    });
    titleBar.querySelector(".maximize").addEventListener("click", function () {
      toggleMaximize(el);
    });
    titleBar.querySelector(".close").addEventListener("click", function () {
      closeWindow(el);
    });

    return { el: el, id: id, folderName: displayName };
  }

  function escapeHtml(s) {
    const div = document.createElement("div");
    div.textContent = s;
    return div.innerHTML;
  }

  function bringToFront(el) {
    el.style.zIndex = nextZ++;
    el.classList.add("focused");
    windowsContainer.querySelectorAll(".win98-window").forEach(function (w) {
      if (w !== el) w.classList.remove("focused");
    });
  }

  function startDrag(windowEl, e) {
    var x = (e.clientX != null ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : 0));
    var y = (e.clientY != null ? e.clientY : (e.touches && e.touches[0] ? e.touches[0].clientY : 0));
    const startX = x - windowEl.offsetLeft;
    const startY = y - windowEl.offsetTop;
    function move(ev) {
      var cx = (ev.clientX != null ? ev.clientX : (ev.touches && ev.touches[0] ? ev.touches[0].clientX : 0));
      var cy = (ev.clientY != null ? ev.clientY : (ev.touches && ev.touches[0] ? ev.touches[0].clientY : 0));
      windowEl.style.left = Math.max(0, cx - startX) + "px";
      windowEl.style.top = Math.max(0, cy - startY) + "px";
    }
    function stop() {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", stop);
      document.removeEventListener("touchmove", move);
      document.removeEventListener("touchend", stop);
      document.removeEventListener("touchcancel", stop);
    }
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", stop);
    document.addEventListener("touchmove", move, { passive: true });
    document.addEventListener("touchend", stop);
    document.addEventListener("touchcancel", stop);
  }

  function closeWindow(windowEl) {
    const id = windowEl.id;
    const taskbarBtn = taskbarItems.querySelector("[data-window-id='" + id + "']");
    if (taskbarBtn) taskbarBtn.remove();
    windowEl.remove();
  }

  function minimizeWindow(windowEl) {
    windowEl.classList.add("hidden");
    const id = windowEl.id;
    const taskbarBtn = taskbarItems.querySelector("[data-window-id='" + id + "']");
    if (taskbarBtn) taskbarBtn.classList.remove("active");
  }

  function toggleMaximize(windowEl) {
    const titleBar = windowEl.querySelector(".win98-titlebar");
    const maximizeBtn = titleBar ? titleBar.querySelector(".win98-titlebar-btn.maximize") : null;
    if (windowEl.classList.contains("win98-maximized")) {
      windowEl.classList.remove("win98-maximized");
      windowEl.style.position = "";
      windowEl.style.left = windowEl.dataset.preMaxLeft || "";
      windowEl.style.top = windowEl.dataset.preMaxTop || "";
      windowEl.style.width = windowEl.dataset.preMaxWidth || "";
      windowEl.style.height = windowEl.dataset.preMaxHeight || "";
      if (maximizeBtn) maximizeBtn.textContent = "□";
    } else {
      windowEl.dataset.preMaxLeft = windowEl.style.left || "";
      windowEl.dataset.preMaxTop = windowEl.style.top || "";
      windowEl.dataset.preMaxWidth = windowEl.style.width || "";
      windowEl.dataset.preMaxHeight = windowEl.style.height || "";
      windowEl.style.position = "fixed";
      windowEl.style.left = "0";
      windowEl.style.top = "0";
      windowEl.style.width = "100vw";
      windowEl.style.height = "calc(100vh - " + (getComputedStyle(document.documentElement).getPropertyValue("--taskbar-height") || "28px").trim() + ")";
      windowEl.classList.add("win98-maximized");
      if (maximizeBtn) maximizeBtn.textContent = "\u29C9";
    }
  }

  function addTaskbarEntry(win) {
    const btn = document.createElement("div");
    btn.className = "taskbar-item";
    btn.dataset.windowId = win.id;
    btn.textContent = win.folderName;
    btn.addEventListener("click", function () {
      win.el.classList.remove("hidden");
      bringToFront(win.el);
      taskbarItems.querySelectorAll(".taskbar-item").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
    });
    taskbarItems.appendChild(btn);
  }

  function openMinesweeper() {
    const ROWS = 9;
    const COLS = 9;
    const MINES = 10;
    const id = "win-minesweeper-" + Date.now();
    const msIconSvg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Ccircle cx='8' cy='9' r='5' fill='%23c0c0c0' stroke='%23808080' stroke-width='1'/%3E%3Ccircle cx='8' cy='8' r='1.5' fill='%23000'/%3E%3Cpath stroke='%23000' stroke-width='1' d='M8 11v3 M6.5 12.5h3'/%3E%3Cpath fill='%23000' d='M5 4l1 1.5 1-1 1 1-1 1.5 1 1-2-2z'/%3E%3Cpath fill='%23f00' d='M7 3h2v1H7z'/%3E%3Cpath fill='%23ff0' d='M7.5 2.5h1v1h-1z'/%3E%3C/svg%3E";
    const el = document.createElement("div");
    el.className = "win98-window win98-minesweeper";
    el.id = id;
    el.style.left = (120 + (windowsContainer.children.length % 4) * 30) + "px";
    el.style.top = (80 + (windowsContainer.children.length % 4) * 30) + "px";
    el.style.zIndex = nextZ++;
    el.innerHTML =
      "<div class='win98-titlebar'>" +
      "<span class='win98-titlebar-icon' style='background-image:url(" + msIconSvg + ")'></span>" +
      "<span class='win98-titlebar-title'>Minesweeper</span>" +
      "<div class='win98-titlebar-buttons'>" +
      "<button type='button' class='win98-titlebar-btn minimize' aria-label='Minimize'>—</button>" +
      "<button type='button' class='win98-titlebar-btn maximize' aria-label='Maximize'>□</button>" +
      "<button type='button' class='win98-titlebar-btn close' aria-label='Close'>×</button>" +
      "</div></div>" +
      "<div class='win98-ms-client'>" +
      "<div class='win98-ms-top'>" +
      "<div class='win98-ms-counter'>010</div>" +
      "<button type='button' class='win98-ms-face' aria-label='New game'></button>" +
      "<button type='button' class='win98-ms-flag-btn' aria-label='Flag mode' title='Flag mode (for touch)'>🚩</button>" +
      "<div class='win98-ms-timer'>000</div>" +
      "</div>" +
      "<div class='win98-ms-grid'></div>" +
      "</div>";
    const titleBar = el.querySelector(".win98-titlebar");
    const gridEl = el.querySelector(".win98-ms-grid");
    const faceBtn = el.querySelector(".win98-ms-face");
    const flagBtn = el.querySelector(".win98-ms-flag-btn");
    const counterEl = el.querySelector(".win98-ms-counter");
    const timerEl = el.querySelector(".win98-ms-timer");
    let grid = [];
    let firstClick = true;
    let gameOver = false;
    let won = false;
    let flagMode = false;
    let timerInterval = null;
    let elapsed = 0;
    function pad3(n) {
      const s = String(Math.min(999, Math.max(0, n)));
      return s.length >= 3 ? s : ("000" + s).slice(-3);
    }
    function getNeighbors(r, c) {
      const out = [];
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = r + dr, nc = c + dc;
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) out.push([nr, nc]);
        }
      }
      return out;
    }
    function placeMines(excludeR, excludeC) {
      const exclude = {};
      exclude[excludeR + "," + excludeC] = true;
      getNeighbors(excludeR, excludeC).forEach(function (n) { exclude[n[0] + "," + n[1]] = true; });
      const cells = [];
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          if (!exclude[r + "," + c]) cells.push([r, c]);
        }
      }
      for (let i = cells.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const t = cells[i]; cells[i] = cells[j]; cells[j] = t;
      }
      for (let r = 0; r < ROWS; r++) {
        grid[r] = [];
        for (let c = 0; c < COLS; c++) {
          grid[r][c] = { isMine: false, isRevealed: false, isFlagged: false, count: 0 };
        }
      }
      for (let k = 0; k < MINES && k < cells.length; k++) {
        const r = cells[k][0], c = cells[k][1];
        grid[r][c].isMine = true;
      }
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          if (grid[r][c].isMine) continue;
          let count = 0;
          getNeighbors(r, c).forEach(function (n) {
            if (grid[n[0]][n[1]].isMine) count++;
          });
          grid[r][c].count = count;
        }
      }
    }
    function startTimer() {
      if (timerInterval) return;
      timerInterval = setInterval(function () {
        elapsed++;
        timerEl.textContent = pad3(elapsed);
      }, 1000);
    }
    function stopTimer() {
      if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
    }
    function updateCounter() {
      let flags = 0;
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          if (grid[r][c].isFlagged) flags++;
        }
      }
      counterEl.textContent = pad3(MINES - flags);
    }
    function revealCell(r, c) {
      if (firstClick) {
        firstClick = false;
        placeMines(r, c);
        startTimer();
      }
      const cell = grid[r][c];
      if (!cell || cell.isRevealed || cell.isFlagged || gameOver) return;
      if (cell.isMine) {
        cell.isRevealed = true;
        gameOver = true;
        stopTimer();
        faceBtn.classList.add("lost");
        el.querySelector(".win98-ms-cell[data-r='" + r + "'][data-c='" + c + "']").classList.add("mine-hit");
        for (let rr = 0; rr < ROWS; rr++) {
          for (let cc = 0; cc < COLS; cc++) {
            if (grid[rr][cc].isMine && !grid[rr][cc].isRevealed) {
              grid[rr][cc].isRevealed = true;
              const cellEl = el.querySelector(".win98-ms-cell[data-r='" + rr + "'][data-c='" + cc + "']");
              cellEl.classList.remove("flagged");
              cellEl.classList.add("revealed", "mine");
              cellEl.textContent = "";
            }
          }
        }
        return;
      }
      function reveal(rr, cc) {
        if (rr < 0 || rr >= ROWS || cc < 0 || cc >= COLS) return;
        const cur = grid[rr][cc];
        if (cur.isRevealed || cur.isFlagged || cur.isMine) return;
        cur.isRevealed = true;
        const cellEl = el.querySelector(".win98-ms-cell[data-r='" + rr + "'][data-c='" + cc + "']");
        cellEl.classList.add("revealed");
        if (cur.count > 0) {
          cellEl.textContent = cur.count;
          cellEl.classList.add("num-" + cur.count);
        } else {
          getNeighbors(rr, cc).forEach(function (n) { reveal(n[0], n[1]); });
        }
      }
      reveal(r, c);
      let revealedCount = 0;
      for (let rr = 0; rr < ROWS; rr++) {
        for (let cc = 0; cc < COLS; cc++) {
          if (grid[rr][cc].isRevealed) revealedCount++;
        }
      }
      if (revealedCount === ROWS * COLS - MINES) {
        won = true;
        gameOver = true;
        stopTimer();
        faceBtn.classList.add("won");
        for (let rr = 0; rr < ROWS; rr++) {
          for (let cc = 0; cc < COLS; cc++) {
            if (grid[rr][cc].isMine && !grid[rr][cc].isFlagged) {
              grid[rr][cc].isFlagged = true;
              const cellEl = el.querySelector(".win98-ms-cell[data-r='" + rr + "'][data-c='" + cc + "']");
              cellEl.classList.add("flagged");
            }
          }
        }
        updateCounter();
      }
    }
    function toggleFlag(r, c) {
      if (gameOver) return;
      if (!grid[r] || !grid[r][c]) return;
      const cell = grid[r][c];
      if (cell.isRevealed) return;
      cell.isFlagged = !cell.isFlagged;
      const cellEl = el.querySelector(".win98-ms-cell[data-r='" + r + "'][data-c='" + c + "']");
      if (cell.isFlagged) cellEl.classList.add("flagged");
      else cellEl.classList.remove("flagged");
      updateCounter();
    }
    function buildGrid() {
      gridEl.innerHTML = "";
      gridEl.style.gridTemplateColumns = "repeat(" + COLS + ", 18px)";
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const cellEl = document.createElement("button");
          cellEl.type = "button";
          cellEl.className = "win98-ms-cell";
          cellEl.dataset.r = r;
          cellEl.dataset.c = c;
          cellEl.setAttribute("aria-label", "Cell " + (r + 1) + " " + (c + 1));
          cellEl.addEventListener("click", function (e) {
            e.preventDefault();
            if (flagMode) toggleFlag(r, c);
            else revealCell(r, c);
          });
          cellEl.addEventListener("contextmenu", function (e) {
            e.preventDefault();
            toggleFlag(r, c);
          });
          gridEl.appendChild(cellEl);
        }
      }
    }
    function resetGame() {
      stopTimer();
      firstClick = true;
      gameOver = false;
      won = false;
      flagMode = false;
      elapsed = 0;
      grid = [];
      faceBtn.classList.remove("lost", "won");
      if (flagBtn) flagBtn.classList.remove("win98-ms-flag-active");
      counterEl.textContent = pad3(MINES);
      timerEl.textContent = "000";
      buildGrid();
    }
    if (flagBtn) {
      flagBtn.addEventListener("click", function (e) {
        e.preventDefault();
        if (gameOver) return;
        flagMode = !flagMode;
        flagBtn.classList.toggle("win98-ms-flag-active", flagMode);
      });
    }
    buildGrid();
    counterEl.textContent = pad3(MINES);
    titleBar.addEventListener("mousedown", function (e) {
      if (e.target.closest(".win98-titlebar-btn")) return;
      if (el.classList.contains("win98-maximized")) return;
      startDrag(el, e);
    });
    titleBar.addEventListener("touchstart", function (e) {
      if (e.target.closest(".win98-titlebar-btn")) return;
      if (el.classList.contains("win98-maximized")) return;
      e.preventDefault();
      startDrag(el, e);
    }, { passive: false });
    el.addEventListener("mousedown", function () {
      bringToFront(el);
      const taskbarBtn = taskbarItems.querySelector("[data-window-id='" + id + "']");
      if (taskbarBtn) {
        taskbarItems.querySelectorAll(".taskbar-item").forEach(function (b) { b.classList.remove("active"); });
        taskbarBtn.classList.add("active");
      }
    });
    titleBar.querySelector(".minimize").addEventListener("click", function () { minimizeWindow(el); });
    titleBar.querySelector(".maximize").addEventListener("click", function () { toggleMaximize(el); });
    titleBar.querySelector(".close").addEventListener("click", function () {
      stopTimer();
      closeWindow(el);
    });
    faceBtn.addEventListener("click", function () { resetGame(); });
    const win = { el: el, id: id, folderName: "Minesweeper" };
    windowsContainer.appendChild(el);
    centerWindow(el);
    bringToFront(el);
    addTaskbarEntry(win);
  }

  function openFile(url, type, name, imageList, imageIndex) {
    if (type === "image") {
      showImageViewer(url, name, imageList, imageIndex);
    } else if (type === "video") {
      showVideoViewer(url, name);
    } else {
      showNotepadWindow(url, name);
    }
  }

  function showNotepadWindow(url, name) {
    const id = "win-notepad-" + Date.now() + "-" + Math.random().toString(36).slice(2);
    const notepadIconSvg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Crect fill='%23fff' stroke='%23808080' width='14' height='14' x='1' y='1'/%3E%3Cline stroke='%23000' stroke-width='.5' x1='3' y1='4' x2='12' y2='4'/%3E%3Cline stroke='%23000' stroke-width='.5' x1='3' y1='6' x2='12' y2='6'/%3E%3Cline stroke='%23000' stroke-width='.5' x1='3' y1='8' x2='12' y2='8'/%3E%3Cline stroke='%23000' stroke-width='.5' x1='3' y1='10' x2='10' y2='10'/%3E%3C/svg%3E";

    const el = document.createElement("div");
    el.className = "win98-window win98-notepad";
    el.id = id;
    el.style.left = (100 + (windowsContainer.children.length % 5) * 30) + "px";
    el.style.top = (80 + (windowsContainer.children.length % 5) * 30) + "px";
    el.style.width = "480px";
    el.style.height = "360px";
    el.style.zIndex = nextZ++;

    el.innerHTML =
      "<div class='win98-titlebar'>" +
      "<span class='win98-titlebar-icon' style='background-image:url(" + notepadIconSvg + ")'></span>" +
      "<span class='win98-titlebar-title'>" + escapeHtml(name) + " - Notepad</span>" +
      "<div class='win98-titlebar-buttons'>" +
      "<button type='button' class='win98-titlebar-btn minimize' aria-label='Minimize'>—</button>" +
      "<button type='button' class='win98-titlebar-btn maximize' aria-label='Maximize'>□</button>" +
      "<button type='button' class='win98-titlebar-btn close' aria-label='Close'>×</button>" +
      "</div></div>" +
      "<div class='win98-notepad-menubar'>" +
      "<span class='win98-notepad-menu'>File</span><span class='win98-notepad-menu'>Edit</span><span class='win98-notepad-menu'>Format</span><span class='win98-notepad-menu'>View</span><span class='win98-notepad-menu'>Help</span>" +
      "</div>" +
      "<div class='win98-notepad-client'><pre class='win98-notepad-text'></pre><div class='win98-notepad-external hidden'><p>This document is on an external site.</p><button type='button' class='win98-notepad-open-btn'>Open in browser</button></div></div>";

    const titleBar = el.querySelector(".win98-titlebar");
    const textEl = el.querySelector(".win98-notepad-text");
    const externalEl = el.querySelector(".win98-notepad-external");
    const openBtn = el.querySelector(".win98-notepad-open-btn");

    titleBar.addEventListener("mousedown", function (e) {
      if (e.target.closest(".win98-titlebar-btn")) return;
      if (el.classList.contains("win98-maximized")) return;
      startDrag(el, e);
    });
    titleBar.addEventListener("touchstart", function (e) {
      if (e.target.closest(".win98-titlebar-btn")) return;
      if (el.classList.contains("win98-maximized")) return;
      e.preventDefault();
      startDrag(el, e);
    }, { passive: false });

    el.addEventListener("mousedown", function () {
      bringToFront(el);
      const taskbarBtn = taskbarItems.querySelector("[data-window-id='" + id + "']");
      if (taskbarBtn) {
        taskbarItems.querySelectorAll(".taskbar-item").forEach(function (b) { b.classList.remove("active"); });
        taskbarBtn.classList.add("active");
      }
    });

    titleBar.querySelector(".minimize").addEventListener("click", function () {
      minimizeWindow(el);
    });
    titleBar.querySelector(".maximize").addEventListener("click", function () {
      toggleMaximize(el);
    });
    titleBar.querySelector(".close").addEventListener("click", function () {
      closeWindow(el);
    });

    openBtn.addEventListener("click", function () {
      window.open(url, "_blank");
    });

    const win = { el: el, id: id, folderName: name + " - Notepad" };
    windowsContainer.appendChild(el);
    centerWindow(el, 480, 360);
    bringToFront(el);
    addTaskbarEntry(win);

    fetch(url, { method: "GET" })
      .then(function (r) {
        if (!r.ok) throw new Error("Fetch failed");
        return r.text();
      })
      .then(function (text) {
        textEl.textContent = text;
        textEl.classList.remove("hidden");
        externalEl.classList.add("hidden");
      })
      .catch(function () {
        textEl.classList.add("hidden");
        externalEl.classList.remove("hidden");
      });
  }

  function showImageViewer(url, name, imageList, currentIndex) {
    const list = imageList && imageList.length > 0 ? imageList : [{ url: url, name: name }];
    const idx = typeof currentIndex === "number" && currentIndex >= 0 && currentIndex < list.length ? currentIndex : 0;

    let overlay = document.getElementById("win98-image-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "win98-image-overlay";
      overlay.className = "win98-modal-overlay hidden";
      overlay.innerHTML =
        "<div class='win98-image-viewer'>" +
        "<div class='win98-modal-titlebar'><span class='win98-modal-title'></span> <button type='button' class='win98-titlebar-btn close' style='margin-left:auto'>×</button></div>" +
        "<div class='win98-image-viewer-content'>" +
        "<button type='button' class='win98-image-nav win98-image-nav-left' aria-label='Previous'><span>◀</span></button>" +
        "<div class='win98-image-viewer-img-wrap'><img src='' alt=''></div>" +
        "<button type='button' class='win98-image-nav win98-image-nav-right' aria-label='Next'><span>▶</span></button>" +
        "</div>" +
        "<div class='win98-image-viewer-status'></div>" +
        "</div>";
      overlay.querySelector(".close").addEventListener("click", function () {
        overlay.classList.add("hidden");
        if (overlay._keyHandler) {
          document.removeEventListener("keydown", overlay._keyHandler);
          overlay._keyHandler = null;
        }
      });
      overlay.addEventListener("click", function (e) {
        if (e.target === overlay) {
          overlay.classList.add("hidden");
          if (overlay._keyHandler) {
            document.removeEventListener("keydown", overlay._keyHandler);
            overlay._keyHandler = null;
          }
        }
      });
      document.body.appendChild(overlay);
    }

    const img = overlay.querySelector("img");
    const titleEl = overlay.querySelector(".win98-modal-title");
    const statusEl = overlay.querySelector(".win98-image-viewer-status");
    const btnPrev = overlay.querySelector(".win98-image-nav-left");
    const btnNext = overlay.querySelector(".win98-image-nav-right");

    function showAt(index) {
      const i = (index + list.length) % list.length;
      const item = list[i];
      img.src = item.url;
      img.alt = item.name;
      titleEl.textContent = item.name;
      statusEl.textContent = (i + 1) + " of " + list.length;
      overlay.dataset.currentIndex = String(i);
      btnPrev.style.visibility = list.length > 1 ? "visible" : "hidden";
      btnNext.style.visibility = list.length > 1 ? "visible" : "hidden";
    }

    function onKey(e) {
      if (overlay.classList.contains("hidden")) return;
      if (e.key === "Escape") {
        overlay.classList.add("hidden");
        document.removeEventListener("keydown", onKey);
        overlay._keyHandler = null;
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        const i = parseInt(overlay.dataset.currentIndex || "0", 10);
        showAt(i - 1);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        const i = parseInt(overlay.dataset.currentIndex || "0", 10);
        showAt(i + 1);
      }
    }

    if (overlay._keyHandler) {
      document.removeEventListener("keydown", overlay._keyHandler);
    }
    overlay._keyHandler = onKey;

    btnPrev.addEventListener("click", function (e) {
      e.stopPropagation();
      const i = parseInt(overlay.dataset.currentIndex || "0", 10);
      showAt(i - 1);
    });
    btnNext.addEventListener("click", function (e) {
      e.stopPropagation();
      const i = parseInt(overlay.dataset.currentIndex || "0", 10);
      showAt(i + 1);
    });

    document.addEventListener("keydown", onKey);

    showAt(idx);
    overlay.classList.remove("hidden");
  }

  function showVideoViewer(url, name) {
    let overlay = document.getElementById("win98-video-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "win98-video-overlay";
      overlay.className = "win98-modal-overlay hidden";
      overlay.innerHTML =
        "<div class='win98-modal'>" +
        "<div class='win98-modal-titlebar'><span class='win98-modal-title'></span> <button type='button' class='win98-titlebar-btn close' style='margin-left:auto'>×</button></div>" +
        "<div class='win98-modal-content'><video controls></video></div></div>";
      overlay.querySelector(".close").addEventListener("click", function () {
        overlay.querySelector("video").pause();
        overlay.classList.add("hidden");
      });
      overlay.addEventListener("click", function (e) {
        if (e.target === overlay) {
          overlay.querySelector("video").pause();
          overlay.classList.add("hidden");
        }
      });
      document.body.appendChild(overlay);
    }
    const video = overlay.querySelector("video");
    video.src = url;
    overlay.querySelector(".win98-modal-title").textContent = name;
    overlay.classList.remove("hidden");
  }

  // Kick off – load content only; do not open any windows (sticky note opens via desktop icon only)
  loadContent().then(function () {});

  function createStickyNote() {
    const id = "win-sticky-" + Date.now();
    const el = document.createElement("div");
    el.className = "win98-window win98-sticky-note";
    el.id = id;
    el.style.left = "160px";
    el.style.top = "100px";
    el.style.zIndex = nextZ++;

    const noteIconSvg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='%23c4a747' d='M2 2h12v12H2z'/%3E%3Cpath fill='%23fef9c3' d='M3 3h10v10H3z'/%3E%3C/svg%3E";
    const clippySvg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cpath fill='%23e8e6e3' stroke='%23b0ada8' stroke-width='1.5' d='M32 8c-6 0-12 4-12 14v28c0 4 3 8 8 8s8-4 8-8V22c0-2-1-4-4-4s-4 2-4 4v20h-4V22c0-4 2-8 8-8s8 4 8 8v28c0 6-4 12-12 12s-12-6-12-12V22c0-10 6-14 12-14z'/%3E%3Cellipse cx='26' cy='18' rx='4' ry='5' fill='%23fff' stroke='%23555'/%3E%3Cellipse cx='26' cy='18' rx='2' ry='2.5' fill='%23111'/%3E%3Cellipse cx='38' cy='18' rx='4' ry='5' fill='%23fff' stroke='%23555'/%3E%3Cellipse cx='38' cy='18' rx='2' ry='2.5' fill='%23111'/%3E%3C/svg%3E";

    const stickyText = "Welcome to my website! It's designed to look exactly like Windows 98. Have a look around! There's not much but I'm developing more as I go, hope you enjoy!";

    el.innerHTML =
      "<div class='win98-titlebar'>" +
      "<span class='win98-titlebar-icon' style='background-image:url(" + noteIconSvg + ")'></span>" +
      "<span class='win98-titlebar-title'>Welcome!</span>" +
      "<div class='win98-titlebar-buttons'>" +
      "<button type='button' class='win98-titlebar-btn minimize' aria-label='Minimize'>—</button>" +
      "<button type='button' class='win98-titlebar-btn maximize' aria-label='Maximize'>□</button>" +
      "<button type='button' class='win98-titlebar-btn close' aria-label='Close'>×</button>" +
      "</div></div>" +
      "<div class='win98-sticky-body'>" +
      "<div class='win98-sticky-clippy' style='background-image:url(" + clippySvg + ")'></div>" +
      "<p class='win98-sticky-text'>" + escapeHtml(stickyText) + "</p>" +
      "</div>";

    const titleBar = el.querySelector(".win98-titlebar");
    titleBar.addEventListener("mousedown", function (e) {
      if (e.target.closest(".win98-titlebar-btn")) return;
      startDrag(el, e);
    });
    titleBar.addEventListener("touchstart", function (e) {
      if (e.target.closest(".win98-titlebar-btn")) return;
      e.preventDefault();
      startDrag(el, e);
    }, { passive: false });
    el.addEventListener("mousedown", function () {
      bringToFront(el);
    });
    titleBar.querySelector(".close").addEventListener("click", function () {
      el.remove();
    });

    windowsContainer.appendChild(el);
    centerWindow(el, 300, 220);
    bringToFront(el);
  }
})();
