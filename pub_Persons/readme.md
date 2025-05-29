
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
