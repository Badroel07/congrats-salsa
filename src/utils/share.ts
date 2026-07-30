export function shareViaWhatsApp(message: string): void {
  const encoded = encodeURIComponent(message.replace('[URL]', window.location.href));
  window.open(`https://wa.me/?text=${encoded}`, '_blank');
}

export function shareViaInstagram(): void {
  window.open('https://instagram.com/', '_blank');
}

export async function copyLink(): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(window.location.href);
    return true;
  } catch {
    return false;
  }
}
