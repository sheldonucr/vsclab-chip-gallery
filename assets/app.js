/* VSCLAB chip gallery — vanilla JS, no build step, runs from file:// */
(function () {
  "use strict";

  var D = window.DESIGNS || [];

  var FAMILIES = [
    { key: "all",      label: "All flows" },
    { key: "synopsys", label: "Synopsys" },
    { key: "openlane", label: "OpenLane" },
    { key: "openroad", label: "OpenROAD" }
  ];

  var SECTIONS = [
    { key: "Synopsys Fusion Compiler",
      note: "Commercial RTL-to-GDSII on the Synopsys educational 32 nm kit" },
    { key: "Synopsys Design Compiler",
      note: "Logic synthesis reference flow" },
    { key: "OpenLane",
      note: "Push-button open-source flow on SkyWater SKY130" },
    { key: "OpenROAD Flow Scripts",
      note: "Open-source RTL-to-GDSII across four technology nodes" }
  ];

  var state = { family: "all", node: "all", q: "" };

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var el = function (tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };
  var esc = function (s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  };

  /* ---------------------------------------------------------- header stats */

  function nodeRank(n) { return parseFloat(n) || 0; }

  function buildStats() {
    var nodes = {}, fams = {}, imgs = 0;
    D.forEach(function (d) {
      nodes[d.node] = 1;
      fams[d.familyLabel] = 1;
      imgs += d.images.length;
    });
    var box = $("#stats");
    [["Designs", D.length],
     ["Technology nodes", Object.keys(nodes).length],
     ["Tool flows", Object.keys(fams).length],
     ["Layout views", imgs]
    ].forEach(function (p) {
      var s = el("div", "stat");
      s.appendChild(el("div", "n", p[1]));
      s.appendChild(el("div", "l", p[0]));
      box.appendChild(s);
    });
  }

  /* ---------------------------------------------------------- filters */

  function buildFilters() {
    var famBox = $("#f-family"), nodeBox = $("#f-node");

    FAMILIES.forEach(function (f) {
      var n = f.key === "all" ? D.length
            : D.filter(function (d) { return d.family === f.key; }).length;
      if (!n) return;
      var b = el("button", "chip", esc(f.label) + '<span class="c">' + n + "</span>");
      b.type = "button";
      b.setAttribute("aria-pressed", String(f.key === "all"));
      b.dataset.k = f.key;
      b.addEventListener("click", function () { state.family = f.key; sync(); });
      famBox.appendChild(b);
    });

    var nodes = {};
    D.forEach(function (d) { nodes[d.node] = (nodes[d.node] || 0) + 1; });
    var keys = Object.keys(nodes).sort(function (a, b) { return nodeRank(a) - nodeRank(b); });

    ["all"].concat(keys).forEach(function (k) {
      var b = el("button", "chip",
        (k === "all" ? "All nodes" : esc(k)) +
        '<span class="c">' + (k === "all" ? D.length : nodes[k]) + "</span>");
      b.type = "button";
      b.setAttribute("aria-pressed", String(k === "all"));
      b.dataset.k = k;
      b.addEventListener("click", function () { state.node = k; sync(); });
      nodeBox.appendChild(b);
    });

    $("#search").addEventListener("input", function (e) {
      state.q = e.target.value.trim().toLowerCase();
      sync();
    });
  }

  function sync() {
    ["#f-family", "#f-node"].forEach(function (sel, i) {
      var want = i === 0 ? state.family : state.node;
      Array.prototype.forEach.call($(sel).children, function (c) {
        if (c.dataset && c.dataset.k) c.setAttribute("aria-pressed", String(c.dataset.k === want));
      });
    });
    render();
  }

  function matches(d) {
    if (state.family !== "all" && d.family !== state.family) return false;
    if (state.node !== "all" && d.node !== state.node) return false;
    if (state.q && d.searchText.indexOf(state.q) === -1) return false;
    return true;
  }

  /* ---------------------------------------------------------- cards */

  function card(d) {
    var b = el("button", "card");
    b.type = "button";
    b.setAttribute("aria-label", "Open details for " + d.name);

    if (d.images.length) {
      var t = el("div", "thumb");
      var im = el("img");
      im.src = d.images[0].src;
      im.alt = d.name + " — " + d.images[0].cap;
      im.loading = "lazy";
      im.decoding = "async";
      t.appendChild(im);
      t.appendChild(el("span", "imgcount",
        d.images.length + (d.images.length === 1 ? " view" : " views")));
      b.appendChild(t);
    } else {
      b.appendChild(el("div", "thumb empty", "No layout captured<br>synthesis only"));
    }

    var body = el("div", "card-body");
    var badges = el("div", "badges");
    badges.appendChild(el("span", "badge node", esc(d.node)));
    badges.appendChild(el("span", "badge tool", esc(d.familyLabel)));
    body.appendChild(badges);
    body.appendChild(el("h3", null, esc(d.name)));
    body.appendChild(el("p", null, d.blurb));

    var hm = el("div", "headmetrics");
    d.head.forEach(function (p) {
      var c = el("div");
      c.appendChild(el("div", "k", esc(p[0]).replace("&lt;sub&gt;", "<sub>").replace("&lt;/sub&gt;", "</sub>")));
      c.appendChild(el("div", "v", esc(p[1])));
      c.title = p[1];
      hm.appendChild(c);
    });
    body.appendChild(hm);
    b.appendChild(body);

    b.addEventListener("click", function () { open(d); });
    return b;
  }

  function render() {
    var root = $("#results");
    root.innerHTML = "";
    var shown = D.filter(matches);

    if (!shown.length) {
      var g = el("div", "grid");
      g.appendChild(el("div", "empty-state", "No design matches these filters."));
      root.appendChild(g);
      return;
    }

    SECTIONS.forEach(function (sec) {
      var items = shown.filter(function (d) { return d.familyLabel === sec.key; });
      if (!items.length) return;
      var h = el("div", "section-head");
      h.appendChild(el("h2", null, esc(sec.key)));
      h.appendChild(el("span", "sub", items.length + " · " + sec.note));
      root.appendChild(h);
      var g = el("div", "grid");
      items.forEach(function (d) { g.appendChild(card(d)); });
      root.appendChild(g);
    });
  }

  /* ---------------------------------------------------------- detail sheet */

  var cur = null, curIdx = 0;

  /* replaceState throws a SecurityError on some file:// origins, so guard it and
     fall back to leaving the URL alone — deep links just stop working locally. */
  function setHash(h) {
    try {
      history.replaceState(null, "", h || location.pathname + location.search);
    } catch (e) { /* ignore */ }
  }

  function showImage(i) {
    if (!cur || !cur.images.length) return;
    curIdx = (i + cur.images.length) % cur.images.length;
    var im = cur.images[curIdx];
    var big = $("#v-img");
    big.src = im.src;
    big.alt = cur.name + " — " + im.cap;
    $("#v-cap").textContent = im.cap;
    $("#v-idx").textContent = (curIdx + 1) + " / " + cur.images.length;
    var f = $("#v-full");
    if (im.full) { f.href = im.full; f.style.display = ""; } else { f.style.display = "none"; }
    Array.prototype.forEach.call($("#v-strip").children, function (b, j) {
      b.setAttribute("aria-current", String(j === curIdx));
    });
  }

  function open(d) {
    cur = d;
    $("#s-name").textContent = d.name;
    $("#s-blurb").innerHTML = d.blurb;

    var bd = $("#s-badges");
    bd.innerHTML = "";
    bd.appendChild(el("span", "badge node", esc(d.node)));
    bd.appendChild(el("span", "badge tool", esc(d.familyLabel)));
    bd.appendChild(el("span", "badge pdk", esc(d.pdkLabel)));

    var left = $("#s-left");
    left.innerHTML = "";
    if (d.images.length) {
      var v = el("div", "viewer");
      var img = el("img"); img.id = "v-img"; img.decoding = "async";
      v.appendChild(img);
      var cap = el("div", "viewer-cap");
      cap.appendChild(el("span", "idx")).id = "v-idx";
      cap.appendChild(el("span")).id = "v-cap";
      var a = el("a", "full", "full resolution ↗");
      a.id = "v-full"; a.target = "_blank"; a.rel = "noopener";
      cap.appendChild(a);
      v.appendChild(cap);
      left.appendChild(v);

      var strip = el("div", "strip"); strip.id = "v-strip";
      d.images.forEach(function (im, j) {
        var b = el("button"); b.type = "button";
        b.title = im.cap;
        var t = el("img"); t.src = im.src; t.alt = im.cap; t.loading = "lazy";
        b.appendChild(t);
        b.addEventListener("click", function () { showImage(j); });
        strip.appendChild(b);
      });
      left.appendChild(strip);
      showImage(0);
    } else {
      left.appendChild(el("div", "noimg",
        "No layout was captured for this design — it stops at the gate-level netlist."));
    }

    var right = $("#s-right");
    right.innerHTML = "";

    var fb = el("div", "block");
    fb.appendChild(el("h4", null, "Tool flow"));
    fb.appendChild(el("p", null, "<strong>" + esc(d.tool) + "</strong><br>" + esc(d.toolLine)));
    right.appendChild(fb);

    var pb = el("div", "block");
    pb.appendChild(el("h4", null, "Technology"));
    pb.appendChild(el("p", null, esc(d.pdkNote)));
    right.appendChild(pb);

    var sb = el("div", "block");
    sb.appendChild(el("h4", null, "Design specification"));
    var tbl = el("table", "specs");
    d.specs.forEach(function (s) {
      var tr = el("tr");
      tr.appendChild(el("td", "k", s[0]));
      tr.appendChild(el("td", "v", s[1]));
      tbl.appendChild(tr);
    });
    sb.appendChild(tbl);
    right.appendChild(sb);

    $("#overlay").classList.add("open");
    $("#overlay").scrollTop = 0;
    document.body.style.overflow = "hidden";
    $("#s-close").focus();
    setHash("#" + d.slug);
  }

  function close() {
    $("#overlay").classList.remove("open");
    document.body.style.overflow = "";
    cur = null;
    setHash("");
  }

  /* ---------------------------------------------------------- wire up */

  buildStats();
  buildFilters();
  render();

  $("#s-close").addEventListener("click", close);
  $("#overlay").addEventListener("mousedown", function (e) {
    if (e.target.id === "overlay") close();
  });
  document.addEventListener("keydown", function (e) {
    if (!$("#overlay").classList.contains("open")) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowRight") showImage(curIdx + 1);
    else if (e.key === "ArrowLeft") showImage(curIdx - 1);
  });

  if (location.hash) {
    var want = location.hash.slice(1);
    var hit = D.filter(function (d) { return d.slug === want; })[0];
    if (hit) open(hit);
  }
})();
