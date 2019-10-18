import { IMatrix2D } from './IMatrix2D';

//  A Matrix2D contains six elements in a short-form of the 3x3 Matrix, with the last column ignored.

export class Matrix2D
{
    a: number;
    b: number;
    c: number;
    d: number;
    tx: number;
    ty: number;

    constructor (a: number = 1, b: number = 0, c: number = 0, d: number = 1, tx: number = 0, ty: number = 0)
    {
        this.fromValues(a, b, c, d, tx, ty);
    }

    fromValues (a: number = 1, b: number = 0, c: number = 0, d: number = 1, tx: number = 0, ty: number = 0): Matrix2D
    {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.tx = tx;
        this.ty = ty;

        return this;
    }

    clone (): Matrix2D
    {
        return new Matrix2D(this.a, this.b, this.c, this.d, this.tx, this.ty);
    }

    copy (source: IMatrix2D): Matrix2D
    {
        return this.fromValues(source.a, source.b, source.c, source.d, source.tx, source.ty);
    }

    identity (): Matrix2D
    {
        return this.fromValues();
    }

    add (src: IMatrix2D): Matrix2D
    {
        const b0 = src.a;
        const b1 = src.b;
        const b2 = src.c;
        const b3 = src.d;
        const b4 = src.tx;
        const b5 = src.ty;

        this.a += b0;
        this.b += b1;
        this.c += b2;
        this.d += b3;
        this.tx += b4;
        this.ty += b5;
      
        return this;
    }

    subtract (src: IMatrix2D): Matrix2D
    {
        const b0 = src.a;
        const b1 = src.b;
        const b2 = src.c;
        const b3 = src.d;
        const b4 = src.tx;
        const b5 = src.ty;

        this.a -= b0;
        this.b -= b1;
        this.c -= b2;
        this.d -= b3;
        this.tx -= b4;
        this.ty -= b5;
      
        return this;
    }

    sub (src: IMatrix2D): Matrix2D
    {
        return this.subtract(src);
    }

    multiply (src: IMatrix2D): Matrix2D
    {
        const a0 = this.a;
        const a1 = this.b;
        const a2 = this.c;
        const a3 = this.d;
        const a4 = this.tx;
        const a5 = this.ty;

        const b0 = src.a;
        const b1 = src.b;
        const b2 = src.c;
        const b3 = src.d;
        const b4 = src.tx;
        const b5 = src.ty;

        this.a = a0 * b0 + a2 * b1;
        this.b = a1 * b0 + a3 * b1;
        this.c = a0 * b2 + a2 * b3;
        this.d = a1 * b2 + a3 * b3;
        this.tx = a0 * b4 + a2 * b5 + a4;
        this.ty = a1 * b4 + a3 * b5 + a5;
      
        return this;
    }

    mul (src: IMatrix2D): Matrix2D
    {
        return this.multiply(src);
    }

    multiplyScalar (scale: number): Matrix2D
    {
        this.a *= scale;
        this.b *= scale;
        this.c *= scale;
        this.d *= scale;
        this.tx *= scale;
        this.ty *= scale;
      
        return this;
    }

    multiplyScalarAndAdd (src: IMatrix2D, scale: number): Matrix2D
    {
        const b0 = src.a;
        const b1 = src.b;
        const b2 = src.c;
        const b3 = src.d;
        const b4 = src.tx;
        const b5 = src.ty;

        this.a += (b0 * scale);
        this.b += (b1 * scale);
        this.c += (b2 * scale);
        this.d += (b3 * scale);
        this.tx += (b4 * scale);
        this.ty += (b5 * scale);
      
        return this;
    }

    rotate (angle: number): Matrix2D
    {
        const a0 = this.a;
        const a1 = this.b;
        const a2 = this.c;
        const a3 = this.d;

        const s = Math.sin(angle);
        const c = Math.cos(angle);

        this.a = a0 * c + a2 * s;
        this.b = a1 * c + a3 * s;
        this.c = a0 * -s + a2 * c;
        this.d = a1 * -s + a3 * c;

        return this;
    }

    scale (scaleX: number, scaleY: number = scaleX): Matrix2D
    {
        const a0 = this.a;
        const a1 = this.b;
        const a2 = this.c;
        const a3 = this.d;

        this.a = a0 * scaleX;
        this.b = a1 * scaleX;
        this.c = a2 * scaleY;
        this.d = a3 * scaleY;
      
        return this;
    }

    translate (x: number, y: number): Matrix2D
    {
        const a0 = this.a;
        const a1 = this.b;
        const a2 = this.c;
        const a3 = this.d;
        const a4 = this.tx;
        const a5 = this.ty;

        this.tx = a0 * x + a2 * y + a4;
        this.ty = a1 * x + a3 * y + a5;
            
        return this;
    }

    exactEquals (src: IMatrix2D): boolean
    {
        return (
            this.a === src.a &&
            this.b === src.b &&
            this.c === src.c &&
            this.d === src.d &&
            this.tx === src.tx &&
            this.ty === src.ty
        );
    }

    equals (src: IMatrix2D, epsilon: number = 0.000001): boolean
    {
        const a0 = this.a;
        const a1 = this.b;
        const a2 = this.c;
        const a3 = this.d;
        const a4 = this.tx;
        const a5 = this.ty;
    
        const b0 = src.a;
        const b1 = src.b;
        const b2 = src.c;
        const b3 = src.d;
        const b4 = src.tx;
        const b5 = src.ty;
    
        return (Math.abs(a0 - b0) <= epsilon * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
                Math.abs(a1 - b1) <= epsilon * Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
                Math.abs(a2 - b2) <= epsilon * Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
                Math.abs(a3 - b3) <= epsilon * Math.max(1.0, Math.abs(a3), Math.abs(b3)) &&
                Math.abs(a4 - b4) <= epsilon * Math.max(1.0, Math.abs(a4), Math.abs(b4)) &&
                Math.abs(a5 - b5) <= epsilon * Math.max(1.0, Math.abs(a5), Math.abs(b5))
        );
    }

    determinant (): number
    {
        return (this.a * this.d - this.b * this.c);
    }

    frob (): number
    {
        return(Math.hypot(this.a, this.b, this.c, this.d, this.tx, this.ty, 1));
    }

    invert (): Matrix2D | null
    {
        const a = this.a;
        const b = this.b;
        const c = this.c;
        const d = this.d;
        const tx = this.tx;
        const ty = this.ty;

        let det = a * d - b * c;

        if (!det)
        {
            return null;
        }

        det = 1 / det;
      
        this.a = d * det;
        this.b = -b * det;
        this.c = -c * det;
        this.d = a * det;
        this.tx = (c * ty - d * tx) * det;
        this.ty = (b * tx - a * ty) * det;

        return this;
    }
}