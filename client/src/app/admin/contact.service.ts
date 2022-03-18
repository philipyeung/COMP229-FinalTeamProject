/*
Student IDs: 
  Ho, Minh Trung (301153049)
  Yeung, Kai Hong (301229539)
WebApp name: Survey Site
Description: Contact Service - contact.service.ts
*/

import { Injectable, ElementRef } from '@angular/core';
import * as XLSX from 'xlsx';

const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ContactService {
  constructor() { }

  //Exports a table to Excel
  public exportTableElmToExcel(element: ElementRef, filename: string): void
  {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element.nativeElement);
    //generate workbook and add the worksheet
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, ws, 'Sheet1');

    //save to file
    XLSX.writeFile(workbook, `${filename}${EXCEL_EXTENSION}`);
  }
}
