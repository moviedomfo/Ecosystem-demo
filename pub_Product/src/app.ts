import { Helper } from './helper';
import  { Publisher } from './producer';

const publisher = new Publisher();

//init().then(()=>{
    publisher.Start().then((res)=>{
   
  //   });
});

 
async function init() {
    try {
      //let setting =  await AppSettings.Create();

      
      //console.log(setting );
    } catch (error) {
      Helper.LogError(`Got an error trying to write to a file: ${error.message}`);
      
    }
  }