export function showToast(toast,{ description, duration = 3000 }) {
   toast({
    description,
    duration,
  });
}
