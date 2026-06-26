type VCardPerson = {
  name: string;
  phone: string;
  email: string;
  role?: string;
  organization?: string;
};

function parseName(fullName: string) {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: "" };
  }

  const lastName = parts.pop() ?? "";
  const firstName = parts.join(" ");
  return { firstName, lastName };
}

function escapeVCard(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/\n/g, "\\n");
}

function formatTel(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("48") && digits.length === 11) {
    return `+${digits}`;
  }
  return `+48${digits}`;
}

export function downloadVCard(person: VCardPerson) {
  const { firstName, lastName } = parseName(person.name);
  const org = person.organization ?? "Brados";

  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${escapeVCard(person.name)}`,
    `N:${escapeVCard(lastName)};${escapeVCard(firstName)};;;`,
    `TEL;TYPE=CELL:${formatTel(person.phone)}`,
    `EMAIL;TYPE=INTERNET:${person.email}`,
    `ORG:${escapeVCard(org)}`,
  ];

  if (person.role) {
    lines.push(`TITLE:${escapeVCard(person.role)}`);
  }

  lines.push("END:VCARD");

  const blob = new Blob([lines.join("\r\n")], {
    type: "text/vcard;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${person.name.replace(/\s+/g, "-")}.vcf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
