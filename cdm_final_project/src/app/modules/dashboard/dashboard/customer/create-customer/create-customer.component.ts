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
import { NgConfirmService } from 'ng-confirm-box';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LogsService } from 'src/app/services/logs.service';
import { Ilogs } from 'src/app/datatypes/logs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css'],
})
export class CreateCustomerComponent {
  //Form Logic
  public userIdToUpdate!: string;
  public isUpdateActive: boolean = false;
  logInfo: Ilogs = {};

  constructor(
    public datepipe: DatePipe,
    private _logService: LogsService,
    private customer: CustomerService,
    private router: Router,
    private toastService: NgToastService,
    private confirm: NgConfirmService,
    private matDialogRef: MatDialogRef<CreateCustomerComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: {
      status: string;
      customerId: string | null;
    }
  ) {}

  ngOnInit(): void {
    if (this.data.customerId)
      this.customer.getCustomer(this.data.customerId).subscribe((res) => {
        this.isUpdateActive = true;
        this.fillFormToUpdate(res);
      });
  }

  customerAddForm = new FormGroup({
    cname: new FormControl('', [Validators.required]),
    logo: new FormControl('', []),
    sector: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    headquaters: new FormControl('', [Validators.required]),
    phoneNo: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    website: new FormControl('', []),
    countryCode: new FormControl('', [Validators.required]),
  });

  // Add Customer.........

  addCustomer() {
    this.customer.addCustomer(this.customerAddForm.value).subscribe((res) => {
      console.log(res);
      if (res) {
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

        this._logService.postLogs(this.logInfo).subscribe(result=>{
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

          this._logService.postLogs(this.logInfo).subscribe(result=>{
            console.log(result);
            
          });
          await new Promise((f) => {
            setTimeout(f, 1000);
          });
        });
  }

  // Validations......

  get email() {
    return this.customerAddForm.get('email');
  }
  get cname() {
    return this.customerAddForm.get('cname');
  }

  get gstin() {
    return this.customerAddForm.get('gstin');
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

  ngOnDestroy() {
    this.matDialogRef.close();
  }
}
