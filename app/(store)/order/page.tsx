import EmptyOrder from "@/components/Order/EmptyOrder";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatCurrency";
import { urlFor } from "@/sanity/lib/image";
import { fetchOrders } from "@/sanity/lib/order/getOrders";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";

export const revalidate = 60;

async function orderPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const order = await fetchOrders(user?.id);

  if (!order && order === undefined) return <EmptyOrder />;

  return (
    <div className="md:w-[80%] mx-auto py-8">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Order Details</h1>
        {order.map((item) => (
          <Card key={item._id} className="mb-2">
            <CardContent>
              <h2 className="text-xl font-semibold mb-2">
                Order #{item.orderNumber}
              </h2>
              <div className="flex items-center gap-4 mb-2">
                <p className="text-sm font-medium">Customer:</p>
                <p className="text-sm text-gray-700">{item.customerName}</p>
              </div>
              <div className="flex items-center gap-4 mb-2">
                <p className="text-sm font-medium">Payment Status:</p>
                <Badge
                  variant={item.status === "paid" ? "outline" : "destructive"}
                  className="text-sm font-medium rounded"
                >
                  {item.status?.toUpperCase()}
                </Badge>
              </div>
              <p className="text-lg font-bold mb-6">
                Total: {formatCurrency(item.totalPrice ?? 0)}
              </p>
              <div className="mt-4">
                <h3 className="font-semibold">Products:</h3>
                <ul className="list-disc list-inside">
                  {item.products?.map((product, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-4 py-4 border-t"
                    >
                      <Image
                        src={
                          product.product?.imageUrl
                            ? urlFor(product.product.imageUrl)
                                .height(80)
                                .width(80)
                                .url()
                            : ""
                        }
                        alt={product.product?.name || ""}
                        height={60}
                        width={60}
                        className="rounded-md"
                      />
                      <div>
                        <p className="font-medium">{product.product?.name}</p>
                        <p className="text-sm text-gray-600">
                          Quantity: {product.quantity} | Price:{" "}
                          {product.product?.currency}{" "}
                          {formatCurrency(product.product?.price ?? 0)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default orderPage;
