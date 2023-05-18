import { Component, Inject } from '@angular/core';
import { ICoordinate } from 'src/app/datatypes/Coordinates';
import { MatDialog } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ICustomer } from 'src/app/datatypes/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { NgToastService } from 'ng-angular-popup';
import { NgConfirmService } from 'ng-confirm-box';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LogsService } from 'src/app/services/logs.service';
import { Ilogs } from 'src/app/datatypes/logs';
import { DatePipe } from '@angular/common';
import { DashboardService } from 'src/app/services/dashboard.service';
import { GoogleMapComponent } from '../../../google-map/google-map.component';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css'],
})
export class CreateCustomerComponent {
  coordinates: ICoordinate;
  //Form Logic
  public userIdToUpdate!: string;
  public isUpdateActive: boolean = false;
  logInfo: Ilogs = {};
  active: boolean = false;
  selectcountry: boolean=false;

  constructor(
    public datepipe: DatePipe,
    private _logService: LogsService,
    private customer: CustomerService,
    private router: Router,
    private dialog: MatDialog,
    private toastService: NgToastService,
    private confirm: NgConfirmService,
    private dashboardService:DashboardService,
    private matDialogRef: MatDialogRef<CreateCustomerComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: {
      status: string;
      customerId: string | null;
    }
  ) {
    this.coordinates = {} as ICoordinate;
    if (this.coordinates) {
      this.customerAddForm.controls.headquaters.patchValue(this.coordinates);
    }
  }

  ngOnInit(): void {
    if (this.data.customerId)
      this.customer.getCustomer(this.data.customerId).subscribe((res) => {
        this.isUpdateActive = true;
        this.fillFormToUpdate(res);
        console.log(res);
      });
  }

  //check whether button is selected
  changeState() {
    this.active = true;
  }

  isCountrySelected(){
    this.selectcountry=true;
  }

  isCountryUnselected(){
    this.selectcountry=false;
  }

  isButtonDisabled(): boolean {
    console.log(this.customerAddForm.value.headquaters?.address);
    console.log(this.customerAddForm.value.headquaters?.latitude);
    console.log(this.customerAddForm.value.headquaters?.longitude);

    if(this.customerAddForm.invalid)return true;
    if(this.isUpdateActive==true) return false;
    else if (this.active == false) {
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
        if (this.coordinates){
          this.customerAddForm.controls.headquaters.patchValue(
            this.coordinates
          );
        }
      },
      () => {
        console.log('Error Found');
      }
    );
  }

  customerAddForm = new FormGroup({
    cname: new FormControl('', [Validators.required]),
    logo: new FormControl('', []),
    sector: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    headquaters: new FormControl<ICoordinate>({}, [Validators.required]),
    phoneNo: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    website: new FormControl('', []),
    countryCode: new FormControl(''),
  });

  // Add Customer.........

  addCustomer() {
    console.log("c: "+this.customerAddForm.value.headquaters?.address);
    this.customer.addCustomer(this.customerAddForm.value).subscribe((res) => {
      console.log(res);
      if (res) {
        this.dashboardService.sendAddCustomerEvent(res);
        this.toastService.success({
          detail: 'Success',
          summary: 'Customer Added',
          duration: 3000,
        });
        this.customerAddForm.reset();

        this.logInfo.userId = 'abc@gmail.com';
        this.logInfo.operation = 'created';
        this.logInfo.message = `${res?.cname} has been created.`;
        this.logInfo.timeStamp = `${this.datepipe.transform(
          new Date(),
          'MM/dd/yyyy h:mm:ss'
        )}`;

        this._logService.postLogs(this.logInfo).subscribe((result) => {
          console.log(result);
        });
      }
    });
  }

  // Update a Customer

  updateCustomer() {
    if (this.data.customerId)
      this.customer
        .updateCustomer(this.customerAddForm.value, this.data.customerId)
        .subscribe(async (res) => {
          this.toastService.success({
            detail: 'Success',
            summary: 'Customer updated',
            duration: 3000,
          });
          this.customerAddForm.reset();

          this.logInfo.userId = 'abc@gmail.com';
          this.logInfo.operation = 'updated';
          this.logInfo.message = `${res?.cname} has been updated.`;
          this.logInfo.timeStamp = `${this.datepipe.transform(
            new Date(),
            'MM/dd/yyyy h:mm:ss'
          )}`;

          this._logService.postLogs(this.logInfo).subscribe((result) => {
            console.log(result);
          });
          await new Promise((f) => {
            setTimeout(f, 1000);
          });
        });
  }

  /// Validations......

  get email() {
    return this.customerAddForm.get('email');
  }
  get cname() {
    return this.customerAddForm.get('cname');
  }

  get headquaters() {
    return this.customerAddForm.get('headquaters');
  }
  get countryCode() {
    return this.customerAddForm.get('countryCode');
  }
  get description() {
    return this.customerAddForm.get('description');
  }
  get phoneNo() {
    return this.customerAddForm.get('phoneNo');
  }


  fillFormToUpdate(customer: ICustomer) {
    this.customerAddForm.patchValue({
      cname: customer.cname,
      logo: customer.logo,
      sector: customer.sector,
      description: customer.description,
      email: customer.email,
      headquaters: customer.headquaters,
      phoneNo: customer.phoneNo,
      website: customer.website,
      countryCode: customer.countryCode,
    });
  }

  onCountryChange(event:any) {
    console.log(event);
    this.customerAddForm.controls.countryCode.patchValue(event.dialCode);
  }

  

  ngOnDestroy() {
    this.matDialogRef.close();
  }
}
