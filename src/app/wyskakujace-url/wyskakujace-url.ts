import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LinkItem} from '../s/interfaces';

@Component({
  selector: 'app-wyskakujace-url',
  imports: [],
  templateUrl: './wyskakujace-url.html',
  styleUrl: './wyskakujace-url.scss',
})
export class WyskakujaceUrl {
  @Input({ required: true }) linki: LinkItem[] = [];
  @Output() zamknij = new EventEmitter<void>();

  onClose() {
    this.zamknij.emit();
  }
}
