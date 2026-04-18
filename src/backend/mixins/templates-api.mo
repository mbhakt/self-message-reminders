import List "mo:core/List";
import TplLib "../lib/templates";
import TplTypes "../types/templates";

mixin (
  templates : List.List<TplTypes.Template>,
  nextTemplateId : List.List<Nat>,
) {
  public func createTemplate(name : Text, text : Text) : async TplTypes.Template {
    let currentId = nextTemplateId.at(0);
    let tpl = TplLib.createTemplate(templates, currentId, name, text);
    nextTemplateId.put(0, currentId + 1);
    tpl;
  };

  public func updateTemplate(id : TplTypes.TemplateId, name : Text, text : Text) : async Bool {
    TplLib.updateTemplate(templates, id, name, text);
  };

  public func deleteTemplate(id : TplTypes.TemplateId) : async Bool {
    TplLib.deleteTemplate(templates, id);
  };

  public query func listTemplates() : async [TplTypes.Template] {
    TplLib.listTemplates(templates);
  };
};
