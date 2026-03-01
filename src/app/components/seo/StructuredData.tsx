import React from 'react';
import { Helmet } from 'react-helmet-async';

export interface StructuredDataProps {
  schema: Record<string, unknown>;
}

/** Injects JSON-LD script into head. */
export const StructuredData: React.FC<StructuredDataProps> = ({ schema }) => (
  <Helmet>
    <script type="application/ld+json">{JSON.stringify(schema)}</script>
  </Helmet>
);
