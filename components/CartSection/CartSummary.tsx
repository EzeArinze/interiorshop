//PAYSTACK
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Form from "./FormSubmit";
import { initializePayment } from "./initializePayment";
import Script from "next/script";
import { formatCurrency } from "@/lib/formatCurrency";

type CartSummaryType = {
  calculateSubtotal: () => number;
  items: unknown[];
};
type FormDataType = {
  fullName: string;
  address: string;
  city: string;
};

function CartSummary({ calculateSubtotal, items }: CartSummaryType) {
  const { user } = useKindeBrowserClient();
  // const [error, setError] = useState<string | null>(null);
  const shipping = 2000;
  const subTotal = calculateSubtotal().toFixed(2);
  const price = (calculateSubtotal() + shipping).toFixed(2);

  const handleFormSubmit = (formData: FormDataType) => {
    const orderData = {
      ...formData,
      subtotal: subTotal,
      total: Number(price),
      items,
      email: user?.email || "test@example.com",
      userId: user?.id || "",
    };

    initializePayment(orderData); // Paystack expects amount in kobo
  };

  return (
    <section className="bg-secondary p-6 rounded shadow-md md:w-1/2 lg:w-full">
      {process.env.SCRIPT_SRC && (
        <Script src={process.env.SCRIPT_SRC} strategy="afterInteractive" />
      )}
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>

      <div className="flex justify-between mb-2 text-base ">
        <span>Subtotal</span>
        {/* <span>{Number(subTotal).toFixed(2)}</span> */}
        <span>{formatCurrency(Number(subTotal))}</span>
      </div>

      <div className="flex justify-between mb-2 text-base">
        <span>Shipping</span>
        <span>{formatCurrency(2000)}</span>
      </div>

      <div className="flex justify-between font-bold text-base sm:text-lg">
        <span>Total</span>
        <span>{formatCurrency(Number(price))}</span>
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
