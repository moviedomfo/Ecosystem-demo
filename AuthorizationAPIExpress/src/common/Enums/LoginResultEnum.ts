
export enum LoginResultEnum {
    /// <summary>
    /// Logoing exitoso
    /// </summary>
    LOGIN_OK = 200,
  
    /// <summary>
    /// Uario no existe
    /// </summary>
    LOGIN_USER_DOESNT_EXIST = 1900,
  
    /// <summary>
    /// Cuenta inactiva
    /// </summary>
    LOGIN_USER_ACCOUNT_INACTIVE = 1901,
  
    /// <summary>
    /// Clave incorrecta
    /// </summary>
    LOGIN_USER_OR_PASSWORD_INCORRECT = 1902,
  
    /// <summary>
    /// Cuenta de usuario bloqueada
    /// </summary>
    LOGIN_USER_ACCOUNT_LOCKOUT = 1909,
    /// <summary>
    ///
    /// </summary>
    ERROR_PASSWORD_MUST_CHANGE = 1907,
  
    /// <summary>
    /// Este mensaje de error puede deberse a cualquiera de las siguientes situaciones:
    ///     La configuración de red del cliente es incorrecta. Esto incluye la ausencia de direcciones incorrecta para los servidores DNS localizar y resolver los controladores de dominio o.
    ///     La configuración del cliente Winsock Proxy es incorrecta, impedir la resolución correcta de controladores de dominio disponibles y sus direcciones.
    ///     Conectividad de red entre el cliente y los controladores de dominio descubiertos consultando DNS no está disponible.
    ///     Comunicación a través de la red para el controlador de dominio funciona correctamente, pero devolvió una respuesta no válida al cliente.
    ///     El controlador de dominio utilizado como origen de datos mientras está abierto el complemento ha convertido en no disponible.
    /// </summary>
    ERROR_SERVER_IS_NOT_OPERATIONAL = 1908,
    ERROR_ACCOUNT_EXPIRED = 1793,
    ERROR_PASSWORD_EXPIRED = 1330,
    ERROR_LOGON_FAILURE = 1326,
    ERROR_ACCOUNT_RESTRICTION = 1327,
    ERROR_ACCOUNT_DISABLED = 1331,
    ERROR_INVALID_LOGON_HOURS = 1328,
    ERROR_NO_LOGON_SERVERS = 1311,
    ERROR_INVALID_WORKSTATION = 1329,
  }
  