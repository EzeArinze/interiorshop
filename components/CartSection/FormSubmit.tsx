import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import type { User } from "@/lib/types";

import { z } from "zod";
import { FormDataType, formSchema } from "@/lib/formSchema";

type FormProps = {
  onSubmit: (formData: FormDataType) => void;
  user: User | null;
};

const Form = ({ onSubmit, user }: FormProps) => {
  const [formData, setFormData] = useState<FormDataType>({
    fullName: "",
    address: "",
    city: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof FormDataType, string>>
  >({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the error when the user starts typing
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validatedData = formSchema.parse(formData);
      onSubmit(validatedData);
      setFormData({
        fullName: "",
        address: "",
        city: "",
      });
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(
          error.flatten().fieldErrors as Partial<
            Record<keyof FormDataType, string>
          >
        );
      }
    } finally {
    }
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
          value={formData.fullName}
          onChange={handleInputChange}
          className="w-full p-1 border rounded"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm">{errors.fullName}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="address" className="block text-sm font-medium">
          Address
        </Label>
        <Input
          id="address"
          name="address"
          type="text"
          value={formData.address}
          onChange={handleInputChange}
          className="w-full p-1 border rounded"
        />
        {errors.address && (
          <p className="text-red-500 text-sm">{errors.address}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="city" className="block text-sm font-medium">
          City
        </Label>
        <Input
          id="city"
          name="city"
          type="text"
          value={formData.city}
          onChange={handleInputChange}
          className="w-full p-1 border rounded"
        />
        {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
      </div>

      <Button
        type="submit"
        className="w-full mt-4 bg-primary text-white py-2 rounded font-semibold"
        disabled={!user}
      >
        {user ? "Proceed to Payment" : "Login to checkout"}
      </Button>
    </form>
  );
};

export default Form;
