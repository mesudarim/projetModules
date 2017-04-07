/**
* @Author: admin
* @Date:   2017-04-04T11:35:06+02:00
* @Last modified by:   admin
* @Last modified time: 2017-04-05T17:41:33+02:00
*/

// c'est ce que j'ai essayer de faire sans succes pour le timer
//import {timer} from "../../components/my-module/timer.js"

import  { unsplashImage } from '../../providers/unsplash/unsplash-service';
import  { TimerComponent } from '../../components/timer/timer-component';

export class UserPage {
    constructor (appBody, storageService){ //formInput
      this.appBody = appBody
      //this.userName = formInput[0].value
      this.formData = storageService.db[0].user
      console.log(this.userName);
      //this.pageTitle = "Hello";
      //voila ce qu'il a ajouter pour le timer
      this.time = new Date()
      //ajouté pour le grettings
      this.pageTitle = this.grettings();
      this.userName = this.getUserName();
      this.initUI();
      this.loadEventUI();

    }

    initUI(){
      // remove all section before display UI pour que le nouveau html vienne le remplacer
      if(document.getElementsByTagName("section")[0]){
        document.getElementsByTagName("section")[0].parentNode.removeChild(document.getElementsByTagName("section")[0])
      }
      // create page skeleton
      // il a ajouter le time dans le html
      let pageSkeleton = `
        <section>
          <h1 id="time"></h1>
          <p>${this.pageTitle} ${this.userName}</p>
          <button id="download" class="waves-effect waves-light btn transparent">Download</button>
          <div>
            <i class="material-icons">search</i>
            <input type="text" name="search" id="search" value="">
          </div>

          <footer>
            <div>Photo by <address class="author"></address></div>
            <div>This app using <a href="https://unsplash.com" target="_blank" title="Unsplash API">Unsplash API</a></div>
          </footer>
        </section>
        `;
      // add page skeleton in body
      this.appBody.insertAdjacentHTML( 'afterbegin', pageSkeleton )
      //il a ajouter cela pour le timer
      document.getElementsByTagName("section")[0].style.opacity = 0;
      this.displayTime();
      this.getBackgroundIMG();
      // c'est ce que j'ai essayer de faire sans succes pour le timer
      //let Timer = new timer();
      //this.appBody.insertAdjacentHTML("afterbegin", Timer)

    }

    loadEventUI(){
    let search = document.getElementById('search')
    if(search){
      search.addEventListener('keyup', event => {
        if(event.key === 'Enter'){
          if(event.target.value.length >= 1){
            console.log('https://www.google.ch/search?q='+event.target.value)
            this.onGoToLink(event,'https://www.google.ch/search?q='+event.target.value)
            }
          }
        })
      }
    }

    displayTime(){
    new TimerComponent()
    }

//TOUT CE QU'IL Y A CI-DESSOUS A ETE REMPLACE PAR LE DISPLAYTIME DU CI DESSUS
// POUR LAISSER LA PAGE USER PLUS PROPORE ET ON A DONC CREE UN ONGLET TimerComponent


    // displayTime(){
    //   let timeElement = document.getElementById('time')
    //   timeElement.innerHTML = this.getTime(this.time)
    //    // some css with JS for time txt
    //   timeElement.style.fontSize = '10rem';
    //   timeElement.style.margin = '0rem';
    //   timeElement.style.textShadow = '0px 0px 50px rgba(0, 0, 0, 0.21)';
    //   setInterval(()=>{
    //     // asigne a new Date()
    //     this.time = new Date();
    //     //console.log(`${this.time.getHours()}:${this.time.getMinutes()}:${this.time.getSeconds()}`)
    //     // replace innerHTML of time element
    //     timeElement.innerHTML = this.getTime(this.time)
    //   },1000)
    // }
    //
    // //il a fait tout le micmac de cidessous pour que l'on voit bien la date bien comme il faut avec la date au format
    // //w3c !!!
    // getTime(time){
    //   return    `
    //   <time datetime="${(time.getFullYear() < 10)?'0'+time.getFullYear():time.getFullYear()}-${(time.getMonth() < 10)?'0'+time.getMonth():time.getMonth()}-${(time.getDate() < 10)?'0'+time.getDate():time.getDate()} ${(time.getHours() < 10)?'0'+time.getHours():time.getHours()}:${(time.getMinutes() < 10)?'0'+time.getMinutes():time.getMinutes()}:${(time.getSeconds() < 10)?'0'+time.getSeconds():time.getSeconds()}">
    //     ${(time.getHours() < 10)?'0'+time.getHours():time.getHours()}:${(time.getMinutes() < 10)?'0'+time.getMinutes():time.getMinutes()}:${(time.getSeconds() < 10)?'0'+time.getSeconds():time.getSeconds()}
    //   </time >
    //   `;
    // }

    getBackgroundIMG () {
      let unsplash = new unsplashImage();
      let queryService = unsplash.getAjaxInfoImg()
        queryService.then((response)=>{
          //console.log('res 1 -> ', JSON.parse(response))
           this.displayBackground(JSON.parse(response))
           return response
         })
         .then((response) => {
           //console.log('res 1 -> ', JSON.parse(response))
           this.displayImgInfo(JSON.parse(response))
         })
    }


    displayBackground(data){
    //console.log('service response-> ')
    //console.log( data[0] )
    let pageContainer = document.getElementsByTagName("section")[0]
    if(pageContainer){
      // some css with JS for BG
      pageContainer.style.height = `100%`;
      pageContainer.style.width = `100%`;
      pageContainer.style.position = `absolute`;
      pageContainer.style.top = `0`;
      pageContainer.style.left = `0`;
      pageContainer.style.padding = `0px`;
      pageContainer.style.textAlign = `center`;
      pageContainer.style.color = `#fff`;
      pageContainer.style.opacity = `1`;
      pageContainer.style.background = `url(${data[0].urls.regular}) center center no-repeat`;
      console.log(pageContainer.style.background);
      pageContainer.style.backgroundSize = `cover`;

    }
  }
  displayImgInfo(data){
    console.log('displayImgInfo-> ',data)
    // add author info
    let addressContainer = document.getElementsByTagName("address")[0]
    if(addressContainer){
      addressContainer.style.cursor = 'pointer';
      addressContainer.style.textDecoration = 'underline';
      //get the name of the author inside the object in USER and then NAME
      addressContainer.innerHTML = `${data[0].user.name}`
      addressContainer.addEventListener('click', event =>
      // this onGoToLink is used twice to open links!
        this.onGoToLink(event, data[0].user.links.html), false
      )
    }
    // add download link for img
    let downEl = document.getElementById("download")
    if(downEl){
      downEl.addEventListener('click', event =>
        this.onGoToLink(event, data[0].links.download), false
      )
    }
  }

  onGoToLink(event,url){
    event.preventDefault();
    let win = window.open(url, '_blank');
    win.focus();
  }

  grettings(){
    let grettings;
    switch (true) {
      case this.time.getHours()>5 && this.time.getHours()<=10:
        grettings = 'Good morning'
        break;
      case this.time.getHours()>=11 && this.time.getHours()<=17:
        grettings = 'Hello'
        break;
      default:
        grettings = 'Good evening'
    }
    return grettings
  }

  getUserName(){
    // return usernal with first letter Cappitalized
    return this.formData.email.split("@")[0].split(' ').map(c => c.slice(0, 1).toUpperCase() + c.slice(1)).join(' ')
  }
}
