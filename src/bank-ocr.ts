import { promises as fs } from 'fs';

export async function parseAccountFile(fileName: string) {
  const data = (await fs.readFile(fileName)).toString();

  return (data.match(/(([^\n]*\n){3})/gm) ?? [])
    .map(l => l.split('\n'))
    .map(parseAccountNumbers)
    .join('\n');
}

export function parseAccountNumbers(lines: string[]) {
  return parseLCDLine(lines).map(parseNumber).join('');
}

export function parseLCDLine([line1, line2, line3]: string[]) {
  const lcdNumbers = [];
  for (let i = 0; i < line1.length; i += 4) {
    lcdNumbers.push(line1.substr(i, 3) +
      line2.substr(i, 3) +
      line3.substr(i, 3));
  }

  return lcdNumbers;
}

const lcdNumbers = [
  ' _ | ||_|',
  '     |  |',
  ' _  _||_ ',
  ' _  _| _|',
  '   |_|  |',
  ' _ |_  _|',
  ' _ |_ |_|',
  ' _   |  |',
  ' _ |_||_|',
  ' _ |_| _|',
];

export function parseNumber(inputLcdNumber: string) {
  return lcdNumbers
    .findIndex(lcdNumber => lcdNumber === inputLcdNumber)
    .toString();
}
