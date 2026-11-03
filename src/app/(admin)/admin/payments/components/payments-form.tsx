"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";

import { createPayment, updatePayment } from "@/app/(admin)/action/payments";
import { paymentSchema, type PaymentFormData } from "@/app/(admin)/lib/zod";
import { LoadingButton } from "@/components/custom-ui/loading-button";
import { NumberInput } from "@/components/custom-ui/number-input";
import SelectCourse from "@/components/custom-ui/select-course";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import { useRPL } from "@/contexts/rpl-context";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface PaymentFormProps {
  onSuccess?: () => void;
  onCloseForm: () => void;
  item?: Partial<PaymentFormData>;
}

export default function PaymentForm({
  item,
  onSuccess,
  onCloseForm,
}: PaymentFormProps) {
  const { sections } = useRPL();
  const allCourses = sections.flatMap((section) => section.courses ?? []);
  const mode = item?.id ? "edit" : "create";

  const form = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: item || {
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
      additionalNote: "",
      parts: [{ amount: 0, paidAt: new Date() }],
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
    const result =
      mode === "create"
        ? await createPayment(data)
        : await updatePayment(data as Required<PaymentFormData>);

    if (result.success) {
      toast.success(
        `Payment ${mode === "create" ? "created" : "updated"} successfully!`
      );
      onSuccess?.();
      onCloseForm();
    } else {
      toast.error("Operation Failed", { description: result.error });
    }
  };

  return (
    <div className="w-full">
      <div>
        <h3 className="text-2xl font-semibold text-center pb-4">
          {item ? "Edit Payment" : "Add Payment"}
        </h3>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 items-start md:grid-cols-2 gap-4">
            {/* Name */}
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

            {/* Phone Number */}
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

            {/* Email */}
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

            {/* Source */}
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
            {/* College Name */}
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

            {/* Enrollment Date */}
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

            {/* Qualification */}
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="qualification"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Qualification</FormLabel>
                    <FormControl>
                      <SelectCourse
                        courses={allCourses}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Separator />
          <div className="grid grid-cols-1 items-start md:grid-cols-2 gap-4">
            {/* Course Fee */}
            <FormField
              control={form.control}
              name="courseFee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Fee</FormLabel>
                  <FormControl>
                    <NumberInput
                      placeholder="Enter course fee"
                      {...field}
                      onChange={(value) => field.onChange(value)}
                      value={field.value}
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

            {/* College Payment */}
            <FormField
              control={form.control}
              name="collegePayment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>College Payment</FormLabel>
                  <FormControl>
                    <NumberInput
                      placeholder="Enter college payment"
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Agent Commission */}
            <FormField
              control={form.control}
              name="agentCommission"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agent Commission</FormLabel>
                  <FormControl>
                    <NumberInput
                      placeholder="Enter agent commission"
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Bank Commission */}
            <FormField
              control={form.control}
              name="bankCommission"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Commission</FormLabel>
                  <FormControl>
                    <NumberInput
                      placeholder="Enter bank commission"
                      onChange={field.onChange}
                      value={field.value}
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                    {/* Amount */}
                    <FormField
                      control={form.control}
                      name={`parts.${index}.amount`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Amount</FormLabel>
                          <FormControl>
                            <NumberInput
                              placeholder="Enter amount"
                              onChange={field.onChange}
                              value={field.value}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Payment Date */}
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
                      className="h-10 mt-5"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Additional Note */}
            <FormField
              control={form.control}
              name="additionalNote"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Note (optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter Additional Note" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Form Actions */}
          <LoadingButton loading={form.formState.isSubmitting} type="submit">
            {mode === "create" ? "Create Payment" : "Update Payment"}
          </LoadingButton>
        </form>
      </Form>
    </div>
  );
}
