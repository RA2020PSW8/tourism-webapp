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
import { MarkerPosition } from '../model/markerPosition.model';

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
  private clickMarker: L.Marker; // saving just so we can access current lng/lat when needed
  private markerLayer: L.LayerGroup;
  private drawLayer: L.LayerGroup;

  @Output() clickEvent = new EventEmitter<number[]>();
  @Output() routesFoundEvent = new EventEmitter<RouteInfo>();

  @Input() selectedTour: TestTour; //?
  @Input() markType: string;

  @Input() routeQuery: RouteQuery | undefined;
  @Input() markerPosition: MarkerPosition | undefined;
  @Input() markerPositions: MarkerPosition[];
  @Input() radiusSize: number;

  @Input() enableClicks: boolean;
  @Input() toggleOff: boolean;
  @Input() allowMultipleMarkers: boolean;
  @Input() moveMarkers: boolean;
  @Input() drawRadiusOnClick: boolean;

  /* Icons */
  yellowIcon = L.icon({
    iconUrl: 'https://www.pngall.com/wp-content/uploads/2017/05/Map-Marker-Free-Download-PNG.png',
    iconSize: [32, 32], 
    iconAnchor: [16, 16], 
  });
  blueIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
  });
  redIcon = L.icon({
    iconUrl: 'https://static.vecteezy.com/system/resources/previews/023/554/762/original/red-map-pointer-icon-on-a-transparent-background-free-png.png',
    iconSize: [48, 48], 
    iconAnchor: [16, 16],
  });
  greenIcon = L.icon({
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Map_pin_icon_green.svg/1504px-Map_pin_icon_green.svg.png',
    iconSize: [22.5, 32], 
    iconAnchor: [16, 16],
  })
  /* Icons end */

  constructor(private mapService: MapService) {
    this.enableClicks = true;
    this.markType = 'Key point';
    this.toggleOff = false;
    this.allowMultipleMarkers = true;
    this.drawRadiusOnClick = false;
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
    this.markerLayer = new L.LayerGroup();
    this.drawLayer = new L.LayerGroup();
    this.markerLayer.addTo(this.map);
    this.drawLayer.addTo(this.map);

    if (this.enableClicks) {
      this.registerOnClick();
    }
    if (this.routeQuery) {
      this.setRoute();
    }
    if (this.markerPosition) {
      this.setMarker(this.markerPosition.latitude, this.markerPosition.longitude, this.markerPosition.color);
    }
    if(this.markerPositions && this.markerPositions.length > 0) {
      this.markerPositions.forEach((marker) => {
        this.setMarker(marker.latitude, marker.longitude, marker.color, marker.title);
      });
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
    if (this.map) {
      this.setRoute();
      if (this.markerPosition) {
        this.setMarker(this.markerPosition.latitude, this.markerPosition.longitude, this.markerPosition.color, '');
        this.map.panTo(L.latLng(this.markerPosition.latitude, this.markerPosition.longitude));
      }

      if(this.markerPositions && this.markerPositions.length > 0) {
        this.markerPositions.forEach((marker) => {
          this.setMarker(marker.latitude, marker.longitude, marker.color, marker.title);
        });
      }

      if(this.drawRadiusOnClick && this.radiusSize && this.radiusSize > 0) {
        this.clearDrawings();
        this.setRadius(this.clickMarker.getLatLng().lat, this.clickMarker.getLatLng().lng, this.radiusSize, 'red');
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
      error: () => { },
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

      if (!this.allowMultipleMarkers) {
        this.clearMarkers();
        this.clearDrawings();
      }

      if (this.markType == 'Object') {
        const customIcon = L.icon({
          iconUrl: 'https://www.pngall.com/wp-content/uploads/2017/05/Map-Marker-Free-Download-PNG.png',
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });
        this.clickMarker = L.marker([lat, lng], { icon: customIcon }).addTo(this.markerLayer);
        alert(this.clickMarker.getLatLng());
      } else {
        this.clickMarker = new L.Marker([lat, lng]).addTo(this.markerLayer);
        this.clickEvent.emit([lat, lng]);
      }

      if(this.drawRadiusOnClick && this.radiusSize && this.radiusSize > 0) {
        this.setRadius(lat, lng, this.radiusSize, 'red');
      }
    });
  }

  drawPreviousClickMarker(){
    this.setMarker(this.clickMarker.getLatLng().lat, this.clickMarker.getLatLng().lng);
  }

  clearMarkers(): void {
    this.markerLayer.eachLayer((layer) => {
      layer.remove();
    })
  }

  clearDrawings(): void {
    this.drawLayer.eachLayer((layer) => {
      layer.remove();
    })
  }

  setRoute(): void {
    if (this.routeQuery && this.routeQuery.keypoints.length > 1) {
      var routesFoundEvent = this.routesFoundEvent;

      if (this.routeControl) {
        this.routeControl.remove(); //Removes previous legend 
      }

      let lwaypoints = [];
      for (let i = 0; i < this.routeQuery.keypoints.length; i++) {
        let k = this.routeQuery.keypoints[i];
        let latLng = L.latLng(k.latitude, k.longitude);
        lwaypoints.push(latLng);

        // Create a marker for the keypoint and add it to the map
        let marker = L.marker([k.latitude, k.longitude]);
        let tooltipText = k.name;
        if (i === 0) {
          tooltipText = 'Start: ' + tooltipText;
        } else if (i === this.routeQuery.keypoints.length - 1) {
          tooltipText = 'Finish: ' + tooltipText;
        }
        marker.bindTooltip(tooltipText, { permanent: true }).openTooltip();
        marker.addTo(this.map);
      }

      let profile = '';
      switch (this.routeQuery.transportType) {
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
        router: L.routing.mapbox(environment.mapBoxApiKey, { profile: profile })
      }).addTo(this.map);

      this.routeControl.on('routesfound', function (e: any) {
        var routes = e.routes;
        var summary = routes[0].summary;
        let routeInfo: RouteInfo = {
          distance: summary.totalDistance / 1000,
          duration: Math.ceil(summary.totalTime / 60)
        }
        routesFoundEvent.emit(routeInfo);
      });
    }
  }

  setMarker(lat: number, lng: number, color: string = 'blue', title: string = ''): void {
    let markerIcon = this.blueIcon;
    switch(color){
      case 'blue': 
        markerIcon = this.blueIcon;
        break;
      case 'yellow':
        markerIcon = this.yellowIcon;
        break;
      case 'red':
        markerIcon = this.redIcon;
        break;
      case 'green':
        markerIcon = this.greenIcon;
        break;
    }
    
    let newMarker = new L.Marker([lat, lng], {icon: markerIcon});
    if(title && title !== '') {
      newMarker.bindTooltip(title, { permanent: false }).openTooltip();
    }
    newMarker.addTo(this.markerLayer);
  }

  setRadius(centerLat: number, centerLng: number, radius: number, color: string = 'red'): void {
    L.circle([centerLat, centerLng], {
      color: color,
      fillColor: color,
      fillOpacity: 0.2,
      radius: radius * 1000
    }).addTo(this.drawLayer);
  }
}
