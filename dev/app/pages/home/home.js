/**
* @Author: admin
* @Date:   2017-04-04T11:34:32+02:00
* @Last modified by:   admin
* @Last modified time: 2017-04-05T14:56:22+02:00
*/
import { homeSkeleton } from './home-ui';
import {UserPage} from "../user/user.js";

export class HomePage {

  constructor(appBody,storageService){
    this.appBody = appBody
    this.pageTitle = 'Hello world!';
    this.storage = storageService;
    this.initUI();
  }

  //ici je vais mettre tout ce qui doit être affiché dans la le UI

  initUI(){
    // remove all section before display UI pour que le nouveau html vienne le remplacer
    if(document.getElementsByTagName("section")[0]){
      document.getElementsByTagName("section")[0].parentNode.removeChild(document.getElementsByTagName("section")[0])
    }
    // create page skeleton
    // ici on a remplacé le HTML par ce qui suit et on a ajouté une page home-ui.js
     let pageSkeleton =  this.getPageSkeleton();

    // // add page skeleton in body
    this.appBody.insertAdjacentHTML( 'afterbegin', pageSkeleton )
    this.loadEventUI()


  }
// c'est la methode que l'on appelle dans le pageSkeleton
  getPageSkeleton(){
   // return page skeleton
   let data = {}; // create obj to pass data. on peut tout passer avec un objet
   data.pageTitle = this.pageTitle // asigne data
   return  homeSkeleton(data);
 }

//ici je vais mettre tous les événements qui peuvent être déclanchés par l'utilisateur

  loadEventUI(){
    let loginForm = document.getElementsByTagName("form")[0];
    loginForm.addEventListener("submit",  event => this.onLogin(event), false)
  }

//ici je vais mettre tous ce que les événements doivent déclancher

  onLogin(event){
    event.preventDefault()
    let validationInput = 0
    let formInput = {}
    let form = document.forms[0].elements
    for (let i = 0; i < form.length; i++) {
      if(form[i].value){
        //console.log(formInput[i].value)
        formInput[form[i].name] = form[i].value
        validationInput++
        //let userPage = new UserPage(this.appBody, formInput);
      }
    }
      if(validationInput === 2){
        // save in StorageService
        this.storage.login(formInput)
        // load UserPage
        console.log('load UserPage')
        new UserPage(this.appBody, this.storage);
      }
    }
  }
