// import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
// import { Button } from "../ui/button";
// import { formatCurrency } from "@/lib/formatCurrency";
// // import Form, { FormDataType } from "./Form";
// import Link from "next/link";
// import Form, { FormDataType } from "./FormSubmit";

// type CartSummaryType = {
//   calculateSubtotal: () => number;
//   items: unknown[];
// };

// function CartSummary({ calculateSubtotal, items }: CartSummaryType) {
//   const { user } = useKindeBrowserClient();
//   const price = (calculateSubtotal() + 20).toFixed(2);
//   const subTotal = calculateSubtotal().toFixed(2);

//   const handleFormSubmit = (formData: FormDataType) => {
//     const orderData = {
//       ...formData,
//       subtotal: subTotal,
//       total: price,
//       items,
//     };

//     console.log("Order Data:", orderData);
//     // Add logic to handle order submission, such as sending the data to a server
//     alert("Order submitted successfully!");
//   };

//   return (
//     <section className="bg-secondary p-6 rounded shadow-md md:w-1/2 lg:w-full">
//       <h2 className="text-xl font-bold mb-4">Order Summary</h2>

//       <div className="flex justify-between mb-2">
//         <span>Subtotal</span>
//         <span>{formatCurrency(Number(subTotal))}</span>
//       </div>

//       <div className="flex justify-between mb-2">
//         <span>Shipping</span>
//         <span>{formatCurrency(20)}</span>
//       </div>

//       <div className="flex justify-between font-bold text-lg">
//         <span>Total</span>
//         <span>{formatCurrency(Number(price))}</span>
//       </div>

//       <Form onSubmit={handleFormSubmit} user={user} />

//       <Button
//         variant="outline"
//         className="w-full mt-4 text-gray-600 py-2 rounded hover:text-white"
//       >
//         <Link href="/">Continue Shopping</Link>
//       </Button>
//     </section>
//   );
// }

// export default CartSummary;

//PAYSTACK
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Form, { type FormDataType } from "./FormSubmit";
import { useEffect } from "react";
import { initializePayment } from "./initializePayment";

type CartSummaryType = {
  calculateSubtotal: () => number;
  items: unknown[];
};

function CartSummary({ calculateSubtotal, items }: CartSummaryType) {
  const { user } = useKindeBrowserClient();
  // const [error, setError] = useState<string | null>(null);
  const price = (calculateSubtotal() + 20).toFixed(2);
  const subTotal = calculateSubtotal().toFixed(2);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleFormSubmit = (formData: FormDataType) => {
    const orderData = {
      ...formData,
      subtotal: subTotal,
      total: Number(price),
      items,
      email: user?.email || "test@example.com",
    };

    initializePayment(orderData); // Paystack expects amount in kobo
  };

  return (
    <section className="bg-secondary p-6 rounded shadow-md md:w-1/2 lg:w-full">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>

      <div className="flex justify-between mb-2">
        <span>Subtotal</span>
        <span>{Number(subTotal).toFixed(2)}</span>
      </div>

      <div className="flex justify-between mb-2">
        <span>Shipping</span>
        <span>20.00</span>
      </div>

      <div className="flex justify-between font-bold text-lg">
        <span>Total</span>
        <span>{Number(price).toFixed(2)}</span>
      </div>

      {/* {error && <div className="text-red-500 mt-4 mb-4">{error}</div>} */}

      {/* Only signed in users can access the form */}
      {user ? (
        <Form onSubmit={handleFormSubmit} user={user} />
      ) : (
        <p className="text-center pt-2 font-semibold text-gray-800 border-t-2">
          Login To Checkout
        </p>
      )}

      {/* <Form onSubmit={handleFormSubmit} user={user} /> */}

      <Button
        variant="outline"
        className="w-full mt-4 text-gray-600 py-2 rounded hover:text-white"
      >
        <Link href="/">Continue Shopping</Link>
      </Button>
    </section>
  );
}

export default CartSummary;
