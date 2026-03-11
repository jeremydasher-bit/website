(function () {
  "use strict";

  const FOLDER_PATHS = {
    Photos: "C:\\Jeremy\\Photos",
    Blogs: "C:\\Jeremy\\Blogs",
    Documents: "C:\\Jeremy\\Documents",
    Download: "C:\\Jeremy\\Download"
  };

  const DEFAULT_MANIFEST = {
    Photos: [
      { name: "Landscape_01.jpg", type: "image", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80" },
      { name: "Mountain_View.jpg", type: "image", url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80" }
    ],
    Blogs: [{ name: "Welcome.txt", type: "doc", url: "./assets/welcome.txt" }],
    Documents: [{ name: "About_Me.txt", type: "doc", url: "./assets/about.txt" }],
    Download: [{ name: "Portfolio_Sample.pdf", type: "doc", url: "https://jeremydasher.com" }]
  };

  let contentManifest = JSON.parse(JSON.stringify(DEFAULT_MANIFEST));
  let nextZ = 1000;
  const windowsContainer = document.getElementById("windows-container");
  const taskbarItems = document.getElementById("taskbar-items");
  const startMenu = document.getElementById("start-menu");
  const startBtn = document.getElementById("start-btn");
  const clockEl = document.getElementById("clock");

  // Load content manifest (use content.json if available, else keep default)
  function loadContent() {
    return fetch("content.json")
      .then(function (r) { return r.json(); })
      .then(function (data) {
        contentManifest = data;
      })
      .catch(function () {
        contentManifest = JSON.parse(JSON.stringify(DEFAULT_MANIFEST));
      });
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
      if (action === "photos" || action === "blogs" || action === "documents" || action === "documents-folder" || action === "download") {
        const folder = (action === "documents" || action === "documents-folder") ? "Documents" : action.charAt(0).toUpperCase() + action.slice(1);
        openFolder(folder);
      } else if (action === "shutdown") {
        if (confirm("Are you sure you want to shut down?")) {
          window.location.href = "https://jeremydasher.com";
        }
      }
    });
  });

  // Desktop icons: double-click opens folder
  document.querySelectorAll(".desktop-icon").forEach(function (el) {
    el.addEventListener("dblclick", function () {
      const folder = this.getAttribute("data-folder");
      if (folder) openFolder(folder);
    });
  });

  function openFolder(folderName) {
    const path = FOLDER_PATHS[folderName] || "C:\\";
    const files = contentManifest[folderName] || [];
    const win = createExplorerWindow(folderName, path, files);
    windowsContainer.appendChild(win.el);
    bringToFront(win.el);
    addTaskbarEntry(win);
  }

  function createExplorerWindow(folderName, path, files) {
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
      "<span class='win98-titlebar-title'>" + folderName + " - " + path + "</span>" +
      "<div class='win98-titlebar-buttons'>" +
      "<button type='button' class='win98-titlebar-btn minimize' aria-label='Minimize'>—</button>" +
      "<button type='button' class='win98-titlebar-btn maximize' aria-label='Maximize'>□</button>" +
      "<button type='button' class='win98-titlebar-btn close' aria-label='Close'>×</button>" +
      "</div></div>" +
      "<div class='win98-client'></div>";

    const client = el.querySelector(".win98-client");

    if (files.length === 0) {
      client.innerHTML = "<div class='win98-empty'>This folder is empty.</div>";
    } else {
      const table = document.createElement("table");
      table.className = "win98-file-list";
      table.innerHTML =
        "<thead><tr><th>Name</th><th>Type</th></tr></thead><tbody></tbody>";
      const tbody = table.querySelector("tbody");
      files.forEach(function (f) {
        const tr = document.createElement("tr");
        tr.dataset.url = f.url;
        tr.dataset.type = f.type || "doc";
        tr.dataset.name = f.name;
        const iconClass = "file-icon-" + (f.type === "video" ? "video" : f.type === "image" ? "image" : "doc");
        tr.innerHTML =
          "<td><span class='file-icon " + iconClass + "'></span>" + escapeHtml(f.name) + "</td>" +
          "<td>" + (f.type === "image" ? "JPEG Image" : f.type === "video" ? "Video" : "Document") + "</td>";
        tbody.appendChild(tr);
        tr.addEventListener("dblclick", function () {
          openFile(f.url, f.type, f.name);
        });
      });
      client.appendChild(table);
    }

    // Title bar drag
    const titleBar = el.querySelector(".win98-titlebar");
    titleBar.addEventListener("mousedown", function (e) {
      if (e.target.closest(".win98-titlebar-btn")) return;
      startDrag(el, e);
    });

    el.addEventListener("mousedown", function () {
      bringToFront(el);
      const taskbarBtn = taskbarItems.querySelector("[data-window-id='" + id + "']");
      if (taskbarBtn) {
        taskbarItems.querySelectorAll(".taskbar-item").forEach(function (b) { b.classList.remove("active"); });
        taskbarBtn.classList.add("active");
      }
    });

    titleBar.querySelector(".close").addEventListener("click", function () {
      closeWindow(el);
    });

    return { el: el, id: id, folderName: folderName };
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
    const startX = e.clientX - windowEl.offsetLeft;
    const startY = e.clientY - windowEl.offsetTop;
    function move(ev) {
      windowEl.style.left = Math.max(0, ev.clientX - startX) + "px";
      windowEl.style.top = Math.max(0, ev.clientY - startY) + "px";
    }
    function stop() {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", stop);
    }
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", stop);
  }

  function closeWindow(windowEl) {
    const id = windowEl.id;
    const taskbarBtn = taskbarItems.querySelector("[data-window-id='" + id + "']");
    if (taskbarBtn) taskbarBtn.remove();
    windowEl.remove();
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

  function openFile(url, type, name) {
    if (type === "image") {
      showImageViewer(url, name);
    } else if (type === "video") {
      showVideoViewer(url, name);
    } else {
      window.open(url, "_blank");
    }
  }

  function showImageViewer(url, name) {
    let overlay = document.getElementById("win98-image-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "win98-image-overlay";
      overlay.className = "win98-modal-overlay hidden";
      overlay.innerHTML =
        "<div class='win98-modal'>" +
        "<div class='win98-modal-titlebar'><span class='win98-modal-title'></span> <button type='button' class='win98-titlebar-btn close' style='margin-left:auto'>×</button></div>" +
        "<div class='win98-modal-content'><img src='' alt=''></div></div>";
      overlay.querySelector(".close").addEventListener("click", function () {
        overlay.classList.add("hidden");
      });
      overlay.addEventListener("click", function (e) {
        if (e.target === overlay) overlay.classList.add("hidden");
      });
      document.body.appendChild(overlay);
    }
    overlay.querySelector("img").src = url;
    overlay.querySelector(".win98-modal-title").textContent = name;
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

  // Kick off
  loadContent().then(function () {});
})();
