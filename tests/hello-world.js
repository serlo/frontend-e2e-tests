Feature("Learner");

Scenario("Navigate through Serlo", ({ I }) => {
  I.amOnPage("/");
  I.see("Hier auf Serlo");
  I.click("Über Serlo");
  I.see("So funktioniert Serlo");
  I.see("So funktioniert Serlo");
  I.click("Mathematik");
  I.see("Lust, das Fach Mathe mitzugestalten");
  I.click("Zahlen & Größen");
  I.click("Grundrechenarten");
  I.see("Plus, minus, mal und geteilt");
  I.click("Rechentricks für die Addition");
});
