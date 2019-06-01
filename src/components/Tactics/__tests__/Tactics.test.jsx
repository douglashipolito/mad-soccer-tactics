import React from "react";
import { create } from "react-test-renderer";
import Tactics from "../";

test("Tactics Renders", () => {
  const string = create(<Tactics />);
  expect(string).toMatchSnapshot();
});
