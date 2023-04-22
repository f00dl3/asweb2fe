import { Directive, EventEmitter, Input, Output } from "@angular/core";
import { JobSearch2023Record } from "../entities/jobSearch2023Record";

export type SortColumnJobSearch2023Record = keyof JobSearch2023Record | "";
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface SortEventJobSearch2023Record {
    column: SortColumnJobSearch2023Record;
    direction: SortDirection;
}

@Directive({
    selector: 'th[sortablerecord]',
    host: {
        '[class.asc]': 'direction === "asc"',
        '[class.desc]': 'direction === "desc"',
        '(click)': 'rotate()'
    }
})

export class NgbdSortableHeaderRecord {

    @Input() jsr_sortable: SortColumnJobSearch2023Record = '';
    @Input() jsr_direction: SortDirection = '';
    @Output() jsr_sort = new EventEmitter<SortEventJobSearch2023Record>();

    rotate() {
        this.jsr_direction = rotate[this.jsr_direction];
        this.jsr_sort.emit({column: this.jsr_sortable, direction: this.jsr_direction});
    }

}