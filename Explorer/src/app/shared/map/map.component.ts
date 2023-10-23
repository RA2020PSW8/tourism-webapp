import { Component, AfterViewInit, OnChanges, Input } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { MapService } from '../map.service';
import { environment } from 'src/env/environment';
import { TestTour } from '../model/testtour.model';

@Component({
  standalone: true,
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit, OnChanges {
  
  private map: any;
  private routeControl: L.Routing.Control;
  @Input() selectedTour: TestTour;
  @Input() enableClicks: boolean;

  constructor(private mapService: MapService) {
    this.enableClicks = false;
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [45.2396, 19.8227],
      zoom: 13,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
    tiles.addTo(this.map);
    if(this.enableClicks){
      this.registerOnClick();
    }
  }

  ngAfterViewInit(): void {
    let DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    });

    L.Marker.prototype.options.icon = DefaultIcon;
    this.initMap();
  }

  ngOnChanges(): void {
    this.setRoute();
  }

  search(): void {
    this.mapService.search('Strazilovska 19, Novi Sad').subscribe({
      next: (result) => {
        console.log(result);
        L.marker([result[0].lat, result[0].lon])
          .addTo(this.map)
          .bindPopup('Pozdrav iz Strazilovske 19.')
          .openPopup();
      },
      error: () => {},
    });
  }

  registerOnClick(): void {
    this.map.on('click', (e: any) => {
      const coord = e.latlng;
      const lat = coord.lat;
      const lng = coord.lng;
      this.mapService.reverseSearch(lat, lng).subscribe((res) => {
        console.log(res.display_name);
      });
      console.log(
        'You clicked the map at latitude: ' + lat + ' and longitude: ' + lng
      );
      const mp = new L.Marker([lat, lng]).addTo(this.map);
      alert(mp.getLatLng());
      new L.Marker([lat, lng]).addTo(this.map);
    });
  }

  setRoute(): void {
    if(this.routeControl){
      this.routeControl.remove(); //Removes previous legend 
    }
    
    let lwaypoints = [];
    for(let k of this.selectedTour.keypoints){
      lwaypoints.push(L.latLng(k.latitude, k.longitude));
    }

    this.routeControl = L.Routing.control({
      waypoints: lwaypoints,
      router: L.routing.mapbox(environment.mapBoxApiKey, {profile: 'mapbox/walking'})
    }).addTo(this.map);

    this.routeControl.on('routesfound', function(e: any) {
      var routes = e.routes;
      var summary = routes[0].summary;
      alert('Total distance is ' + summary.totalDistance / 1000 + ' km and total time is ' + Math.round(summary.totalTime % 3600 / 60) + ' minutes');
    });
  }
}
