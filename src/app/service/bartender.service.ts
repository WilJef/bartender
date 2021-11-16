import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralService } from './general.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BartenderService extends GeneralService {
  

  constructor(private httpClient: HttpClient) {
    super(httpClient);
   }

  public lista(idPila?) : Observable<any>
  {
    console.log("lista ", idPila);
    let urlConsumo = GeneralService.ENDPOINT_LISTA_PILA_TRABAJO;
    if(idPila != null){
      urlConsumo = urlConsumo + "/" + idPila
    }
    console.log("urlConsumo urlConsumo: ", urlConsumo);
    const options = { headers: this.obtenerHeader() };
    return this.http.get<any>(urlConsumo, options)
      .pipe(catchError(this.handleError))      
  }

  public procesarLista(numeroIteraciones, idPilaTrabajo) : Observable<any>
  {
    console.log("provesarlista ", numeroIteraciones, idPilaTrabajo);
    let urlConsumo = GeneralService.ENDPOINT_PROCESAR_PILA + "/" + idPilaTrabajo + "/" + numeroIteraciones;
    console.log("urlConsumo procesarLista: ", urlConsumo);
    const options = { headers: this.obtenerHeader() };
    return this.http.get<any>(urlConsumo, options)
      .pipe(catchError(this.handleError))      
  }
  
}
