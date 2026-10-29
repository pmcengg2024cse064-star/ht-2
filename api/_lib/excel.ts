import ExcelJS from 'exceljs';

/**
 * Sanitizes a cell value to prevent CSV/Excel Formula Injection (CWE-1236).
 * If a string begins with dangerous characters (=, +, -, @, tab, carriage return),
 * it is prefixed with a single quote (') so spreadsheet applications treat it strictly as text.
 */
export function sanitizeCellValue(val: any): any {
  if (val === null || val === undefined) {
    return '';
  }
  if (typeof val === 'string') {
    const trimmed = val.trimStart();
    if (
      trimmed.startsWith('=') ||
      trimmed.startsWith('+') ||
      trimmed.startsWith('-') ||
      trimmed.startsWith('@') ||
      trimmed.startsWith('\t') ||
      trimmed.startsWith('\r')
    ) {
      return `'${val}`;
    }
    return val;
  }
  if (typeof val === 'object') {
    return JSON.stringify(val);
  }
  return val;
}

export interface ColumnDefinition {
  header: string;
  key: string;
  width?: number;
}

/**
 * Generates an Excel workbook Buffer from a list of records.
 */
export async function generateExcelWorkbook<T extends Record<string, any>>({
  sheetName,
  columns,
  rows,
}: {
  sheetName: string;
  columns: ColumnDefinition[];
  rows: T[];
}): Promise<Buffer> {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Hackup Technology Admin Portal';
  workbook.created = new Date();

  const worksheet = workbook.addWorksheet(sheetName, {
    views: [{ state: 'frozen', ySplit: 1 }],
  });

  // Setup headers with styled aesthetics
  worksheet.columns = columns.map((col) => ({
    header: col.header,
    key: col.key,
    width: col.width || 20,
  }));

  const headerRow = worksheet.getRow(1);
  headerRow.font = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
  headerRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF881337' }, // Hackup Burgundy
  };
  headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
  headerRow.height = 24;

  // Add sanitized data rows
  for (const rowData of rows) {
    const sanitizedRow: Record<string, any> = {};
    for (const col of columns) {
      sanitizedRow[col.key] = sanitizeCellValue(rowData[col.key]);
    }
    worksheet.addRow(sanitizedRow);
  }

  // Format alternating rows and borders
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber > 1) {
      row.font = { name: 'Calibri', size: 10 };
      row.alignment = { vertical: 'middle', horizontal: 'left' };
      if (rowNumber % 2 === 0) {
        row.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFF8FAFC' },
        };
      }
    }
  });

  const buffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(buffer);
}
