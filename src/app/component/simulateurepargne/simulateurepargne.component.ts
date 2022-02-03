import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simulateurepargne',
  templateUrl: './simulateurepargne.component.html',
  styleUrls: ['./simulateurepargne.component.css']
})
export class SimulateurepargneComponent implements OnInit {

  public capitalinitiale;
  public versement;
  public duree;

  public total ;
  constructor() { }

  ngOnInit(): void {
  }

  public Capitalfinal():void{

    this.total=  (this.capitalinitiale+this.versement*this.duree)*(12/100);
  }

  public onOpenModal( mode: string  ): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addCreditModal');
      this.Capitalfinal();
    }


    container.appendChild(button);
    button.click();
  }

  public clearForm():void{
    (<HTMLFormElement>document.getElementById("form1")).reset();
  }

}
