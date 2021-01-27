import { Component, OnInit } from '@angular/core';
import {IMember} from "../../models/IMember";
import {ColDef, ColumnApi, GridApi} from "ag-grid-community";
import {Router} from "@angular/router";
import {MemberService} from "../../services/member.service";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-memberlist',
  templateUrl: './memberlist.component.html',
  styleUrls: ['./memberlist.component.css']
})
export class MemberlistComponent implements OnInit {

  public members: IMember[];
  public columnDefs: ColDef[];
  // gridApi and columnApi
  private api: GridApi;
  private columnApi: ColumnApi;
  constructor(private userService: MemberService, private router: Router) {
    this.columnDefs = this.createColumnDefs();
  }
  ngOnInit() {
    this.userService.getAllMember().subscribe((data:IMember[]) => {
      this.members = data
      console.log(this.members);
    })
  }
  // one grid initialisation, grap the APIs and auto resize the columns to fit the available space
  onGridReady(params): void {
    this.api = params.api;
    this.columnApi = params.columnApi;
    this.api.sizeColumnsToFit();
  }
  // create column definitions
  private createColumnDefs() {
    return [{
      headerName: 'User Name',
      field: 'name',
      filter: true,
      enableSorting: true,
      editable: true,
      sortable: true
    }, {
      headerName: 'Email Id',
      field: 'email',
      filter: true,
      editable: true,
      sortable: true
    }, {
      headerName: 'Gender',
      field: 'gender',
      filter: true,
      sortable: true,
      editable: true,
      cellRenderer: '<a href="edit-user">{{email}}</a>'
    }, {
      headerName: 'Mobile',
      field: 'phone',
      filter: true,
      editable: true
    },
      {
        field: '',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          clicked: function(field) {
            alert(`${field} was clicked`);
          }}
      }
      ]
  }
  status: any;
  //Update user
  editUser() {
    let row = this.api.getSelectedRows();
    console.log(row[0]._id);
    this.router.navigate([`members/${row[0]._id}`]);

  }
  //Delete user
  deleteUser() {
  debugger;
    let selectedRows = this.api.getSelectedRows();
    if (selectedRows.length == 0) {
      return;
    }
    this.userService.deleteMember(selectedRows[0]._id).subscribe((data:any) => {
      this.ngOnInit();
      this.api.refreshRows(null);
    });
  }
  Add() {
    this.router.navigate(['members/addmember']);
  }
}
