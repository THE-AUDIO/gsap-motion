import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Inject, NgZone, OnInit, PLATFORM_ID, QueryList, Renderer2, viewChild, ViewChild, ViewChildren } from '@angular/core';
import { NgOptimizedImage } from '@angular/common'
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextPlugin from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger)

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit , OnInit{
  title = 'gsap-motion';
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone

 ){}
  ngOnInit(): void {
  }
  nom: String = "sports-car ";
  color: String = "#00e3b8";
  @ViewChild('texte') texte!: ElementRef;

  imageUrl = [
    {nom:"sports-car", color:"#00e3b8"},
    {nom:"speaker", color:"#f5fafd"},
    {nom:"Red-sunset", color:"#00e3b8"},
    {nom:"sports-car", color:"#f5fafd"},
    {nom:"speaker", color:"#00e3b8"},
    {nom:"Red-sunset", color:"#f5fafd"}
  ]
  
  cardAnim(classe: string, title:string, color:string){
    gsap.to(classe,{
      duration:.25,
      rotateX:"10deg",
      ease: 'back',
      scrollTrigger:{
        trigger:classe,
        scrub:1 ,
        start: "top 15%",
        end: "bottom 30%",
      },
      onUpdate:()=>{
        this.ngZone.run(() => {
          this.nom = title;
          this.color = color;
        });
      } 
    })
  }
  lunchAnim(){
    this.imageUrl.forEach((elt)=>{
      const classe = `.image${this.imageUrl.indexOf(elt)}`
      this.cardAnim(classe, elt.nom, elt.color)

    })
  }
  teste(){
    console.log(true);
    
  }
  ngAfterViewInit(): void {
      if(isPlatformBrowser(this.platformId)){
        this.lunchAnim();
      }
  }
}
 
