import Common "common";

module {
  public type TemplateId = Common.TemplateId;

  public type Template = {
    id : TemplateId;
    name : Text;
    text : Text;
  };
};
