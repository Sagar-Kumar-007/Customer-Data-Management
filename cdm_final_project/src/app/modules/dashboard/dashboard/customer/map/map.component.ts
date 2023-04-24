import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
    }
  ) {}

  customerName=this.data.customerName;
  lat = 22.4064172;
  long = 69.0750171;
  zoom = 7;

  markers = [
    {
      lat: 21.1594627,
      lng: 72.6822083,
      label: 'Surat',
    },
    {
      lat: 23.0204978,
      lng: 72.4396548,
      label: 'Ahmedabad',
    },
    {
      lat: 22.2736308,
      lng: 70.7512555,
      label: 'Rajkot',
    },
  ];
}
