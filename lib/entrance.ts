/**
 * Whether the entrance plays is decided in <head>, before the first paint.
 *
 * It used to be decided by the component after hydration. On a laptop that is
 * a few milliseconds; on a phone it is one to three seconds, so the page
 * painted, sat there, and then a bone screen slammed over it and the lens
 * started. The decision is now an inline script (app/layout.tsx), and the
 * sequence itself is CSS, so nothing about it waits on React.
 *
 * It plays on the first page load of a session, and only if that page is the
 * home page: a session that starts on a product page never sees it later.
 *
 * State lives in `window.__entrance` and two classes on <html>:
 *   entering    the lens is up: the chrome is hidden and the page is held
 *   lens-open   the opening frame has arrived, so the keyframes may run
 *
 * The lens holds on its hairline until the picture has loaded, capped at
 * OPEN_CAP_MS, so on a slow connection it never opens onto an empty frame.
 * The classes come off when the lens's own fade-out ends, or RELEASE_MS after
 * it was told to open if that event never comes (a tab opened in the
 * background does not run its animations).
 */
export const ENTRANCE_KEY = "bloom-entered";

const OPEN_CAP_MS = 1500;
const RELEASE_MS = 4000;

export type EntranceState = "wait" | "open" | "done";

declare global {
  interface Window {
    __entrance?: EntranceState;
  }
}

export const entranceScript = `(function(){
var w=window,d=document,h=d.documentElement;
try{if(sessionStorage.getItem("${ENTRANCE_KEY}"))return;sessionStorage.setItem("${ENTRANCE_KEY}","1")}catch(e){}
if(location.pathname!=="/"||matchMedia("(prefers-reduced-motion: reduce)").matches)return;
w.__entrance="wait";h.classList.add("entering");
function done(){w.__entrance="done";h.classList.remove("entering","lens-open")}
function open(){if(w.__entrance!=="wait")return;w.__entrance="open";h.classList.add("lens-open");setTimeout(function(){if(w.__entrance!=="done")done()},${RELEASE_MS})}
d.addEventListener("load",function(e){var t=e.target;if(t&&t.classList&&t.classList.contains("ap-img"))open()},true);
d.addEventListener("error",function(e){var t=e.target;if(t&&t.classList&&t.classList.contains("ap-img"))open()},true);
d.addEventListener("animationend",function(e){if(e.animationName==="ap-out")done()});
setTimeout(open,${OPEN_CAP_MS});
})()`;
