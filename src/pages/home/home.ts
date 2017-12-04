import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { DetailPage } from '../detail/detail';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	items: any = [];
	page: any = 0;
	constructor(public navCtrl: NavController, public http: Http, public load:LoadingController) {
		let loaddd = this.load.create({
		content: 'Please wait...'
		});

		loaddd.present();
		this.requestToServer(null,loaddd);
		
	}
	
	doInfinite(infiniteScroll) {
		console.log('Begin async operation');

		setTimeout(() => {
		  this.requestToServer(infiniteScroll,null);

		  console.log('Async operation has ended');
		  //infiniteScroll.complete();
		}, 500);
	}
	
	requestToServer(infiniteScroll,loaddd){
		
		if(this.page === 50) return;
		this.page++;
		let json = {
			DEVICEID:"123455",
			OS:"Android",
			OS_VERSION:"7.0",
			MENUID:"0",
			PAGE:this.page.toString()
		}
		let strJson = JSON.stringify(json);
		
		let headers = new Headers()
		headers.append('Content-Type', 'application/json');
	  
		this.http.post('http://suckhoegd.com/mobile/api/listarticle.php',strJson)
			.map(res => res.json().data)
			.subscribe(
				data => { 
					console.log(data);
					for(let ite of data){
						this.items.push(ite);
					}
					
					if(infiniteScroll !== null){
						infiniteScroll.complete();
					}
					
					if(loaddd !== null){
						loaddd.dismiss();
					}
				},
				err => { console.error('An error occurred', err) }
			);
	}
	
	goToDetail(item){
		this.navCtrl.push(DetailPage, {
		  item: item
		});
	}
}
