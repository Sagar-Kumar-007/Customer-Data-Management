import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountsService } from 'src/app/services/accounts.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IAccount } from 'src/app/datatypes/account';
import { ICoordinate } from 'src/app/datatypes/Coordinates';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { GoogleMapComponent } from '../../../google-map/google-map.component';
import { MatDialog } from '@angular/material/dialog';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { LogsService } from 'src/app/services/logs.service';
import { Ilog } from 'src/app/datatypes/log';
import { DatePipe } from '@angular/common';
import { DashboardService } from 'src/app/services/dashboard.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-account-form',
  templateUrl: './add-account-form.component.html',
  styleUrls: ['./add-account-form.component.css'],
})
export class AddAccountFormComponent {
  coordinates: ICoordinate;
  address!: string;
  logInfo: Ilog = {};
  active:boolean=false;
  isUpdate: boolean=false;

  constructor(
    private _userService: UserService,
    public datepipe: DatePipe,
    private _logService: LogsService,
    private dialog: MatDialog,
    private _toastService: NgToastService,
    private _accountsService: AccountsService,
    private matDialogRef: MatDialogRef<AddAccountFormComponent>,
    private _dashboardService:DashboardService,
    @Inject(MAT_DIALOG_DATA)
    private data: {
      status: string;
      account: IAccount | null;
      email: string;
      customerName: string;
    },
    private route: ActivatedRoute
  ) {
    this.coordinates = {} as ICoordinate;
    if (this.coordinates) {
      this.accountAddForm.controls.Location.patchValue(this.coordinates);
    }
  }

  ngOnInit() {
    if (this.data.status === 'updateAccount') {
      this.isUpdate=true;
      if (this.data.account) this.accountAddForm.patchValue(this.data.account);
    }
    
  }

  //check whether button is selected 
  changeState(){
    this.active=true;
  }

  isButtonDisabled(): boolean {
    if(!this.accountAddForm.invalid && this.data.status === 'updateAccount') return false;
    if(this.accountAddForm.invalid || this.active==false){
      return true;
    }
    return false;
  }
  // //Adding Map Location Pickup.....
  openGoogleMap() {
    let dialogRef = this.dialog.open(GoogleMapComponent, {
      data: {
        address: 'Some Data',
        latitude: 'From Parent Component',
        longitude: 'This Can be anything',
      },
      maxHeight: 'calc(100vh - 120px)',
      width: '100%',
      backdropClass: 'backgroundblur',
    });

    dialogRef.afterClosed().subscribe(
      (result: ICoordinate) => {
        this.coordinates = result;
        if(this.coordinates)this.accountAddForm.controls.Location.patchValue(this.coordinates);
        
      },
      () => {
      }
    );
  }

  addAccount() {
    
    this.accountAddForm.value.Location = this.coordinates;
    this.accountAddForm.value.CustomerEmail = this.data.email;
    this.accountAddForm.value.AccountRevenue = Math.floor(Math.random() * 101);
    this._accountsService
      .addAccount(this.accountAddForm.value)
      .subscribe((result) => {
        if (result) {
        this._dashboardService.sendAddAccountEvent(result);
          this._toastService.success({
            detail: 'Success',
            summary: 'Account Added Successfully',
            duration: 3000,
          });

          this.logInfo.UserId = this._userService.user?.email;
          this.logInfo.Operation = 'created';
          this.logInfo.Message = `${result?.AccountName} account of customer ${this.data?.customerName} has been created.`;
          this.logInfo.TimeStamp = `${this.datepipe.transform(
            new Date(),
            'MM/dd/yyyy h:mm:ss'
          )}`;

          this._logService.postLogs(this.logInfo).subscribe(result=>{            
          });;
        }
      }, err=>{
        if(err){
          this._toastService.error({
            detail: 'UNSUCCESSFUL',
            summary: 'Account with this Email Already Exist',
            duration: 3000,
          });
        }
      });
  }

  updateAccount() {
    this._accountsService
      .updateAccount(
        this.accountAddForm.value,
        this.accountAddForm.value.AccountEmail
      )
      .subscribe((result) => {
        if (result) {
          this._toastService.success({
            detail: 'Success',
            summary: 'Account Updated Successfully',
            duration: 3000,
          });

          this.logInfo.UserId = this._userService.user?.email;
          this.logInfo.Operation = 'updated';
          this.logInfo.Message = `${result?.AccountName} account of customer ${this.data.email} has been updated.`;
          this.logInfo.TimeStamp = `${this.datepipe.transform(
            new Date(),
            'MM/dd/yyyy h:mm:ss'
          )}`;

          this._logService.postLogs(this.logInfo).subscribe(result=>{            
          });;
        }
      });
  }

  accountFormSubmit() {
    if (this.data.status === 'addAccount') {
      this.addAccount();
    } else if (this.data.status === 'updateAccount') {
      this.updateAccount();
    }
  }

  //Year validations
  yearValidator(control: AbstractControl): ValidationErrors | null {
    const year = control.value;
    const currentYear = new Date().getFullYear();

    // Check if the year is a valid number and between 1900 and the current year
    if (isNaN(year) || year < 1500 || year > currentYear) {
      return { invalidYear: true };
    }

    return null;
  }

  accountAddForm = new FormGroup({
    AccountEmail: new FormControl('', [Validators.required, Validators.email]),
    AccountName: new FormControl('', [Validators.required]),
    Location: new FormControl<ICoordinate>({}, [Validators.required]),
    EstablishmentYear: new FormControl('', [
      Validators.required,
      this.yearValidator.bind(this.yearValidator),
    ]),
    Description: new FormControl('', [Validators.required]),
    CustomerEmail: new FormControl(this.data.email),
    AccountRevenue: new FormControl(0),
  });

  get AccountName() {
    return this.accountAddForm.get('AccountName');
  }
  get AccountEmail() {
    return this.accountAddForm.get('AccountEmail');
  }
  get Location() {
    return this.accountAddForm.get('Location');
  }
  get EstablishmentYear() {
    return this.accountAddForm.get('EstablishmentYear');
  }
  get Description() {
    return this.accountAddForm.get('Description');
  }

  ngOnDestroy() {
    this.matDialogRef.close();
  }
}
