import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public http: Http) {
    this.initializeApp();
	
	let jsonData = {
		"DEVICEID":"123455",
		"OS":"Android",
		"OS_VERSION":"7.0"
	}
	
	let headers = new Headers()
	headers.append('Content-Type', 'application/json');
	
	this.http.post('http://suckhoegd.com/mobile/api/category.php',jsonData)
		.map(res => res.json().data)
		.subscribe(
            data => { 
				console.log(data) ;
				this.pages = data;
			},
            err => { console.error('An error occurred', err) }
        );
    // used for an example of ngFor and navigation
    /*this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];*/

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
	if(page.id === 0){
		this.nav.setRoot(HomePage);
	}else{
		this.nav.setRoot(ListPage,{id:page.id, name:page.name});
	}
    //this.nav.setRoot(page.component);
	/*this.navCtrl.push(SecondPage, {
		param1: 'John', param2: 'Johnson'
	});*/
  }
}
