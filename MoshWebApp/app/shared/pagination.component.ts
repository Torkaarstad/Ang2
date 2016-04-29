import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {OnChanges} from 'angular2/core';

@Component({
    selector: 'pagination',
    template: `
    <nav *ngIf="items.length > pageSize">
        <ul class="pagination">
            <li [class.disabled]="currentPage == 1">
                <a (click)="previous()" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li [class.active]="currentPage == page" *ngFor="#page of pages" (click)="changePage(page)">
                <a>{{ page }}</a>
            </li>
            <li [class.disabled]="currentPage == pages.length">
                <a (click)="next()" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>  
    `
})
export class PaginationComponent implements OnChanges{
    @Input() items=[];
    @Input() pageSize = 10;
    @Output() pageChanged = new EventEmitter();

    pages: any[];
    currentPage;
    _enablePagination = true;

    ngOnChanges() {
        this.currentPage = 1;

        var pagesCount = this.items.length / this.pageSize;
        this.pages = [];
        for (var i = 1; i <= pagesCount; i++) {
            this.pages.push(i);
        }

        if (pagesCount > 1)
            this._enablePagination = true;
        else
            this._enablePagination = false;
    }

    private changePage(page) {
        this.currentPage = page;
        this.pageChanged.emit(page);
    }

    private previous() {
        if (this.currentPage == 1)
            return;
        this.currentPage--;
        this.pageChanged.emit(this.currentPage);
    }

    private next() {
        if (this.currentPage >= this.pages.length)
            return;
        this.currentPage++;
        this.pageChanged.emit(this.currentPage);
    }
}