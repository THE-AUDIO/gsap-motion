import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, PLATFORM_ID, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NgOptimizedImage } from '@angular/common'
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger)

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit{
  title = 'gsap-motion';
  @ViewChild('element1') element0!: ElementRef;

  imageUrl = [
    {nom:"sports-car"},
    {nom:"modern_speaker"},
    {nom:"Red-sunset"},
    {nom:"sports-car"},
    {nom:"modern_speaker"},
    {nom:"Red-sunset"}
  ]


  constructor(
     @Inject(PLATFORM_ID) private platformId: Object,
  ){}
  cardAnim(classe: string){
    gsap.to(classe,{
      duration:.5,
      rotateX:"15deg",
      ease: 'back',
      scrollTrigger:{
        trigger:classe,
        scrub:1 ,
        start: "top 10%",
        end: "bottom 30%",
      }
    })
  }
  lunchAnim(){
    for (let i = 0; i < this.imageUrl.length; i++) {
        const classe = `.image${i}`
        console.log(classe);
        
        this.cardAnim(classe)
    }
  }
  ngAfterViewInit(): void {
      if(isPlatformBrowser(this.platformId)){
        this.lunchAnim()
      }
  }
}
 
