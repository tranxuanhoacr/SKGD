import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
	items: any = [];
	page: any = 0;
	catID: any = "0";
	pageName: any = "";
	constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public load:LoadingController) {
	// If we navigated to this page, we will have an item available as a nav param
		this.catID = navParams.get('id');
		this.pageName = navParams.get('name');
		let loaddd = this.load.create({
			content: 'Please wait...'
			});

			loaddd.present();
			this.requestToServer(null,loaddd);
		}

	requestToServer(infiniteScroll,loaddd){
		
		if(this.page === 50) return;
		this.page++;
		let json = {
			DEVICEID:"123455",
			OS:"Android",
			OS_VERSION:"7.0",
			MENUID:this.catID,
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
	
	doInfinite(infiniteScroll) {
		console.log('Begin async operation');

		setTimeout(() => {
		  this.requestToServer(infiniteScroll,null);

		  console.log('Async operation has ended');
		  //infiniteScroll.complete();
		}, 500);
	}
	
	goToDetail(item){
		this.navCtrl.push(DetailPage, {
		  item: item
		});
	}
}
