import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { IAccount } from 'src/app/datatypes/account';
import { AccountsService } from 'src/app/services/accounts.service';
import { MatDialog } from '@angular/material/dialog';
import { AddAccountFormComponent } from '../add-account-form/add-account-form.component';
import { ActivatedRoute } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';
import { ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { NgToastService } from 'ng-angular-popup';
import { LogsService } from 'src/app/services/logs.service';
import { Ilog } from 'src/app/datatypes/log';
import { DatePipe } from '@angular/common';
import { IPaginatedResults } from 'src/app/datatypes/paginatedResults';
import { Subscription } from 'rxjs';
import { DashboardService } from 'src/app/services/dashboard.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-accounts-dashboard',
  templateUrl: './accounts-dashboard.component.html',
  styleUrls: ['./accounts-dashboard.component.css'],
})
export class AccountsDashboardComponent implements OnInit {
  p: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = this.itemsPerPage;
  customerId: string = '1';
  accountsList: IAccount[] | undefined;
  totalRevenue: number | string = 0;
  totalAccounts: number = 0;
  logInfo: Ilog = {};
  @Output() newEventEmitter = new EventEmitter<boolean>();
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;
  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };
  pieChartLabels: string[] = [];
  pieChartDatasets: { data: number[] }[] = [
    {
      data: [],
    },
  ];
  searchResponse:string | undefined;
  pieChartLegend = false;
  pieChartPlugins = [];
  searchEventSubscription: Subscription | undefined;
  accountListEventSubscription: Subscription | undefined;

  constructor(
    private _userService: UserService,
    public datepipe: DatePipe,
    private _logService: LogsService,
    private _confirmService: NgConfirmService,
    private _accountsService: AccountsService,
    private dialog: MatDialog,
    private _route: ActivatedRoute,
    private _ngtoastService: NgToastService,
    private _dashboardService: DashboardService
  ) {
    this.searchEventSubscription = _dashboardService
      .getSearchEvent()
      .subscribe((data: HTMLInputElement) => {
        if(_dashboardService.dashboard==='Accounts'){
          this.searchVal(data.value,this.customerId);
          this.searchResponse=data.value;
        }
      });
    this.accountListEventSubscription = _dashboardService
      .getAddAccountEvent()
      .subscribe((data) => {
        this.showAccountsList();
      });
  }
  showAccountsList() {
    this.totalRevenue = 0;
    this.totalAccounts = 0;
    this.pieChartOptions = {
      responsive: false,
    };
    this.pieChartDatasets[0].data = [];
    this.pieChartLabels = [];
    this.pieChartLegend = false;
    this.pieChartPlugins = [];
    this._accountsService
      .accountsList(
        this.customerId,
        (this.p - 1) * this.itemsPerPage,
        this.p,
        this.itemsPerPage
      )
      .subscribe((result: IPaginatedResults<IAccount>) => {
        if (result) {
          this.accountsList = result.Items;
          this.totalItems = result.TotalCount;
          this.totalAccounts = result.TotalCount;
          this.accountsList.sort((a, b) => {
            if (a.AccountRevenue && b.AccountRevenue)
              return b.AccountRevenue - a.AccountRevenue;
            return 1;
          });
          let idx = 0;
          let sumOfTopFourAccounts = 0;
          this.accountsList.forEach((element) => {
            if (idx < 4) {
              if (element.AccountName) this.pieChartLabels.push(element.AccountName);
              if (element.AccountRevenue)
                this.pieChartDatasets[0].data.push(element.AccountRevenue);
              if (element.AccountRevenue)
                sumOfTopFourAccounts += element.AccountRevenue;
              else {
                this.pieChartLabels.pop();
              }
              idx++;
            }
            if (element.AccountRevenue && typeof this.totalRevenue == 'number')
              this.totalRevenue += element.AccountRevenue;
            else {
              this.totalRevenue = 'Err';
              return;
            }
          });
          if (
            typeof this.totalRevenue == 'number' &&
            this.totalRevenue - sumOfTopFourAccounts > 0
          )
            this.pieChartLabels.push('Others');
          if (
            typeof this.totalRevenue == 'number' &&
            this.totalRevenue - sumOfTopFourAccounts > 0
          )
            this.pieChartDatasets[0].data.push(
              this.totalRevenue - sumOfTopFourAccounts
            );
          this.chart.update();
        }
      });
  }
  ngOnInit() {
    this._route.queryParams.subscribe((params) => {
      let id = params['customer'];
      if (id) {
        this.customerId = id;
        let main = document.querySelector('.main') as HTMLDivElement;
        this.showAccountsList();
      }
    });
  }

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

  updateAccount(account: IAccount) {
    let dialogRef = this.dialog.open(AddAccountFormComponent, {
      maxHeight: 'calc(100vh - 120px)',
      backdropClass: 'backgroundblur',
      data: {
        status: 'updateAccount',
        account: account,
        email: this.customerId,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.showAccountsList();
    });
  }

  deleteAccount(account: IAccount, aname?: string | null) {
    this._confirmService.showConfirm(
      `Are you sure want to delete ${aname}?`,
      () => {
        this._accountsService
          .deleteAccount(account, account.AccountEmail?.toString())
          .subscribe((result) => {
            this.showAccountsList();
            this._ngtoastService.success({
              detail: 'SUCCESS',
              summary: 'Account Deleted Successfully',
              duration: 3000,
            });

            this.logInfo.UserId = this._userService.user?.email;
            this.logInfo.Operation = 'deleted';
            if (this.customerId)
              this.logInfo.Message = `${account.AccountName} of customer ${this.customerId} has been deleted.`;
            this.logInfo.TimeStamp = `${this.datepipe.transform(
              new Date(),
              'MM/dd/yyyy h:mm:ss'
            )}`;

            this._logService.postLogs(this.logInfo).subscribe((result) => {
            });
          });
      },
      () => {}
    );
  }

  searchVal(data: string | undefined,customerEmail:string) {
    if (!data) {
      this.showAccountsList();
    }
    if (data)
      this._accountsService.searchAccounts(data,customerEmail).subscribe((result) => {
        if (result) this.accountsList = result;
      });
  }

  onPageChange(event: number) {
    
    this.p = event;
    this.showAccountsList();
  }
}
