import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import game from '../class/game';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  game = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
  constructor(private http: HttpClient) {}

  // Obtener la lista completa de juegos
  juego(){
    const headers = {
      'x-rapidapi-key': 'b68d507f84msh9ab41e938ee4fc3p120a97jsnee0197dd5496',
		  'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
    }
    return this.http.get<game[]>(this.game, {headers});
   }
}