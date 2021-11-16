import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  

  private headers: HttpHeaders;

  constructor(public http: HttpClient)
  {

  }

  public static _API_ENDPOINT_GATEWAY = 'http://localhost:8080/';
  public static _URL_ENDPOINT_BARTENDER = 'bartender/1.0.0/';

  public static ENDPOINT_LISTA_PILA_TRABAJO = GeneralService._API_ENDPOINT_GATEWAY + GeneralService._URL_ENDPOINT_BARTENDER + 'listaPila';
  public static ENDPOINT_PROCESAR_PILA = GeneralService._API_ENDPOINT_GATEWAY + GeneralService._URL_ENDPOINT_BARTENDER + 'procesarPila';




  /**
   * Método encargado de obtener los headers necesarios para la ejecucion del servicio
   */
  public obtenerHeader() {
    
    var header = new HttpHeaders({
      'Accept': 'application/json;charset=utf-8',
      'Content-Type': 'application/json;charset=utf-8'      
    });
    return header;
  }

  /**
   * Metodo encargado de capturar errores en el consumo del servicio
   */
   protected handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Ocurrio un error: ' + error.error.message);
    } else {
      console.error(
        `Backend codigo error ${error.status}, ` + `body was: ${error.error}`
      );
    }

    return throwError(error);
  }
}
