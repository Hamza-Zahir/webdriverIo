describe.skip("Description of test suite", () => {
  before(() => {
    console.log("runs once before the fiest test in this block");
  });
  after(() => {
    console.log("runs once after the last test in this block");
  });
  beforeEach(() => {
    console.log("runs before each test in this block");
  });
  it("Individual test 1", async () => {
    console.log("Execute code: Individual test 1");
  });
 
  it("Individual test 2", async () => {
    console.log("Execute code: Individual test 2");
  });
   it("Individual test 3", async () => {
    console.log("Execute code: Individual test 3");
  });
});
