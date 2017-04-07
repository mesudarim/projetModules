/**
* @Author: admin
* @Date:   2017-04-05T17:16:34+02:00
* @Last modified by:   admin
* @Last modified time: 2017-04-05T18:02:37+02:00
*/
import {ApiKey} from "../../providers/unsplash/apiKey-config.js";

export class unsplashImage{
  constructor (){
    this.params = ApiKey
    this.queryUrl = "https://api.unsplash.com/photos/random?count=1&client_id="
    console.log("unsplash");
  }

  getAjaxInfoImg (){
    return new Promise ((resolve, reject) =>{
      let req = new XMLHttpRequest();
      req.open("GET", this.queryUrl+this.params.client_id);//
      req.onload = () => {
          console.log(req.status);
        if(req.status == 200) {
          resolve(req.responseText);

        }
        else {
          reject(Error(req.statusText));

        }
      }

      req.onerror = ()=> {
        reject(Error("Network Error"));
      };

      req.send();
    })
  }
}
