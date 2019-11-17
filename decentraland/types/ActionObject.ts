export interface ActionObject {
  send: (...args: any[]) => any; // TODO: Replace these any's
  waitForOneConfirmation: (...args: any[]) => any; // TODO: Replace these any's
  getId: (args: void) => string;
}
