/**
 *Represent in CQRS Architecture an event to track doain stata transaction
 *
 * @export
 * @interface IMessageEvent
 */
export interface IMessageEvent {
  key: string;
  /** the envent or action name on the correspontdient domain */
  command: string;
  /** Requets message payload,body params or content*/
  payload: string;
  /**create,update,delete */
  type: 'c' | 'u'  | 'd';
  date?: Date;
}
