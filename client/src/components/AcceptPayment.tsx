import { PaystackButton } from "react-paystack";
import useAuth from "../hooks/useAuth";

export default function AcceptPayment(props: { amount: number }) {
  const auth = useAuth();
  const publicKey = "pk_test_081b9ebd3530a2b69ef852c746d5fc779bf62c10";
  const amount = props.amount * 100;
  
console.log(auth.getUser().id);

  const componentProps = {
    email: auth.getUser().email as string,
    name: auth.getUser().name as string,
    amount,
    metadata: {
      creatorId: auth.getUser().id,
      email: auth.getUser().email as string,
      name: auth.getUser().name as string,

      custom_fields: [
        {
          display_name: "email",
          variable_name: "email",
          value: auth.getUser().email as string,
        },
        {
          display_name: "name",
          variable_name: "name",
          value: auth.getUser().name as string,
        },
        {
          display_name: "creatorId",
          variable_name: "creatorId",
          value: auth.getUser().id as string,
        },
      ],
    },
    publicKey,
    text: "Pay Now",
    onSuccess: () =>
      alert("Thanks for doing business with us! Come back soon!!"),
    onClose: () => alert("Wait! Don't leave :("),
  };

  return (
    <div className="App">
      <PaystackButton {...componentProps} />
    </div>
  );
}
