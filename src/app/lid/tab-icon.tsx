"use client";

import { useEffect } from "react";

const href = "/lid-tab-32.png";

export function LidTabIcon() {
  useEffect(() => {
    const head = document.head;
    head.querySelectorAll("link[rel='icon'], link[rel='shortcut icon']").forEach((node) => {
      node.remove();
    });
    const icon = document.createElement("link");
    icon.rel = "icon";
    icon.type = "image/png";
    icon.href = href;
    head.appendChild(icon);
  }, []);

  return null;
}
