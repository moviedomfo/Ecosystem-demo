
// Y Nodemon automáticamente detecta .ts y usa ts-node si encuentra una línea como esta en tu script: import "tsconfig-paths/register";
// Por eso ts-node lo interpreta todo sin que tengas que pasarlo en la línea de comando.
// Antes 
//  -> "dev": "nodemon --exec ts-node -r tsconfig-paths/register ./src/index.ts"
// pero usando  Server.ts 
//  -> "dev": "nodemon --exec ts-node ./src/server.ts"
// pero nodemom detecta que es un .ts y lo ejecuta con ts-node automáticamente.
//  -> "dev": "nodemon --exec ts-node ./src/server.ts"

import "tsconfig-paths/register"; // ⚙️ Activa soporte de paths desde tsconfig
import "./index";                 // 🔁 Corre la app real desde index.ts