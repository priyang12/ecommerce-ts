import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../Context/CheckoutContext/CheckoutContext";
import { useForm } from "../../Hooks/useForm";
import { Address } from "../../Types/interfaces";
import { StyledCheckoutContainer } from "../../Components/UI/CheckoutContainer";
import { OrderSchema, z } from "../../validation";
import {
  FormControl,
  Input,
  Label,
  SubmitButton,
} from "../../Components/UI/FormControl";
import { css } from "@linaria/core";

const init: Address = {
  address: "",
  city: "",
  postalcode: "",
};

const containerWidth = css`
  max-width: 60ch;
`;

/**
 * AddressPage Component
 *
 * A form page where users input their shipping address during checkout.
 * Utilizes form state management with a custom `useForm` hook and validation via `Zod`.
 *
 * ## Route
 * - `/checkout/address`
 *
 * ## Form Management
 * - Initial form state defined using the `Address` interface.
 * - Form state (`addressState`) and error state (`ErrorsState`) are controlled via `useForm`.
 * - Validation schema: `OrderSchema.pick({ shippingAddress: true })` (Zod).
 * - Validation errors are mapped to specific fields using `ZodError.flatten()` and displayed inline.
 *
 * ## UI Features
 * - Styled using Linaria (`StyledCheckoutContainer`, `FormControl`, `Input`, `Label`, etc.).
 * - Each form field displays contextual error messages if validation fails.
 * - Form submission is blocked if validation throws.
 *
 * ## Accessibility
 * - Each input is properly labeled and managed for screen readers and keyboard navigation.
 */
const AddressPage = () => {
  const Navigate = useNavigate();
  const { state, dispatch } = useCheckout();

  const {
    state: addressState,
    ErrorsState,
    ChangeState,
    setErrors,
  } = useForm(state.address ? state.address : init);

  const SubmitAddress: React.ComponentProps<"form">["onSubmit"] = (e) => {
    e.preventDefault();
    try {
      OrderSchema.pick({
        shippingAddress: true,
      }).parse({ shippingAddress: addressState });
      dispatch({ type: "SET_ADDRESS", payload: addressState });
      Navigate("/checkout/paymentMethod");
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const result: any = {};
        error.errors.forEach((e) => {
          const field = e.path[e.path.length - 1];
          if (typeof field === "string") {
            result[field] = e.message;
          }
        });
        setErrors(result);
      }
    }
  };

  return (
    <StyledCheckoutContainer className={containerWidth}>
      <form onSubmit={SubmitAddress}>
        <h1>SHIPPING</h1>
        <FormControl>
          <Input
            type="text"
            name="address"
            id="address"
            aria-label="address"
            onChange={ChangeState}
            value={addressState.address}
            required
          />
          <span className="highlight"></span>
          <span className="bar"></span>
          <Label htmlFor="address">
            {ErrorsState.address ? (
              <span className="error">{ErrorsState.address}</span>
            ) : (
              "address"
            )}
          </Label>
        </FormControl>
        <FormControl>
          <Input
            type="text"
            name="city"
            id="City"
            onChange={ChangeState}
            value={addressState.city}
            required
          />
          <span className="highlight"></span>
          <span className="bar"></span>
          <Label htmlFor="City">
            {ErrorsState.city ? (
              <span className="error">{ErrorsState.city}</span>
            ) : (
              "City"
            )}
          </Label>
        </FormControl>
        <FormControl>
          <Input
            type="number"
            name="postalcode"
            id="postalcode"
            onChange={ChangeState}
            value={addressState.postalcode}
            required
          />
          <span className="highlight"></span>
          <span className="bar"></span>

          <Label htmlFor="postalcode">
            {ErrorsState.postalcode ? (
              <span className="error">{ErrorsState.postalcode}</span>
            ) : (
              "Postal Code"
            )}
          </Label>
        </FormControl>

        <SubmitButton type="submit" value="Continue" />
      </form>
    </StyledCheckoutContainer>
  );
};

export default AddressPage;
