import { InterswitchPay } from "react-interswitch";
import useAuth from "../hooks/useAuth";
// import { IInterswitch } from "react-interswitch/dist/libs/interface";
import { nanoid } from "nanoid";
import API from "../api";

export default function AcceptPayment(props: { amount: number }) {
  const auth = useAuth();
  const publicKey = "pk_test_081b9ebd3530a2b69ef852c746d5fc779bf62c10";
  const amount = props.amount * 100 + "";
  const tx_id = nanoid();
  const id = auth.getUser().id;
  const componentProps = {
    site_redirect_url: location.origin,
    merchant_code: "MX6072",
    pay_item_id: "9405967",
    txn_ref: "sample_txn_ref" + tx_id,
    amount: 10000,
    currency: 566, // ISO 4217 numeric code of the currency used
    onComplete: async (res) => {
      try {
        const randomEvent =
          Math.random() < 0.5
            ? "INVOICE.TRANSACTION_SUCCESSFUL"
            : "INVOICE.TRANSACTION_FAILURE";

        const req = {
          body: {
            event: randomEvent,
            data: {
              metadata: {
                creatorId: id,
              },
            },
          },
        };

        // Call your createOrder API endpoint with req object
        const response = await API.post("/createOrder", req);
        console.log("response");
        // Handle the response accordingly

        console.log(`Order created with event: ${randomEvent}`);
      } catch (err) {
        console.log(err);
      }
      console.log(res);
    },
    mode: "TEST",
  };
  console.log(componentProps);
  return (
    <div className="w-full">
      <button
        className="w-full h-10 text-white bg-green-500 sm:w-5/12"
        onClick={() => {
          window.webpayCheckout(componentProps);
        }}
      >
        Pay Now
      </button>
      {/* <InterswitchPay {...componentProps} /> */}
    </div>
  );
}
