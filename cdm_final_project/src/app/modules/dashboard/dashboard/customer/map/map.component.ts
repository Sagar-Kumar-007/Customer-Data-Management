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
      customerId: string 
    },
    private _customerService: CustomerService
  ) {}
  markers: { lat: number; lng: number; label: string }[]=[{lat : 22.4064172,
    lng : 69.0750171,
    label : "name"}];
  ngOnInit() {
    this._customerService.getCustomer(this.data.customerId).subscribe((result) => {
      if(result){
        let accounts = result.accounts;
      this.markers.pop();
      if (accounts)
        accounts.forEach((account) => {
          let obj: { lat: number; lng: number; label: string } = {
            lat: account.location?.latitude? account.location?.latitude:22.4064172,
            lng:  account.location?.longitude? account.location?.longitude: 69.0750171,
            label:  account.aname? account.aname:'Surat'
          };

          this.markers?.push(obj);
        });
        console.log(this.markers);
      }
    });
  }

  customerName = this.data.customerName;
  lat = 22.4064172;
  long = 69.0750171;
  zoom = 4;
}
