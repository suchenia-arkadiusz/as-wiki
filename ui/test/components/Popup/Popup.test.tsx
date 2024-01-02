import Popup from "../../../src/components/Popup/Popup.tsx";
import { fireEvent, render, within } from "@testing-library/react";

const setupScreen = (onClose: () => void) => {
  return render(
    <Popup title="Test popup" onClose={onClose} width={200}>
      <div>Some children</div>
    </Popup>,
  );
};

describe("<Popup />", () => {
  it("should render PopupContainer", () => {
    const screen = setupScreen(() => {});

    expect(screen.getByTestId("PopupContainer")).toBeInTheDocument();
    expect(screen.getByTestId("PopupOverlayContainer")).toBeInTheDocument();
    expect(screen.getByText("TEST POPUP")).toBeInTheDocument();
  });

  it("should render PopupContainer with children", () => {
    const screen = setupScreen(() => {});

    expect(screen.getByTestId("PopupContainer")).toBeInTheDocument();
    expect(screen.getByText("Some children")).toBeInTheDocument();
  });

  it("should close popup when close button is clicked", () => {
    const onClose = jest.fn();
    const screen = setupScreen(onClose);
    const closeButtonContainer = screen.getByTestId("PopupCloseButtonContainer");

    fireEvent.click(within(closeButtonContainer).getByTestId("ButtonContainer"));

    expect(onClose).toHaveBeenCalled();
  });

  it("should close popup on click outside", () => {
    const onClose = jest.fn();
    const screen = setupScreen(onClose);
    const overlayContainer = screen.getByTestId("PopupOverlayContainer");

    fireEvent.click(overlayContainer);

    expect(onClose).toHaveBeenCalled();
  });
});
