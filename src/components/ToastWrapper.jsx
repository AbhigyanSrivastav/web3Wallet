import { useToast } from "@/components/ui/use-toast";

export function ToastWrapper({ message, duration = 1000 }) {
  const { toast } = useToast();

  if (message) {
    toast({
      description: message,
      duration: duration,
    });
  }

  return null; // This component does not need to render anything
}
