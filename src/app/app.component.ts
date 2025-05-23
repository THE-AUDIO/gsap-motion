import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, NgZone, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { NgOptimizedImage } from '@angular/common'
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger)

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule],
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
  menuState: Boolean = false;
  refState: Boolean = false;
  @ViewChild('wel') wel!: ElementRef;
  @ViewChild('svg') svg!: ElementRef;
  @ViewChild('ref') ref!: ElementRef;
  @ViewChild('hello') helloRef!: ElementRef;
  @ViewChild('theo') theo!: ElementRef;
  @ViewChild('lineC') lineC!: ElementRef;
  @ViewChild('service') service!: ElementRef;
  line = Array(34)
  imageUrl = [
    {nom:"car", color:"#00e3b8"},
    {nom:"speaker", color:"#f5fafd"},
    {nom:"sunset", color:"#00e3b8"},
    {nom:"office", color:"#f5fafd"},
    {nom:"workspace", color:"#00e3b8"},
    {nom:"design", color:"#f5fafd"}
  ]
  
  ToogleMenu(){
      this.menuState =!this.menuState
  }
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

  ngAfterViewInit(): void {
      if(isPlatformBrowser(this.platformId)){
        const tl = gsap.timeline()
        gsap.to(this.svg.nativeElement,{
          duration:1,
          rotate:360,
          scrollTrigger:{
            trigger:".hiddenWell",
            start:"top 40%",
            end:"top center",
            scrub:1,
          }
        })
        gsap.to(this.wel.nativeElement,{
          duration:3,
          scale:5,
          width:"100%",
          height:"100%",
          rotate:-30,
          opacity:0,
          scrollTrigger:{
            trigger:".hiddenWell1",
            start:"top 50%",
            end:"top 0%",
            scrub:1,
          }
        })
        gsap.to(this.ref.nativeElement,{
          duration:1,
          opacity:1,
          scale:1,
          rotate:"10deg",
          scrollTrigger:{
            trigger:'.img-item',
            start: "top 30%",
            end: "top 40%",
            scrub:1 ,
          }
        })

        const spans = this.helloRef.nativeElement.querySelectorAll('span');
        gsap.set(spans, { y: "-35%", opacity: 0.8 });
        gsap.timeline().to(spans, {
          y:"35%",
          opacity:1,
          stagger: 0.5,
          duration: 5,
          ease: "back",
          scrollTrigger:{
            trigger:'.anim-hello',
            start:"top 100%",
            end:"top 70%",
            scrub:1
          }
        })

        const lettres = this.theo.nativeElement.querySelectorAll('span');
        gsap.set(lettres, {opacity: 0, y:25 });
        gsap.timeline().to(lettres, {
          y:0,
          opacity:1,
          stagger: 0.5,
          duration: 5,
          ease: "back",
          scrollTrigger:{
            trigger:'.hiddenRef1',
            start:"top 50%",
            end:"top 30%",
            scrub:1,
          }
        })

        const lines = this.lineC.nativeElement.querySelectorAll('span');
        gsap.set(lines, {opacity:0 , y:10})
        gsap.timeline().to(lines, {
          y:0,
          opacity:1,
          stagger: 0.5,
          duration: 5,
          ease: "back",
          scrollTrigger:{
            trigger:'.hiddenRef1',
            start:"top 30%",
            end:"top 10%",
            scrub:1,
          }
        })

        const services = this.service.nativeElement.querySelectorAll('.service');
        gsap.set(services, {opacity:0 , y:10})
        gsap.timeline().to(services, {
          opacity:1,
          y:0,
          stagger:1.5,
          duration:2,
          scrollTrigger:{
            trigger:".hiddenWell",
            start:"top 40%",
            end:"top center",
            scrub:1,
          }
        })

        this.lunchAnim();

      }
  }
}
 
