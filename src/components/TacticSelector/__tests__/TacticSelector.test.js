import React from "react";
import { create } from "react-test-renderer";
import TacticSelector from "../";

test("Tactic Selector Renders", () => {
  const string = create(<TacticSelector />);
  expect(string).toMatchSnapshot();
});
