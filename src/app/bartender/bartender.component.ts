import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/components/common/message';
import { BartenderService } from '../service/bartender.service';

@Component({
  selector: 'app-bartender',
  templateUrl: './bartender.component.html',
  styleUrls: ['./bartender.component.css']
})
export class BartenderComponent implements OnInit {

  public msg: Message[];

  idPilaTrabajo: number;
  pilaTrabajo: any[] = [];
  pila: any;
  respuesta: any[] = [];
  validado: boolean;
  

  //variables numero iteraciones
  numeroIteraciones: number;
  iteracionesMaximaLongitud: number = 2;
  iteracionesMaximoValor:number = 99;
  iteracionesMinimoValor: number = 1;

  constructor(private bartenderService: BartenderService) { }

  ngOnInit(): void {
    this.numeroIteraciones = 0;
    this.idPilaTrabajo = 0;
    this.respuesta = [];
    this.validado = false;

    //this.cargarPilaTrabajo();
  }

  /***
   * Metodo para cargar las pila de trabajo
   */
  cargarPilaTrabajo() {
    this.bartenderService.lista().subscribe(
      (resp: any[]) => {
        this.pilaTrabajo = resp;
      }, err => {
        console.log(err);
        this.errorMessage(err.error.message);
      });
  }

  /***
   * Metodo que consulta la pila de trabajo seleccionada
   */
  consultarPilaTrabajo(){
    this.validado = false;    
      setTimeout(() => {
        this.bartenderService.lista(this.idPilaTrabajo).subscribe((resp: any) => {        
          this.pila = resp.inputArray;
          this.validado = this.numeroIteraciones > 0;
        }, err => {
          console.log(err);
          this.pila = null; 
          this.succesMessage(err.error.mensaje,"info");          
        });
      }, 10); 
  }

  /***
   * Metodo para procesar la pila de trabajo
   */
  procesarPilaTrabajo() {    
    if(this.numeroIteraciones > 0 && this.idPilaTrabajo > 0){
      setTimeout(() => {
        this.bartenderService.procesarLista(this.numeroIteraciones, this.idPilaTrabajo).subscribe((resp: any[]) => {         
          this.respuesta = resp;
          this.succesMessage("Proceso terminado exitosamente", "success")
        }, err => {
          console.log(err);
          this.errorMessage(err.error.mensaje);
        });
      }, 10);  
    }
    else{
      this.errorMessage("El válor mínimo para los campos de selección es 1.");
    }
  }

  /***
   * Metodo cuando se cambia el valor del campo numero de iteraciones
   */
  onChangeIteraciones(){
      this.validado = this.numeroIteraciones > 0 && this.idPilaTrabajo > 0;
  }

  /**
       * Permite mostrar en pantalla un mensaje de accion exitosa al usuario
       * @param mssg Mensaje a imprimir
       * @param severidad Severidad del mensaje: info o success
       */
   succesMessage(mssg, severidad) {
    this.msg = [];
    this.msg.push({ severity: severidad, summary: mssg });
    this.resetMessage();
  }

  /**
  * Permite mostrar en pantalla un mensaje de error al usuario
  * @param mssg Mensaje a imprimir
  */
  errorMessage(mssg) {
    this.msg = [];
    this.msg.push({ severity: 'error', summary: mssg });
    console.log("msg: ", this.msg);
    this.resetMessage();
  }
  
  /**
   * Reset de los mensajes
   */
  resetMessage() {
    setTimeout(
      () => {
        this.msg = [];
      }, 10000
    );
  }

}
