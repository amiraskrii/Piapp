import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";



@Component({
  selector: 'app-simulateurcredit',
  templateUrl: './simulateurcredit.component.html',
  styleUrls: ['./simulateurcredit.component.css']
})
export class SimulateurcreditComponent implements OnInit {

  public totaleprixacquisition  ;
  public apportpropre  ;
  public dureederemboursement  ;
  public revenubrut  ;

  public fs;
  public taux ;
  public fe ;
  public rm ;





  constructor() { }

  ngOnInit(): void {

  }

  public onFinancementSollicite():void{
    console.log(this.totaleprixacquisition);
    console.log(this.apportpropre);
    this.fs=  this.totaleprixacquisition-this.apportpropre ;
  }

  public Tauxdendettementmensuel():void{

   this.taux=   this.dureederemboursement/this.revenubrut ;
  }

  public Fraisdetudededossier():void{
    this.fe =  this.totaleprixacquisition*2/100 ;
  }

  public Remboursementmensuel():void{
    this.rm =  this.totaleprixacquisition*2/100 ;
  }





  public onOpenModal(addForm: NgForm, mode: string  ): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addCreditModal');
      this.onFinancementSollicite();
      this.Tauxdendettementmensuel();
      this.Fraisdetudededossier();
      this.Remboursementmensuel();

    }
    container.appendChild(button);
    button.click();
  }

  public clearForm():void{
    (<HTMLFormElement>document.getElementById("form1")).reset();
  }

}
