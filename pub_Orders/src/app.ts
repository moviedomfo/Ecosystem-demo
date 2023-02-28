
import { OrderPublisher } from './service/orders.publisher';
import { Helper } from './utils/helper';

const publisher = new OrderPublisher();

//init().then(()=>{
publisher.Start().then((res) => {
  //   });
});

async function init() {
  try {
    //console.log(setting );
  } catch (error) {
    Helper.LogError(`Got an error trying to write to a file: ${error.message}`);
  }
}
