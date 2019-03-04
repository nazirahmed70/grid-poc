import { Component, OnInit, AfterViewChecked } from '@angular/core';
import Chart from 'chart.js';
import * as _ from 'lodash';
import 'ag-grid-enterprise';

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit, AfterViewChecked {
  title = 'charts-app';
  chart = [];
  fxLayout = 'column';
  fxLayoutAlign = 'space-between left';
  sectionsObject: any;

  gridLoaded = false;
  private gridApi;
  private gridColumnApi;

  private columnDefs;
  private groupDefaultExpanded;
  private autoGroupColumnDef;
  private defaultColDef;
  private rowData;
  private rowSelection;

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  games = [
    'Chess',
    'Cross and Circle',
    'Daldøs',
    'Downfall',
    'DVONN',
    'Fanorona',
    'Game of the Generals',
    'Ghosts',
    'Abalone',
    'Agon',
    'Backgammon',
    'Battleship',
    'Blockade',
    'Blood Bowl',
    'Bul',
    'Camelot',
    'Checkers',
    'Go',
    'Gipf',
    'Guess Who?',
    'Hare and Hounds',
    'Hex',
    'Hijara',
    'Isola',
    'Janggi (Korean Chess)',
    'Le Jeu de la Guerre',
    'Patolli',
    'Plateau',
    'PÜNCT',
    'Rithmomachy',
    'Sáhkku',
    'Senet',
    'Shogi',
    'Space Hulk',
    'Stratego',
    'Sugoroku',
    'Tâb',
    'Tablut',
    'Tantrix',
    'Wari',
    'Xiangqi (Chinese chess)',
    'YINSH',
    'ZÈRTZ',
    'Kalah',
    'Kamisado',
    'Liu po',
    'Lost Cities',
    'Mad Gab',
    'Master Mind',
    'Nine Men',
    'Obsession',
    'Othello'
  ];


  sectionsList = [
    {
      'Section_ID': 1,
      'Report_ID': 4,
      'Parent_ID': null,
      'Level_Height': 100,
      'Section_Width': 50,
      'Parent_Child_Interact': null,
      'Interactive_Siblings': 6,
      'Cascading_Siblings': null,
      'Section_Sort_Order': 1,
      'Section_Type': 'Grid',
      'Level_ID': 1,
      'bgColor': '#516bf0'
    },
    {
      'Section_ID': 2,
      'Report_ID': 4,
      'Parent_ID': null,
      'Level_Height': 100,
      'Section_Width': 50,
      'Parent_Child_Interact': null,
      'Interactive_Siblings': null,
      'Cascading_Siblings': null,
      'Section_Sort_Order': 2,
      'Section_Type': 'Section',
      'Level_ID': 1,
      'Child_Sections': [
        {
          'Section_ID': 3,
          'Report_ID': 4,
          'Parent_ID': 2,
          'Level_Height': 60,
          'Section_Width': 50,
          'Parent_Child_Interact': null,
          'Interactive_Siblings': 4,
          'Cascading_Siblings': null,
          'Section_Sort_Order': 1,
          'Section_Type': 'Chart',
          'Level_ID': 1,
          'bgColor': '#929eaa'
        },
        {
          'Section_ID': 4,
          'Report_ID': 4,
          'Parent_ID': 2,
          'Level_Height': 60,
          'Section_Width': 50,
          'Parent_Child_Interact': null,
          'Interactive_Siblings': null,
          'Cascading_Siblings': 3,
          'Section_Sort_Order': 2,
          'Section_Type': 'Chart',
          'Level_ID': 1,
          'bgColor': '#566b8c'
        },
        {
          'Section_ID': 5,
          'Report_ID': 4,
          'Parent_ID': 2,
          'Level_Height': 40,
          'Section_Width': 100,
          'Parent_Child_Interact': null,
          'Interactive_Siblings': null,
          'Cascading_Siblings': null,
          'Section_Sort_Order': 3,
          'Section_Type': 'Grid',
          'Level_ID': 2,
          'bgColor': '#fe5c5e'
        }
      ],
      'bgColor': '#fe5c5e'
    },
    {
      'Section_ID': 6,
      'Report_ID': 4,
      'Parent_ID': null,
      'Level_Height': 100,
      'Section_Width': 100,
      'Parent_Child_Interact': null,
      'Interactive_Siblings': null,
      'Cascading_Siblings': 1,
      'Section_Sort_Order': 1,
      'Section_Type': 'Chart',
      'Level_ID': 2,
      'bgColor': '#512cf9'
    }
  ];

  constructor() {
    this.columnDefs = [
      {
        field: 'name',
        headerName: 'Name',
        rowGroup: true,
        hide: true
      },
      {
        field: 'age',
        headerName: 'Age',
        rowGroup: false,
      },
      {
        field: 'gender',
        headerName: 'Gender',
        rowGroup: false,
      },
      {
        headerName: 'Game Name',
        field: 'game.name',
        width: 267,
        editable: true,
        filter: 'agSetColumnFilter',
        tooltipField: 'gameName',
        checkboxSelection: function(params) {
          return params.columnApi.getRowGroupColumns().length === 0;
        },
        cellClass: function() {
          return 'alphabet';
        }
      },
      {
        headerName: 'Country',
        field: 'country',
        width: 200,
        editable: true,
        cellEditor: 'agRichSelectCellEditor',
        cellEditorParams: {
          values: [
            'Argentina',
            'Brazil',
            'Colombia',
            'France',
            'Germany',
            'Greece',
            'Iceland',
            'Ireland',
            'Italy',
            'Malta',
            'Portugal',
            'Norway',
            'Peru',
            'Spain',
            'Sweden',
            'United Kingdom',
            'Uruguay',
            'Venezuela'
          ]
        },
        floatCell: true,
        filterParams: {
          cellHeight: 20,
          newRowsAction: 'keep'
        }
      },
      {
        headerName: 'Language',
        field: 'language',
        width: 200,
        editable: true,
        filter: 'agSetColumnFilter',
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: ['English', 'Spanish', 'French', 'Portuguese', '(other)']
        }
      }
    ];
    this.groupDefaultExpanded = -1;
    this.autoGroupColumnDef = {
      headerName: 'Name',
      field: 'name',
      width: 250,
      editable: true,
      cellRendererParams: { checkbox: true }
    };
    this.defaultColDef = {
      checkboxSelection: function(params) {
        const isGrouping = params.columnApi.getRowGroupColumns().length > 0;
        return params.colIndex === 0 && !isGrouping;
      }
    };
    this.rowData = this.createData();
    this.rowSelection = 'multiple';
  }

  ngOnInit() {
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  loadGrid() {
    this.gridLoaded = true;
  }

  countries() {
    const countries = [
      {
        country: 'Ireland',
        continent: 'Europe',
        language: 'English'
      },
      {
        country: 'Spain',
        continent: 'Europe',
        language: 'Spanish'
      },
      {
        country: 'United Kingdom',
        continent: 'Europe',
        language: 'English'
      },
      {
        country: 'France',
        continent: 'Europe',
        language: 'French'
      },
      {
        country: 'Germany',
        continent: 'Europe',
        language: '(other)'
      },
      {
        country: 'Sweden',
        continent: 'Europe',
        language: '(other)'
      },
      {
        country: 'Norway',
        continent: 'Europe',
        language: '(other)'
      },
      {
        country: 'Italy',
        continent: 'Europe',
        language: '(other)'
      },
      {
        country: 'Greece',
        continent: 'Europe',
        language: '(other)'
      },
      {
        country: 'Iceland',
        continent: 'Europe',
        language: '(other)'
      },
      {
        country: 'Portugal',
        continent: 'Europe',
        language: 'Portuguese'
      },
      {
        country: 'Malta',
        continent: 'Europe',
        language: '(other)'
      },
      {
        country: 'Brazil',
        continent: 'South America',
        language: 'Portuguese'
      },
      {
        country: 'Argentina',
        continent: 'South America',
        language: 'Spanish'
      },
      {
        country: 'Colombia',
        continent: 'South America',
        language: 'Spanish'
      },
      {
        country: 'Peru',
        continent: 'South America',
        language: 'Spanish'
      },
      {
        country: 'Venezuela',
        continent: 'South America',
        language: 'Spanish'
      },
      {
        country: 'Uruguay',
        continent: 'South America',
        language: 'Spanish'
      }
    ];
    return countries;
  }
    createData() {
    const rowCount = 20;
    let row = 0;
    const data = [];
    for (let i = 0; i < rowCount; i++) {
      const rowItem = this.createRowItem(row);
      data.push(rowItem);
      row++;
    }
    return data;
  }
  createRowItem(row) {
    const firstNames = ['Sophie', 'Isabelle', 'Emily', 'Olivia'];
    const lastNames = ['Beckham', 'Black', 'Braxton', 'Brennan'];
    const rowItem: any = {};
    rowItem.age = 20;
    rowItem.gender = 'M';
    const countryData = this.countries()[row % this.countries().length];
    rowItem.country = countryData.country;
    rowItem.language = countryData.language;
    const firstName = firstNames[row % firstNames.length];
    const lastName = lastNames[row % lastNames.length];
    rowItem.name = firstName + ' ' + lastName;
    rowItem.game = { name: this.games[Math.floor(((row * 13) / 17) * 19) % this.games.length] };
    rowItem.gameName = 'toolTip: ' + rowItem.game.name.toUpperCase();
    return rowItem;
  }


  loadGraph() {
    this.chart = new Chart('canvas', {
      type: 'bar',
      options: {
        scales: {
          xAxes: [{ stacked: true }],
          yAxes: [{ stacked: true }]
        }
      },
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: '2015',
            data: [10, 8, 6, 5, 12, 8, 16, 17, 6, 7, 6, 10]
          },
          {
            label: '2018',
            data: [16, 17, 6, 7, 6, 10, 10, 8, 6, 5, 12, 8],
          }
        ]
      }
    });
  }

  ngAfterViewChecked() {

  }

}
