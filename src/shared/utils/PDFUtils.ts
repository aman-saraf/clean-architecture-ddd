import { existsSync, mkdirSync, writeFileSync } from 'fs';
import Pdfmake from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

export class PDFUtils {

  private static fontsPath = `${__dirname}/../../../node_modules`

  private static fonts = {
    Lato: {
      normal: `${this.fontsPath}/lato-font/fonts/lato-normal/lato-normal.woff`,
      bold: `${this.fontsPath}/lato-font/fonts/lato-bold/lato-bold.woff`,
    }
  };

  public static generatePDF(docDefinition: TDocumentDefinitions): Promise<Buffer> {

    const printer = new Pdfmake(this.fonts);

    const chunks: Uint8Array[] = [];
    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    return new Promise((resolve, reject) => {
      pdfDoc.on('data', chunk => {
        chunks.push(chunk);
      });
      pdfDoc.on('end', () => {
        resolve(Buffer.concat(chunks));
      });
      pdfDoc.on('error', error => {
        reject(error);
      });
      pdfDoc.end();
    });
  }

  static savePDF(pdfBuffer: Buffer, path: string, filename: string) {
    if (!existsSync(path)) {
      mkdirSync(path);
    }
    writeFileSync(`${path}/${filename}.pdf`, pdfBuffer);
  }

}