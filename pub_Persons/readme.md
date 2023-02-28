
# Proyect 
App cron-job que publica llegada de personal
 
Bindings 
channel.bindQueue(queue
_name, exchange_name, KEY);  
channel.bindQueue(queue_name, exchange_name, 'black');  

Si usamos un echange tipo = 'fanout' el KEY es ignorado por lo tanto este parametro dependera del tipo de exchange
**Direct exchange** :un mensaje va a las colas cuya clave de enlace coincide exactamente con la clave de enrutamiento del mensaje.

        bingding-key <--> routing-key

    (P)---> (X type=direct) ---orange-->(Q1)---> (C1)
                            ---orange-->(Q2)---> (C2)
                            ---green-->

**Multiple exchange**  bind multiple queues with the same binding key. En este caso el Direct Exchange funciona como un type=fanout

    (P)---> (X type=direct) ---orange-->(Q1)---> (C1)
                            ---orange-->(Q2)---> (C2)
        
                
# Subscribing
    When receiving messages we're going to create a new binding for each severity (key:[orange, green] or key [error,info,warning]  ) we're interested in.

     args.forEach(function(severity) {
                        channel.bindQueue(q.queue, exchange, severity);
                });  
    
# components
 **types/node**
'require'.   Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.ts(2580)

 **config/settings**
    npm install dotenv --save
 **nodemon** is a tool that helps develop node.js based applications by `automatically restarting` the node application when file changes in the 
 
    para que reconozca los ts. hay q instalar:  
        `npm install -g ts-node`
    
 directory are detected.
    "scripts": {
               "start": "tsc && nodemon  --tls-min-v1.0   dist/app.js",
            "prod": "node app"}
        }

    configure: 
      a)package.json{
                    "nodemonConfig": {
                     "ignore": ["test/*", "docs/*"],
                    "delay": "2500"
            }
      }
          
      b)  nodemon.json

       If you specify a --config file or provide a local nodemon.json any package.json config is ignored.


# run app
    npm start [severity]
    npm run prod
    
[severity] : es la rutingKey para un Exchange type = direct
    


components
    una despues si vos queres cambiar
    1 luxon https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html

    2 typescript-logging : TypeScript library for logging. Simple and flexible in usage.
          https://www.npmjs.com/package/typescript-logging

    3 cron guru : service scheduler 
        https://crontab.guru/
        https://www.digitalocean.com/community/tutorials/nodejs-cron-jobs-by-examples

    4 
    `fs` -->     For file management : Note:  doesn’t work correctly on cross partitions or virtual file        systems.
      `mv` -->  To move files correctly across all platforms  
     npm install mv
     this  `mv` first tries fs.rename() method then fallbacks to piping a source file to the destination folder and deletes the source file.
     

# comments 
    shift + alt + A
    Char --> `  Alt+96

# pm2 

Usar PM2

https://desarrolloweb.com/articulos/ejecutar-aplicacion-nodejs-pm2.html


# deploy

npm install --production



# RabbiMQ 

  This app use rabbit mq and need client NodeJs installed on 
    npm i amqp.node.client

 rabbit default port (5672) 
    ui management http://localhost:15672
    u:guest p:guest
 

# Faker git https://github.com/marak/Faker.js/ 
        https://fakerjs.dev/api/random.html
    Esta libreria es usada para la generacion de datos de prueba 
    npm i faker 


 

