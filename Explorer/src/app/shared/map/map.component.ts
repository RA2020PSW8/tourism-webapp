import { Component, AfterViewInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { MapService } from '../map.service';
import { environment } from 'src/env/environment';
import { TestTour } from '../model/testtour.model';
import { CommonModule } from '@angular/common';
import { Keypoint } from 'src/app/feature-modules/tour-authoring/model/keypoint.model';
import { RouteQuery } from '../model/routeQuery.model';
import { RouteInfo } from '../model/routeInfo.model';
import { TransportType } from 'src/app/feature-modules/tour-authoring/model/tour.model';
import { Position } from '../model/position.model';

@Component({
  standalone: true,
  selector: 'app-map',
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit, OnChanges {
  
  private map: any;
  private routeControl: L.Routing.Control;
  @Output() clickEvent = new EventEmitter<number[]>();
  @Output() routesFoundEvent = new EventEmitter<RouteInfo>();
  @Input() selectedTour: TestTour;
  @Input() enableClicks: boolean;
  @Input() markType: string;
  @Input() toggleOff: boolean;
  @Input() routeQuery: RouteQuery;
  @Input() markerPosition: Position;

  constructor(private mapService: MapService) {
    this.enableClicks = true;
    this.markType = 'Key point';
    this.toggleOff = false;
  }

  public handleButtonClick(): void {
    this.markType = this.markType === 'Key point' ? 'Object' : 'Key point';
    alert(this.markType);
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
    if(this.routeQuery){
      this.setRoute();
    }
    if(this.markerPosition) {
      this.setMarker(this.markerPosition.latitude, this.markerPosition.longitude);
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
    if(this.map){
      this.setRoute();
      if(this.markerPosition) {
        this.setMarker(this.markerPosition.latitude, this.markerPosition.longitude);
        this.map.panTo(L.latLng(this.markerPosition.latitude, this.markerPosition.longitude));
      }
    }
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
      let mp = null;
      if(this.markType == 'Object') {
        const customIcon = L.icon({
          iconUrl: 'https://www.pngall.com/wp-content/uploads/2017/05/Map-Marker-Free-Download-PNG.png',
          iconSize: [32, 32], 
          iconAnchor: [16, 16], 
        });
        mp = L.marker([lat, lng], { icon: customIcon }).addTo(this.map);
        alert(mp.getLatLng());
        //new L.Marker([lat, lng], { icon: customIcon }).addTo(this.map);
      } else {
        mp = new L.Marker([lat, lng]).addTo(this.map);
        //new L.Marker([lat, lng]).addTo(this.map);
        this.clickEvent.emit([lat, lng]);
      }
    }); 
  }

  setRoute(): void {
    if(this.routeQuery && this.routeQuery.keypoints.length > 1){
      var routesFoundEvent = this.routesFoundEvent;
      
      if(this.routeControl){
        this.routeControl.remove(); //Removes previous legend 
      }
      
      let lwaypoints = [];
      for(let k of this.routeQuery.keypoints){
        lwaypoints.push(L.latLng(k.latitude, k.longitude));
      }
  
      let profile = '';
      switch(this.routeQuery.transportType){
        case TransportType.WALK:
          profile = 'mapbox/walking';
          break;

        case TransportType.CAR:
          profile = 'mapbox/driving';
          break;

        default:
          profile = 'mapbox/cycling';
          break;
      }

      this.routeControl = L.Routing.control({
        waypoints: lwaypoints,
        router: L.routing.mapbox(environment.mapBoxApiKey, {profile: profile})
      }).addTo(this.map);
  
      this.routeControl.on('routesfound', function(e: any) {
        var routes = e.routes;
        var summary = routes[0].summary;
        // alert('Total distance is ' + summary.totalDistance / 1000 + ' km and total time is ' + Math.round(summary.totalTime % 3600 / 60) + ' minutes');
        let routeInfo: RouteInfo = {
          distance: summary.totalDistance/1000,
          duration: Math.ceil(summary.totalTime / 60)
        }
        routesFoundEvent.emit(routeInfo);
      });
    }
  }

  setMarker(lat: number, lng: number): L.Marker<any> {
    console.log("MARKER  " + lat + ", " + lng);
    return new L.Marker([lat, lng]).addTo(this.map);
  }
}
