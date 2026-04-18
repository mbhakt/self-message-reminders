import Common "common";

module {
  public type MessageId = Common.MessageId;
  public type Timestamp = Common.Timestamp;

  public type Message = {
    id : MessageId;
    content : Text;
    timestamp : Timestamp;
  };
};
