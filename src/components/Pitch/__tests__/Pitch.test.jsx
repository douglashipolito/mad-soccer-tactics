import React from "react";
import { create } from "react-test-renderer";
import Pitch from "../";

test("Pitch Renders", () => {
  const string = create(<Pitch />);
  expect(string).toMatchSnapshot();
});
