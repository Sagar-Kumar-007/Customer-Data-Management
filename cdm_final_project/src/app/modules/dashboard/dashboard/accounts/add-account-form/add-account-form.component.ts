import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountsService } from 'src/app/services/accounts.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IAccount } from 'src/app/datatypes/account';
import { ICoordinate } from 'src/app/datatypes/Coordinates';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { GoogleMapComponent } from '../google-map/google-map.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-account-form',
  templateUrl: './add-account-form.component.html',
  styleUrls: ['./add-account-form.component.css'],
})
export class AddAccountFormComponent {
  coordinates: ICoordinate;
  address!: string;
  constructor(
    private dialog: MatDialog,
    private toastService: NgToastService,
    private _accountsService: AccountsService,
    private matDialogRef: MatDialogRef<AddAccountFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: {
      status: string;
      account: IAccount | null;
      email: string;
    },
    private route: ActivatedRoute
  ) {
    this.coordinates = {} as ICoordinate;
    if (this.coordinates) {
      this.accountAddForm.controls.location.patchValue(
        this.coordinates
      );
      
    }
  }

  addProductMessage: string | undefined;
  ngOnInit() {
    if (this.data.status === 'updateAccount') {
      if (this.data.account) this.accountAddForm.patchValue(this.data.account);
    }
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
      width:'100%',
      backdropClass: 'backgroundblur',
      
    });

    dialogRef.afterClosed().subscribe(
      (result:ICoordinate) => {
          this.coordinates = result;
          console.log(this.coordinates.latitude);
          if(this.coordinates.address)this.address=this.coordinates.address;
          if (this.coordinates) {
            this.accountAddForm.controls.location.patchValue(
              this.coordinates
            );
          }
      },
      ()=>{
        console.log("Error Found");
      }
    );
  }

  addAccount() {
    // console.log("Add ACcount Form: "+this.accountAddForm.value.acc_email);
    this.accountAddForm.value.location=this.coordinates;
    this.accountAddForm.value.customer_email = this.data.email;
    console.log(this.accountAddForm.value);
    this.accountAddForm.value.acc_revenue=Math.floor((Math.random()*101));
    this._accountsService
      .addAccount(this.accountAddForm.value)
      .subscribe((result) => {
        if (result) {
          this.toastService.success({
            detail: 'Success',
            summary: 'Customer updated',
            duration: 3000,
          });
        }
      });
  }

  updateAccount() {
    // console.log(this.accountAddForm.value);
    this._accountsService
      .updateAccount(
        this.accountAddForm.value,
        this.accountAddForm.value.acc_email
      )
      .subscribe((result) => {
        if (result) {
          console.log(result);
          this.toastService.success({
            detail: 'Success',
            summary: 'Customer updated',
            duration: 3000,
          });
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

  accountAddForm = new FormGroup({
    acc_email: new FormControl('', [Validators.required, Validators.email]),
    aname: new FormControl('', [Validators.required]),
    location: new FormControl<ICoordinate>({}, [Validators.required]),
    estYear: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    customer_email: new FormControl(this.data.email),
    acc_revenue:new FormControl(0),
  });

  get aname() {
    return this.accountAddForm.get('aname');
  }
  get email() {
    return this.accountAddForm.get('acc_email');
  }
  get location() {
    return this.accountAddForm.get('location');
  }
  get estYear() {
    return this.accountAddForm.get('estYear');
  }
  get description() {
    return this.accountAddForm.get('description');
  }

  ngOnDestroy() {
    this.matDialogRef.close();
  }
}
