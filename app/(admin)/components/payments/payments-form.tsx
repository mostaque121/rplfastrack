"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2, Plus, Trash2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { useRPL } from "@/components/rpl-context";
import SearchSelect from "@/components/search-select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  createPayment,
  CreatePaymentData,
  updatePayment,
  UpdatePaymentData,
} from "../../action/payments";

const paymentPartSchema = z.object({
  id: z.string().optional(),
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  paidAt: z.date(),
});

const paymentSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  qualification: z.string().min(1, "Qualification is required"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Invalid email address"),
  source: z.string().min(1, "Source is required"),
  collegeName: z.string().min(1, "College name is required"),
  courseFee: z.number().min(0, "Course fee must be positive"),
  paymentStatus: z.enum(["paid", "installment", "refunded"]),
  collegePayment: z.number().min(0, "College payment must be positive"),
  agentCommission: z.number().min(0, "Agent commission must be positive"),
  bankCommission: z.number().min(0, "Bank commission must be positive"),
  enrollmentDate: z.date(),
  parts: z
    .array(paymentPartSchema)
    .min(1, "At least one payment part is required"),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

interface PaymentFormProps {
  onSuccess: () => void;
  closeForm: Dispatch<SetStateAction<boolean>>;
  initialData?: Partial<PaymentFormData>;
}

export default function PaymentForm({
  initialData,
  onSuccess,
  closeForm,
}: PaymentFormProps) {
  const { sections } = useRPL();
  const allCourses = sections.flatMap((section) => section.courses ?? []);
  const mode = initialData ? "edit" : "create";

  const form = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      name: "",
      qualification: "",
      phoneNumber: "",
      email: "",
      source: "",
      collegeName: "",
      courseFee: 0,
      paymentStatus: "installment",
      collegePayment: 0,
      agentCommission: 0,
      bankCommission: 0,
      enrollmentDate: new Date(),
      parts: [{ amount: 0, paidAt: new Date() }],
      ...initialData,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "parts",
  });

  // Calculate total payment from parts
  const watchedParts = form.watch("parts");
  const totalPayment = watchedParts.reduce(
    (sum, part) => sum + (part.amount || 0),
    0
  );

  // Calculate net profit
  const courseFee = form.watch("courseFee") || 0;
  const collegePayment = form.watch("collegePayment") || 0;
  const agentCommission = form.watch("agentCommission") || 0;
  const bankCommission = form.watch("bankCommission") || 0;
  const netProfit =
    totalPayment - collegePayment - agentCommission - bankCommission;

  const addPaymentPart = () => {
    append({ amount: 0, paidAt: new Date() });
  };

  const removePaymentPart = (index: number) => {
    if (fields.length > 1) {
      if (
        confirm("Are you sure you want to remove this payment installment?")
      ) {
        remove(index);
      }
    }
  };

  const handleSubmit = async (data: PaymentFormData) => {
    try {
      let result;

      if (mode === "create") {
        const createData: CreatePaymentData = {
          name: data.name,
          qualification: data.qualification,
          phoneNumber: data.phoneNumber,
          email: data.email,
          source: data.source,
          collegeName: data.collegeName,
          courseFee: data.courseFee,
          paymentStatus: data.paymentStatus,
          collegePayment: data.collegePayment,
          agentCommission: data.agentCommission,
          bankCommission: data.bankCommission,
          enrollmentDate: data.enrollmentDate,
          parts: data.parts.map((part) => ({
            amount: part.amount,
            paidAt: part.paidAt,
          })),
        };
        result = await createPayment(createData);
      } else {
        const updateData: UpdatePaymentData = {
          id: data.id!,
          name: data.name,
          qualification: data.qualification,
          phoneNumber: data.phoneNumber,
          email: data.email,
          source: data.source,
          collegeName: data.collegeName,
          courseFee: data.courseFee,
          paymentStatus: data.paymentStatus,
          collegePayment: data.collegePayment,
          agentCommission: data.agentCommission,
          bankCommission: data.bankCommission,
          enrollmentDate: data.enrollmentDate,
          parts: data.parts,
        };
        result = await updatePayment(updateData);
      }

      if (result.success && result.data) {
        toast.success("Success", {
          description: `Payment ${
            mode === "create" ? "created" : "updated"
          } successfully!`,
        });
        onSuccess();
      } else {
        toast.error("Error", {
          description: result.error || "Something went wrong",
        });
      }
    } catch {
      toast.error("Error", {
        description: "An unexpected error occurred",
      });
    } finally {
      closeForm(false);
    }
  };
  return (
    <Card className="rounded-none">
      <CardHeader>
        <CardTitle>
          {mode === "create" ? "Create Payment" : "Edit Payment"}
        </CardTitle>
        <CardDescription>
          {mode === "create"
            ? "Add a new payment record with installment details"
            : "Update payment information and manage installments"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Personal Information */}
            <div className="grid grid-cols-1 items-start md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter email address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="source"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Source</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Website, Referral, Advertisement"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Education Information */}
            <Separator />
            <div className="grid grid-cols-1 items-start md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="qualification"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Framework</FormLabel>
                    <FormControl>
                      <SearchSelect
                        options={allCourses}
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder="Select a qualification..."
                        searchPlaceholder="Search qualifications..."
                        emptyMessage="No qualification found."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="collegeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>College Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter college name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="enrollmentDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enrollment Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick enrollment date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />
            <div className="grid grid-cols-1 items-start md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="courseFee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Fee</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter course fee"
                        {...field}
                        onChange={(e) => {
                          const value =
                            e.target.value === ""
                              ? 0
                              : Number.parseFloat(e.target.value) || 0;
                          field.onChange(value);
                        }}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paymentStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select payment status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="installment">Installment</SelectItem>
                        <SelectItem value="refunded">Refunded</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="collegePayment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>College Payment</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter college payment"
                        {...field}
                        onChange={(e) => {
                          const value =
                            e.target.value === ""
                              ? 0
                              : Number.parseFloat(e.target.value) || 0;
                          field.onChange(value);
                        }}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="agentCommission"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agent Commission</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter agent commission"
                        {...field}
                        onChange={(e) => {
                          const value =
                            e.target.value === ""
                              ? 0
                              : Number.parseFloat(e.target.value) || 0;
                          field.onChange(value);
                        }}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bankCommission"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank Commission</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter bank commission"
                        {...field}
                        onChange={(e) => {
                          const value =
                            e.target.value === ""
                              ? 0
                              : Number.parseFloat(e.target.value) || 0;
                          field.onChange(value);
                        }}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Payment Summary */}
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="grid  md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Total Payment</p>
                    <p className="font-semibold text-lg">
                      ${totalPayment.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Course Fee</p>
                    <p className="font-medium">${courseFee.toFixed(2)}</p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">Net Profit</p>
                    <p
                      className={cn(
                        "font-medium",
                        netProfit >= 0 ? "text-green-600" : "text-red-600"
                      )}
                    >
                      ${netProfit.toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Parts */}
            <Separator />
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Payment Installments</h3>
                <Button type="button" onClick={addPaymentPart} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Installment
                </Button>
              </div>

              <div className="space-y-3">
                {fields.map((field, index) => (
                  <Card key={field.id} className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                      <FormField
                        control={form.control}
                        name={`parts.${index}.amount`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Enter amount"
                                {...field}
                                onChange={(e) => {
                                  const value =
                                    e.target.value === ""
                                      ? 0
                                      : Number.parseFloat(e.target.value) || 0;
                                  field.onChange(value);
                                }}
                                value={field.value || ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`parts.${index}.paidAt`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Payment Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick payment date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date() ||
                                    date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removePaymentPart(index)}
                        disabled={fields.length === 1}
                        className="h-10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            {/* Form Actions */}
            <div className="flex justify-end gap-4">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {mode === "create" ? "Create Payment" : "Update Payment"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
