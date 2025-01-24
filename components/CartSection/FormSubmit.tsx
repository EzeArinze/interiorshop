// // Form component (Form.tsx)
// import { useState } from "react";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
// import { Label } from "../ui/label";
// import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

// export type FormDataType = {
//   fullName: string;
//   address: string;
//   city: string;
// };

// type FormProps = {
//   onSubmit: (formData: FormDataType) => void;
// };

// const Form = ({ onSubmit }: FormProps) => {
//   const { user } = useKindeBrowserClient();

//   const [formData, setFormData] = useState<FormDataType>({
//     fullName: "",
//     address: "",
//     city: "",
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!formData.fullName || !formData.address || !formData.city) {
//       alert("Please fill in all the fields.");
//       return;
//     }

//     onSubmit(formData);
//     setFormData({
//       fullName: "",
//       address: "",
//       city: "",
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 mt-6">
//       <div className="space-y-1">
//         <Label htmlFor="fullName" className="block text-sm font-medium">
//           Full Name
//         </Label>
//         <Input
//           id="fullName"
//           name="fullName"
//           type="text"
//           required
//           value={formData.fullName}
//           onChange={handleInputChange}
//           className="w-full p-1 border rounded"
//         />
//       </div>

//       <div className="space-y-1">
//         <Label htmlFor="address" className="block text-sm font-medium">
//           Address
//         </Label>
//         <Input
//           id="address"
//           name="address"
//           type="text"
//           required
//           value={formData.address}
//           onChange={handleInputChange}
//           className="w-full p-1 border rounded"
//         />
//       </div>

//       <div className="space-y-1">
//         <Label htmlFor="city" className="block text-sm font-medium">
//           City
//         </Label>
//         <Input
//           id="city"
//           name="city"
//           type="text"
//           required
//           value={formData.city}
//           onChange={handleInputChange}
//           className="w-full p-1 border rounded"
//         />
//       </div>

//       <Button
//         type="submit"
//         className="w-full mt-4 bg-primary text-white py-2 rounded font-semibold"
//         disabled={!user}
//       >
//         {user ? "Proceed to Checkout" : "Login to checkout"}
//       </Button>
//     </form>
//   );
// };

// export default Form;

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { User } from "@/lib/types";
// import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export type FormDataType = {
  fullName: string;
  address: string;
  city: string;
};

type FormProps = {
  onSubmit: (formData: FormDataType) => void;
  user: User | null;
};

const Form = ({ onSubmit, user }: FormProps) => {
  // const { user } = useKindeBrowserClient();
  // console.log("User:", user);
  const [formData, setFormData] = useState<FormDataType>({
    fullName: "",
    address: "",
    city: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.address || !formData.city) {
      alert("Please fill in all the fields.");
      return;
    }

    onSubmit(formData);
    setFormData({
      fullName: "",
      address: "",
      city: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <div className="space-y-1">
        <Label htmlFor="fullName" className="block text-sm font-medium">
          Full Name
        </Label>
        <Input
          id="fullName"
          name="fullName"
          type="text"
          required
          value={formData.fullName}
          onChange={handleInputChange}
          className="w-full p-1 border rounded"
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="address" className="block text-sm font-medium">
          Address
        </Label>
        <Input
          id="address"
          name="address"
          type="text"
          required
          value={formData.address}
          onChange={handleInputChange}
          className="w-full p-1 border rounded"
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="city" className="block text-sm font-medium">
          City
        </Label>
        <Input
          id="city"
          name="city"
          type="text"
          required
          value={formData.city}
          onChange={handleInputChange}
          className="w-full p-1 border rounded"
        />
      </div>

      <Button
        type="submit"
        className="w-full mt-4 bg-primary text-white py-2 rounded font-semibold"
        disabled={!user}
      >
        {!user ? "Login to checkout" : "Proceed to Payment"}
        {/* Proceed to Payment */}
      </Button>
    </form>
  );
};

export default Form;
