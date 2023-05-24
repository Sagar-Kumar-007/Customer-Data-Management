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
    label: string;
  }[] = [{ lat: 22.4064172, lng: 69.0750171, label:"" }];

  ngOnInit() {
    this._customerService
      .getCustomer(this.data.customerId)
      .subscribe((result) => {
        if (result) {
          let accounts = result.Accounts;
          this.locations.pop();
          if (accounts)
            accounts.forEach((account) => {
              this.locations?.push({
                lat: account.Location?.Latitude
                  ? account.Location?.Latitude
                  : 22.4064172,
                lng: account.Location?.Longitude
                  ? account.Location?.Longitude
                  : 69.0750171,
                label: account.AccountName
                  ? `${account.AccountName} of ${result.CustomerName}`
                  : "",
              });
            });

          this.locations?.push({
            lat: result.Headquarters?.Latitude
              ? result.Headquarters?.Latitude
              : 0,
            lng: result.Headquarters?.Longitude
              ? result.Headquarters?.Longitude
              : 0,
            iconUrl: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
            label: result.CustomerName
                  ? `${result.CustomerName}: Headquarters`
                  : "",
          });
        }
      });
  }

  customerName = this.data.customerName;
  lat = 22.4064172;
  long = 69.0750171;
  zoom = 4;
}
