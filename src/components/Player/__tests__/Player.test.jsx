import React from "react";
import { create } from "react-test-renderer";
import Player from "../";

test("Player Renders", () => {
  const string = create(<Player />);
  expect(string).toMatchSnapshot();
});
