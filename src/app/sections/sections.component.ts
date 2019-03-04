import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent implements OnInit {

  @Input() sectionsList: any;
  sectionsObject: any;

  constructor() { }

  ngOnInit() {
    this.loadSections();
  }

  loadSections() {
    const sections = _.groupBy(
      _.orderBy(this.sectionsList,
        ['Level_ID', 'Section_Sort_Order'], ['asc', 'asc']),
      b => b.Level_ID);

    // const childSections = _.groupBy(
    //   _.orderBy(
    //     _.filter(this.sectionsList, a => a.Parent_ID !== null),
    //     ['Child_Section_Level', 'Child_Section_Sort_Order'], ['asc', 'asc']),
    //   b => b.Parent_ID);
    // _.forEach(_.keys(parentSections), parentKey => {
    //   parentSections[parentKey].forEach(section => {
    //     section['Child_Sections'] = childSections[section.Section_ID];
    //   });
    // });
    this.sectionsObject = sections;
  }

}
