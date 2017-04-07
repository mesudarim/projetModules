/**
* @Author: admin
* @Date:   2017-04-03T16:14:38+02:00
* @Last modified by:   admin
* @Last modified time: 2017-04-04T17:02:19+02:00
*/
import {HomePage} from "./pages/home/home";
import {UserPage} from './pages/user/user';
import {StorageService} from './providers/storage/storage-service';


class MyApp {

  constructor(){
    this.appBody = document.getElementsByTagName("app")[0];
    this.storage = new StorageService();
    this.storage.loadData()
  }

  start(){
    if(this.storage.isAuth()){
      console.log('user is auth-> ',this.storage.db[0].user)
      new UserPage(this.appBody,this.storage)
    }
    else {
    // init HomePage
    let homePage = new HomePage(this.appBody,this.storage);
  }
  }

}
let myApp = new MyApp();
myApp.start();
