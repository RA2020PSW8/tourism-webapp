import { Component } from '@angular/core';

@Component({
  selector: 'xp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  images = [
    {url:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/1200px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg',alt:'Image 1'},
    {url:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/1200px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg',alt:'img2'},
    {url:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FParis&psig=AOvVaw2Fu75pto7pKhhN6r10J7nO&ust=1698341429348000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKjojf_ckYIDFQAAAAAdAAAAABAE',alt:'img3'}
  ]
}
