import SpinnerWords from "./SpinnerWords";

export default function Footer() {
  return (
    <footer className="mt-auto">
      <div className="border-t border-[var(--border)]" />
      <div className="max-w-[960px] mx-auto px-6 py-8 flex items-center justify-between text-sm text-muted">
        <p>&copy; {new Date().getFullYear()} ZENYTI's</p>
        <SpinnerWords />
      </div>
    </footer>
  );
}
