import List "mo:core/List";
import MsgLib "../lib/messages";
import MsgTypes "../types/messages";

mixin (
  messages : List.List<MsgTypes.Message>,
  nextMessageId : List.List<Nat>,
) {
  public func sendMessage(content : Text) : async MsgTypes.Message {
    let currentId = nextMessageId.at(0);
    let msg = MsgLib.sendMessage(messages, currentId, content);
    nextMessageId.put(0, currentId + 1);
    msg;
  };

  public query func listMessages() : async [MsgTypes.Message] {
    MsgLib.listMessages(messages);
  };

  public func deleteMessage(id : MsgTypes.MessageId) : async Bool {
    MsgLib.deleteMessage(messages, id);
  };
};
