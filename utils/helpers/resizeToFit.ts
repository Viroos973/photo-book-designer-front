export const resizeToFit = (originalWidth: number, originalHeight: number, maxSize: number = 100) => {
    const widthRatio = maxSize / originalWidth;
    const heightRatio = maxSize / originalHeight;

    const scale = Math.min(widthRatio, heightRatio);

    const newWidth = originalWidth * scale;
    const newHeight = originalHeight * scale;

    return { width: newWidth, height: newHeight, scale };
}