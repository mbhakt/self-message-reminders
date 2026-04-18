import List "mo:core/List";
import Types "../types/templates";

module {
  public type Template = Types.Template;
  public type TemplateId = Types.TemplateId;

  public func createTemplate(
    templates : List.List<Template>,
    nextId : Nat,
    name : Text,
    text : Text,
  ) : Template {
    let tpl : Template = {
      id = nextId;
      name = name;
      text = text;
    };
    templates.add(tpl);
    tpl;
  };

  public func updateTemplate(
    templates : List.List<Template>,
    id : TemplateId,
    name : Text,
    text : Text,
  ) : Bool {
    var found = false;
    templates.mapInPlace(
      func(t : Template) : Template {
        if (t.id == id) {
          found := true;
          { t with name = name; text = text };
        } else {
          t;
        };
      }
    );
    found;
  };

  public func deleteTemplate(templates : List.List<Template>, id : TemplateId) : Bool {
    let sizeBefore = templates.size();
    let filtered = templates.filter(func(t : Template) : Bool { t.id != id });
    templates.clear();
    templates.append(filtered);
    templates.size() < sizeBefore;
  };

  public func listTemplates(templates : List.List<Template>) : [Template] {
    templates.toArray();
  };
};
