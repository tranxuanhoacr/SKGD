import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {
  detail :any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public load:LoadingController) {
    // If we navigated to this page, we will have an item available as a nav param
    
	let item :any = navParams.get('item');
    // Let's populate this page with some filler content for funzies
    this.requestToServer(item.id);
  }
  
  requestToServer(acticleID){
		let loaddd = this.load.create({
		content: 'Please wait...'
		});

		loaddd.present();
		
		let json = {
			DEVICEID:"123455",
			OS:"Android",
			OS_VERSION:"7.0",
			ARTICLEID:acticleID
		}
		let strJson = JSON.stringify(json);
		
		let headers = new Headers()
		headers.append('Content-Type', 'application/json');
	  
		this.http.post('http://suckhoegd.com/mobile/api/article_detail.php',strJson)
			.map(res => res.json().data)
			.subscribe(
				data => { 
					console.log(data);
					data[0].title.trim();
					this.detail.push(data[0]);
					loaddd.dismiss();
				},
				err => { console.error('An error occurred', err) }
			);
	}
}
