import './globals.css';

export const metadata = {
  title: 'clock.shikakun.com',
  description:
    'This is an app that works as a timer in your web browser. You can use it to keep time for online meetings, events like Lightning Talks, or even timing the cooking of instant ramen.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
