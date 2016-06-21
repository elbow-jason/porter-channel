import { PorterEvent } from "./PorterEvent";

export class Channel {

  /*
    The Channel class manages the addition and
    removal of EventListeners with actions and callbacks
    on the window object.
    The Channel class's `publish` method turns actions
    and data into dispatched events namespaced to the channel's
    name ('theChannelName::theAction')
  */

  constructor(public name : string) {}

  formatAction(action : string) : string {
    return [this.name, action].join("::")
  }

  subscribe(action : string, clientCallback : any) : any {
    let chanAction = this.formatAction(action)
    const callback = (e : CustomEvent) => {
      let event = PorterEvent.fromNativeEvent(e)
      clientCallback(event)
    }
    window.addEventListener(chanAction, callback)
    return () => window.removeEventListener(chanAction, callback)
  }

  publish(actionType : string, data : any) : PorterEvent {
    let chanAction = this.formatAction(actionType);
    let e = new PorterEvent(chanAction, data);
    window.dispatchEvent(PorterEvent.toNativeEvent(e));
    return e
  }
}
