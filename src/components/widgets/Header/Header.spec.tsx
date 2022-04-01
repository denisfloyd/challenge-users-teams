import { render, fireEvent, waitFor } from "@/tests/test-utils";
import { Header } from ".";

describe("Header component", () => {
  it("it should render correctly", () => {
    const { getByText } = render(<Header title="Page Header" />);

    expect(getByText("Page Header")).toBeInTheDocument();
  });
});
