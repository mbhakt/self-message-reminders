import List "mo:core/List";
import MsgTypes "types/messages";
import TplTypes "types/templates";
import MessagesApi "mixins/messages-api";
import TemplatesApi "mixins/templates-api";

actor {
  let messages = List.empty<MsgTypes.Message>();
  let nextMessageId = List.singleton<Nat>(0);

  let templates = List.empty<TplTypes.Template>();
  let nextTemplateId = List.singleton<Nat>(0);

  include MessagesApi(messages, nextMessageId);
  include TemplatesApi(templates, nextTemplateId);
};
