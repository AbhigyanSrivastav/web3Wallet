import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AlertWrapper({ message, onClose }) {
  return (
    <Alert
      open={!!message}
      onClose={onClose}
      variant="info"
    >
      <Terminal className="h-4 w-4" />

      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
