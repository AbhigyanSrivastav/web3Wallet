import { Button } from "@/components/ui/button"

export function ButtonWrapper({text,onClickFunc}) {
  return <Button onClick={onClickFunc}>{text}</Button>
}
