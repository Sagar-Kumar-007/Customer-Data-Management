import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent {
  constructor(
    private matDialogRef: MatDialogRef<MapComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: {
      customerName: string | null;
      customerId: string;
    },
    private _customerService: CustomerService
  ) {}
  locations: {
    lat: number;
    lng: number;
    iconUrl?: string;
  }[] = [{ lat: 22.4064172, lng: 69.0750171 }];

  ngOnInit() {
    this._customerService
      .getCustomer(this.data.customerId)
      .subscribe((result) => {
        if (result) {
          let accounts = result.accounts;
          this.locations.pop();
          if (accounts)
            accounts.forEach((account) => {
              this.locations?.push({
                lat: account.location?.latitude
                  ? account.location?.latitude
                  : 22.4064172,
                lng: account.location?.longitude
                  ? account.location?.longitude
                  : 69.0750171,
              });
            });

          this.locations?.push({
            lat: result.headquaters?.latitude
              ? result.headquaters?.latitude
              : 0,
            lng: result.headquaters?.longitude
              ? result.headquaters?.longitude
              : 0,
            iconUrl: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
          });
        }
      });
  }

  customerName = this.data.customerName;
  lat = 22.4064172;
  long = 69.0750171;
  zoom = 4;
}
