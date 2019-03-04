import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { skipWhile } from 'rxjs/internal/operators/skipWhile';
import * as _ from 'lodash';

@Component({
  selector: 'app-map-section',
  templateUrl: './map-section.component.html',
  styleUrls: ['./map-section.component.css']
})
export class MapSectionComponent implements OnInit {

  @Input() sectionInfo: any;
  sharedData;

  constructor(public _shared: SharedService) { }

  ngOnInit() {
    console.log(this.sectionInfo);
    this._shared.interactiveSectionObservable.pipe(skipWhile(x => !x)).subscribe(
      data => {
        if (data) {
          this.takeAction(data);
        }
      });
  }

  takeAction(data) {
    if (this.sectionInfo.Cascading_Siblings === data) {
      this.sharedData = data;
    }
  }

  interact() {
    this._shared.callInteractiveSection(this.sectionInfo.Section_ID);
  }

}
