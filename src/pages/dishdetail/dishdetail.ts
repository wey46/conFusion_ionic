import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, ModalController } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { CommentPage } from '../comment/comment';

/**
 * Generated class for the DishdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {

  dish:Dish;
  errMess: string;
  avgstars: string;
  numcomments: number;
  favorite: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private favoriteService: FavoriteProvider,
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    @Inject('BaseURL') private BaseURL) {

      this.dish = navParams.get('dish');
      this.favorite = this.favoriteService.isFavorite(this.dish.id);
      this.numcomments = this.dish.comments.length;
      let total = 0;
      this.dish.comments.forEach(comment => total += comment.rating);
      this.avgstars = (total/this.numcomments).toFixed(2); // number to string
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad DishdetailPage');
  }

  addToFavorites(){
    //console.log('Adding to favorite', this.dish.id);
    this.favorite = this.favoriteService.addFavorite(this.dish.id);
    this.toastCtrl.create({
      message: 'Dish ' + this.dish.id + ' added as favorite successfully',
      position: 'middle',
      duration: 3000
    }).present();
  }

  showActions(){
    let actionSheet = this.actionSheetCtrl.create({
      title:'Actions',
      buttons:[
        {
          text: 'Add to Favorites',
          handler: () => {
            this.addToFavorites();
          }
        },{
          text: 'Add a Comment',
          handler: () => {
            this.openComment();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  openComment(){
    let modal = this.modalCtrl.create(CommentPage);
    modal.present();
  }

}
