import React from "react";
import { create } from "react-test-renderer";
import Field from "../";

test("Field Renders", () => {
  const string = create(<Field />);
  expect(string).toMatchSnapshot();
});
