import { MatPaginatorIntl } from '@angular/material';

// /https://stackoverflow.com/questions/46869616/how-to-use-matpaginatorintl

export class MatPaginatorIntlEn extends MatPaginatorIntl {

  itemsPerPageLabel = 'Items';
  firstPageLabel = 'Move to the First Page';
  lastPageLabel = 'Go to the Last Page';
  nextPageLabel = 'Next Page';
  previousPageLabel = 'Prev Page';

  getRangeLabel = (page: number, pageSize: number, length: number): string => {

    if (length === 0 || pageSize === 0) { return `0 of ${length}`; }

     length = Math.max(length, 0);

     const startIndex = page * pageSize;

     const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;

     return `${startIndex + 1} – ${endIndex} of ${length}`;

  }

}
