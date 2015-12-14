interface IContext2d
{
    //2D Context
    save(): void
    restore(): void
    
    //Transformations
    scale(x: number, y: number): void
    rotate(angle: number): void
    translate(x: number, y: number): void
    transform(m11: number, m12: number, m21: number, m22: number, dx: number, dy: number): void
    setTransform(m11: number, m12: number, m21: number, m22: number, dx: number, dy: number): void
    
    //Image drawing
    drawImage(image: any, dx: number, dy: number, dw?: number, dh?: number): void
    drawImage(image: any, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number): void
    
    //Compositing
    globalAlpha: number;
    globalCompositeOperation: string;
    
    //Line styles
    lineWidth: number;
    lineCap: string;
    lineJoin: string;
    
    //Colors, styles and shadows
    strokeStyle: string;
    fillStyle: string;
    shadowOffsetX: number;
    shadowOffsetY: number;
    shadowBlur: number;
    shadowColor: string;
    
    createLinearGradient(x0: number, y0: number, x1: number, y1: number): ICanvasGradient
    createRadialGradient(x0: number, y0: number, r0: number, x1: number, y1: number, r1: number): ICanvasGradient
    createPattern(image: any, repetition: string): ICanvasPattern
    
    //Paths
    beginPath(): void
    closePath(): void
    fill(): void
    stroke(): void
    clip(): void
    moveTo(x: number, y: number): void
    lineTo(x: number, y: number): void
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void
    bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void
    arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void
    arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise: boolean): void
    rect(x: number, y: number, w: number, h: number): void
    isPointInPath(x: number, y: number): boolean

    //Text
    font: string;
    textAlign: string;
    textBaseline: string;
    
    fillText(text: string, x: number, y: number, maxWidth?: number): void
    strokeText(text: string, x: number, y: number, maxWidth?: number): void
    measureText(text: string):ITextMetrics
    
    //Rectangles
    clearRect(x: number, y: number, width: number, height: number): void
    fillRect(x: number, y: number, width: number, height: number): void
    strokeRect(x: number, y: number, width: number, height: number): void

    //Pixel manipulation
    createImageData( sw: number, sh: number): IImageData
    createImageData(imagedata: IImageData): IImageData
    getImageData(sx: number, sy: number, sw: number, sh: number): IImageData
    putImageData(imagedata: IImageData, dx: number, dy: number, dirtyX?: number, dirtyY?: number, dirtyWidth?: number, dirtyHeight?: number): void

}