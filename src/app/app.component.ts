import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AgGridAngular} from 'ag-grid-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  @ViewChild('agGrid')
  agGrid?: AgGridAngular;

  title = 'my-app';
  rowData: any;


  columnDefs = [
    { field: 'freLoanId' , checkboxSelection: true,  headerCheckboxSelection: true},
    { field: 'loanAmt' },
    { field: 'interestRate'},
    {field: 'loanInterestRateStructureType'},
    {field: 'loanSecuritizationEligibilityInd'}
  ];

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.http.get('assets/loan-pipeline.json').subscribe(
      (res:any ) => {
        // console.log(res[0].deals[0].scenarios[0].loans);
        this.rowData = res[0].deals[0].scenarios[0].loans;

        // 0/deals/0/scenarios/0/loans
      }
    );
  }

  getSelectedRows() {
    if(this.agGrid) {
      const selectedNodes = this.agGrid.api.getSelectedNodes();
      const selectedData = selectedNodes.map(node => node.data);
      const selectedDataStringPresentation = selectedData.map(node => node.freLoanId + ' ' + node.loanAmt).join(', ');

      console.log(selectedNodes, selectedData );
      alert(`Selected nodes: ${selectedDataStringPresentation}`);
    }
  }

  // rowData = [
  //   { make: 'Toyota', model: 'Celica', price: 35000 },
  //   { make: 'Ford', model: 'Mondeo', price: 32000 },
  //   { make: 'Porsche', model: 'Boxter', price: 72000 }
  // ];
}
