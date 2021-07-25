const stylesheet = new CSSStyleSheet,
    cssText = '#notify {\n  position: relative;\n  z-index: 999999;\n  display: flex;\n  flex-direction: column;\n  width: 10vw;\n}\n[data-notify] {\n  position: fixed;\n}\n[data-notify="top left"] {\n  top: 10px;\n  left: 10px;\n}\n[data-notify="top center"] {\n  top: 10px;\n  left: 50%;\n  transform: translateX(-50%);\n}\n[data-notify="top right"] {\n  top: 10px;\n  right: 10px;\n}\n[data-notify="bottom left"] {\n  bottom: 10px;\n  left: 10px;\n}\n[data-notify="bottom center"] {\n  bottom: 10px;\n  left: 50%;\n  transform: translateX(-50%);\n}\n[data-notify="bottom right"] {\n  bottom: 10px;\n  right: 10px;\n}\n[data-notify~="top"] .animate {\n  opacity: 0;\n  margin-top: -10px;\n}\n[data-notify~="bottom"] .animate {\n  opacity: 0;\n  margin-bottom: -10px;\n}\n.notify {\n  padding: 0.25rem 0.75rem;\n  margin-bottom: 1rem;\n  border: 1px solid transparent;\n  border-radius: 0.25rem;\n  transition: all 300ms ease 0s;\n  user-select: none;\n  cursor: pointer;\n}\n.notify__title {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-direction: row-reverse;\n}\n.notify__title svg {\n  margin-right: 7.5px;\n}\n.notify--success {\n  color: #155724;\n  background-color: #d4edda;\n  border-color: #c3e6cb;\n}\n.notify--danger {\n  color: #721c24;\n  background-color: #f8d7da;\n  border-color: #f5c6cb;\n}\n.notify--warning {\n  color: #856404;\n  background-color: #fff3cd;\n  border-color: #ffeeba;\n}\n';

function Notify({
    title: n,
    html: t = null,
    type: e = "success",
    position: o = "top right",
    duration: i = 2e3
}, r) {
    const a = document.getElementById("notify");
    if (!document.querySelector(`[data-notify='${o}']`)) {
        const n = document.createElement("div");
        n.setAttribute("data-notify", o), a.appendChild(n)
    }
    const s = document.querySelector(`[data-notify='${o}']`),
        c = document.createElement("div");
    c.setAttribute("class", `notify notify--${e}`), c.classList.add("animate"), setTimeout(() => c.classList.remove("animate"), 300), c.innerHTML = `\n        <div class="notify__title" style="font-weight: 700;color: #0b2e13;">${n}</div>\n        ${null!==t?t:""}\n    `;
    const l = c.querySelector(".notify__title");
    switch (e) {
        case "success":
            l.innerHTML += '\n    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-check" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#155724" fill="none" stroke-linecap="round" stroke-linejoin="round">\n      <path stroke="none" d="M0 0h24v24H0z"/>\n      <circle cx="12" cy="12" r="9" />\n      <path d="M9 12l2 2l4 -4" />\n    </svg>';
            break;
        case "warning":
            l.innerHTML += '\n      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-alert-circle" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#856404" fill="none" stroke-linecap="round" stroke-linejoin="round">\n        <path stroke="none" d="M0 0h24v24H0z"/>\n        <circle cx="12" cy="12" r="9" />\n        <line x1="12" y1="8" x2="12" y2="12" />\n        <line x1="12" y1="16" x2="12.01" y2="16" />\n      </svg>';
            break;
        case "danger":
            l.innerHTML += '\n      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-alert-triangle" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#721c24" fill="none" stroke-linecap="round" stroke-linejoin="round">\n        <path stroke="none" d="M0 0h24v24H0z"/>\n        <path d="M12 9v2m0 4v.01" />\n        <path d="M5.07 19H19a2 2 0 0 0 1.75 -2.75L13.75 4a2 2 0 0 0 -3.5 0L3.25 16.25a2 2 0 0 0 1.75 2.75" />\n      </svg>'
    }
    "top" === o.split(" ")[0] && s.insertAdjacentElement("afterbegin", c), "bottom" === o.split(" ")[0] && s.insertAdjacentElement("beforeend", c), 1 * i > 0 && setTimeout(() => {
        "function" == typeof r && r(), c.remove()
    }, i), c.addEventListener("click", function() {
        this.remove()
    })
}
stylesheet.replaceSync(cssText), document.adoptedStyleSheets = [stylesheet];

let count = 1;
export function createNotification(options, msg) {
        Notify({ ...options, title: `${msg}` });
        count++;
      }
