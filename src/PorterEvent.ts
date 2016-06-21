
interface PorterAction {
  type: string;
  payload: any;
}

export class PorterEvent implements PorterAction {

  static fromNativeEvent = (e : CustomEvent) : PorterAction => {
    let eventType = e.type.split("::").pop()
    return new PorterEvent(eventType, e.detail)
  }

  static toNativeEvent = (e : PorterAction) : CustomEvent => {
    let customEvent = document.createEvent("CustomEvent")
    customEvent.initCustomEvent(e.type, false, true, e.payload)
    return customEvent
  }

  constructor(public type : string, public payload : any) {
  }
}
