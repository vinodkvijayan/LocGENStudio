/** Shrink a dropped picture so the graph can keep it and the engine can read it. */

export type StudioImage = {
  name: string;
  data: string;
  width: number;
  height: number;
};

export function readStudioImage(file: File): Promise<StudioImage> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read that image."));
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const max = 1280;
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const width = Math.max(64, Math.round((img.width * scale) / 8) * 8);
        const height = Math.max(64, Math.round((img.height * scale) / 8) * 8);
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Could not prepare that image."));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve({ name: file.name, data: canvas.toDataURL("image/jpeg", 0.86), width, height });
      };
      img.onerror = () => reject(new Error("That file is not an image the browser can open."));
      img.src = String(reader.result ?? "");
    };
    reader.readAsDataURL(file);
  });
}
