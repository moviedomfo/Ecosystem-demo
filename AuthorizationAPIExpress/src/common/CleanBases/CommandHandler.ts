
export abstract class CommandHandler<T extends Command,R  = any> {
    abstract Handle(command: T): Promise<R>;
  }
  
  
  /**
   * Clase abstracta que implementan todos los comandos de la capa de App
   * Es el requets o parametros del comamandHandler
   *  */
  export abstract class Command <T = any>{
    readonly commandName: string;
  
    /**
     * 
     * @param commandName Nombre del comando. Util cuando usamos metadatas, logs y event soursing
     */
    protected constructor(commandName: string) {
      this.commandName = commandName;
    }
  
     /**
     * es una propiedad genérica que puede contener cualquier tipo de dato que queramos devolver como resultado del comando.
     *
     * @type {T}
     */
     public body: T;
  }
  
  /**
   * Encapsula el resultado. Eta clase es necesaria para generalizar las respuestas
   * y poder hacer un uso global de los resultados en logs, daemons , procesadores y 
   * para darle una uniformidad comun a las respuestas
   * T Puede ser cualquier tipo de resultado que necesitemos devolver después de manejar el comando.
   */
  export class CommandResult<T = any> {
    /**
     * Es un booleano que indica si el comando se completó correctamente o no.
     *
     * @type {boolean}
     * @memberof CommandResult
     */
    readonly success: boolean;
    /**
     * es una cadena de texto que se utiliza para proporcionar información sobre el resultado del comando.
     *
     * @type {string}
     * @memberof CommandResult
     */
    readonly message: string;
  
    /**
     * es una propiedad genérica que puede contener cualquier tipo de dato que queramos devolver como resultado del comando.
     *
     * @type {T}
     * @memberof CommandResult
     */
    readonly data: T;
  
    constructor(success: boolean, message: string, data?: T) {
      this.success = success;
      this.message = message;
      this.data = data;
    }
  }
  