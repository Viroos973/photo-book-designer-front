const DPI = 300;

export const cmToPx = (cm: number): number => {
    return Math.round((cm / 2.54) * DPI);
};

export const pxToCm = (px: number): number => {
    return Math.round((px / DPI) * 2.54);
};