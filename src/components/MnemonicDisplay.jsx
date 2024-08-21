import { ButtonWrapper } from "./ButtonWrapper";
import { InputWrapper } from "./InputWrapper";
import { showToast } from "@/utils/toastUtil"
import { useToast } from "@/components/ui/use-toast";

export function MnemonicDisplay({ mnemonic }) {
  const { toast } = useToast();
   const words = mnemonic.split(" ");

  const copyToClipboard = async () => {
    const originalMnemonic = words.join(" ");
    try {
      await navigator.clipboard.writeText(originalMnemonic);
      showToast(toast,{ description: "Mnemonic copied to clipboard!", duration: 1000 });
    } catch (error) {
      console.error("Failed to copy mnemonic to clipboard:", error);
    }
  };

  return (  
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Mnemonic</h2>
      <div className="grid grid-cols-3 gap-2">
        {words.map((word, index) => (
          <InputWrapper
            key={index}
            value={word}
            readOnly
            className="mb-2"
          />
        ))}
      </div>
      <ButtonWrapper onClickFunc={copyToClipboard} text="Copy Mnemonic" className="mt-4"/>
    </div>
  );
}
