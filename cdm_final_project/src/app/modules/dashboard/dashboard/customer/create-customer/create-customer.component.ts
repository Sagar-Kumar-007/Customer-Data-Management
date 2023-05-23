import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ICustomer } from 'src/app/datatypes/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { NgToastService } from 'ng-angular-popup';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LogsService } from 'src/app/services/logs.service';
import { Ilog } from 'src/app/datatypes/log';
import { DatePipe } from '@angular/common';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ICoordinate } from 'src/app/datatypes/Coordinates';
import { GoogleMapComponent } from '../../../google-map/google-map.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css'],
})
export class CreateCustomerComponent {
  //Form Logic
  public userIdToUpdate!: string;
  public isUpdateActive: boolean = false;
  logInfo: Ilog = {};
  coordinates: ICoordinate;
  active: boolean = false;
  
  

  constructor(
    private _userService: UserService,
    public datepipe: DatePipe,
    private dialog: MatDialog,
    private _logService: LogsService,
    private _customerService: CustomerService,
    private _toastService: NgToastService,
    private _dashboardService: DashboardService,
    private matDialogRef: MatDialogRef<CreateCustomerComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: {
      status: string;
      customerId: string | null;
    }
  ) {
    this.coordinates = {} as ICoordinate;
    if (this.coordinates) {
      this.customerAddForm.controls.Headquarters.patchValue(this.coordinates);
    }
  }

  ngOnInit(): void {
    if (this.data.customerId)
      this._customerService.getCustomer(this.data.customerId).subscribe((res) => {
        this.isUpdateActive = true;
        this.fillFormToUpdate(res);
        this.active = false;
      });
  }

  customerAddForm = new FormGroup({
    CustomerName: new FormControl('', [Validators.required]),
    Logo: new FormControl('', []),
    Sector: new FormControl('', [Validators.required]),
    Description: new FormControl('', [Validators.required]),
    CustomerEmail: new FormControl('', [Validators.required, Validators.email]),
    Headquarters: new FormControl<ICoordinate>({}, [Validators.required]),
    PhoneNumber: new FormControl('', [
      Validators.required,
      
    ]),
    Website: new FormControl('', []),
    CountryCode: new FormControl(''),
  });

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
        if (this.coordinates) {
          this.customerAddForm.controls.Headquarters.patchValue(
            this.coordinates
          );
        }
      },
      () => {
        console.log('Error Found');
      }
    );
  }
  // Add Customer.........

  addCustomer() {

    this._customerService.addCustomer(this.customerAddForm.value).subscribe((res) => {
      if (res) {
        this._dashboardService.sendAddCustomerEvent(res);
        this._toastService.success({
          detail: 'Success',
          summary: 'Customer Added Successfully',
          duration: 3000,
        });
        this.customerAddForm.reset();

        this.logInfo.UserId = this._userService.user?.email;
        this.logInfo.Operation = 'created';
        this.logInfo.Message = `${res?.CustomerName} has been created.`;
        this.logInfo.TimeStamp = `${this.datepipe.transform(
          new Date(),
          'MM/dd/yyyy h:mm:ss'
        )}`;

        this._logService.postLogs(this.logInfo).subscribe((result) => {
          console.log(result);
        });
      }

    this.matDialogRef.close();
    }, err=>{
      if(err){
        this._toastService.error({
          detail: 'UNSUCCESSFUL',
          summary: 'Customer with this Email Already Exist',
          duration: 3000,
        });
      }
    });
  }

  //check whether headquarter button is selected
  changeState() {
    this.active = true;
  }

  isButtonDisabled(): boolean {
    if(this.customerAddForm.invalid || this.active==false){
      return true;
    }
    return false;
  }



  onCountryChange(event: any) {
    console.log(event);
    this.customerAddForm.controls.CountryCode.patchValue(event.dialCode);
  }

  // Update a Customer

  updateCustomer() {
    if (this.data.customerId)
      this._customerService
        .updateCustomer(this.customerAddForm.value, this.data.customerId)
        .subscribe((res) => {
          
          if (res) {
          console.log(res);

            this._toastService.success({
              detail: 'Success',
              summary: 'Customer Updated Successfully',
              duration: 3000,
            });

            this.customerAddForm.reset();

            this.logInfo.UserId = this._userService.user?.email;
            this.logInfo.Operation = 'updated';
            if (res)this.logInfo.Message = `${res?.CustomerEmail} has been updated.`;
            this.logInfo.TimeStamp = `${this.datepipe.transform(
              new Date(),
              'MM/dd/yyyy h:mm:ss'
            )}`;

            if (res)this._logService.postLogs(this.logInfo).subscribe((result) => {
              console.log(result);
            });
          }
          this.matDialogRef.close();
        });
  }

  // Validations......

  get CustomerEmail() {
    return this.customerAddForm.get('CustomerEmail');
  }
  get CustomerName() {
    return this.customerAddForm.get('CustomerName');
  }

  get Headquarters() {
    return this.customerAddForm.get('Headquarters');
  }
  get CountryCode() {
    return this.customerAddForm.get('CountryCode');
  }
  get Description() {
    return this.customerAddForm.get('Description');
  }
  get PhoneNumber() {
    return this.customerAddForm.get('PhoneNumber');
  }

  fillFormToUpdate(customer: ICustomer) {
    this.customerAddForm.patchValue({
      CustomerName: customer.CustomerName,
      Logo: customer.Logo,
      Sector: customer.Sector,
      Description: customer.Description,
      CustomerEmail: customer.CustomerEmail,
      Headquarters: customer.Headquarters,
      PhoneNumber: customer.PhoneNumber,
      Website: customer.Website,
      CountryCode: customer.CountryCode,
    });
  }

  ngOnDestroy() {
    this.matDialogRef.close();
  }
}
