import { describe, it, expect } from 'vitest';
import { sanitizeCellValue, generateExcelWorkbook } from '../api/_lib/excel';

describe('Excel Formula Injection Defense (CWE-1236)', () => {
  it('neutralizes dangerous leading characters with a single quote', () => {
    // Formula characters: =, +, -, @, \t, \r
    expect(sanitizeCellValue('=cmd|calc!A0')).toBe("'=cmd|calc!A0");
    expect(sanitizeCellValue('+1+2')).toBe("'+1+2");
    expect(sanitizeCellValue('-5*10')).toBe("'-5*10");
    expect(sanitizeCellValue('@SUM(1,2)')).toBe("'@SUM(1,2)");
    expect(sanitizeCellValue('\t=test')).toBe("'\t=test");
    expect(sanitizeCellValue('\r=calc')).toBe("'\r=calc");
  });

  it('leaves safe alphanumeric strings and symbols untouched', () => {
    expect(sanitizeCellValue('Acme Cyber Defense Corp')).toBe('Acme Cyber Defense Corp');
    expect(sanitizeCellValue('john.doe@example.com')).toBe('john.doe@example.com');
    expect(sanitizeCellValue('+91 95977 75522')).toBe("'+91 95977 75522"); // Leading '+' is sanitized
    expect(sanitizeCellValue('ISO 27001 / DPDP Act')).toBe('ISO 27001 / DPDP Act');
  });

  it('handles null, undefined, numbers, and booleans safely', () => {
    expect(sanitizeCellValue(null)).toBe('');
    expect(sanitizeCellValue(undefined)).toBe('');
    expect(sanitizeCellValue(12345)).toBe(12345);
    expect(sanitizeCellValue(true)).toBe(true);
  });

  it('generates a valid binary XLSX buffer', async () => {
    const columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Client', key: 'client', width: 25 },
      { header: 'Payload', key: 'payload', width: 20 },
    ];
    const rows = [
      { id: '1', client: 'Normal Corp', payload: 'Safe text' },
      { id: '2', client: 'Malicious Inc', payload: '=SUM(A1:B1)' },
    ];

    const buffer = await generateExcelWorkbook({
      sheetName: 'Test Export',
      columns,
      rows,
    });
    expect(buffer).toBeDefined();
    expect(buffer.length).toBeGreaterThan(100);
    // XLSX magic bytes: PK\x03\x04 (0x50, 0x4b, 0x03, 0x04)
    expect(buffer[0]).toBe(0x50);
    expect(buffer[1]).toBe(0x4b);
  });
});
