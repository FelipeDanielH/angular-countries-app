import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';


@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>()
  private debouncerSubscription?: Subscription;


  @Input()
  public placeholder: string = ''

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter<string>()

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter<string>()

  emitValue( newTag:string ):void{
    this.onValue.emit(newTag)
  }

  onKeyPress( searchTerm: string) {
    this.debouncer.next( searchTerm )
  }

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
    .pipe(
      debounceTime(500)
    )
    .subscribe( value => {
      this.onDebounce.emit(value)
    })
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }
}
