const Reader = require("../src/Reader");

test("Reader should get next char", () => {
  const stream = "1+2";
  const reader = new Reader();

  reader.read(stream);

  expect(reader.nextChar()).toBe("1");
  expect(reader.nextChar()).toBe("+");
  expect(reader.nextChar()).toBe("2");
});

test("Reader should get -1 at end of stream", () => {
  const stream = "1";
  const reader = new Reader();

  reader.read(stream);

  reader.nextChar();
  expect(reader.nextChar()).toBe(-1);
});

test("Reader should retract the position", () => {
  const stream = "123";
  const reader = new Reader();

  reader.read(stream);

  reader.nextChar(); // POS: 1
  reader.retract(); // POS: 0
  expect(reader.nextChar()).toBe("1");
});
