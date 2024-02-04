// Here just play around with jest a bit

describe("my jest tests", () => {
  it("calcs", () => {
    const expected: number = 2;
    const actual = 1 + 1;
    expect(actual).toEqual(expected);
  });
});
