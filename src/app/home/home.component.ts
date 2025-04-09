import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import game from '../class/game';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'

})
export class HomeComponent implements OnInit {

  juego: game[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 9;
  paginatedGames: game[] = [];

  constructor(public juegos: ApiService){}

  ngOnInit(): void{
    this.Obtenerjuegos();

  }

  Obtenerjuegos(){
    return this.juegos.juego().subscribe({
      next:(data)=>{
        this.juego = data
        this.updatePaginatedGames();
        console.log(data);
      },

      error(error) {
        console.log(error);
      },
    })
  }

  updatePaginatedGames() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedGames = this.juego.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.updatePaginatedGames();
  }

}
