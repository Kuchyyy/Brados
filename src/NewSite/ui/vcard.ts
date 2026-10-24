import type { Person } from "../data/team";

const esc = (v: string) => v.replace(/([,;\\])/g, "\\$1");

export function personVCard(p: Person) {
  const parts = p.name.split(" ");
  const last = parts.slice(1).join(" ");
  const first = parts[0];
  const phone = `+48${p.phone.replace(/\s/g, "")}`;
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${esc(last)};${esc(first)};;;`,
    `FN:${esc(p.name)}`,
    "ORG:Brados sp. z o.o.",
    `TEL;TYPE=CELL,VOICE:${phone}`,
    `EMAIL;TYPE=WORK,INTERNET:${p.email}`,
    "END:VCARD",
  ].join("\r\n");
}

export function downloadVCard(p: Person) {
  const blob = new Blob([personVCard(p)], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${p.name.replace(/\s+/g, "-")}.vcf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
