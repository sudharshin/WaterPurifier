export function base64ToBlobUrl(base64Str) {
  if (!base64Str || typeof base64Str !== "string") return "";

  if (
    base64Str.startsWith("blob:") ||
    base64Str.startsWith("data:") ||
    base64Str.startsWith("http://") ||
    base64Str.startsWith("https://")
  ) {
    return base64Str;
  }

  try {
    let mimeType = "image/png";

    if (base64Str.includes(";base64,")) {
      const [header, base64Data] = base64Str.split(";base64,");
      mimeType = header.split(":")[1] || mimeType;
      const byteCharacters = atob(base64Data);
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        byteArrays.push(new Uint8Array(byteNumbers));
      }

      const blob = new Blob(byteArrays, { type: mimeType });
      return URL.createObjectURL(blob);
    }

    const byteCharacters = atob(base64Str);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      byteArrays.push(new Uint8Array(byteNumbers));
    }

    const blob = new Blob(byteArrays, { type: mimeType });
    return URL.createObjectURL(blob);
  } catch (e) {
    console.warn("Failed to convert base64 to blob URL:", e);
    return "";
  }
}
