import React from "react";
import { create } from "react-test-renderer";
import PlayersList from "../";

test("Players List Renders", () => {
  const string = create(<PlayersList />);
  expect(string).toMatchSnapshot();
});
