/** Angular core */
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdenesReparacionService } from '@modules/ordenes-rep';

@Component({
  selector: 'app-orden-rep',
  templateUrl: './orden-rep.component.html',
  styleUrls: ['./orden-rep.component.scss']
})
export class OrdenReparacionComponent implements OnInit{

  private or: string
  protected woForm: FormGroup

  constructor(
    private route: ActivatedRoute,
    private ordenesReparacionService: OrdenesReparacionService,
    private formBuilder: FormBuilder
  ){
    this.or = this.route.snapshot.params['or']
    this.woForm = this.formBuilder.group({
      cli: new FormControl('', [Validators.required]),
      raz: new FormControl(''),
      dir: new FormControl(''),
      pobdes: new FormControl(''),
      prodes: new FormControl(''),
      tel: new FormControl(''),
      almnro: new FormControl(''),
      km: new FormControl(''),
      mec: new FormControl(''),
      com: new FormControl(''),
    })
  }

  ngOnInit(): void {
    this.ordenesReparacionService.loadWorkOrder(this.or).subscribe(response => {      
      const {cli, raz, dir, pobdes, prodes, tel, almnro, km, mec, com } = response.response.Respuesta.cabecera

      this.woForm.patchValue({
        cli,
        raz,
        dir,
        pobdes,
        prodes,
        tel,
        almnro,
        km,
        mec,
        com
      })          
    })
  }
}
