function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-AU");
}

export function useFormatHelper() {
  return {
    formatDate,
  };
}
