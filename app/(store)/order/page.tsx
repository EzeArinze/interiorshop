import EmptyOrder from "@/components/Order/EmptyOrder";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchOrders } from "@/sanity/lib/order/getOrders";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { CalendarIcon, CreditCardIcon, UserIcon } from "lucide-react";
import Image from "next/image";

export const revalidate = 60;

async function orderPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const order = await fetchOrders(user?.id);

  if (!order) return <EmptyOrder />;

  // return <div className="md:w-[80%] mx-auto py-8">

  return (
    <div className="md:w-[80%] mx-auto py-8">
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Order Details</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>Order #{order.orderNumber}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center space-x-4">
                <CalendarIcon className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Order Date</p>
                  <p className="text-sm text-gray-500">{order.orderDate}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <UserIcon className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Customer</p>
                  <p className="text-sm text-gray-500">{order.customerName}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <CreditCardIcon className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Payment Status</p>
                  <Badge
                    variant={
                      order.status === "paid" ? "outline" : "destructive"
                    }
                  >
                    {order.status.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
            </CardHeader>
            <CardContent>
              {order.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 mb-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={item.product.imageUrl || ""}
                      alt={item.product.name}
                      className="h-16 w-16 object-cover rounded-md"
                      height={24}
                      width={24}
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-sm font-medium">
                      {item.product.price} {item.product.currency}
                    </p>
                  </div>
                </div>
              ))}
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-lg font-bold">
                    {order.totalPrice} {order.currency}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default orderPage;
