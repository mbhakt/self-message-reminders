import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/messages";

module {
  public type Message = Types.Message;
  public type MessageId = Types.MessageId;

  public func sendMessage(
    messages : List.List<Message>,
    nextId : Nat,
    content : Text,
  ) : Message {
    let msg : Message = {
      id = nextId;
      content = content;
      timestamp = Time.now();
    };
    messages.add(msg);
    msg;
  };

  public func listMessages(messages : List.List<Message>) : [Message] {
    messages.toArray();
  };

  public func deleteMessage(messages : List.List<Message>, id : MessageId) : Bool {
    let sizeBefore = messages.size();
    let filtered = messages.filter(func(m : Message) : Bool { m.id != id });
    messages.clear();
    messages.append(filtered);
    messages.size() < sizeBefore;
  };
};
