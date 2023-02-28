class Person {
  Id;
  Name;
  Lastname;
  City;
  Phone;

  kafka_Topic;
  DocNumber;
  GeneratedDate;
  CreatedDate;
  GetFullName() {
    return this.Lastname + ` ,` + this.FirstName;
  }
}

module.exports = { Person: Person };
