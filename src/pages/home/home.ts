import { Component } from '@angular/core';
import { NavController ,Platform} from 'ionic-angular';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private address: string = null;
  private path: string = null;
  private fileNumber = 1;
  private latest = null;
  downloadProgress;
  url = "http://3.bp.blogspot.com/-XchURXRz-5c/U5ApPOrPM9I/AAAAAAAADoo/YZEj4qeSlqo/s1600/Final-Fantasy-XV-Noctis-Red-Eyes.png";
 

  constructor(public navCtrl: NavController, public platform:Platform, private fileX: FileTransfer,
    private file: File) {

  }
  ngOnInit() {
    let filename = this.nameFile()
    this.latest = this.nameFix(filename)
    console.log("1the filename that is returned is ********** ", filename)
  }

  nameFile(){
    let filename = this.path + "file" + this.fileNumber
    return filename
  }
  nameFix(filename){
    return filename.replace(/file:\/\//g, "")
  }


  Download  () {
    this.platform.ready().then(() => {
           
          
          let filename = this.nameFile();
    console.log("2the filename that is returned is ********** ", filename)
    console.log("Entered download File with url: ", this.address)
    let url = this.address
    const fileTransfer: FileTransferObject = this.fileX.create();
          
    fileTransfer.onProgress((progressEvent) => {
      console.log(progressEvent);
    var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
    this.downloadProgress = perc;
    });
          fileTransfer.download(url, filename).then((entry) => {
            // downloadProgress = (progress.loaded / progress.total) * 100;
            console.log('fileTransfer.download data ** ** ** **:' + JSON.stringify(entry));
            this.fileNumber += 1;
            this.latest = this.nameFix(filename)
        }, (err) => {
          // handle error
          console.log("downloadfile() error: " + JSON.stringify(err));
        });
    });
}

}
