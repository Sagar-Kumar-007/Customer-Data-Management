import { Component, Input, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { NgConfirmService } from 'ng-confirm-box';
import { NgToastService } from 'ng-angular-popup';
import { MatDialog } from '@angular/material/dialog';
import { CreateCustomerComponent } from '../create-customer/create-customer.component';
import { ICustomer } from 'src/app/datatypes/customer';
import { MapComponent } from '../map/map.component';
import { LogsService } from 'src/app/services/logs.service';
import { Ilog } from 'src/app/datatypes/log';
import { DatePipe } from '@angular/common';
import { IPaginatedResults } from 'src/app/datatypes/paginatedResults';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css'],
})
export class CustomerDashboardComponent implements OnInit {
  customersList: ICustomer[] | undefined;
  logInfo: Ilog = {};

  p: number = 1;
  itemsPerPage: number = 4;
  totalItems: number = this.itemsPerPage;
  searchEventSubscription: Subscription | undefined;
  customerListEventSubscription: Subscription | undefined;

  constructor(
    public datepipe: DatePipe,
    private _logService: LogsService,
    private _userService: UserService,
    private dialog: MatDialog,
    private _customerService: CustomerService,
    private _confirmService: NgConfirmService,
    private _toastService: NgToastService,
    private _dashboardService: DashboardService
  ) {
    this.searchEventSubscription = _dashboardService
      .getSearchEvent()
      .subscribe((data: HTMLInputElement) => {
        this.searchVal(data.value);
      });
    this.customerListEventSubscription = _dashboardService
      .getAddCustomerEvent()
      .subscribe((data) => {
        this.showCustomerList();
      });
  }

  ngOnInit(): void {
    this.showCustomerList();
  }

  showCustomerList() {
    this._customerService
      ?.getAllCustomersPaginated(
        (this.p - 1) * this.itemsPerPage,
        this.p,
        this.itemsPerPage
      )
      .subscribe((result: IPaginatedResults<ICustomer>) => {
        
        this.customersList = result.Items;
        this.totalItems = result.TotalCount;
      });
  }

  //Toggle
  onToggleClick() {
    let navigation = document.querySelector('.navigation') as HTMLDivElement;
    let main = document.querySelector('.main') as HTMLDivElement;
    let toggle = document.querySelector('.fa-bars') as HTMLIFrameElement;
    navigation.classList.toggle('active');
    main.classList.toggle('active');
    toggle.classList.add('fa-flip');
    setTimeout(() => {
      toggle.classList.remove('fa-flip');
    }, 500);
  }

  //Edit a customer..
  updateCustomer(email?: string | null) {
    let dialogRef = this.dialog.open(CreateCustomerComponent, {
      data: {
        status: 'updateCustomer',
        customerId: email,
      },
      maxHeight: 'calc(100vh - 120px)',
      backdropClass: 'backgroundblur',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.showCustomerList();
    });
  }

  // Delete a Customer

  deleteCustomer(id?: string | null, cname?: string | null) {
    this._confirmService.showConfirm(
      `Are you sure want to delete ${cname}?`,

      () => {
        if (id) {
          this._customerService.deleteCustomer(id).subscribe(
            (res) => {
              console.log('res: ' + res);
              this.showCustomerList();

              this.logInfo.UserId = this._userService.user?.email;
              this.logInfo.Operation = 'deleted';
              this.logInfo.Message = `${cname} has been deleted.`;
              this.logInfo.TimeStamp = `${this.datepipe.transform(
                new Date(),
                'MM/dd/yyyy h:mm:ss'
              )}`;

              this._logService.postLogs(this.logInfo).subscribe((result) => {
                console.log(result);
              });

              this._toastService.success({
                detail: 'SUCCESS',
                summary: 'Customer Deleted Successfully',
                duration: 3000,
              });
            },
            (err) => {
              this._toastService.error({
                detail: 'CANNOT DELETE',
                summary: 'Account Already Exist',
                duration: 3000,
              });
            }
          );
        }
      },
      () => {}
    );
  }

  mapCall(cname?: string | null, id?: string | null) {
    this.dialog.open(MapComponent, {
      data: {
        customerName: cname,
        customerId: id,
      },
      height: 'calc(100vh-60px)',
      width: '60%',
      backdropClass: 'backgroundblur',
    });
  }

  // Search bar implementation
  searchVal(data: string | undefined) {
    if (!data) {
      this.showCustomerList();
    }
    if (data)
      this._customerService.searchCustomers(data).subscribe((result) => {
        if (result) this.customersList = result;
      });
  }

  onPageChange(event: number) {
    
    this.p = event;
    this.showCustomerList();
  }

  resetPassword() {}

  logout() {}
}
