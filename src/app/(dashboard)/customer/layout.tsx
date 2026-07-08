import React from 'react';

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* Add your shared marketplace sidebar/topbar here if needed */}
      {children}
    </section>
  );
}