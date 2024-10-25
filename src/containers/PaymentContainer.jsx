import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { sendTransaction } from "@/utils/utils";
import { useToast } from "@/components/ui/use-toast";
import { showToast } from "@/utils/toastUtil";


const PaymentContainer = ({ keyPair }) => {
  const { publicKey } = keyPair;
  const { toast } = useToast();

  const formSchema = z.object({
    senderPubKey: z.string(), //Todo coorect this
    recipientPubKey: z.string().base64(),
    amount: z.coerce.number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    }),
  });
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      senderPubKey: publicKey,
      recipientPubKey: "",
      amount: "",
    },
  });

  const onSubmit = async (data) => {
    const response = await sendTransaction(data, keyPair);
    
    if (response.error === -1) {
        showToast(toast,{ description: `Transaction successful!`});
    } else {
        showToast(toast,{ description: `${response.data}`});
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Send SOL</CardTitle>
          <CardDescription>
            Enter the recipient public key and amount
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="senderPubKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sender</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Sender Public Key"
                        {...field}
                        readOnly
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="recipientPubKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipient</FormLabel>
                    <FormControl>
                      <Input placeholder="Recipient Public Key" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount (SOL)</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter amount in SOL"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button inside form */}
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentContainer;
