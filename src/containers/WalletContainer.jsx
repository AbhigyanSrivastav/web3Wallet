import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { InputWrapper } from "@/components/InputWrapper";
import { ButtonWrapper } from "@/components/ButtonWrapper";
import { useToast } from "@/components/ui/use-toast";
import { showToast } from "@/utils/toastUtil";

const WalletContainer = ({ mnemonic = "" }) => {
  const { toast } = useToast();
  const words = mnemonic.split(" ");

  const copyToClipboard = async () => {
    const originalMnemonic = words.join(" ");
    try {
      await navigator.clipboard.writeText(originalMnemonic);
      showToast(toast, { description: "Mnemonic copied!", duration: 1000 });
    } catch (error) {
      console.error("Failed to copy mnemonic:", error);
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Wallet</CardTitle>
          <CardDescription>Generate or import your wallet</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <div className="grid grid-cols-3 gap-3">
              {words.map((word, index) => (
                <InputWrapper
                  key={index}
                  value={word}
                  readOnly
                  className="mb-2 text-sm"
                />
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <ButtonWrapper
            onClickFunc={copyToClipboard}
            text="Copy Mnemonic"
            className="mt-4"
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default WalletContainer;
